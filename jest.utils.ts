import * as path from 'path';
import * as fs from 'fs-extra';
import {
  map,
  filter,
  difference,
  flattenDeep,
  values,
  isFunction,
  find,
  isEmpty,
  get,
} from 'lodash';

function getFilesByDir(dir: string): string[] {
  const entries = fs.readdirSync(dir);
  const paths = entries.map((entry) => path.join(dir, entry));
  const filePaths = paths.filter((entryPath) =>
    fs.statSync(entryPath).isFile(),
  );
  const dirPaths = difference(paths, filePaths);
  const dirFiles = dirPaths.reduce<string[]>(
    (accumulator, current: string) =>
      accumulator.concat(getFilesByDir(current)),
    [],
  );

  return flattenDeep([...filePaths, ...dirFiles]);
}

function getFilesByRegex(regex: string, dir: string): any {
  const files = getFilesByDir(dir);
  const isFileMatchByRegex = (file: string) =>
    new RegExp(regex, 'g').test(file);

  return filter<string>(files, isFileMatchByRegex);
}

export function importFilesByRegex(regex: string, dir: string): Function[] {
  const files = getFilesByRegex(regex, dir);
  const modules = map(files, require);
  const getExportedFunctions = (module: object): Function => {
    const valuesOf = values(module);
    const isFunctionWithName = (fn: never): boolean =>
      isFunction(fn) && !isEmpty(get(fn, 'name'));

    return find<Function>(valuesOf, isFunctionWithName);
  };

  return map(modules, getExportedFunctions);
}

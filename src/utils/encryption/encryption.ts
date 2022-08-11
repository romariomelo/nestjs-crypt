import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { EncryptionOptions } from './encryption.interface';

const DEFAULT_AUTH_TAG_LENGTH = 16;

function checkKey(key: string): void {
  if (key === null) {
    throw new Error('Key não pode ser null');
  }
  if (key === undefined) {
    throw new Error('Key não pode ser undefined');
  }
  if (key.length === 0) {
    throw new Error('Key não pode ser vazia');
  }
  if (!/^[0-9A-Fa-f]+$/g.test(key)) {
    throw new Error('Key não uma chave hexadecimal válida [0-9A-Fa-f]');
  }
}

export function encryptData(data: Buffer, options: EncryptionOptions): Buffer {
  const { algorithm, ivLength, key } = options;
  checkKey(key);
  const iv = options.iv
    ? Buffer.from(options.iv, 'hex')
    : randomBytes(ivLength);
  const cipherOptions = {
    authTagLength: DEFAULT_AUTH_TAG_LENGTH,
  };
  const cipher = (createCipheriv as any)(
    algorithm,
    Buffer.from(key, 'hex'),
    iv,
    cipherOptions,
  );
  const start = cipher.update(data);
  const final = cipher.final();
  return Buffer.concat([iv, start, final]);
}

export function decryptData(data: Buffer, options: EncryptionOptions): Buffer {
  const { algorithm, ivLength, key } = options;
  checkKey(key);
  const iv = data.slice(0, ivLength);
  const decipher = createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);

  const dataToUse = data.slice(options.ivLength);

  const start = decipher.update(dataToUse);
  const final = decipher.final();

  return Buffer.concat([start, final]);
}

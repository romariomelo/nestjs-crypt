import { isNil } from 'lodash';
import { AppEncryptionTransformer } from './encryption.transformer';

export class DateEncryptionTransformer extends AppEncryptionTransformer {
  to(value: Date): string {
    if (isNil(value)) {
      return;
    }

    if (typeof value === 'string') {
      value = new Date(value);
    }

    // Chama a função da classe pai passando como parâmetro a data no formato ISO
    return super.to(value.toISOString());
  }

  from(value: string): Date {
    const decryptedStr = super.from(value);
    if ((decryptedStr ?? null) === null) {
      return;
    }
    // Converte a informação descriptografada em string para tipo Date
    // A informação é gravada como string porém seu formato está como ISO
    // Ex.: 2022-08-22T09:58:00.000Z
    return new Date(decryptedStr);
  }
}

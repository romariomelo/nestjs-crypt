import { ValueTransformer } from 'typeorm';
import { decryptData, encryptData } from '../encryption/encryption';
import { EncryptionOptions } from '../encryption/encryption.interface';

export class AppEncryptionTransformer implements ValueTransformer {
  encryptionOptions: EncryptionOptions = {
    key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
    algorithm: 'aes-256-cbc',
    ivLength: 16,
  };

  to(value: any): string {
    if ((value ?? null) === null) {
      return;
    }
    return encryptData(
      Buffer.from(String(value), 'utf8'),
      this.encryptionOptions,
    ).toString('base64');
  }

  from(value: string): any {
    if ((value ?? null) === null) {
      return;
    }
    return decryptData(
      Buffer.from(value, 'base64'),
      this.encryptionOptions,
    ).toString('utf8');
  }
}

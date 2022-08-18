import { ValueTransformer } from 'typeorm';
import { decryptData, encryptData } from '../encryption/encryption';
import { EncryptionOptions } from '../encryption/encryption.interface';

export class AppEncryptionTransformer implements ValueTransformer {
  encryptionOptions: EncryptionOptions = {
    key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61', // Chave deve ficar armazenada em variável de ambiente
    algorithm: 'aes-256-cbc',
    ivLength: 16,
  };

  to(value: any): string {
    if ((value ?? null) === null) {
      return;
    }
    // Caso exista um valor válido o valor retornado para ser inserido no banco é criptografado.
    return encryptData(
      Buffer.from(String(value), 'utf8'),
      this.encryptionOptions,
    ).toString('base64'); // Formato a ser inserido no banco de dados será será transfomado de binário para base64
  }

  from(value: string): any {
    if ((value ?? null) === null) {
      return;
    }
    return decryptData(
      Buffer.from(value, 'base64'), // Converte a informação de Base64 que estava no DB em Buffer para ser descriptografada
      this.encryptionOptions,
    ).toString('utf8'); // Converte o Buffer descriptografado para informação legível
  }
}

import {
  CipherCCMOptions,
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from 'crypto';
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

  // Verifica se a chave atente aos requisitos de criptografia
  // Deve ser chave hexadecimal (números [0-9] e letras de A-F)
  checkKey(key);

  // Caso o IV não seja informado, será criado um aleatoriamente.
  const iv = options.iv
    ? Buffer.from(options.iv, 'hex')
    : randomBytes(ivLength);

  // Define o tamanho da cifra
  const cipherOptions: CipherCCMOptions = {
    authTagLength: DEFAULT_AUTH_TAG_LENGTH,
  };

  // Cria intância de cifra (Cipher) da lib Crypto do NodeJS, com seus parâmetros necessários
  const cipher = createCipheriv(
    algorithm,
    Buffer.from(key, 'hex'),
    iv,
    cipherOptions,
  );

  const start = cipher.update(data); // Crifra a informação

  const final = cipher.final(); // Finaliza a cifra

  return Buffer.concat([iv, start, final]); // Retorna a junção das parte necessária para descriptografar
}

export function decryptData(data: Buffer, options: EncryptionOptions): Buffer {
  const { algorithm, ivLength, key } = options;

  // Verifica se a chave atente aos requisitos de criptografia
  // Deve ser chave hexadecimal (números [0-9] e letras de A-F)
  checkKey(key);

  // Retira do Buffer a parte correspondente ao IV
  const iv = data.slice(0, ivLength);

  // Cria uma instância do Deciher da lib crypto do NodeJS
  const decipher = createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);

  // Retira do Buffer a parte correspondente a informação
  const dataToUse = data.slice(options.ivLength);

  const start = decipher.update(dataToUse); // Descriptografa a informação

  const final = decipher.final(); // Finalizar o decipher

  // Retorna a informação descriptografada em formato binário
  return Buffer.concat([start, final]);
}

import { AppEncryptionTransformer } from './encryption.transformer';

export class NumberEncryptionTransformer extends AppEncryptionTransformer {
  from(value: string): number {
    // Obtem o valor descriptografado, porém em formato string ainda
    const decryptedValue = super.from(value);

    // Converte o o número que está como tipo string para tipo numérico
    // '1.50' -> 1.5
    return parseFloat(decryptedValue);
  }
}

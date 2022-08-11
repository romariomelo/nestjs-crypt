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

    return super.to(value.toISOString());
  }

  from(value: string): Date {
    const decryptedStr = super.from(value);
    if ((decryptedStr ?? null) === null) {
      return;
    }
    return new Date(decryptedStr);
  }
}

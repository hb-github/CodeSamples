import { AbstractControl } from '@angular/forms';
export class ValidationService {
  static required(control) {
    if (
      control.value === undefined ||
      control.value === null ||
      (typeof control.value === 'string' && control.value.trim() === '')
    ) {
      return { required: true };
    }
    return null;
  }

  static numberValidator(control) {
    const reg = /^\d+$/;
    if (typeof control.value !== 'undefined' && reg.test(control.value)) {
      return null;
    } else {
      return { invalidNumber: true };
    }
  }

  static greaterThanZeroValidator(control) {
    const reg = /^\d+$/;
    if (
      typeof control.value !== 'undefined' &&
      reg.test(control.value) &&
      control.value > 0
    ) {
      return null;
    } else {
      return { greaterThanZero: true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (typeof control.value !== 'undefined' && reg.test(control.value)) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static emailFormatValidator(control) {
    // RFC 2822 compliant regex
    if (!control.value) {
      return null;
    }
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (
      typeof control.value !== 'undefined' &&
      reg.test(control.value.trim())
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(control) {
    // {6,15}           - Assert password is between 6 and 15 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    const reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    if (typeof control.value !== 'undefined' && reg.test(control.value)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  static urlValidator(control) {
    const reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
    if (typeof control.value !== 'undefined' && reg.test(control.value)) {
      return null;
    } else {
      return { inValidUrl: true };
    }
  }

  static min(min: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const actValue = control.value
        ? parseInt(control.value.toString().replace(/,/g, ''), 0)
        : 0;
      if (actValue !== undefined && (isNaN(actValue) || actValue < min)) {
        return { min: true };
      }
      return null;
    };
  }

  static max(max: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const actValue = control.value
        ? parseInt(control.value.toString().replace(/,/g, ''), 0)
        : 0;
      if (actValue !== undefined && (isNaN(actValue) || actValue > max)) {
        return { max: true };
      }
      return null;
    };
  }
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator that prevents inputs consisting only of whitespace
 */
export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate empty values, use Validators.required for that
    }
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  };
}

/**
 * Validator that only allows alphabetic characters (A-Z, a-z)
 * NO SPACES, NO NUMBERS, NO SPECIAL CHARACTERS
 * Use for: city, state, previousEmployer
 */
export function alphabeticOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const pattern = /^[A-Za-z]+$/;
    const valid = pattern.test(control.value);
    return valid ? null : { alphabeticOnly: true };
  };
}

/**
 * Validator that only allows alphabetic characters and spaces
 * Use for: full names (e.g., "John Doe")
 */
export function alphaWithSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const pattern = /^[A-Za-z\s]+$/;
    const valid = pattern.test(control.value);
    return valid ? null : { alphaWithSpaces: true };
  };
}

/**
 * Validator for street addresses (alphanumeric with common punctuation)
 * Allows: letters, numbers, spaces, commas, periods, hyphens, apostrophes
 */
export function addressValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const pattern = /^[A-Za-z0-9\s,.\-'/#]+$/;
    const valid = pattern.test(control.value);
    return valid ? null : { invalidAddress: true };
  };
}

/**
 * Validator for text fields that allow alphanumeric with spaces
 * Use for: descriptions, specializations, certifications
 */
export function alphanumericWithSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const pattern = /^[A-Za-z0-9\s,.\-'()&]+$/;
    const valid = pattern.test(control.value);
    return valid ? null : { alphanumericWithSpaces: true };
  };
}

/**
 * Validator for URL fields
 */
export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    try {
      new URL(control.value);
      return null;
    } catch {
      return { invalidUrl: true };
    }
  };
}

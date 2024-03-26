
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function telefonoValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const telefonoRegExp = /^\d{1}\s\d{4}\s\d{4}$/; // Expresión regular para validar el formato de teléfono "x xxxx xxxx"
    const telefonoValido = telefonoRegExp.test(control.value);
    return telefonoValido ? null : { 'telefonoInvalido': true };
  };
}

export function rutValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const rutRegExp = /^[0-9]{7,8}-[0-9kK]$/; // Expresión regular para validar el formato de RUT
    const rutValido = rutRegExp.test(control.value);
    return rutValido ? null : { 'rutInvalido': true };
  };
}

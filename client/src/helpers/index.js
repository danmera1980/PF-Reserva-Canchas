/** @format */

export function validate(input) {
  const hasSpecialCharRegExName = new RegExp(/^[a-zA-Z\s]*$/g);
  const hasSpecialCharRegExLastname = new RegExp(/^[a-zA-Z\s]*$/g);
  const onlyNumbers = new RegExp(/^\d+$/g);
  const emailRegEx = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  let errors = {};
  if (!input.name) {
    errors.name = 'El nombre es requerido!';
  } else if (!hasSpecialCharRegExName.test(input.name)) {
    errors.name = 'El nombre no puede tener numeros o caracteres especiales';
  } else if (!input.lastName) {
    errors.lastName = 'El apellido es requerido!';
  } else if (!hasSpecialCharRegExLastname.test(input.lastName)) {
    errors.lastName =
      'El apellido no puede tener numeros o caracteres especiales';
  } else if (!input.email) {
    errors.email = 'El email es requerido!';
  } else if (!emailRegEx.test(input.email)) {
    errors.email = 'Se requiere un email valido';
  } else if (!input.phoneNumber) {
    errors.phoneNumber = 'El numero de telefono es requerido!';
  } else if (!onlyNumbers.test(input.phoneNumber)) {
    errors.phoneNumber = 'Solo se aceptan numeros';
  } else if (!input.password) {
    errors.password = 'La contraseña es requerida!';
  } else if (!input.password) {
    errors.password = 'La contraseña es requerida!';
  } else if (!input.confirmPassword) {
    errors.confirmPassword = 'La confirmacion de la contraseña es requerida!';
  } else if (input.password !== input.confirmPassword) {
    errors.password = 'No coinciden las contraseñas!';
  }
  return errors;
}

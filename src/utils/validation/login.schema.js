import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string('E-mail inválido')
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: yup
    .string('Senha inválida')
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
});

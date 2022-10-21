import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string('E-mail inválido')
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  senha: yup
    .string('Senha inválida')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatória'),
});

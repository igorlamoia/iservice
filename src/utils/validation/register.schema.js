import * as yup from 'yup';

export const registerSchema = yup.object({
  nickname: yup
    .string('Apelido deve ser uma palavra')
    .min(3, 'Apelido curto demais')
    .required('Apelido é obrigatório'),
  email: yup
    .string('E-mail inválido')
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: yup
    .string('Senha inválida')
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
});

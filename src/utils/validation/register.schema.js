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
  passwordConfirmation: yup
    .string('Senha inválida')
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
  birthDate: yup
    .string('Data de nascimento inválida')
    .required('Data de nascimento é obrigatória'),
});

export const registerSchemaStep2 = yup.object({
  cpf: yup.string('CPF inválido').required('CPF é obrigatório'),
  phone: yup.string('Telefone inválido').required('Telefone é obrigatório'),
  address: yup.string('Endereço inválido').required('Endereço é obrigatório'),
  number: yup.string('Número inválido').required('Número é obrigatório'),
  complement: yup.string('Complemento inválido'),
  neighborhood: yup.string('Bairro inválido').required('Bairro é obrigatório'),
  city: yup.string('Cidade inválida').required('Cidade é obrigatória'),
  state: yup.string('Estado inválido').required('Estado é obrigatório'),
  zipCode: yup.string('CEP inválido').required('CEP é obrigatório'),
});

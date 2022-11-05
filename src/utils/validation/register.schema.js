import * as yup from 'yup';

export function registerSchema(hasAuthUser) {
  return yup.object({
    nickname: yup
      .string('Apelido deve ser uma palavra')
      .min(3, 'Apelido curto demais')
      .required('Apelido é obrigatório'),
    email: yup
      .string('E-mail inválido')
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
    ...(!hasAuthUser && {
      password: yup
        .string('Senha inválida')
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .required('Senha é obrigatória'),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Senhas não conferem')
        .required('Confirmação de senha é obrigatória'),
    }),
  });
}

export const registerSchemaStep2 = yup.object({
  birthDate: yup
    .date()
    .max(new Date(Date.now() - 567648000000), 'Você deve ter mais de 18 anos')
    .required('Data de nascimento é obrigatória'),
  cpf: yup
    .string('CPF inválido')
    .required('CPF é obrigatório')
    .matches(
      /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/,
      'CPF inválido'
    ),
  phone: yup
    .string()
    .required('Celular é obrigatório')
    .matches(
      /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
      'Número de celular inválido.'
    ),
  address: yup.string('Endereço inválido').required('Endereço é obrigatório'),
  number: yup
    .number()
    .typeError('Número inválido')
    .required('Número é obrigatório'),
  complement: yup.string('Complemento inválido'),
  neighborhood: yup.string('Bairro inválido').required('Bairro é obrigatório'),
  city: yup.string('Cidade inválida').required('Cidade é obrigatória'),
  state: yup
    .string('UF inválida')
    .min(2, 'UF inválida')
    .max(2, 'UF inválida')
    .required('UF é obrigatória'),
  zipCode: yup
    .string('CEP inválido')
    .matches(/^[0-9]{5}-[0-9]{3}$/, 'CEP inváido')
    .required('CEP é obrigatório!'),
});

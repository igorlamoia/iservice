import * as yup from 'yup';

export const filterValidationSchema = yup.object({
  horarioAtendimentoInicio: yup
    .number()
    .typeError('Horário inicial do atendimento é obrigatório')
    .min(0, 'Horário inválido')
    .max(1439, 'Horário inválido'),
  horarioAtendimentoFim: yup
    .number()
    .typeError('Horário final do atendimento é obrigatório')
    .min(0, 'Horário inválido')
    .max(1439, 'Horário inválido'),
  cidadeAtendimento: yup.string().required('Cidade é obrigatória'),
  // diasAtendimento: yup
  //   .string()
  //   .typeError('Descrição profissional é obrigatória')
  //   .required('Escolha pelo menos um dia da semana'),
});

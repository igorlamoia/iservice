import * as yup from 'yup';

export const workerValidationSchema = yup.object({
  descricaoProfissional: yup
    .string()
    .typeError('Descrição profissional é obrigatória')
    .required('Descrição profissional é obrigatória')
    .min(10, 'Descrição profissional deve ter no mínimo 10 caracteres')
    .max(300, 'Descrição profissional deve ter no máximo 300 caracteres'),
  horarioAtendimentoInicio: yup
    .number()
    .typeError('Horário inicial do atendimento é obrigatório')
    .required('Horário inicial do atendimento é obrigatório')
    .min(0, 'Horário inválido')
    .max(1439, 'Horário inválido'),
  horarioAtendimentoFim: yup
    .number()
    .typeError('Horário final do atendimento é obrigatório')
    .required('Horário final do atendimento é obrigatório')
    .min(0, 'Horário inválido')
    .max(1439, 'Horário inválido'),
  especialidades: yup
    .array()
    .of(
      yup.object().shape({
        nome: yup
          .string()
          .typeError('Profissão inválida')
          .required('Profissão é obrigatória'),
        descricao: yup
          .string()
          .typeError('Descrição inválida')
          .required('Especialidade é obrigatória'),
        codCategoria: yup
          .string()
          .typeError('Codigo da Categoria inválido')
          .required('Categoria é obrigatória'),
      })
    )
    .min(1, 'Os dados de prestação de serviço devem ser preenchidos')
    .required('Especialidade é obrigatório'),

  diasAtendimento: yup
    .string()
    .typeError('Descrição profissional é obrigatória')
    .required('Escolha pelo menos um dia da semana'),
  cidadesAtendimento: yup
    .array()
    .of(
      yup.object().shape({
        codEstado: yup
          .number()
          .typeError('Estado inválido')
          .required('Estado é obrigatório'),
        nomeCidade: yup.string(),
      })
    )
    .min(1, 'Localização é obrigatória')
    .required('Localização é obrigatória!'),
});

export function codStatusDescricao(status) {
  console.log(status);
  switch (status) {
    case 1:
      return {
        descricao: 'Pendente',
        corMui: 'warning',
      };
    case 2:
      return {
        descricao: 'Aceitada',
        corMui: 'info',
      };
    case 3:
      return {
        descricao: 'Recusada',
        corMui: 'error',
      };
    case 4:
      return {
        descricao: 'Cancelada Prestador',
        corMui: 'error',
      };
    case 5:
      return {
        descricao: 'Cancelada Requisitante',
        corMui: 'error',
      };
    case 6:
      return {
        descricao: 'Finalizada',
        corMui: 'primary',
      };
    default:
      return {
        descricao: 'Status inválido',
        corMui: 'error',
      };
  }
}

export function filtrarOpcoes(demanda) {
  let opcoes = [];
  switch (demanda.codStatus) {
    case 1:
      opcoes = [
        { id: 2, label: 'Aceitar Solicitação' },
        { id: 3, label: 'Recusar Solicitação' },
      ];
      break;
    case 2:
      opcoes = [
        { id: 1, label: 'Voltar para Pendente' },
        { id: 4, label: 'Cancelar Solicitação' },
        { id: 6, label: 'Finalizar Solicitação' },
      ];
      break;
    case 3:
      opcoes = [
        { id: 1, label: 'Voltar para Pendente' },
        { id: 2, label: 'Aceitar Solicitação' },
      ];
      break;
    case 4:
      opcoes = [
        { id: 1, label: 'Voltar para Pendente' },
        { id: 2, label: 'Aceitar Solicitação' },
      ];
      break;
    default:
      break;
  }

  return opcoes;
}

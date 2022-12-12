export function codStatusDescricao(status) {
  if (status == '1') {
    return {
      descricao: 'Pendente',
      corMui: 'warning',
    };
  }
  if (status == '2') {
    return {
      descricao: 'Aceitada',
      corMui: 'info',
    };
  }
  if (status == '3') {
    return {
      descricao: 'Recusada',
      corMui: 'error',
    };
  }
  if (status == '4') {
    return {
      descricao: 'Cancelada Prestador',
      corMui: 'error',
    };
  }
  if (status == '5') {
    return {
      descricao: 'Cancelada Requisitante',
      corMui: 'error',
    };
  }
  if (status == '6') {
    return {
      descricao: 'Finalizada',
      corMui: 'primary',
    };
  }

  return {
    descricao: 'Status inválido',
    corMui: 'error',
  };
}

export function filtrarOpcoes(demanda) {
  let opcoes = [];
  const { codStatus } = demanda;
  if (codStatus == '1') {
    return (opcoes = [
      { id: 2, label: 'Aceitar Solicitação' },
      { id: 3, label: 'Recusar Solicitação' },
    ]);
  }
  if (codStatus == '2') {
    return (opcoes = [
      { id: 1, label: 'Voltar para Pendente' },
      { id: 4, label: 'Cancelar Solicitação' },
      { id: 6, label: 'Finalizar Solicitação' },
    ]);
  }
  if (codStatus == '3') {
    return (opcoes = [
      { id: 1, label: 'Voltar para Pendente' },
      { id: 2, label: 'Aceitar Solicitação' },
    ]);
  }
  if (codStatus == '4') {
    return (opcoes = [
      { id: 1, label: 'Voltar para Pendente' },
      { id: 2, label: 'Aceitar Solicitação' },
    ]);
  }

  return opcoes;
}
export function filtrarOpcoesUsuario(demanda) {
  let opcoes = [];
  const { codStatus } = demanda;
  if (codStatus == '1') {
    return (opcoes = [{ id: 5, label: 'Cancelar Solicitação' }]);
  }

  return opcoes;
}

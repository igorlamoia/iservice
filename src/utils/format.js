export function removeSymbols(value) {
  if (!value) return '';
  return value.replace(/[`\s~!@#$%^&*+=><\-/.)(']/g, '');
}

export function formatarHora(hora) {
  if (!hora) return '';
  if (hora.toString() === 'Invalid Date') {
    return 'Data inválida';
  }
  return hora.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

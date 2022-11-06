export function removeSymbols(value) {
  if (!value) return '';
  return value.replace(/[`\s~!@#$%^&*+=><\-/.)(']/g, '');
}

export function formatarHora(hora) {
  if (!hora) return '';
  if (hora.toString() === 'Invalid Date') {
    return 'Hora inválida';
  }
  return hora.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Recebe uma string (HH:mm) e retorna um número em minutos
 *
 * @param time (string) - HH:mm
 * @returns number
 */
export function convertTimeStringToMinute(time) {
  const [hour, minute] = time.split(':').map(Number);
  const timeInMinutes = hour * 60 + minute;
  return timeInMinutes;
}

/**
 * Recebe um número inteiro de minutos e retorna o padrão HH:mm
 *
 * @param minutesAmount (number)
 * @returns string (HH:mm)
 */
export function convertMinutesToStringTime(minutesAmount) {
  const hour = Math.floor(minutesAmount / 60);
  const minute = minutesAmount % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

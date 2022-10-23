export function removeSymbols(value) {
  if (!value) return '';
  return value.replace(/[`\s~!@#$%^&*+=><\-/.)(']/g, '');
}

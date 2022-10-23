export function isEmptyObject(object) {
  for (let name in object) return false;
  return true;
}

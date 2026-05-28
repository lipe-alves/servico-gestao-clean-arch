function normalizarEspacos(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

export default normalizarEspacos;
export { normalizarEspacos };

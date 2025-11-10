function ehNumerico(valor: string) {
    return /^[\d\.]+$/.test(valor);
}

export default ehNumerico;
export { ehNumerico };
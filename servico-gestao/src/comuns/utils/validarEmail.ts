function validarEmail(email: string): boolean {
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
}

export default validarEmail;
export { validarEmail };
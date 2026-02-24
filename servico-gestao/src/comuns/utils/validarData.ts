function validarData(date: any): date is Date {
    if (!(date instanceof Date)) date = new Date(date);
    return date instanceof Date && !isNaN(date.getTime());
}

export default validarData;
export { validarData };
export const removeSQLInjection = (text:string) => {
    text = text.replace(/'/g, "");
    text = text.replace(/"/g, "");
    return text.replace(/\\/g, "");
}
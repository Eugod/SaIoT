export function calculaConsumo(potencia, horas) {
    let resultado;

    if (horas <= 1) {
        resultado = (potencia / 1000) * 1;

        return resultado;
    } else {
        resultado = (potencia / 1000) * horas;

        return resultado;
    }
}
export function FloatToCurrency(number) {
    return parseFloat(number).toLocaleString('pt-br', {minimumFractionDigits: 2});
}
export default function FloatToCurrency(number, decPlaces = 2, decSep = ',', thouSep = '.') {
    return parseFloat(number).toLocaleString('pt-br', {minimumFractionDigits: 2});
}
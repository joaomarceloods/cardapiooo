const formatMoney = (
  value: string,
  lang: string = 'en-US',
  currency: string = 'BRL'
) =>
  new Intl.NumberFormat(lang, { style: 'currency', currency }).format(
    parseFloat(value)
  )

export default formatMoney

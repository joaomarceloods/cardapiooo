const formatMoney = (
  value: string,
  lang: string = 'pt-BR',
  currency: string = 'BRL'
) =>
  new Intl.NumberFormat(lang, { style: 'currency', currency }).format(
    parseInt(value) / 100
  )

export default formatMoney

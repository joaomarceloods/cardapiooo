const formatMoney = (value: string) =>
  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export default formatMoney

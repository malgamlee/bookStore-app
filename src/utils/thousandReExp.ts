const ThousandReExp = (num: number) => {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

export default ThousandReExp

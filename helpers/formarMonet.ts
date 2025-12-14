export const formatMoney = (value: string | number) => {
  const number = Number(value);
  return isNaN(number) ? '$ 0' : `$ ${number.toLocaleString('es-CO')}`;
};

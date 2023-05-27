export const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }
) => {
  return new Intl.NumberFormat('en-US', options).format(value);
};

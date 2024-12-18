export const convertCurrency = (number) => {
  return Number(number)
    .toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
    .replace("VND", "");
};

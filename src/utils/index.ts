export const formatPrice = (price: number) => {
  return price
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace(/\s/g, "");
};

export const calculateTotalPrice = (
  products: { id: number; price: number }[],
) => {
  return products.reduce((acc, product) => {
    const numericPrice = Number(product.price);
    const validPrice =
      !isNaN(numericPrice) && numericPrice > 0 ? numericPrice : 0;
    return acc + validPrice;
  }, 0);
};

export const calculateTotalPriceWithDiscount = (
  products: { id: number; price: number }[],
  discount: number,
) => {
  if (discount >= 100) {
    return 0;
  }

  const basePrice = calculateTotalPrice(products);

  if (discount < 0 || typeof discount !== "number" || isNaN(discount)) {
    return basePrice;
  }

  return basePrice * (1 - discount / 100);
};

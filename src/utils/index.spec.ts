import {
  formatPrice,
  calculateTotalPrice,
  calculateTotalPriceWithDiscount,
} from ".";

// stub de produtos
const products = [
  {
    id: 1,
    name: "Produto 1",
    price: 10,
  },
  {
    id: 2,
    name: "Produto 2",
    price: 20,
  },
  {
    id: 3,
    name: "Produto 3",
    price: 30,
  },
  {
    id: 4,
    name: "Produto 4",
    price: 40,
  },
];

const mockCalculateTotalPrice = jest.fn(calculateTotalPrice);
const mockCalculateTotalPriceWithDiscount = jest.fn(
  calculateTotalPriceWithDiscount,
);

describe("funções unitárias", () => {
  test("deve formatar o preço corretamente", () => {
    expect(formatPrice(10)).toEqual("R$10,00");
  });
  test("deve calcular o preço total corretamente", () => {
    expect(mockCalculateTotalPrice(products)).toBe(100);
  });
  test("deve calcular o preço total com desconto corretamente", () => {
    expect(mockCalculateTotalPriceWithDiscount(products, 10)).toBe(90);
    expect(mockCalculateTotalPriceWithDiscount).toHaveBeenCalledWith(
      products,
      10,
    );
  });
});

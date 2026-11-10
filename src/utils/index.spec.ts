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
  test("deve calcular o preço ao fornecer 200% de desconto", () => {
    expect(mockCalculateTotalPriceWithDiscount(products, 200)).toBe(0);
    expect(mockCalculateTotalPriceWithDiscount).toHaveBeenCalledWith(
      products,
      200,
    );
  });
  test("deve calcular o preço total ao inserir um desconto negativo", () => {
    expect(mockCalculateTotalPriceWithDiscount(products, -10)).toBe(100);
    expect(mockCalculateTotalPriceWithDiscount).toHaveBeenCalledWith(
      products,
      -10,
    );
  });
  test("deve calcular o preço total ao inserir desconto 0", () => {
    expect(mockCalculateTotalPriceWithDiscount(products, 0)).toBe(100);
    expect(mockCalculateTotalPriceWithDiscount).toHaveBeenCalledWith(
      products,
      0,
    );
  });
  test("deve calcular o preço total ao inserir um string abcd como desconto", () => {
    //@ts-ignore
    expect(mockCalculateTotalPriceWithDiscount(products, "abc")).toBe(100);
    expect(mockCalculateTotalPriceWithDiscount).toHaveBeenCalledWith(
      products,
      "abc",
    );
  });
  test("deve retornar 0 quando o carrinho estiver vazio.", () => {
    expect(mockCalculateTotalPrice([])).toBe(0);
  });
  test("deve retornar 0 quando um produto tiver 100% de desconto.", () => {
    expect(mockCalculateTotalPriceWithDiscount(products, 100)).toBe(0);
    expect(mockCalculateTotalPriceWithDiscount).toHaveBeenCalledWith(
      products,
      100,
    );
  });
  test("deve ignorar produtos com preço negativo", () => {
    const result = calculateTotalPrice([
      { id: 1, price: -20 },
      { id: 2, price: 70 },
    ]);
    expect(result).toBe(70);
  });

  test("deve calcular corretamente se os preços forem strings numéricas", () => {
    const products = [
      { id: 1, price: "30" as unknown as number },
      { id: 2, price: "20" as unknown as number },
    ];
    const result = calculateTotalPriceWithDiscount(products, 0);
    expect(result).toBe(50);
  });
});

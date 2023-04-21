let stocks = [
  {
    id: 1,
    products: [
      { size: 230, stock: 19 },
      { size: 235, stock: 23 },
      { size: 240, stock: 30 },
      { size: 245, stock: 14 },
      { size: 250, stock: 20 },
      { size: 255, stock: 37 },
      { size: 260, stock: 0 },
      { size: 265, stock: 10 },
      { size: 270, stock: 2 },
      { size: 275, stock: 1 },
      { size: 280, stock: 16 },
      { size: 285, stock: 28 },
    ],
  },
  {
    id: 2,
    products: [
      { size: 230, stock: 19 },
      { size: 235, stock: 23 },
      { size: 240, stock: 30 },
      { size: 245, stock: 14 },
      { size: 250, stock: 20 },
      { size: 255, stock: 37 },
      { size: 260, stock: 0 },
      { size: 265, stock: 10 },
      { size: 270, stock: 2 },
      { size: 275, stock: 1 },
      { size: 280, stock: 16 },
      { size: 285, stock: 28 },
    ],
  },
  {
    id: 3,
    products: [
      { size: 230, stock: 19 },
      { size: 235, stock: 23 },
      { size: 240, stock: 30 },
      { size: 245, stock: 14 },
      { size: 250, stock: 20 },
      { size: 255, stock: 37 },
      { size: 260, stock: 0 },
      { size: 265, stock: 10 },
      { size: 270, stock: 2 },
      { size: 275, stock: 1 },
      { size: 280, stock: 16 },
      { size: 285, stock: 28 },
    ],
  },
  {
    id: 4,
    products: [
      { size: 230, stock: 19 },
      { size: 235, stock: 23 },
      { size: 240, stock: 30 },
      { size: 245, stock: 14 },
      { size: 250, stock: 20 },
      { size: 255, stock: 37 },
      { size: 260, stock: 0 },
      { size: 265, stock: 10 },
      { size: 270, stock: 2 },
      { size: 275, stock: 1 },
      { size: 280, stock: 16 },
      { size: 285, stock: 28 },
    ],
  },
  {
    id: 5,
    products: [
      { size: 230, stock: 19 },
      { size: 235, stock: 23 },
      { size: 240, stock: 30 },
      { size: 245, stock: 14 },
      { size: 250, stock: 20 },
      { size: 255, stock: 37 },
      { size: 260, stock: 0 },
      { size: 265, stock: 10 },
      { size: 270, stock: 2 },
      { size: 275, stock: 1 },
      { size: 280, stock: 16 },
      { size: 285, stock: 28 },
    ],
  },
  {
    id: 6,
    products: [
      { size: 230, stock: 19 },
      { size: 235, stock: 23 },
      { size: 240, stock: 30 },
      { size: 245, stock: 14 },
      { size: 250, stock: 20 },
      { size: 255, stock: 37 },
      { size: 260, stock: 0 },
      { size: 265, stock: 10 },
      { size: 270, stock: 2 },
      { size: 275, stock: 1 },
      { size: 280, stock: 16 },
      { size: 285, stock: 28 },
    ],
  },
  {
    id: 7,
    products: [
      { size: 230, stock: 19 },
      { size: 235, stock: 23 },
      { size: 240, stock: 30 },
      { size: 245, stock: 14 },
      { size: 250, stock: 20 },
      { size: 255, stock: 37 },
      { size: 260, stock: 0 },
      { size: 265, stock: 10 },
      { size: 270, stock: 2 },
      { size: 275, stock: 1 },
      { size: 280, stock: 16 },
      { size: 285, stock: 28 },
    ],
  },
  {
    id: 8,
    products: [
      { size: 230, stock: 19 },
      { size: 235, stock: 23 },
      { size: 240, stock: 30 },
      { size: 245, stock: 14 },
      { size: 250, stock: 20 },
      { size: 255, stock: 37 },
      { size: 260, stock: 0 },
      { size: 265, stock: 10 },
      { size: 270, stock: 2 },
      { size: 275, stock: 1 },
      { size: 280, stock: 16 },
      { size: 285, stock: 28 },
    ],
  },
  {
    id: 9,
    products: [
      { size: 230, stock: 19 },
      { size: 235, stock: 23 },
      { size: 240, stock: 30 },
      { size: 245, stock: 14 },
      { size: 250, stock: 20 },
      { size: 255, stock: 37 },
      { size: 260, stock: 0 },
      { size: 265, stock: 10 },
      { size: 270, stock: 2 },
      { size: 275, stock: 1 },
      { size: 280, stock: 16 },
      { size: 285, stock: 28 },
    ],
  },
  {
    id: 10,
    products: [
      { size: 230, stock: 19 },
      { size: 235, stock: 23 },
      { size: 240, stock: 30 },
      { size: 245, stock: 14 },
      { size: 250, stock: 20 },
      { size: 255, stock: 37 },
      { size: 260, stock: 0 },
      { size: 265, stock: 10 },
      { size: 270, stock: 2 },
      { size: 275, stock: 1 },
      { size: 280, stock: 16 },
      { size: 285, stock: 28 },
    ],
  },
];

const getStocks = () => stocks;

const findStock = (id) => stocks.find((stock) => stock.id === id).products;

const findDetailStock = ({ id, selectedSize }) => findStock(id).find((stock) => stock.size === selectedSize);

const changeStock = ({ id, selectedSize, quantity }) => {
  console.log({ id, selectedSize, quantity });
  stocks = stocks.map((stock) =>
    stock.id === id
      ? {
          ...stock,
          products: stock.products.map((product) =>
            product.size === selectedSize ? { ...product, stock: product.stock - quantity } : product
          ),
        }
      : stock
  );
};

module.exports = { getStocks, findStock, findDetailStock, changeStock };
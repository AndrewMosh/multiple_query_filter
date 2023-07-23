const express = require("express");
const app = express();
app.use(express.json());

const Cerebro = require("cerebro");
const cerebro = new Cerebro();

app.get("/search", (req, res) => {
  const query = req.query.q; // Получите поисковый запрос из параметров URL
  const results = cerebro.search(query); // Выполните поиск с помощью Cerebro

  res.status(200).json(results); // Отправьте полученные результаты обратно клиенту
});

// Пример данных
const products = [
  { id: 1, name: "Product 1", price: 10, category: "Category 1" },
  { id: 2, name: "Product 2", price: 20, category: "Category 2" },
  { id: 3, name: "Product 3", price: 30, category: "Category 1" },
  { id: 4, name: "Product 4", price: 40, category: "Category 2" },
  { id: 5, name: "Product 5", price: 50, category: "Category 3" },
];

// Маршрут для получения продуктов с примененными фильтрами
app.get("/products", (req, res) => {
  // Извлекаем фильтры из запроса
  const { category, priceMin, priceMax } = req.query;

  // Фильтрация продуктов по категории
  let filteredProducts = products;
  if (category) {
    filteredProducts = filteredProducts.filter((product) =>
      product.category.includes(category)
    );
  }

  // Фильтрация продуктов по цене
  if (priceMin) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= parseInt(priceMin)
    );
  }
  if (priceMax) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= parseInt(priceMax)
    );
  }

  res.json(filteredProducts);
});

app.listen(3000, () => {
  console.log("API server is listening on port 3000");
});

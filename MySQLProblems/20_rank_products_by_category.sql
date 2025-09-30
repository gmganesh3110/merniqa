-- Problem 20: Rank products by sales within category
-- Tables: products(prod_id INT, name VARCHAR(100), category VARCHAR(50));
--         order_items(order_id INT, prod_id INT, qty INT);

-- Setup
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  prod_id  INT PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL
);
CREATE TABLE order_items (
  order_id INT NOT NULL,
  prod_id  INT NOT NULL,
  qty      INT NOT NULL,
  PRIMARY KEY (order_id, prod_id),
  FOREIGN KEY (prod_id) REFERENCES products(prod_id)
);
INSERT INTO products VALUES
  (1,'Phone','Electronics'),(2,'Laptop','Electronics'),(3,'Mouse','Electronics'),
  (4,'Shirt','Apparel'),(5,'Jeans','Apparel');
INSERT INTO order_items VALUES
  (100,1,5),(101,1,3),(102,2,2),(103,3,10),(200,4,4),(201,5,6),(202,4,3);

-- Solution
WITH totals AS (
  SELECT p.category, p.prod_id, p.name, SUM(oi.qty) AS total_qty
  FROM products p
  LEFT JOIN order_items oi ON oi.prod_id = p.prod_id
  GROUP BY p.category, p.prod_id, p.name
), ranked AS (
  SELECT category, prod_id, name, total_qty,
         DENSE_RANK() OVER (PARTITION BY category ORDER BY total_qty DESC) AS rnk
  FROM totals
)
SELECT * FROM ranked
ORDER BY category, rnk, name;



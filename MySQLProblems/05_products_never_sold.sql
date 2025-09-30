-- Problem 5: Products never sold
-- Tables: products(prod_id INT, name VARCHAR(100)), order_items(order_id INT, prod_id INT, qty INT)

-- Setup (DDL + sample data)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  prod_id INT PRIMARY KEY,
  name    VARCHAR(100) NOT NULL
);
CREATE TABLE order_items (
  order_id INT NOT NULL,
  prod_id  INT NOT NULL,
  qty      INT NOT NULL,
  PRIMARY KEY (order_id, prod_id),
  FOREIGN KEY (prod_id) REFERENCES products(prod_id)
);
INSERT INTO products (prod_id, name) VALUES
  (10, 'Phone'), (11, 'Laptop'), (12, 'Mouse'), (13, 'Keyboard');
INSERT INTO order_items (order_id, prod_id, qty) VALUES
  (1001, 10, 2), (1001, 12, 1), (1002, 10, 1), (1003, 11, 3);

-- Solution:
SELECT p.prod_id, p.name
FROM products p
LEFT JOIN order_items oi ON oi.prod_id = p.prod_id
WHERE oi.prod_id IS NULL
ORDER BY p.prod_id;



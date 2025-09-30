-- Problem 28: Advanced JOIN puzzles – find customers who bought all products in a set
-- Tables: customers(cust_id INT, name VARCHAR(100)); order_items(order_id INT, cust_id INT, prod_id INT)
-- Given a target set of product IDs, return customers who purchased ALL of them.

-- Setup
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
  cust_id INT PRIMARY KEY,
  name    VARCHAR(100) NOT NULL
);
CREATE TABLE order_items (
  order_id INT NOT NULL,
  cust_id  INT NOT NULL,
  prod_id  INT NOT NULL,
  PRIMARY KEY (order_id, prod_id),
  KEY idx_cust_prod (cust_id, prod_id)
);
INSERT INTO customers VALUES (1,'Acme'),(2,'Globex'),(3,'Umbrella');
INSERT INTO order_items VALUES
  (100,1,10),(100,1,11),(101,1,12),
  (200,2,10),(201,2,11), -- missing 12
  (300,3,10),(301,3,12); -- missing 11

-- Solution: customers who bought all of {10,11,12}
WITH target AS (
  SELECT 10 AS prod_id UNION ALL SELECT 11 UNION ALL SELECT 12
), bought AS (
  SELECT oi.cust_id, oi.prod_id
  FROM order_items oi
  JOIN target t ON t.prod_id = oi.prod_id
  GROUP BY oi.cust_id, oi.prod_id
), counts AS (
  SELECT b.cust_id, COUNT(*) AS cnt
  FROM bought b
  GROUP BY b.cust_id
)
SELECT c.cust_id, c.name
FROM counts x
JOIN customers c ON c.cust_id = x.cust_id
WHERE x.cnt = (SELECT COUNT(*) FROM target);



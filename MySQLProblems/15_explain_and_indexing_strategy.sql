-- Problem 15: Use EXPLAIN to optimize a slow query with indexing strategy
-- Tables: orders(order_id INT, cust_id INT, order_date DATE), order_items(order_id INT, prod_id INT, qty INT)

-- Setup
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  order_id   INT PRIMARY KEY,
  cust_id    INT NOT NULL,
  order_date DATE NOT NULL,
  KEY idx_cust_date (cust_id, order_date)
);
CREATE TABLE order_items (
  order_id INT NOT NULL,
  prod_id  INT NOT NULL,
  qty      INT NOT NULL,
  PRIMARY KEY (order_id, prod_id),
  KEY idx_prod (prod_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
INSERT INTO orders VALUES
  (1,1,'2025-01-01'),(2,1,'2025-01-05'),(3,2,'2025-01-07'),(4,3,'2025-01-10');
INSERT INTO order_items VALUES
  (1,10,2),(1,11,1),(2,10,1),(3,12,4),(4,11,2);

-- Slow pattern: without indexes, filtering by cust_id/date and joining items
-- Optimized with composite index idx_cust_date and PK(order_id, prod_id) for join.
EXPLAIN
SELECT o.order_id, o.order_date, SUM(oi.qty) AS total_qty
FROM orders o
JOIN order_items oi ON oi.order_id = o.order_id
WHERE o.cust_id = 1 AND o.order_date BETWEEN '2025-01-01' AND '2025-01-31'
GROUP BY o.order_id, o.order_date
ORDER BY o.order_date;



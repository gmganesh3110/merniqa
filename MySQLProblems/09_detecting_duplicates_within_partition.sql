-- Problem 9: Detect duplicates per (cust_id, order_date) and keep only latest by order_id
-- Tables: orders(order_id INT, cust_id INT, order_date DATE, updated_at DATETIME)

-- Setup (DDL + sample data)
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  order_id   INT PRIMARY KEY,
  cust_id    INT NOT NULL,
  order_date DATE NOT NULL,
  updated_at DATETIME NOT NULL
);
INSERT INTO orders (order_id, cust_id, order_date, updated_at) VALUES
  (1001, 1, '2025-01-01', '2025-01-01 10:00:00'),
  (1002, 1, '2025-01-01', '2025-01-01 12:00:00'),
  (1003, 1, '2025-01-02', '2025-01-02 09:00:00'),
  (2001, 2, '2025-01-01', '2025-01-01 11:00:00');

-- Solution: flag duplicates using ROW_NUMBER and then delete or select
WITH rn AS (
  SELECT order_id, cust_id, order_date, updated_at,
         ROW_NUMBER() OVER (PARTITION BY cust_id, order_date ORDER BY updated_at DESC, order_id DESC) AS rn
  FROM orders
)
SELECT * FROM rn WHERE rn > 1; -- These are duplicates to remove

-- To delete duplicates (cautious):
-- DELETE o FROM orders o
-- JOIN rn ON rn.order_id = o.order_id
-- WHERE rn.rn > 1;



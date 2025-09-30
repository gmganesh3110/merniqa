-- Problem 3: Customers without orders in the last 90 days
-- Tables: customers(cust_id INT, name VARCHAR(100)), orders(order_id INT, cust_id INT, order_date DATE)

-- Setup (DDL + sample data)
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
  cust_id INT PRIMARY KEY,
  name    VARCHAR(100) NOT NULL
);
CREATE TABLE orders (
  order_id   INT PRIMARY KEY,
  cust_id    INT NOT NULL,
  order_date DATE NOT NULL,
  FOREIGN KEY (cust_id) REFERENCES customers(cust_id)
);
INSERT INTO customers (cust_id, name) VALUES
  (1, 'Acme'), (2, 'Globex'), (3, 'Umbrella'), (4, 'Initech');
INSERT INTO orders (order_id, cust_id, order_date) VALUES
  (101, 1, CURRENT_DATE - INTERVAL 10 DAY),
  (102, 1, CURRENT_DATE - INTERVAL 40 DAY),
  (201, 2, CURRENT_DATE - INTERVAL 120 DAY);

-- Solution:
SELECT c.cust_id, c.name
FROM customers c
LEFT JOIN orders o
  ON o.cust_id = c.cust_id
 AND o.order_date >= (CURRENT_DATE - INTERVAL 90 DAY)
WHERE o.order_id IS NULL
ORDER BY c.cust_id;



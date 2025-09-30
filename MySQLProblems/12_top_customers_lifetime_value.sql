-- Problem 12: Top customers by lifetime value (LTV)
-- Tables: customers(cust_id INT, name VARCHAR(100)); payments(pay_id INT, cust_id INT, amount DECIMAL(10,2), paid_at DATETIME)

-- Setup
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
  cust_id INT PRIMARY KEY,
  name    VARCHAR(100) NOT NULL
);
CREATE TABLE payments (
  pay_id  INT PRIMARY KEY,
  cust_id INT NOT NULL,
  amount  DECIMAL(10,2) NOT NULL,
  paid_at DATETIME NOT NULL,
  FOREIGN KEY (cust_id) REFERENCES customers(cust_id)
);
INSERT INTO customers VALUES (1,'Acme'),(2,'Globex'),(3,'Stark');
INSERT INTO payments VALUES
  (1,1,200.00,'2025-01-01 10:00:00'),
  (2,1,150.00,'2025-02-01 10:00:00'),
  (3,2,500.00,'2025-01-15 09:00:00'),
  (4,3,50.00,'2025-01-20 12:00:00');

-- Solution
SELECT c.cust_id, c.name, SUM(p.amount) AS ltv
FROM customers c
LEFT JOIN payments p ON p.cust_id = c.cust_id
GROUP BY c.cust_id, c.name
ORDER BY ltv DESC NULLS LAST, c.cust_id;



-- Problem 4: Running total of daily sales per store
-- Tables: sales(store_id INT, sale_date DATE, amount DECIMAL(10,2))

-- Setup (DDL + sample data)
DROP TABLE IF EXISTS sales;
CREATE TABLE sales (
  store_id  INT NOT NULL,
  sale_date DATE NOT NULL,
  amount    DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (store_id, sale_date)
);
INSERT INTO sales (store_id, sale_date, amount) VALUES
  (1, '2025-01-01', 100.00),
  (1, '2025-01-02', 150.00),
  (1, '2025-01-05',  80.00),
  (2, '2025-01-01', 200.00),
  (2, '2025-01-03',  50.00);

-- Solution (window function):
SELECT store_id, sale_date, amount,
       SUM(amount) OVER (PARTITION BY store_id ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total
FROM sales
ORDER BY store_id, sale_date;



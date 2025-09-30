-- Problem 7: 90th percentile of daily sales per store
-- Table: sales(store_id INT, sale_date DATE, amount DECIMAL(10,2))

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
  (1, '2025-01-03', 300.00),
  (1, '2025-01-04',  75.00),
  (1, '2025-01-05', 500.00),
  (2, '2025-01-01', 200.00),
  (2, '2025-01-05',  50.00);

-- Solution (MySQL 8+ using PERCENTILE_CONT window function is not supported yet in MySQL 8 GA;
-- emulate with NTILE as an approximation or use window ordering):
WITH ordered AS (
  SELECT store_id, sale_date, amount,
         NTILE(10) OVER (PARTITION BY store_id ORDER BY amount) AS decile
  FROM sales
)
SELECT store_id, MIN(amount) AS approx_p90
FROM ordered
WHERE decile = 9 OR decile = 10
GROUP BY store_id;



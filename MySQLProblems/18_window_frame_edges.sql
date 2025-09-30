-- Problem 18: Window frame edges – 7-day moving average of sales
-- Table: sales(store_id INT, sale_date DATE, amount DECIMAL(10,2))

-- Setup
DROP TABLE IF EXISTS sales;
CREATE TABLE sales (
  store_id  INT NOT NULL,
  sale_date DATE NOT NULL,
  amount    DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (store_id, sale_date)
);
INSERT INTO sales VALUES
  (1,'2025-01-01',100),(1,'2025-01-02',110),(1,'2025-01-03',90),(1,'2025-01-04',120),
  (1,'2025-01-05',80),(1,'2025-01-06',150),(1,'2025-01-07',130),(1,'2025-01-08',140);

-- Solution: ROWS frame (last 6 days + current)
SELECT store_id, sale_date, amount,
       ROUND(AVG(amount) OVER (
         PARTITION BY store_id ORDER BY sale_date
         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ), 2) AS ma7
FROM sales
ORDER BY store_id, sale_date;



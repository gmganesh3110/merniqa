-- Problem 24: Materialized daily revenue aggregate with refresh
-- Tables: payments(pay_id INT, paid_at DATETIME, amount DECIMAL(10,2))
--         daily_revenue(day DATE PRIMARY KEY, total DECIMAL(12,2))

-- Setup
DROP TABLE IF EXISTS daily_revenue;
DROP TABLE IF EXISTS payments;
CREATE TABLE payments (
  pay_id  INT PRIMARY KEY,
  paid_at DATETIME NOT NULL,
  amount  DECIMAL(10,2) NOT NULL
);
CREATE TABLE daily_revenue (
  day   DATE PRIMARY KEY,
  total DECIMAL(12,2) NOT NULL
);
INSERT INTO payments VALUES
  (1,'2025-01-01 10:00:00',100.00),
  (2,'2025-01-01 12:00:00',50.00),
  (3,'2025-01-02 09:00:00',75.00);

-- Refresh logic (full refresh example)
REPLACE INTO daily_revenue(day, total)
SELECT DATE(paid_at) AS day, SUM(amount) AS total
FROM payments
GROUP BY DATE(paid_at);

SELECT * FROM daily_revenue ORDER BY day;



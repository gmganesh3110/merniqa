-- Problem 8: Month-over-month revenue growth per product
-- Tables: revenue(prod_id INT, month DATE, amount DECIMAL(10,2)) -- month is first day of month

-- Setup (DDL + sample data)
DROP TABLE IF EXISTS revenue;
CREATE TABLE revenue (
  prod_id INT NOT NULL,
  month   DATE NOT NULL,
  amount  DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (prod_id, month)
);
INSERT INTO revenue (prod_id, month, amount) VALUES
  (1, '2025-01-01', 1000.00), (1, '2025-02-01', 1200.00), (1, '2025-03-01', 1500.00),
  (2, '2025-01-01',  800.00), (2, '2025-02-01',  600.00), (2, '2025-03-01',  900.00);

-- Solution:
WITH agg AS (
  SELECT prod_id, month, SUM(amount) AS amt
  FROM revenue
  GROUP BY prod_id, month
), lagged AS (
  SELECT prod_id, month, amt,
         LAG(amt) OVER (PARTITION BY prod_id ORDER BY month) AS prev_amt
  FROM agg
)
SELECT prod_id, month, amt, prev_amt,
       CASE WHEN prev_amt IS NULL OR prev_amt=0 THEN NULL
            ELSE ROUND((amt - prev_amt)/prev_amt*100, 2) END AS mom_growth_pct
FROM lagged
ORDER BY prod_id, month;



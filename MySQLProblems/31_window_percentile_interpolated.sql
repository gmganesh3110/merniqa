-- Problem 31: Approximated percentile with interpolation (p=0.9) per group
-- Table: sales(store_id INT, amount DECIMAL(10,2))
-- MySQL lacks PERCENTILE_CONT; emulate via ordered ranks and interpolation.

-- Setup
DROP TABLE IF EXISTS sales;
CREATE TABLE sales (
  store_id INT NOT NULL,
  amount   DECIMAL(10,2) NOT NULL,
  id INT AUTO_INCREMENT PRIMARY KEY
);
INSERT INTO sales(store_id, amount) VALUES
  (1,100),(1,150),(1,300),(1,75),(1,500),(1,250),
  (2,200),(2,50),(2,400),(2,350);

-- Solution (discrete approx via NTILE; for interpolation, join neighbors)
WITH ordered AS (
  SELECT store_id, amount,
         ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY amount) AS rn,
         COUNT(*)    OVER (PARTITION BY store_id) AS cnt
  FROM sales
), target AS (
  SELECT store_id,
         0.9 AS p,
         (cnt - 1) * 0.9 + 1 AS pos,
         FLOOR((cnt - 1) * 0.9 + 1) AS lower_pos,
         CEIL((cnt - 1) * 0.9 + 1)  AS upper_pos,
         cnt
  FROM (SELECT DISTINCT store_id, cnt FROM ordered) t
), joined AS (
  SELECT t.store_id, t.p, t.pos, t.lower_pos, t.upper_pos, t.cnt,
         o1.amount AS lower_val,
         o2.amount AS upper_val
  FROM target t
  LEFT JOIN ordered o1 ON o1.store_id=t.store_id AND o1.rn=t.lower_pos
  LEFT JOIN ordered o2 ON o2.store_id=t.store_id AND o2.rn=t.upper_pos
)
SELECT store_id,
       CASE WHEN lower_pos=upper_pos THEN lower_val
            ELSE lower_val + (pos - lower_pos) * (upper_val - lower_val) END AS p90
FROM joined
ORDER BY store_id;



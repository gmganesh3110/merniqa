-- Problem 23: Slowly Changing Dimension (SCD) Type 2 for customers
-- Staging: stg_customers(cust_id INT, name VARCHAR(100), city VARCHAR(100))
-- Dimension: dim_customer(sk INT, cust_id INT, name VARCHAR(100), city VARCHAR(100),
--                         effective_from DATE, effective_to DATE, is_current TINYINT)

-- Setup
DROP TABLE IF EXISTS stg_customers;
DROP TABLE IF EXISTS dim_customer;
CREATE TABLE stg_customers (
  cust_id INT PRIMARY KEY,
  name    VARCHAR(100),
  city    VARCHAR(100)
);
CREATE TABLE dim_customer (
  sk INT AUTO_INCREMENT PRIMARY KEY,
  cust_id INT NOT NULL,
  name    VARCHAR(100),
  city    VARCHAR(100),
  effective_from DATE NOT NULL,
  effective_to   DATE,
  is_current     TINYINT(1) NOT NULL DEFAULT 1,
  KEY idx_cust_current (cust_id, is_current)
);
INSERT INTO dim_customer(cust_id, name, city, effective_from, effective_to, is_current)
VALUES (1,'Acme','NYC','2025-01-01',NULL,1);
INSERT INTO stg_customers VALUES (1,'Acme Inc','SF'),(2,'Globex','LA');

-- Solution: upsert SCD2 for today's snapshot
SET @today = CURRENT_DATE;
-- Close old versions where data changed
UPDATE dim_customer d
JOIN stg_customers s ON s.cust_id = d.cust_id AND d.is_current=1
SET d.effective_to = @today - INTERVAL 1 DAY,
    d.is_current = 0
WHERE (COALESCE(d.name,'') <> COALESCE(s.name,'') OR COALESCE(d.city,'') <> COALESCE(s.city,''));

-- Insert new versions for changed or new customers
INSERT INTO dim_customer(cust_id, name, city, effective_from, effective_to, is_current)
SELECT s.cust_id, s.name, s.city, @today, NULL, 1
FROM stg_customers s
LEFT JOIN dim_customer d ON d.cust_id=s.cust_id AND d.is_current=1
WHERE d.cust_id IS NULL;

-- Current dimension view
SELECT * FROM dim_customer WHERE is_current=1 ORDER BY cust_id;



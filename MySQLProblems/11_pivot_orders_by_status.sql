-- Problem 11: Pivot orders by status per day
-- Table: orders(order_id INT, order_date DATE, status ENUM('NEW','PAID','CANCELLED'))
-- Goal: For each order_date, show counts per status as columns.

-- Setup
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  order_id   INT PRIMARY KEY,
  order_date DATE NOT NULL,
  status     ENUM('NEW','PAID','CANCELLED') NOT NULL
);
INSERT INTO orders VALUES
  (1,'2025-01-01','NEW'),(2,'2025-01-01','PAID'),(3,'2025-01-01','PAID'),
  (4,'2025-01-02','CANCELLED'),(5,'2025-01-02','NEW'),(6,'2025-01-02','NEW');

-- Solution (manual pivot with conditional aggregation):
SELECT order_date,
       SUM(status='NEW')       AS new_count,
       SUM(status='PAID')      AS paid_count,
       SUM(status='CANCELLED') AS cancelled_count
FROM orders
GROUP BY order_date
ORDER BY order_date;



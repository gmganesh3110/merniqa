-- Problem 34: JSON aggregation – orders to array of line objects per order
-- Tables: orders(order_id INT PK), order_items(order_id INT, prod_id INT, qty INT)

-- Setup
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (order_id INT PRIMARY KEY);
CREATE TABLE order_items (order_id INT, prod_id INT, qty INT);
INSERT INTO orders VALUES (1),(2);
INSERT INTO order_items VALUES (1,100,2),(1,101,1),(2,200,3);

-- Solution: JSON_ARRAYAGG of JSON_OBJECT per order
SELECT o.order_id,
       JSON_ARRAYAGG(JSON_OBJECT('prod_id', oi.prod_id, 'qty', oi.qty) ORDER BY oi.prod_id) AS items
FROM orders o
LEFT JOIN order_items oi ON oi.order_id = o.order_id
GROUP BY o.order_id
ORDER BY o.order_id;



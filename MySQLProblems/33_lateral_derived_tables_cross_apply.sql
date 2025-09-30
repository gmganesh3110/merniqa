-- Problem 33: Lateral derived tables emulation
-- MySQL doesn't have CROSS APPLY; emulate using correlated subqueries or JOINs on derived tables
-- Tables: orders(order_id INT, cust_id INT); order_items(order_id INT, prod_id INT, qty INT)

-- Setup
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (order_id INT PRIMARY KEY, cust_id INT);
CREATE TABLE order_items (order_id INT, prod_id INT, qty INT, PRIMARY KEY(order_id, prod_id));
INSERT INTO orders VALUES (1,10),(2,10),(3,11);
INSERT INTO order_items VALUES (1,100,2),(1,101,1),(2,100,5),(3,102,3);

-- Task: For each order, pick the top 1 item by qty (like CROSS APPLY (SELECT ... ORDER BY qty DESC LIMIT 1))
SELECT o.order_id,
       (SELECT oi.prod_id FROM order_items oi WHERE oi.order_id=o.order_id ORDER BY oi.qty DESC, oi.prod_id LIMIT 1) AS top_prod,
       (SELECT oi.qty     FROM order_items oi WHERE oi.order_id=o.order_id ORDER BY oi.qty DESC, oi.prod_id LIMIT 1) AS top_qty
FROM orders o
ORDER BY o.order_id;



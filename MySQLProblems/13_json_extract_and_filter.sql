-- Problem 13: JSON extract and filter orders containing a specific item
-- Table: orders(order_id INT, payload JSON)
-- payload example: {"items":[{"sku":"A1","qty":2},{"sku":"B2","qty":1}], "shipping":{"city":"NYC"}}

-- Setup
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  payload  JSON NOT NULL
);
INSERT INTO orders VALUES
  (1, JSON_OBJECT('items', JSON_ARRAY(JSON_OBJECT('sku','A1','qty',2), JSON_OBJECT('sku','B2','qty',1)), 'shipping', JSON_OBJECT('city','NYC'))),
  (2, JSON_OBJECT('items', JSON_ARRAY(JSON_OBJECT('sku','C3','qty',5)), 'shipping', JSON_OBJECT('city','SF'))),
  (3, JSON_OBJECT('items', JSON_ARRAY(JSON_OBJECT('sku','A1','qty',1), JSON_OBJECT('sku','C3','qty',2)), 'shipping', JSON_OBJECT('city','LA')));

-- Solution: orders containing sku='A1'
SELECT order_id,
       JSON_EXTRACT(payload, '$.shipping.city') AS city
FROM orders
WHERE JSON_CONTAINS(JSON_EXTRACT(payload, '$.items[*].sku'), JSON_QUOTE('A1'));



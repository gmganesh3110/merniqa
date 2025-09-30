-- Problem 14: Full-text search on products
-- Table: products(prod_id INT, name VARCHAR(200), description TEXT)
-- Goal: Search products by keywords in name/description.

-- Setup
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  prod_id     INT PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  FULLTEXT KEY ft_name_desc (name, description)
) ENGINE=InnoDB;
INSERT INTO products VALUES
  (1,'Gaming Laptop','High performance laptop with RTX GPU'),
  (2,'Office Laptop','Lightweight and long battery life'),
  (3,'Gaming Mouse','Ergonomic RGB mouse for gamers');

-- Solution: boolean mode search for 'gaming laptop'
SELECT prod_id, name
FROM products
WHERE MATCH(name, description) AGAINST ('+gaming +laptop' IN BOOLEAN MODE);



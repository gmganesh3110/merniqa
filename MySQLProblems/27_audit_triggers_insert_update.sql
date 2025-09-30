-- Problem 27: Audit table via triggers for inserts/updates
-- Base: products(prod_id INT, name VARCHAR(100), price DECIMAL(10,2))
-- Audit: products_audit(audit_id INT AI, prod_id INT, action ENUM('INSERT','UPDATE'),
--                       at TIMESTAMP, old_price DECIMAL(10,2), new_price DECIMAL(10,2))

-- Setup
DROP TABLE IF EXISTS products_audit;
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  prod_id INT PRIMARY KEY,
  name    VARCHAR(100) NOT NULL,
  price   DECIMAL(10,2) NOT NULL
);
CREATE TABLE products_audit (
  audit_id INT AUTO_INCREMENT PRIMARY KEY,
  prod_id  INT NOT NULL,
  action   ENUM('INSERT','UPDATE') NOT NULL,
  at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  old_price DECIMAL(10,2) NULL,
  new_price DECIMAL(10,2) NULL
);

DELIMITER $$
CREATE TRIGGER trg_products_ins AFTER INSERT ON products FOR EACH ROW
BEGIN
  INSERT INTO products_audit(prod_id, action, old_price, new_price)
  VALUES (NEW.prod_id, 'INSERT', NULL, NEW.price);
END$$
CREATE TRIGGER trg_products_upd AFTER UPDATE ON products FOR EACH ROW
BEGIN
  IF OLD.price <> NEW.price THEN
    INSERT INTO products_audit(prod_id, action, old_price, new_price)
    VALUES (NEW.prod_id, 'UPDATE', OLD.price, NEW.price);
  END IF;
END$$
DELIMITER ;

-- Test
INSERT INTO products VALUES (1,'Phone',500.00);
UPDATE products SET price=550.00 WHERE prod_id=1;
SELECT * FROM products_audit;



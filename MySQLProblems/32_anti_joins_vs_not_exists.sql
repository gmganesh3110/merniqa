-- Problem 32: Anti-join using NOT EXISTS vs LEFT JOIN ... IS NULL
-- Tables: a(id INT PK), b(id INT PK)

-- Setup
DROP TABLE IF EXISTS b;
DROP TABLE IF EXISTS a;
CREATE TABLE a (id INT PRIMARY KEY);
CREATE TABLE b (id INT PRIMARY KEY);
INSERT INTO a VALUES (1),(2),(3),(4);
INSERT INTO b VALUES (2),(4),(6);

-- NOT EXISTS
SELECT a.id FROM a
WHERE NOT EXISTS (SELECT 1 FROM b WHERE b.id = a.id)
ORDER BY a.id;

-- LEFT JOIN ... IS NULL (equivalent result)
SELECT a.id FROM a
LEFT JOIN b ON b.id = a.id
WHERE b.id IS NULL
ORDER BY a.id;



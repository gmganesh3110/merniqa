-- Problem 22: Bill of Materials (BOM) recursive explosion
-- Tables: parts(part_id INT, name VARCHAR(100)); bom(parent_id INT, child_id INT, qty INT)
-- Goal: For a given root part, compute total required quantities of leaf components.

-- Setup
DROP TABLE IF EXISTS bom;
DROP TABLE IF EXISTS parts;
CREATE TABLE parts (part_id INT PRIMARY KEY, name VARCHAR(100));
CREATE TABLE bom (
  parent_id INT NOT NULL,
  child_id  INT NOT NULL,
  qty       INT NOT NULL,
  PRIMARY KEY (parent_id, child_id),
  FOREIGN KEY (parent_id) REFERENCES parts(part_id),
  FOREIGN KEY (child_id)  REFERENCES parts(part_id)
);
INSERT INTO parts VALUES (1,'Bicycle'),(2,'Frame'),(3,'Wheel'),(4,'Tire'),(5,'Tube');
-- Bicycle -> 1 Frame, 2 Wheels; Wheel -> 1 Tire, 1 Tube
INSERT INTO bom VALUES (1,2,1),(1,3,2),(3,4,1),(3,5,1);
SET @root = 1;

-- Solution
WITH RECURSIVE explode AS (
  SELECT parent_id, child_id, qty, 1 AS depth, child_id AS leaf, qty AS total_qty
  FROM bom WHERE parent_id = @root
  UNION ALL
  SELECT e.parent_id, b.child_id, b.qty, e.depth+1, b.child_id AS leaf,
         e.total_qty * b.qty
  FROM explode e
  JOIN bom b ON b.parent_id = e.child_id
), leaves AS (
  SELECT leaf AS part_id, SUM(total_qty) AS req_qty
  FROM explode
  WHERE leaf NOT IN (SELECT parent_id FROM bom)
  GROUP BY leaf
)
SELECT p.name AS component, l.req_qty
FROM leaves l JOIN parts p ON p.part_id = l.part_id
ORDER BY component;



-- Problem 10: Employee hierarchy with recursive CTE
-- Table: emp(emp_id INT, name VARCHAR(100), manager_id INT NULL)
-- Task: For a given emp_id, list all direct and indirect reports with depth.

-- Setup (DDL + sample data)
DROP TABLE IF EXISTS emp;
CREATE TABLE emp (
  emp_id     INT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  manager_id INT NULL,
  FOREIGN KEY (manager_id) REFERENCES emp(emp_id)
);
INSERT INTO emp (emp_id, name, manager_id) VALUES
  (1, 'CEO', NULL),
  (2, 'CTO', 1), (3, 'CFO', 1),
  (4, 'Eng Manager', 2), (5, 'QA Manager', 2),
  (6, 'Engineer A', 4), (7, 'Engineer B', 4), (8, 'QA A', 5);
SET @root_id = 2; -- change as needed

-- Solution (MySQL 8+):
WITH RECURSIVE subordinates AS (
  SELECT emp_id, name, manager_id, 0 AS depth
  FROM emp
  WHERE emp_id = @root_id
  UNION ALL
  SELECT e.emp_id, e.name, e.manager_id, s.depth + 1
  FROM emp e
  JOIN subordinates s ON e.manager_id = s.emp_id
)
SELECT * FROM subordinates
ORDER BY depth, emp_id;



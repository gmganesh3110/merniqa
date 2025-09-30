-- Problem 2: Second highest salary
-- Table: salaries(emp_id INT, salary DECIMAL(10,2))
-- Return the 2nd highest distinct salary; NULL if it doesn't exist.

-- Setup (DDL + sample data)
DROP TABLE IF EXISTS salaries;
CREATE TABLE salaries (
  emp_id INT PRIMARY KEY,
  salary DECIMAL(10,2) NOT NULL
);
INSERT INTO salaries (emp_id, salary) VALUES
  (1, 100000.00),
  (2, 150000.00),
  (3, 120000.00),
  (4, 150000.00),
  (5, 90000.00);

-- Solution (MySQL 8+):
SELECT DISTINCT salary
FROM salaries
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- Alternative (works pre-8 with subquery):
-- SELECT MAX(salary) AS second_highest
-- FROM salaries
-- WHERE salary < (SELECT MAX(salary) FROM salaries);



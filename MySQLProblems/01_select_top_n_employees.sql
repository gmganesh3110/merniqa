-- Problem 1: Top N highest-paid employees per department
-- Schema:
--   employees(emp_id INT, name VARCHAR(100), dept_id INT, salary DECIMAL(10,2))
--   departments(dept_id INT, dept_name VARCHAR(100))
-- Task: For each department, list top 3 employees by salary (ties allowed).

-- Setup (DDL + sample data)
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
  dept_id   INT PRIMARY KEY,
  dept_name VARCHAR(100) NOT NULL
);
CREATE TABLE employees (
  emp_id  INT PRIMARY KEY,
  name    VARCHAR(100) NOT NULL,
  dept_id INT NOT NULL,
  salary  DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);
INSERT INTO departments (dept_id, dept_name) VALUES
  (10, 'Engineering'),
  (20, 'Sales'),
  (30, 'HR');
INSERT INTO employees (emp_id, name, dept_id, salary) VALUES
  (1, 'Alice', 10, 150000.00),
  (2, 'Bob', 10, 140000.00),
  (3, 'Cara', 10, 160000.00),
  (4, 'Dan', 10, 130000.00),
  (5, 'Eve', 20, 120000.00),
  (6, 'Frank', 20, 125000.00),
  (7, 'Grace', 20, 125000.00),
  (8, 'Hank', 30, 90000.00);

-- Solution using window functions (MySQL 8+):
WITH ranked AS (
  SELECT e.emp_id, e.name, e.dept_id, e.salary,
         DENSE_RANK() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) AS rnk
  FROM employees e
)
SELECT d.dept_name, r.emp_id, r.name, r.salary
FROM ranked r
JOIN departments d ON d.dept_id = r.dept_id
WHERE r.rnk <= 3
ORDER BY d.dept_name, r.salary DESC;



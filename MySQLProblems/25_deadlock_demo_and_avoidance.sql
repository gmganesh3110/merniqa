-- Problem 25: Deadlock demo and avoidance strategy
-- Tables: t(a INT PRIMARY KEY, b INT)

-- Setup
DROP TABLE IF EXISTS t;
CREATE TABLE t (a INT PRIMARY KEY, b INT);
INSERT INTO t VALUES (1,10),(2,20);

-- Session 1:
-- START TRANSACTION;
-- UPDATE t SET b=b+1 WHERE a=1;  -- locks row a=1
-- -- then tries to UPDATE a=2

-- Session 2:
-- START TRANSACTION;
-- UPDATE t SET b=b+1 WHERE a=2;  -- locks row a=2
-- -- then tries to UPDATE a=1

-- This can deadlock. Avoid by enforcing consistent lock order (e.g., always lowest a first):
-- UPDATE t SET b=b+1 WHERE a IN (1,2) ORDER BY a; -- or split updates in known order

-- Cleanup check
SELECT * FROM t;



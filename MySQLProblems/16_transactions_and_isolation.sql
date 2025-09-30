-- Problem 16: Transaction with proper isolation to avoid lost updates
-- Tables: accounts(acct_id INT, balance DECIMAL(12,2))

-- Setup
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
  acct_id INT PRIMARY KEY,
  balance DECIMAL(12,2) NOT NULL
) ENGINE=InnoDB;
INSERT INTO accounts VALUES (1,1000.00),(2,500.00);

-- Transfer 100 from acct 1 to acct 2 using REPEATABLE READ with row locks
START TRANSACTION;
-- lock rows
SELECT balance FROM accounts WHERE acct_id IN (1,2) FOR UPDATE;
UPDATE accounts SET balance = balance - 100 WHERE acct_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE acct_id = 2;
COMMIT;

-- To set isolation explicitly (session):
-- SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;



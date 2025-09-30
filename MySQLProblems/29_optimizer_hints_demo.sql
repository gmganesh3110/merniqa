-- Problem 29: Optimizer hints and optimizer_switch demo
-- Tables: large_table(id INT PK, k INT, v INT)

-- Setup
DROP TABLE IF EXISTS large_table;
CREATE TABLE large_table (
  id INT PRIMARY KEY,
  k  INT NOT NULL,
  v  INT NOT NULL,
  KEY idx_k (k)
);
-- Insert some sample rows
INSERT INTO large_table VALUES
  (1,1,100),(2,1,200),(3,2,300),(4,3,400),(5,3,500);

-- Example: Force index and join order (illustrative; adjust to your data)
EXPLAIN SELECT /*+ SET_VAR(sort_buffer_size=262144) */ /*+ INDEX(large_table idx_k) */ id, v
FROM large_table
WHERE k = 3
ORDER BY v DESC;

-- You can also use optimizer_switch at session level (requires privileges):
-- SET SESSION optimizer_switch='index_merge=on,batched_key_access=on';



-- Problem 30: Covering index for index-only scan
-- Table: clicks(id INT PK, user_id INT, created_at DATETIME, campaign_id INT)
-- Goal: Create a covering index so query can be satisfied from the index without table lookup.

-- Setup
DROP TABLE IF EXISTS clicks;
CREATE TABLE clicks (
  id          INT PRIMARY KEY,
  user_id     INT NOT NULL,
  created_at  DATETIME NOT NULL,
  campaign_id INT NOT NULL,
  KEY idx_user_created_campaign (user_id, created_at, campaign_id)
);
INSERT INTO clicks VALUES
  (1,100,'2025-01-01 10:00:00',10),
  (2,100,'2025-01-01 11:00:00',11),
  (3,101,'2025-01-02 09:00:00',10);

-- Query can be covered by the composite index (no extra columns needed):
EXPLAIN SELECT user_id, created_at, campaign_id
FROM clicks
WHERE user_id = 100
  AND created_at >= '2025-01-01 00:00:00'
  AND created_at <  '2025-01-02 00:00:00'
ORDER BY created_at;



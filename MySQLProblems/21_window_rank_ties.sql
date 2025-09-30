-- Problem 21: Window ranking with ties (RANK vs DENSE_RANK)
-- Table: scores(user_id INT, game_id INT, score INT)

-- Setup
DROP TABLE IF EXISTS scores;
CREATE TABLE scores (
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  score   INT NOT NULL,
  PRIMARY KEY (user_id, game_id)
);
INSERT INTO scores VALUES
  (1,10,100),(2,10,150),(3,10,150),(4,10,120),
  (1,11,200),(2,11,200),(3,11,180),(4,11,180);

-- Solution: compare RANK and DENSE_RANK per game
SELECT game_id, user_id, score,
       RANK()        OVER (PARTITION BY game_id ORDER BY score DESC)       AS rnk,
       DENSE_RANK()  OVER (PARTITION BY game_id ORDER BY score DESC)       AS drnk
FROM scores
ORDER BY game_id, rnk, user_id;



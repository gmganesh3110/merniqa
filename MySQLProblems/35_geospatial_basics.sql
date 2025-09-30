-- Problem 35: Geospatial basics – find points within radius
-- Table: places(id INT PK, name VARCHAR(100), loc POINT, SPATIAL INDEX(loc))

-- Setup
DROP TABLE IF EXISTS places;
CREATE TABLE places (
  id   INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  loc  POINT NOT NULL,
  SPATIAL INDEX idx_loc (loc)
) ENGINE=InnoDB;
INSERT INTO places VALUES
  (1,'A', ST_GeomFromText('POINT(77.5946 12.9716)')),
  (2,'B', ST_GeomFromText('POINT(77.6 12.97)')),
  (3,'C', ST_GeomFromText('POINT(77.7 13.0)'));

-- Find places within ~5km of (77.5946,12.9716) using bounding box + precise distance
SET @lon = 77.5946; SET @lat = 12.9716; SET @km = 5;
-- Rough bounding box in degrees (~111km per degree lat; lon scales by cos(lat))
SET @lat_deg = @km/111.0; SET @lon_deg = @km/(111.0*COS(RADIANS(@lat)));
SELECT id, name
FROM places
WHERE MBRContains( ST_Envelope( ST_GeomFromText(CONCAT('POLYGON((',
   @lon-@lon_deg,' ',@lat-@lat_deg,',',
   @lon-@lon_deg,' ',@lat+@lat_deg,',',
   @lon+@lon_deg,' ',@lat+@lat_deg,',',
   @lon+@lon_deg,' ',@lat-@lat_deg,',',
   @lon-@lon_deg,' ',@lat-@lat_deg,
'))')) , loc );



BEGIN;

DROP TABLE IF EXISTS shops, items cascade;

CREATE TABLE shops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location JSONB
);

CREATE TABLE items (
  id NUMERIC PRIMARY KEY,
  shop_id INTEGER references shops(id) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  price NUMERIC NOT NULL
);

INSERT INTO shops (name, location)
VALUES
('Khan El Shopa', '{
    "NE": "32.701525, 35.296988",
    "NW": "32.701513, 35.296595",
    "SW": "32.701177, 35.296605",
    "SE": "32.701181, 35.297008"
  }
');

INSERT INTO items (id, shop_id, name, description, price)
VALUES
(0123456789012, 1, 'Toothbrush', 'Clean your teeth', 2.50),
(1234567890123, 1, 'Toothpaste', 'Put on toothbrush', 1.75),
(2345678901234, 1, 'Apple', 'Put it in your face', 0.50);

COMMIT;

-- Insert default food items into the `food_items` table
INSERT INTO food_items (user_id, category_id, name, "group", is_default, created_at)
VALUES
-- Proteins
(NULL, NULL, 'Fish', 'Protein', TRUE, NOW()),
(NULL, NULL, 'Poultry', 'Protein', TRUE, NOW()),
(NULL, NULL, 'Red or Game Meat', 'Protein', TRUE, NOW()),
(NULL, NULL, 'Eggs', 'Protein', TRUE, NOW()),

-- Vegetables
(NULL, NULL, 'Leafy', 'Vegetable', TRUE, NOW()),
(NULL, NULL, 'Cruciferous', 'Vegetable', TRUE, NOW()),
(NULL, NULL, 'Vibrant', 'Vegetable', TRUE, NOW()),
(NULL, NULL, 'Starchy', 'Vegetable', TRUE, NOW()),

-- Fruits
(NULL, NULL, 'Avocado', 'Fruit', TRUE, NOW()),
(NULL, NULL, 'Banana', 'Fruit', TRUE, NOW()),
(NULL, NULL, 'Berries', 'Fruit', TRUE, NOW()),

-- Grains & Legumes
(NULL, NULL, 'Whole Grains', 'Grains & Legumes', TRUE, NOW()),
(NULL, NULL, 'Legumes', 'Grains & Legumes', TRUE, NOW()),

-- Other
(NULL, NULL, 'Nuts or Seeds', 'Other', TRUE, NOW()),
(NULL, NULL, 'Dark Chocolate', 'Other', TRUE, NOW()),
(NULL, NULL, 'Antioxidant Tea', 'Other', TRUE, NOW()),
(NULL, NULL, 'Fermented', 'Other', TRUE, NOW());



-- Insert default categories into the `categories` table
INSERT INTO categories (user_id, name, type, unit, target, is_default, created_at)
VALUES
-- Proteins
(NULL, 'Fish', 'Proteins', 'Servings (~6–8 oz each)', 2, TRUE, NOW()),
(NULL, 'Poultry', 'Proteins', 'Servings (~4–6 oz each)', 2, TRUE, NOW()),
(NULL, 'Red Meat/Game', 'Proteins', 'Servings (~4–6 oz)', 1, TRUE, NOW()),

-- Whole Grains
(NULL, 'Whole Grains', NULL, 'Cups', 3, TRUE, NOW()),

-- Fruits
(NULL, 'Fruit', NULL, 'Cups', 5, TRUE, NOW()),

-- Eggs
(NULL, 'Eggs', NULL, 'Count', 6, TRUE, NOW()),

-- Vegetables
(NULL, 'Leafy', 'Vegetables', 'Cups', 6, TRUE, NOW()),
(NULL, 'Cruciferous', 'Vegetables', 'Cups', 3, TRUE, NOW()),
(NULL, 'Vibrant', 'Vegetables', 'Cups', 5, TRUE, NOW()),
(NULL, 'Starchy', 'Vegetables', 'Cups', 3, TRUE, NOW()),

-- Other Categories
(NULL, 'Avocados', NULL, 'Count', 2, TRUE, NOW()),
(NULL, 'Legumes', NULL, 'Cups', 3, TRUE, NOW()),
(NULL, 'Nuts & Seeds', NULL, 'Ounces', 5, TRUE, NOW()),
(NULL, 'Dark Chocolate', NULL, 'Ounces', 2, TRUE, NOW()),
(NULL, 'Tea', NULL, 'Cups', 3, TRUE, NOW()),
(NULL, 'Fermented', NULL, 'Servings', 2, TRUE, NOW());



-- Insert a user into the users table
INSERT INTO users (id, username, email, created_at)
VALUES (1, 'nate', 'rohwedernt@gmail.com', NOW());

-- Set createdAt date for a user
UPDATE users
SET created_at = '2024-12-01T00:00:00.000Z'
WHERE id = 1;

-- Delete an exercise from that table
DELETE FROM exercises
WHERE id = 'ba6cde9a-5b14-4b81-beba-32dc298aafe1'

-- Delete exercise with list of ids
DELETE FROM exercises
WHERE id IN ('9029a40a-5636-4d59-8eaf-46278b1f0140', 'd470bc7d-30d0-4f87-822a-d8f3f6eff86e', '55fa7de1-1427-4f75-80cc-82cef066822f', 'ba6cde9a-5b14-4b81-beba-32dc298aafe1	');

-- or
DELETE FROM exercises;

-- Insert Default Categories
INSERT INTO categories (id, user_id, name, type, unit, target, is_default, created_at)
VALUES  
  (gen_random_uuid(), NULL, 'Fish', 'Proteins', 'Servings (~6–8 oz each)', 2, true, NOW()),
  (gen_random_uuid(), NULL, 'Poultry', 'Proteins', 'Servings (~4–6 oz each)', 2, true, NOW()),
  (gen_random_uuid(), NULL, 'Red Meat/Game', 'Proteins', 'Servings (~4–6 oz)', 1, true, NOW()),
  (gen_random_uuid(), NULL, 'Leafy', 'Vegetables', 'Cups', 6, true, NOW()),
  (gen_random_uuid(), NULL, 'Cruciferous', 'Vegetables', 'Cups', 3, true, NOW()),
  (gen_random_uuid(), NULL, 'Vibrant', 'Vegetables', 'Cups', 5, true, NOW()),
  (gen_random_uuid(), NULL, 'Starchy', 'Vegetables', 'Cups', 3, true, NOW()),
  (gen_random_uuid(), NULL, 'Fruits', NULL, 'Cups', 5, true, NOW()),
  (gen_random_uuid(), NULL, 'Eggs', NULL, 'Count', 6, true, NOW()),
  (gen_random_uuid(), NULL, 'Whole Grains', NULL, 'Cups', 3, true, NOW()),
  (gen_random_uuid(), NULL, 'Avocados', NULL, 'Count', 2, true, NOW()),
  (gen_random_uuid(), NULL, 'Legumes', NULL, 'Cups', 3, true, NOW()),
  (gen_random_uuid(), NULL, 'Nuts & Seeds', NULL, 'Ounces', 5, true, NOW()),
  (gen_random_uuid(), NULL, 'Dark Chocolate', NULL, 'Ounces', 2, true, NOW()),
  (gen_random_uuid(), NULL, 'Tea', NULL, 'Cups', 3, true, NOW()),
  (gen_random_uuid(), NULL, 'Fermented', NULL, 'Servings', 2, true, NOW());

-- Retrieve UUIDs of Inserted Categories for Food Items
WITH category_uuids AS (
  SELECT id, name FROM categories
)
-- Insert Default Food Items
INSERT INTO food_items (id, user_id, category_id, name, "group", is_default, created_at)
VALUES
  -- Proteins
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Proteins'), 'Fish', 'Proteins', true, NOW()),
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Proteins'), 'Poultry', 'Proteins', true, NOW()),
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Proteins'), 'Red Meat/Game', 'Proteins', true, NOW()),
  
  -- Fruits
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Fruits'), 'Avocado', 'Fruits', true, NOW()),
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Fruits'), 'Banana', 'Fruits', true, NOW()),
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Fruits'), 'Berries', 'Fruits', true, NOW()),

  -- Eggs
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Eggs'), 'Eggs', 'Proteins', true, NOW()),

  -- Vegetables
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Vegetables'), 'Leafy', 'Vegetables', true, NOW()),
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Vegetables'), 'Cruciferous', 'Vegetables', true, NOW()),
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Vegetables'), 'Vibrant', 'Vegetables', true, NOW()),
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Vegetables'), 'Starchy', 'Vegetables', true, NOW()),

  -- Grains & Legumes
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Whole Grains'), 'Whole Grains', 'Grains & Legumes', true, NOW()),
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Legumes'), 'Legumes', 'Grains & Legumes', true, NOW()),

  -- Nuts, Seeds, and Others
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Nuts & Seeds'), 'Nuts or Seeds', 'Other', true, NOW()),
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Dark Chocolate'), 'Dark Chocolate', 'Other', true, NOW()),
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Tea'), 'Antioxidant Tea', 'Other', true, NOW()),
  (gen_random_uuid(), NULL, (SELECT id FROM category_uuids WHERE name = 'Fermented'), 'Fermented', 'Other', true, NOW());

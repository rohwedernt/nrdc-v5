import { db } from "@/db"; // Replace with your actual DB connection
import { categoriesTable } from "@/db/schema";
import { foodItemsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

async function initializeDatabase() {
  // Define default categories
  const defaultCategories = [
    { name: "Proteins", type: "group", unit: "servings", target: 10, isDefault: true },
    { name: "Vegetables", type: "group", unit: "cups", target: 7, isDefault: true },
    { name: "Fruits", type: "group", unit: "cups", target: 5, isDefault: true },
    { name: "Whole Grains", type: "group", unit: "cups", target: 3, isDefault: true },
    { name: "Legumes", type: "group", unit: "cups", target: 3, isDefault: true },
    { name: "Nuts & Seeds", type: "group", unit: "oz", target: 5, isDefault: true },
    { name: "Dark Chocolate", type: "group", unit: "oz", target: 2, isDefault: true },
    { name: "Antioxidant Tea", type: "group", unit: "cups", target: 3, isDefault: true },
    { name: "Fermented", type: "group", unit: "servings", target: 2, isDefault: true },
  ];

  // Define default food items
  const defaultFoodItems = [
    { name: "Fish", group: "Proteins", categoryName: "Proteins", isDefault: true },
    { name: "Poultry", group: "Proteins", categoryName: "Proteins", isDefault: true },
    { name: "Red or Game Meat", group: "Proteins", categoryName: "Proteins", isDefault: true },
    { name: "Eggs", group: "Proteins", categoryName: "Proteins", isDefault: true },
    { name: "Leafy Greens", group: "Vegetables", categoryName: "Vegetables", isDefault: true },
    { name: "Cruciferous Veggies", group: "Vegetables", categoryName: "Vegetables", isDefault: true },
    { name: "Starchy Veggies", group: "Vegetables", categoryName: "Vegetables", isDefault: true },
    { name: "Vibrant Veggies", group: "Vegetables", categoryName: "Vegetables", isDefault: true },
    { name: "Avocado", group: "Fruits", categoryName: "Fruits", isDefault: true },
    { name: "Banana", group: "Fruits", categoryName: "Fruits", isDefault: true },
    { name: "Berries", group: "Fruits", categoryName: "Fruits", isDefault: true },
    { name: "Whole Grains", group: "Whole Grains", categoryName: "Whole Grains", isDefault: true },
    { name: "Legumes", group: "Legumes", categoryName: "Legumes", isDefault: true },
    { name: "Nuts & Seeds", group: "Nuts & Seeds", categoryName: "Nuts & Seeds", isDefault: true },
    { name: "Dark Chocolate", group: "Dark Chocolate", categoryName: "Dark Chocolate", isDefault: true },
    { name: "Antioxidant Tea", group: "Antioxidant Tea", categoryName: "Antioxidant Tea", isDefault: true },
    { name: "Fermented Foods", group: "Fermented", categoryName: "Fermented", isDefault: true },
  ];

  // Map to store generated category IDs
  const categoryIdMap: Record<string, string> = {};

  // Insert default categories
  for (const category of defaultCategories) {
    const id = crypto.randomUUID();
    categoryIdMap[category.name] = id;

    const existingCategory = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.name, category.name))
      .limit(1);

    if (existingCategory.length === 0) {
      await db.insert(categoriesTable).values({
        id,
        ...category,
      });
    } else {
      categoryIdMap[category.name] = existingCategory[0].id; // Use existing ID
    }
  }

  // Insert default food items
  for (const foodItem of defaultFoodItems) {
    const id = crypto.randomUUID();
    const categoryId = categoryIdMap[foodItem.categoryName];

    const existingFoodItem = await db
      .select()
      .from(foodItemsTable)
      .where(eq(foodItemsTable.name, foodItem.name))
      .limit(1);

    if (existingFoodItem.length === 0) {
      await db.insert(foodItemsTable).values({
        id,
        categoryId,
        ...foodItem,
      });
    }
  }

  console.log("Database initialized with default data!");
}

initializeDatabase()
  .then(() => {
    console.log("Initialization complete.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });

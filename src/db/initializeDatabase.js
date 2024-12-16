"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("@/db"); // Replace with your actual DB connection
var schema_1 = require("@/db/schema");
var schema_2 = require("@/db/schema");
var drizzle_orm_1 = require("drizzle-orm");
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var defaultCategories, defaultFoodItems, categoryIdMap, _i, defaultCategories_1, category, id, existingCategory, _a, defaultFoodItems_1, foodItem, id, categoryId, existingFoodItem;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    defaultCategories = [
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
                    defaultFoodItems = [
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
                    categoryIdMap = {};
                    _i = 0, defaultCategories_1 = defaultCategories;
                    _b.label = 1;
                case 1:
                    if (!(_i < defaultCategories_1.length)) return [3 /*break*/, 6];
                    category = defaultCategories_1[_i];
                    id = crypto.randomUUID();
                    categoryIdMap[category.name] = id;
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.categoriesTable)
                            .where((0, drizzle_orm_1.eq)(schema_1.categoriesTable.name, category.name))
                            .limit(1)];
                case 2:
                    existingCategory = _b.sent();
                    if (!(existingCategory.length === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, db_1.db.insert(schema_1.categoriesTable).values(__assign({ id: id }, category))];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    categoryIdMap[category.name] = existingCategory[0].id; // Use existing ID
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    _a = 0, defaultFoodItems_1 = defaultFoodItems;
                    _b.label = 7;
                case 7:
                    if (!(_a < defaultFoodItems_1.length)) return [3 /*break*/, 11];
                    foodItem = defaultFoodItems_1[_a];
                    id = crypto.randomUUID();
                    categoryId = categoryIdMap[foodItem.categoryName];
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_2.foodItemsTable)
                            .where((0, drizzle_orm_1.eq)(schema_2.foodItemsTable.name, foodItem.name))
                            .limit(1)];
                case 8:
                    existingFoodItem = _b.sent();
                    if (!(existingFoodItem.length === 0)) return [3 /*break*/, 10];
                    return [4 /*yield*/, db_1.db.insert(schema_2.foodItemsTable).values(__assign({ id: id, categoryId: categoryId }, foodItem))];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    _a++;
                    return [3 /*break*/, 7];
                case 11:
                    console.log("Database initialized with default data!");
                    return [2 /*return*/];
            }
        });
    });
}
initializeDatabase()
    .then(function () {
    console.log("Initialization complete.");
    process.exit(0);
})
    .catch(function (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const product_schema_1 = require("../schemas/product.schema");
class ProductController {
    createProduct(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, product_schema_1.validateCreateProduct)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: product_schema_1.validateCreateProduct.errors,
                    };
                }
                const { name, price, stockQuantity, image, description, categoryName } = params;
                const [result] = yield db_1.default.execute('INSERT INTO products (name, price, stock_quantity,image,description,category_name) VALUES (?, ?, ?, ?, ?, ?)', [name, price, stockQuantity, image, description, categoryName]);
            }
            catch (error) {
                console.error('❌ Error creating product:', error);
                throw new Error('Database error');
            }
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [products] = yield db_1.default.execute('SELECT * FROM products');
                return products;
            }
            catch (error) {
                console.error('❌ Error fetching products:', error);
                throw new Error('Database error');
            }
        });
    }
    getProductById(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [product] = yield db_1.default.execute('SELECT * FROM products WHERE id = ?', [params.id]);
                return product;
            }
            catch (error) {
                console.error('❌ Error fetching product:', error);
                throw new Error('Database error');
            }
        });
    }
    updateProduct(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, product_schema_1.validateUpdateProduct)(params)) {
                    return {
                        code: -32602,
                        message: 'invalid params',
                        errors: product_schema_1.validateUpdateProduct.errors,
                    };
                }
                const { id, name, price, stockQuantity, image, description, categoryName, } = params;
                const [result] = yield db_1.default.execute('UPDATE products SET name = ?, price = ?, stock_quantity = ?, image = ? WHERE id = ?', [name, price, stockQuantity, image, id, description, categoryName]);
            }
            catch (error) {
                console.error('❌ Error updating product:', error);
                throw new Error('Database error');
            }
        });
    }
    deleteProduct(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield db_1.default.execute('DELETE FROM products WHERE id = ?', [params.id]);
            }
            catch (error) {
                console.error('❌ Error deleting product:', error);
                throw new Error('Database error');
            }
        });
    }
}
exports.default = new ProductController();

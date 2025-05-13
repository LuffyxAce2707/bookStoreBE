"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.BookLanguage = exports.MainCategory = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Enum danh mục chính dựa trên books_database.json
var MainCategory;
(function (MainCategory) {
    MainCategory["FICTION"] = "Fiction";
    MainCategory["NON_FICTION"] = "Non-Fiction";
    MainCategory["SCIENCE_FICTION"] = "Science Fiction";
    MainCategory["BIOGRAPHY"] = "Biography";
})(MainCategory || (exports.MainCategory = MainCategory = {}));
// Enum ngôn ngữ sách dựa trên books_database.json
var BookLanguage;
(function (BookLanguage) {
    BookLanguage["ENGLISH"] = "English";
    BookLanguage["SPANISH"] = "Spanish";
    BookLanguage["FRENCH"] = "French";
    BookLanguage["GERMAN"] = "German";
    BookLanguage["VIETNAMESE"] = "Vietnamese";
})(BookLanguage || (exports.BookLanguage = BookLanguage = {}));
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    image: {
        type: String,
    },
    parentCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
    },
    isSubCategory: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    displayOrder: {
        type: Number,
        default: 0,
    },
    featuredBooks: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Book',
        }]
}, {
    timestamps: true,
});
// Tạo index để tìm kiếm danh mục
categorySchema.index({ name: 'text', description: 'text' });
categorySchema.index({ slug: 1 });
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ isActive: 1, displayOrder: 1 });
exports.Category = mongoose_1.default.model('Category', categorySchema);

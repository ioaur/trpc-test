"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todos = exports.Todo = void 0;
const zod_1 = __importDefault(require("zod"));
exports.Todo = zod_1.default.object({
    id: zod_1.default.string(),
    name: zod_1.default.string(),
});
exports.Todos = zod_1.default.array(exports.Todo);

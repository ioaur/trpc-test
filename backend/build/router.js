"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const uuidv4_1 = require("uuidv4");
const server_1 = require("@trpc/server");
const Todo_1 = require("./models/Todo");
const t = server_1.initTRPC.create();
let todos = [];
const trpcRouter = t.router({
    getTodo: t.procedure
        .input(zod_1.default.string())
        .output(Todo_1.Todo)
        .query(({ input }) => {
        const todo = todos.find((r) => r.id === input);
        if (!todo) {
            throw new server_1.TRPCError({
                code: "BAD_REQUEST",
                message: `could not find todo with id ${input}`,
            });
        }
        return todo;
    }),
    listTodos: t.procedure.output(Todo_1.Todos).query(() => todos),
    createTodo: t.procedure.input(zod_1.default.object({ name: zod_1.default.string().max(50) })).mutation(({ input }) => {
        const todo = { id: (0, uuidv4_1.uuid)(), name: input.name };
        todos.push(todo);
        return todo;
    }),
    deleteTodo: t.procedure.input(zod_1.default.object({ id: zod_1.default.string() })).mutation(({ input }) => {
        todos = todos.filter((r) => r.id !== input.id);
    }),
});
exports.default = trpcRouter;

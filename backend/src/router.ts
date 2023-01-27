import z from "zod";
import { uuid } from "uuidv4";
import { initTRPC, TRPCError } from "@trpc/server";
import { Todo, Todos } from "./models/Todo";

const t = initTRPC.create();

let todos: Todos = [];

const trpcRouter = t.router({
    getTodo: t.procedure
        .input(z.string())
        .output(Todo)
        .query(({ input }) => {
            const todo = todos.find((r) => r.id === input);
            if (!todo) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `could not find todo with id ${input}`,
                });
            }
            return todo;
        }),
    listTodos: t.procedure.output(Todos).query(() => todos),
    createTodo: t.procedure
        .input(z.object({ name: z.string().max(50), deadline: z.string().datetime().nullable() }))
        .mutation(({ input }) => {
            const todo: Todo = { id: uuid(), name: input.name, deadline: input.deadline };
            todos.push(todo);
            return todo;
        }),
    deleteTodo: t.procedure.input(z.object({ id: z.string() })).mutation(({ input }) => {
        todos = todos.filter((r) => r.id !== input.id);
    }),
});

export type TRPCRouter = typeof trpcRouter;
export default trpcRouter;

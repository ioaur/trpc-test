import z from "zod";

export const Todo = z.object({
    id: z.string(),
    name: z.string(),
});

export const Todos = z.array(Todo);

export type Todo = z.infer<typeof Todo>;
export type Todos = z.infer<typeof Todos>;

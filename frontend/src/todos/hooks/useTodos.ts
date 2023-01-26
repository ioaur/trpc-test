import { trpc } from "../../App";

export function useTodos() {
    const todos = trpc.listTodos.useQuery();

    return {
        todos: todos.data,
        refreshTodos: todos.refetch,
    };
}

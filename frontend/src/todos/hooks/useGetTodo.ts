import { trpc } from "../../App";

export function useGetTodo(id: string) {
    const todo = trpc.getTodo.useQuery(id);

    return todo?.data;
}

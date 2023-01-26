import { useState } from "react";
import { trpc } from "../../App";
import { useTodos } from "./useTodos";

export function useDeleteTodo() {
    const [errorMessage, setErrorMessage] = useState<string>();

    const { refreshTodos } = useTodos();

    const { mutate } = trpc.deleteTodo.useMutation({
        onSuccess: refreshTodos,
        onError: (error) => setErrorMessage(error.message),
    });

    return { deleteTodos: mutate, errorMessage };
}

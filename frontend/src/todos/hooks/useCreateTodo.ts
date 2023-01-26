import { useState } from "react";
import { trpc } from "../../App";
import { useTodos } from "./useTodos";

export function useCreateTodo() {
    const [errorMessage, setErrorMessage] = useState<string>();

    const { refreshTodos } = useTodos();

    const { mutate } = trpc.createTodo.useMutation({
        onSuccess: () => refreshTodos(),
        onError: (error) => setErrorMessage(error.message),
    });

    return { createTodo: mutate, errorMessage };
}

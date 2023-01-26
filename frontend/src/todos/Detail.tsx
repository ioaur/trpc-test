import { useGetTodo } from "./hooks/useGetTodo";

interface Props {
    id: string;
}

function Detail({ id }: Props) {
    const todo = useGetTodo(id);

    return todo ? (
        <div>
            <h2>Detail</h2>
            <div>{todo.id}</div>
            <div>{todo.name}</div>
        </div>
    ) : (
        <div></div>
    );
}

export default Detail;

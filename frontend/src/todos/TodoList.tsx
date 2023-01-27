import { useDeleteTodo } from "./hooks/useDeleteTodo";
import { Todo } from "../../../backend/src/models/Todo";
import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    List as MuiList,
    ListItem,
    ListItemButton,
    ListItemText,
    styled,
} from "@mui/material";
import { useTodos } from "./hooks/useTodos";
import { ExtinguisherIcon } from "../icons/Extinguisher";

const Container = styled(Card)({
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 500,
    width: "100%",
    zIndex: 10,
});

const List = styled(MuiList)({
    width: "100%",
    bgcolor: "background.paper",
});

interface Props {
    selectedDetailId: string;
    setDetail: (id: string) => void;
}

function TodoList({ selectedDetailId, setDetail }: Props) {
    const { todos } = useTodos();

    const { deleteTodos, errorMessage } = useDeleteTodo();

    const handleDelete = (id: string) => {
        if (id === selectedDetailId) {
            setDetail("");
        }
        deleteTodos({ id });
    };

    const todoRow = (todo: Todo) => {
        return (
            <ListItem
                style={{ width: "300px", display: "flex", height: 50 }}
                key={todo.id}
                secondaryAction={
                    <IconButton color="primary" size="large" onClick={() => handleDelete(todo.id)}>
                        <ExtinguisherIcon fontSize="large" />
                    </IconButton>
                }
                disablePadding
            >
                <ListItemButton selected={selectedDetailId === todo.id} onClick={() => setDetail(todo.id)}>
                    <ListItemText primary={todo.name} />
                </ListItemButton>
            </ListItem>
        );
    };

    return (
        <Container>
            <CardHeader title="Todos" />
            <CardContent>
                <List>{todos.map((todo) => todoRow(todo))}</List>
            </CardContent>
            <span>{errorMessage}</span>
        </Container>
    );
}

export default TodoList;

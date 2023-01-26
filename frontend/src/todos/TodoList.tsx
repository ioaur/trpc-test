import { trpc } from "../App";
import { useDeleteTodo } from "./hooks/useDeleteTodo";
import { Todo } from "../../../backend/src/models/Todo";
import { IconButton, List as MuiList, ListItem, ListItemText, styled } from "@mui/material";
import { Check, Info } from "@mui/icons-material";

const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
});

const List = styled(MuiList)({
    marginTop: 20,
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
});

interface Props {
    setDetail: (id: string) => void;
}

function TodoList({ setDetail }: Props) {
    const todos = trpc.listTodos.useQuery();

    const { deleteTodos, errorMessage } = useDeleteTodo();

    const todoRow = (todo: Todo) => {
        return (
            <ListItem
                key={todo.id}
                secondaryAction={
                    <>
                        <IconButton color="primary" onClick={() => setDetail(todo.id)}>
                            <Info />
                        </IconButton>
                        <IconButton style={{ color: "green" }} onClick={() => deleteTodos({ id: todo.id })}>
                            <Check />
                        </IconButton>
                    </>
                }
                disablePadding
            >
                <ListItemText primary={todo.name} />
            </ListItem>
        );
    };

    return (
        <Container>
            <List>{todos.data && todos.data.map((todo) => todoRow(todo))}</List>

            <span>{errorMessage}</span>
        </Container>
    );
}

export default TodoList;

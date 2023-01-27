import { Card, CardContent, CardHeader, styled, Typography } from "@mui/material";
import moment from "moment";
import { useGetTodo } from "./hooks/useGetTodo";

interface Props {
    id: string;
}

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

function TodoDetail({ id }: Props) {
    const todo = useGetTodo(id);

    return (
        <Container>
            <CardHeader title="Details" />
            <CardContent>
                <Typography>{todo?.name}</Typography>
                <Typography>
                    {todo?.deadline ? moment(todo?.deadline).format("MMMM Do YYYY, h:mm:ss a") : null}
                </Typography>
            </CardContent>
        </Container>
    );
}

export default TodoDetail;

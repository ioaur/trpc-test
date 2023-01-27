import { Card, CardContent as MuiCardContent, CardHeader, styled } from "@mui/material";
import moment from "moment";
import { Information } from "../core/Information";
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

const CardContent = styled(MuiCardContent)({
    width: "50%",
    display: "flex",
    flexDirection: "column",
});

function TodoDetail({ id }: Props) {
    const todo = useGetTodo(id);

    return (
        <Container>
            <CardHeader title="Details" />
            <CardContent>
                <Information label="Name" value={todo?.name} />
                <Information label="Deadline" value={formatDate(todo?.deadline)} />
                <Information label="Details" value={todo?.details} />
            </CardContent>
        </Container>
    );
}

function formatDate(deadline: string | null | undefined): string | null {
    return deadline ? moment(deadline).format("MMMM Do YYYY, h:mm:ss a") : null;
}

export default TodoDetail;

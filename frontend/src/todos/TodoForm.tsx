import { Card, CardContent, IconButton, styled, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { ChangeEvent, useState } from "react";
import { GasolineIcon } from "../icons/Gasoline";
import { useCreateTodo } from "./hooks/useCreateTodo";

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

function TodoForm() {
    const [text, setText] = useState("");
    const [details, setDetails] = useState<string | null>(null);
    const [deadline, setDeadline] = useState<Moment | null>(null);

    const { createTodo, errorMessage } = useCreateTodo();

    const updateText = (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value);
    const updateDetails = (event: ChangeEvent<HTMLInputElement>) => setDetails(event.target.value);
    const updateDeadline = (newValue: Moment | null, _: any) => setDeadline(newValue);

    const handleCreate = () => {
        createTodo({ name: text, deadline: deadline?.toDate().toISOString() ?? null, details });

        clearForm();
    };

    const clearForm = () => {
        setText("");
        setDeadline(null);
    };

    return (
        <Container>
            <CardContent style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                <TextField type="text" label="Name" onChange={updateText} value={text} />
                <TextField type="text" label="Details" onChange={updateDetails} value={details} />
                <DateTimePicker
                    label="Deadline"
                    value={deadline}
                    onChange={updateDeadline}
                    renderInput={(params) => <TextField {...params} />}
                />
                <IconButton color="primary" size="large" onClick={handleCreate}>
                    <GasolineIcon fontSize="large" />
                </IconButton>
            </CardContent>
            {errorMessage && errorMessage}
        </Container>
    );
}

export default TodoForm;

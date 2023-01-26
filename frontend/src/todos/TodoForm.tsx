import { Button, styled, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useCreateTodo } from "./hooks/useCreateTodo";

const Container = styled("div")({ display: "flex", flexDirection: "column" });

function TodoForm() {
    const [text, setText] = useState("");

    const { createTodo, errorMessage } = useCreateTodo();

    const updateText = (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value);

    const handleCreate = () => {
        createTodo({ name: text });
        setText("");
    };

    return (
        <Container>
            {errorMessage && errorMessage}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField type="text" label="Name" onChange={updateText} value={text} />

                <Button style={{ marginLeft: 8 }} variant="contained" size="large" onClick={handleCreate}>
                    Add
                </Button>
            </div>
        </Container>
    );
}

export default TodoForm;

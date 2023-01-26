import { useState } from "react";
import "./App.css";
import type { TRPCRouter } from "../../backend/src/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import TodoList from "./todos/TodoList";
import Detail from "./todos/Detail";
import TodoForm from "./todos/TodoForm";
import { styled, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const BACKEND_URL: string = "http://localhost:8080/todo";

export const trpc = createTRPCReact<TRPCRouter>();

const Container = styled("div")({ display: "flex", flexDirection: "column" });

function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: BACKEND_URL,
                }),
            ],
        })
    );

    const [detailId, setDetailId] = useState("");

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Container className="App">
                        <Typography variant="h2" style={{ marginBottom: 20 }}>
                            Insane Todo
                        </Typography>
                        <TodoForm />
                        <TodoList setDetail={setDetailId} />
                        {detailId ? <Detail id={detailId} /> : null}
                    </Container>
                </LocalizationProvider>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;

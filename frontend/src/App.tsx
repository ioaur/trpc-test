import { useState } from "react";
import "./App.css";
import type { TRPCRouter } from "../../backend/src/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import TodoList from "./todos/TodoList";
import TodoForm from "./todos/TodoForm";
import { styled, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ParticlesContainer } from "./Particles";
import theme from "./theme/theme";
import { AppBar } from "./AppBar";
import TodoDetail from "./todos/TodoDetail";

const BACKEND_URL: string = "http://localhost:8080/todo";

export const trpc = createTRPCReact<TRPCRouter>();

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: BACKEND_URL,
        }),
    ],
});

const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const Spacer = styled("div")({ height: 100 });

function App() {
    const [detailId, setDetailId] = useState("");

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <ParticlesContainer />

                        <AppBar />

                        <Spacer />

                        <Container className="App">
                            <TodoForm />
                            <TodoList selectedDetailId={detailId} setDetail={setDetailId} />
                            <TodoDetail id={detailId} />
                        </Container>
                    </LocalizationProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;

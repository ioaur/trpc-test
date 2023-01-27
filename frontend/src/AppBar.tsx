import { Typography, AppBar as MuiAppBar } from "@mui/material";

export function AppBar() {
    return (
        <MuiAppBar
            style={{ backgroundColor: "black", color: "white", padding: 10, alignItems: "center" }}
            position="fixed"
            enableColorOnDark
        >
            <Typography
                variant="h4"
                noWrap
                component="a"
                sx={{
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                INFERNO🔥
            </Typography>
        </MuiAppBar>
    );
}

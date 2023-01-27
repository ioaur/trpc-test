import { Grid, Typography } from "@mui/material";

interface Props {
    label: string;
    value: string | number | null | undefined;
}

export function Information({ label, value }: Props) {
    const definedValue = value ?? "-";

    return (
        <Grid container alignItems="center">
            <Grid item flex={1} justifyContent="flex-start">
                <Typography style={{ display: "flex" }} variant="subtitle1">
                    {label}
                </Typography>
            </Grid>
            <Grid item display="flex" flex={2} justifyContent="center">
                <Typography variant="subtitle2" fontWeight="bold">
                    {definedValue}
                </Typography>
            </Grid>
        </Grid>
    );
}

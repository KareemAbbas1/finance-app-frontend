import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween";
import PixIcon from "@mui/icons-material/Pix";


type Props = {}

const Navbar = (props: Props) => {

    const { palette } = useTheme();
    const route = window.location.href.split("/")[3];
    const [selected, setSelected] = useState(route || "dashboard")

    return (
        <FlexBetween
            mb="0.25rem"
            padding="0.5rem 0rem"
            color={palette.grey[300]}
        >
            {/* Brand */}
            <FlexBetween gap="0.75rem">
                <PixIcon sx={{ fontSize: "28px" }} />
                <Typography variant="h4" fontSize="16px">
                    Finance.M
                </Typography>
            </FlexBetween>

            {/* Links */}
            <FlexBetween gap="2rem">
                <Box sx={{ "&:hover": { color: palette.primary[100] }, "transition": "all 300ms ease" }}>
                    <Link
                        to="/"
                        onClick={() => setSelected("dashboard")}
                        style={{
                            color: selected === "dashboard" ? "inherit" : palette.grey[700],
                            textDecoration: "inherit",
                        }}
                    >
                        Dashboard
                    </Link>
                </Box>

                <Box sx={{ "&:hover": { color: palette.primary[100] }, "transition": "all 300ms ease" }}>
                    <Link
                        to="/predictions"
                        onClick={() => setSelected("predictions")}
                        style={{
                            color: selected === "predictions" ? "inherit" : palette.grey[700],
                            textDecoration: "inherit",
                        }}
                    >
                        Predictions
                    </Link>
                </Box>

            </FlexBetween>
        </FlexBetween>
    )
}

export default Navbar
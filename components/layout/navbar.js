import { AppBar, Divider, Toolbar, Typography } from "@mui/material"
import { useRouter } from "next/router"

const Navbar = ({ name = "" }) => {
    const router = useRouter();
    return (
        <>
            <AppBar>
                <Toolbar variant="dense" style={{ justifyContent: "space-between" }}>
                    <Typography variant="h5" onClick={() => router.replace("/")} style={{ cursor: "pointer" }}>
                        QUIZ APP
                    </Typography>
                    <Typography textTransform="capitalize">{name}</Typography>
                </Toolbar>
                <Divider />
            </AppBar>
        </>
    )
}

export default Navbar
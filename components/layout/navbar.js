import { AppBar, Divider, Toolbar, Typography } from "@mui/material"
import { useRouter } from "next/router"

const Navbar = () => {
    const router = useRouter();
    return (
        <>
            <AppBar>
                <Toolbar variant="dense">
                    <Typography variant="h5" onClick={() => router.replace("/")} style={{ cursor: "pointer" }}>
                        QUIZ APP
                    </Typography>
                </Toolbar>
                <Divider />
            </AppBar>
        </>
    )
}

export default Navbar
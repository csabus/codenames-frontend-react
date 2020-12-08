import {AppBar, makeStyles, Toolbar, Typography} from "@material-ui/core";

export default function MenuBar() {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                {/*
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
*/}
                <Typography variant="h6" className={classes.title}>
                    Codenames
                </Typography>
                {/*
                <Button color="inherit">Login</Button>
*/}
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
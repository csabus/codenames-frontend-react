import {Button, Card, CardActions, CardContent, CardHeader, Fab, Menu, MenuItem} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './game.css';
import {useState} from "react";
import {PlayerModel} from "../../models/Player.model";
import {TeamColor} from "../../models/TeamColor.enum";
import {Role} from "../../models/Role.enum";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Divider from '@material-ui/core/Divider';

type Props = {
    color: TeamColor;
    spyMaster?: PlayerModel;
    operatives?: Array<PlayerModel>;
    joinToTeam?: (color: TeamColor, role: Role) => void;
}

export default function Team(props: Props) {
    let {color, spyMaster, operatives, joinToTeam} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const playerId = window.localStorage.getItem('playerId');

    const openJoinMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const closeJoinMenu = () => {
        setAnchorEl(null);
    };

    const onJoin = (role: Role) => {
        closeJoinMenu();
        joinToTeam?.(color, role);
    }

    const cardHeader = (
        <CardHeader
            action={
                <div>
                    <Fab color="primary" aria-label="join" size='small' onClick={openJoinMenu}>
                        <AddIcon/>
                    </Fab>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={closeJoinMenu}
                    >
                        <MenuItem onClick={() => onJoin(Role.SPY_MASTER)} disabled={Boolean(spyMaster)}>Join as
                            spymaster</MenuItem>
                        <MenuItem onClick={() => onJoin(Role.OPERATIVE)}>Join as operative</MenuItem>
                    </Menu>
                </div>
            }
        />
    );

    const cardActions = (
        <CardActions>
            <Button size='small' color='primary' onClick={openJoinMenu}>Join to team</Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeJoinMenu}
            >
                <MenuItem onClick={() => onJoin(Role.SPY_MASTER)} disabled={Boolean(spyMaster)}>Join as
                    spymaster</MenuItem>
                <MenuItem onClick={() => onJoin(Role.OPERATIVE)}>Join as operative</MenuItem>
            </Menu>
        </CardActions>
    );

    return (
        <Card className={['card', color.toLowerCase()].join(' ')}>
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemText primary={spyMaster?.name}/>
                        <ListItemIcon>
                            {spyMaster?.id === playerId && <PersonPinIcon/>}
                        </ListItemIcon>
                    </ListItem>
                    <Divider/>
                    {operatives?.map((player, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={player.name}/>
                            <ListItemIcon>
                                {player.id === playerId && <PersonPinIcon/>}
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            {color !== TeamColor.UNDEFINED && cardActions}
        </Card>
    );
}
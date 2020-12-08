import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import GameService from '../../services/GameService';
import Team from "./Team";
import PlayerService from "../../services/PlayerService";
import './game.css';
import {PlayerModel} from "../../models/Player.model";
import {GameModel} from "../../models/Game.model";
import {TeamColor} from '../../models/TeamColor.enum';
import {Role} from "../../models/Role.enum";

type Params = {
    id: string;
}

export default function Game() {
    let {id} = useParams<Params>();
    const [player, setPlayer] = useState<PlayerModel | null>(null);
    const [game, setGame] = useState<GameModel | null>(null);
    const gameService = new GameService();
    const playerService = new PlayerService();

    useEffect(() => {
        loadGameDetails();
        loadPlayerDetails();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadGameDetails = () => {
        gameService.loadGameDetails(id)
            .then(setGame)
            .catch(console.error)
    };

    const loadPlayerDetails = () => {
        const playerId = window.localStorage.getItem('playerId');
        if (playerId != null) {
            playerService.loadPlayerDetails(playerId)
                .then(setPlayer)
                .catch(console.error)
        }
    };

    const joinToTeam = (color: TeamColor, role: Role) => {
        if (player && game) {
            gameService.joinToGame(player.id, player.gameId, color, role)
                .then(() => {
                    loadGameDetails();
                    loadPlayerDetails();
                })
                .catch(console.error);
        }
    }

    return (
        <div className='main'>
            <Team color={TeamColor.UNDEFINED} operatives={game?.unJoinedPlayerList}/>
            <Team color={TeamColor.BLUE}
                  spyMaster={game?.blueSpyMaster}
                  operatives={game?.blueOperativeList}
                  joinToTeam={joinToTeam}/>
            <Team color={TeamColor.RED}
                  spyMaster={game?.redSpyMaster}
                  operatives={game?.redOperativeList}
                  joinToTeam={joinToTeam}/>
        </div>
    );
}
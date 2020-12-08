import {Button, TextField} from "@material-ui/core";
import React, {FormEvent, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import GameService from "../../services/GameService";
import {GameModel} from "../../models/Game.model";
import PlayerService from "../../services/PlayerService";

type Params = {
    id: string;
}

export default function NewPlayer() {
    let {id} = useParams<Params>();
    const [name, setName] = useState('');
    const [game, setGame] = useState<GameModel | null>(null);
    let history = useHistory();
    const gameService = new GameService();
    const playerService = new PlayerService();

    useEffect(() => {
        gameService.loadGameDetails(id)
            .then(setGame)
            .catch(() => {
                history.replace('/');
            })
        // eslint-disable-next-line
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (name.length >= 2) {
            playerService.newPlayer(name, id)
                .then(player => {
                    window.localStorage.setItem('gameId', player.gameId);
                    window.localStorage.setItem('playerId', player.id);
                    history.push(`/game/${player.gameId}`);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };


    return (
        <div>
            <h1>Joint to game: {game?.id}</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <TextField name='name' label='Your name' value={name}
                               onChange={e => setName(e.currentTarget.value)}/>
                </div>
                <div>
                    <Button color='primary' type='submit'>Join game</Button>
                </div>
            </form>
        </div>
    );
}
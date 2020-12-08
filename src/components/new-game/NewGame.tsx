import React, {FormEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import GameService from '../../services/GameService';
import {useHistory} from "react-router-dom";

/*type Props = {
    onSubmit: (name: string) => void;
}*/

export default function NewGame() {
    const [name, setName] = useState('');
    const gameService = new GameService();
    let history = useHistory();

    /*onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    };*/

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (name.length >= 2) {
            gameService.newGame(name)
                .then(game => {
                    window.localStorage.setItem('gameId', game.gameId);
                    window.localStorage.setItem('playerId', game.playerId);
                    history.push(`/game/${game.gameId}`);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <h1>Create new game</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <TextField name='name' label='Your name' value={name}
                               onChange={e => setName(e.currentTarget.value)}/>
                </div>
                <div>
                    <Button color='primary' type='submit'>New game</Button>
                </div>
            </form>
        </div>
    );
}
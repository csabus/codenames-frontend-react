import {GameModel} from "../models/Game.model";
import {NewGameModel} from "../models/NewGame.model";
import {PlayerModel} from "../models/Player.model";

const API_BASE_URL = 'http://localhost:8080/api/games/';

export default class GameService {

    newGame(playerName: string): Promise<NewGameModel> {
        const data = {playerName};
        return new Promise<NewGameModel>((resolve, reject) => {
            fetch(API_BASE_URL, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(data => {
                resolve(data.json());
            }).catch(error => {
                reject(error);
            });
        });
    }

    loadGameDetails(id: string): Promise<GameModel> {
        return new Promise<GameModel>((resolve, reject) => {
            fetch(`${API_BASE_URL}${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(data => {
                resolve(data.json());
            }).catch(error => {
                reject(error);
            });
        });
    }

    joinToGame(playerId: string, gameId: string, color: string, role: string): Promise<PlayerModel> {
        const data = {playerId, color, role};
        return new Promise<PlayerModel>((resolve, reject) => {
            fetch(`${API_BASE_URL}join/${gameId}`, {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(data => {
                resolve(data.json());
            }).catch(error => {
                reject(error);
            });
        });
    }

}
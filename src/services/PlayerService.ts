import {PlayerModel} from "../models/Player.model";

const API_BASE_URL = 'http://localhost:8080/api/players/';

export default class PlayerService {
    loadPlayerDetails(id: string): Promise<PlayerModel> {
        return new Promise<PlayerModel>((resolve, reject) => {
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

    newPlayer(name: string, gameId: string): Promise<PlayerModel> {
        const data = {name, gameId};
        return new Promise<PlayerModel>((resolve, reject) => {
            fetch(`${API_BASE_URL}`, {
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

}
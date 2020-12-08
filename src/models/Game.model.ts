import {PlayerModel} from "./Player.model";

export interface GameModel {
    id: string;
    state: string;
    created: number;
    started: number;
    finished: number;
    owner: PlayerModel;
    redSpyMaster: PlayerModel;
    blueSpyMaster: PlayerModel;
    redOperativeList: Array<PlayerModel>;
    blueOperativeList: Array<PlayerModel>;
    unJoinedPlayerList: Array<PlayerModel>;
}
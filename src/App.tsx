import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import './App.css';
import NewGame from './components/new-game/NewGame';
import {Container} from '@material-ui/core';
import Game from './components/game/Game';
import MenuBar from "./components/menubar/MenuBar";
import NewPlayer from "./components/game/NewPlayer";

export default class App extends Component<any, any> {
    /*startNewGame = (name: string) => {
        const gameService = new GameService();
        gameService.newGame(name)
            .then(game => {
                console.log(game);
            })
            .catch(error => {
                console.error(error);
            });
    };*/

    render() {
        return (
            <Router>
                <MenuBar/>
                <Container>
                    <Switch>
                        <Route path='/game/:id/join'>
                            <NewPlayer/>
                        </Route>
                        <Route path='/game/:id'>
                            <Game/>
                        </Route>
                        <Route path='/'>
                            <NewGame/>
                        </Route>
                    </Switch>
                </Container>
            </Router>
        );
    }
}
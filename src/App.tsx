import React from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import './App.css';
import { Suggest, ItemPredicate, ItemRenderer } from "@blueprintjs/select";

export interface AppState {

};

export interface AppProps {

}

export default class App extends React.PureComponent<AppProps, AppState> {
  public state: AppState = {}

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
      </div>
    );
  }
}

import React from 'react';
import './App.css';
import ParsedTimeInput from './ParsedTimeInput';

export interface AppState {

};

export interface AppProps {

}

export default class App extends React.PureComponent<AppProps, AppState> {
  public state: AppState = {}

  public render() {
    return (
      <div className="App">
        <div className="App-Container">
          <ParsedTimeInput onTimeSelect={time => alert(time.getValue().toString())}/>
          <div className="box"/>
          <div className="box2"/>
          <div className="box"/>
          <div className="box"/>
          <div className="box2"/>
          <div className="box"/>
        </div>
      </div>
    );
  }
}

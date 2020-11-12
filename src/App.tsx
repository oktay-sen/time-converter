import React from 'react';
import './App.css';
import HumanReadableCard from './cards/HumanReadableCard';
import IsoCard from './cards/IsoCard';
import RelativeCard from './cards/RelativeCard';
import UnixMillisecondsCard from './cards/UnixMilisecondsCard';
import UnixSecondsCard from './cards/UnixSecondsCard';
import ParsedTimeInput from './ParsedTimeInput';
import { ParsedTime, TimeType } from './parsing/Types';

export interface AppState {
  selectedTime?: ParsedTime
};

export interface AppProps {

}

export default class App extends React.PureComponent<AppProps, AppState> {
  public state: AppState = {
    selectedTime: undefined
  }

  getCards() {
    const { selectedTime: time } = this.state

    if (!time || time.type === TimeType.UnparsedDate) {
      return []
    }

    return [
      <HumanReadableCard time={time}/>,
      <RelativeCard time={time}/>,
      <IsoCard time={time}/>,
      <UnixSecondsCard time={time}/>,
      <UnixMillisecondsCard time={time}/>,
    ]
  }

  public render() {
    return (
      <div className="App bp3-dark">
        <div className="App-Container">
          <ParsedTimeInput onTimeSelect={time => this.setState({ selectedTime: time })}/>
          {this.getCards()}
        </div>
      </div>
    );
  }
}

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

  private resizeMasonryGridItems() {
    const grids = [ ...document.getElementsByClassName('masonry-grid') as HTMLCollectionOf<HTMLElement> ]

    grids.forEach(grid => {
      const items = [ ...document.getElementsByClassName('masonry-item') as HTMLCollectionOf<HTMLElement> ]
      
      items.forEach((item, i) => {
        const contents = item.getElementsByClassName('masonry-content')
        if (contents.length === 0) return;

        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'), 10)
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'), 10)

        const rowSpan = Math.ceil((contents[0].getBoundingClientRect().height+rowGap)/(rowHeight+rowGap))

        item.style.gridRowEnd = "span " + rowSpan
      })
    })
  }

  componentDidMount() {
    window.addEventListener("load", this.resizeMasonryGridItems)
    window.addEventListener("resize", this.resizeMasonryGridItems)
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.resizeMasonryGridItems)
    window.removeEventListener("resize", this.resizeMasonryGridItems)
  }

  getCards() {
    const { selectedTime: time } = this.state

    if (!time || time.type === TimeType.UnparsedDate) {
      return []
    }

    return [
      <HumanReadableCard time={time} key="HumanReadableCard"/>,
      <RelativeCard time={time} key="RelativeCard"/>,
      <IsoCard time={time} key="IsoCard"/>,
      <UnixSecondsCard time={time} key="UnixSecondsCard"/>,
      <UnixMillisecondsCard time={time} key="UnixMillisecondsCard"/>,
    ]
  }

  public render() {
    return (
      <div className="App bp3-dark">
        <div className="App-Container masonry-grid">
          <ParsedTimeInput onTimeSelect={time => this.setState({ selectedTime: time })}/>
          {this.getCards()}
        </div>
      </div>
    );
  }
}

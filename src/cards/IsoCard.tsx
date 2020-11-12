import React from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import BaseTimeCard, { BaseTimeCardProps } from './BaseTimeCard'
import ClickToCopy from './ClickToCopy'
import { Moment } from 'moment';
import { ParsedTime } from '../parsing/Types';

export interface IsoCardState { }

export interface IsoCardProps extends BaseTimeCardProps { }

export default class IsoCard extends BaseTimeCard<IsoCardProps, IsoCardState> {
  public state: IsoCardState = {}

  timeToString = (time: ParsedTime) => {
    const moment = time.getValue() as Moment
    return moment.toISOString()
  }

  public render() {
    const { time } = this.props

    return (
      <ClickToCopy copyText={this.timeToString(time)}>
        <Card
          interactive={true}
          elevation={Elevation.TWO}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          className="masonry-content">
          <h5>ISO 8601</h5>
          <p><code>{this.timeToString(time)}</code></p>
        </Card>
      </ClickToCopy>
    )
  }
}

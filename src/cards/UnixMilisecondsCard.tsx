import React from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import BaseTimeCard, { BaseTimeCardProps } from './BaseTimeCard'
import ClickToCopy from './ClickToCopy'
import { Moment } from 'moment';
import { ParsedTime } from '../parsing/Types';

export interface UnixMillisecondsCardState {}

export interface UnixMillisecondsCardProps extends BaseTimeCardProps {}

export default class UnixMillisecondsCard extends BaseTimeCard<UnixMillisecondsCardProps, UnixMillisecondsCardState> {
  public state: UnixMillisecondsCardState = {}

  timeToString = (time: ParsedTime) => {
    const moment = time.getValue() as Moment
    return "" + moment.valueOf()
  }

  public render() {
    const { time } = this.props

    return (
        <ClickToCopy copyText={this.timeToString(time)}>
            <Card
                interactive={true}
                elevation={Elevation.TWO}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                <h5>Unix Timestamp (milliseconds)</h5>
                <p>{this.timeToString(time)}</p>
            </Card>
        </ClickToCopy>
    )
  }
}

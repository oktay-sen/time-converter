import React from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import BaseTimeCard, { BaseTimeCardProps } from './BaseTimeCard'
import ClickToCopy from './ClickToCopy'
import { Moment } from 'moment';
import { ParsedTime } from '../parsing/Types';

export interface UnixSecondsCardState {}

export interface UnixSecondsCardProps extends BaseTimeCardProps {}

export default class UnixSecondsCard extends BaseTimeCard<UnixSecondsCardProps, UnixSecondsCardState> {
  public state: UnixSecondsCardState = {}

  timeToString = (time: ParsedTime) => {
    const moment = time.getValue() as Moment
    return "" + moment.unix()
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
                <h5>Unix Timestamp (seconds)</h5>
                <p>{this.timeToString(time)}</p>
            </Card>
        </ClickToCopy>
    )
  }
}

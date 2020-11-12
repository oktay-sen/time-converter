import React from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import BaseTimeCard, { BaseTimeCardProps } from './BaseTimeCard'
import ClickToCopy from './ClickToCopy'
import { Moment } from 'moment';
import { ParsedTime } from '../parsing/Types';

export interface RelativeCardState {}

export interface RelativeCardProps extends BaseTimeCardProps {}

export default class RelativeCard extends BaseTimeCard<RelativeCardProps, RelativeCardState> {
  public state: RelativeCardState = {}

  timeToString = (time: ParsedTime) => {
    if (time.friendlyText === 'now') {
      return "Now"
    }
    const moment = time.getValue() as Moment
    return moment.calendar(null, {
      sameElse: `[About ${moment.fromNow()}]`
    })
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
                <h5>Relative Time</h5>
                <p><code>{this.timeToString(time)}</code></p>
            </Card>
        </ClickToCopy>
    )
  }
}

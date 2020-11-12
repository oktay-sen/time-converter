import React from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import BaseTimeCard, { BaseTimeCardProps } from './BaseTimeCard'
import ClickToCopy from './ClickToCopy'
import { Moment } from 'moment';
import { ParsedTime } from '../parsing/Types';

export interface HumanReadableCardState {}

export interface HumanReadableCardProps extends BaseTimeCardProps {}

export default class HumanReadableCard extends BaseTimeCard<HumanReadableCardProps, HumanReadableCardState> {
  public state: HumanReadableCardState = {}

  timeToString = (time: ParsedTime) => {
    const moment = time.getValue() as Moment
    return moment.toString()
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
                <h5>Date</h5>
                <p><code>{this.timeToString(time)}</code></p>
            </Card>
        </ClickToCopy>
    )
  }
}

import React from 'react';
import { Card, Elevation, Popover } from "@blueprintjs/core";
import BaseTimeCard, { BaseTimeCardProps } from './BaseTimeCard'
import ClickToCopy from './ClickToCopy'
import { Moment } from 'moment';

export interface IsoCardState {}

export interface IsoCardProps extends BaseTimeCardProps {}

export default class IsoCard extends BaseTimeCard<IsoCardProps, IsoCardState> {
  public state: IsoCardState = {}

  momentToString = (moment: Moment) => moment.toISOString()

  public render() {
    const { time } = this.props

    const moment = time.getValue() as Moment

    return (
        <ClickToCopy copyText={this.momentToString(moment)}>
            <Card
                interactive={true}
                elevation={Elevation.TWO}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                <h5>ISO 8601</h5>
                <p>{this.momentToString(moment)}</p>
            </Card>
        </ClickToCopy>
    )
  }
}

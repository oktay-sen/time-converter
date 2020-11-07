import React from 'react';
import { ParsedTime } from '../parsing/Types'


export interface BaseTimeCardProps {
    time: ParsedTime
}

export default abstract class BaseTimeCard<T extends BaseTimeCardProps, U> extends React.PureComponent<T, U> {
  private timer?: number = undefined

  componentDidMount() {
      if (this.props.time.isDynamic) {
          this.startUpdateTimer()
      }
      window.addEventListener("focus", this.onFocus.bind(this))
      window.addEventListener("blur", this.onBlur.bind(this))
  }

  componentWillUnmount() {
      this.stopUpdateTimer()
      window.removeEventListener("focus", this.onFocus.bind(this))
      window.removeEventListener("blur", this.onBlur.bind(this))
  }

  onFocus = () => {
    if (this.props.time.isDynamic) {
        this.startUpdateTimer()
    }
  }

  onBlur = () => {
      this.stopUpdateTimer()
  }

  onMouseEnter = () => {
      this.stopUpdateTimer()
  }

  onMouseLeave = () => {
      if (this.props.time.isDynamic) {
        this.startUpdateTimer()
      }
  }

  startUpdateTimer = () => {
      if (!this.timer) {
          this.timer = setInterval(this.forceUpdate.bind(this), 100)
      }
  }

  stopUpdateTimer = () => {
      if (this.timer) {
          clearInterval(this.timer)
          this.timer = undefined
      }
  }
}

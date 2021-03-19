import React, { Component } from "react";
import Circle from "../ProgressCircle/ProgressCircle";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerValue: props.timerValue,
      minutes: 0,
      seconds: 0,
      interval: 0,
      progress: 100,
      color: "#3c484a"
    };
  }

  decrementTimeRemaining = () => {
    if (this.state.timerValue > 0) {
      this.setState({
        timerValue: this.state.timerValue - 1000
      });
      this.setState({
        minutes: new Date(this.state.timerValue).getUTCMinutes(),
        seconds: new Date(this.state.timerValue).getSeconds()
      });
const timePercentageLeft = ((this.state.timerValue/1000) / (this.props.timerValue/1000)) * 100
      this.setState({
        progress:timePercentageLeft,
        color:'#ff5155'
      })
    }
  };

  componentDidMount() {
    this.setState({
      minutes: new Date(this.state.timerValue).getUTCMinutes(),
      seconds: new Date(this.state.timerValue).getSeconds()
    });
    this.interval = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  }

  render() {
    const {
      minutes,
      seconds,
      progress,
      color
    } = this.state;
    return (
      <Circle
        progress={progress}
        size={200}
        strokeWidth={15}
        circleOneStroke="#3c484a"
        circleTwoStroke={color}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
}

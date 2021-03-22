import React, { Component } from "react";
import Circle from "../ProgressCircle/ProgressCircle";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerValue: props.timerValue,
      minutes: 0,
      seconds: 0,
      progress: 100,
      color: "#ff5155"
    };
  }

  decrementTimeRemaining = () => {
    if (this.state.timerValue > 0) {
      this.setState({
        timerValue: this.state.timerValue - 1000
      });
      this.setState({
        minutes: new Date(this.state.timerValue>0?this.state.timerValue:0).getUTCMinutes(),
        seconds: new Date(this.state.timerValue>0?this.state.timerValue:0).getSeconds()
      });
const timePercentageLeft = ((this.state.timerValue/1000) / (this.props.timerValue/1000)) * 100
      this.setState({
        progress:timePercentageLeft,
        color:'#ff5155'
      })
    }
    else if(this.state.timerValue <= 0){
      this.setState({
        timerValue: 0
      });
      clearInterval(this.interval);
      this.props.onTimeUp();
    }
  };

  componentDidMount() {
    
    this.interval = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  }

  componentDidUpdate(prevProps){
    if(prevProps.currentWord !== this.props.currentWord){
      this.setState({
        timerValue:this.props.timerValue,
        progress:100,
        color:'#ff5155',
      });
      if(this.interval !== null) clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.decrementTimeRemaining();
      }, 1000);

    }
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

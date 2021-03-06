import React, { Component } from "react";
import Circle from "../ProgressCircle/ProgressCircle";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerValue: props.timerValue,
      seconds: 0,
      milliSeconds:0,
      progress: 100,
      color: "#ff5155"
    };
  }

  decrementTimeRemaining = () => {
    if (this.state.timerValue > 0) {
      this.setState({
        timerValue: this.state.timerValue - 100
      });
      this.setState({
        seconds: new Date(this.state.timerValue).getUTCSeconds(),
        milliSeconds : (this.state.timerValue % 1000)/10,
      });
    const timePercentageLeft = ((this.state.timerValue) / (this.props.timerValue)) * 100
    if(timePercentageLeft <= 100 && timePercentageLeft >50 ){
      this.setState({
        color:'#47b989'
      })
    }
    else if(timePercentageLeft <= 50 && timePercentageLeft > 15){
      this.setState({
        color:'orange'
      })
    }
    else if(timePercentageLeft <= 25 ){
      this.setState({
        color:'#ff5155'
      })
    }
      this.setState({
        progress:timePercentageLeft,
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
    if(this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.decrementTimeRemaining();
    }, 100);
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
      }, 100);

    }
  }

  render() {
    const {
      seconds,
      milliSeconds,
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
        seconds={seconds}
        milliSeconds={milliSeconds}
      />
    );
  }
}

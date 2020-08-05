import React, { Component } from "react";
import { View,Text,Button,StyleSheet } from "react-native";

let timer = () => {};

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
        time: 0,
        stopped: false
      };
  }

  componentDidMount() {
    if (this.props.down === true) {
      this.countdownTimer(this.props.startTime);
    } else {
      this.countupTimer();
    }
  }

  componentWillUnmount() {
    if (!this.state.stopped) {
      this.stop();
    }
  }

  countdownTimer(startTime){
    this.setState({ time: startTime });
    clearInterval(timer);
    timer = setInterval(() =>{
      if(!this.state.time){
        clearInterval(timer);
        return false;
      }
      this.setState(prevState =>{
      return {time: prevState.time - 1}});
    }, 1000);
  }

  countupTimer() {
    clearInterval(timer);
    timer = setInterval(()=>{
      this.setState(prevState => ({time: prevState.time + 1}));
    }, 1000)
  }

  stop() {
    this.setState({stopped: true})
    clearInterval(timer);
    if (this.props.callback)
      this.props.callback(this.state.time);
  }

  reset() {
    this.setState({time: 0})
  }

  getTime() {
    return this.state.time;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Time :{this.state.time}</Text>
      </View>
    );
  }
}


  const styles = StyleSheet.create({
    container:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   } 
});

import React, { Component } from "react";
import { View,Text,Button,StyleSheet } from "react-native";

const timer = () => {};

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
        time: 0
      };
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
    clearInterval(timer);
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
        <Text>Remaining time :{this.state.remainingTime}</Text>
        <Button title ="Start timer" onPress={()=>this.countdownTimer()}/>
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

  export default Stopwatch;
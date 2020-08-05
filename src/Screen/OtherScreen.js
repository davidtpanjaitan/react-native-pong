import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Animated,
  Dimensions,
  PanResponder
} from 'react-native';

import { Easing } from 'react-native-reanimated';
export default class OtherScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ballLeft: new Animated.Value(0),
      ballTop: new Animated.Value(0),
      playerLeft: new Animated.Value(0),
      playerLife: 10,
      bgcolor: 'black'
    }
    this.state.ballLeft.addListener(({value}) => {this.ballx = value});
    this.state.playerLeft.addListener(({value})=>{this.playerx = value});
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {moveX: this.state.playerLeft}
      ], {useNativeDriver: false})
    });
  }

  componentDidMount() {
    this.state.ballTop.addListener(({value}) => {
      if (value === 440) {
        if (this.ballx < this.playerx - 5 || this.ballx > this.playerx + 55) {
          this.setState((prev)=>({playerLife: prev.playerLife-1, bgcolor:'red'}))
          setTimeout(()=>{
            this.setState({bgcolor:'black'});
          }, 300)
        }
      }
    })
    this.vertiAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.ballTop,
          {
            toValue: 440,
            easing: Easing.linear,
            duration: 1001,
            useNativeDriver: false
          }
        ),
        Animated.timing(
          this.state.ballTop,
          {
            toValue: 0,
            easing: Easing.linear,
            duration: 1001,
            useNativeDriver: false
          }
        )
      ])
    );
    this.vertiAnim.start();  
    this.horiAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.ballLeft,
          {
            toValue: Dimensions.get('window').width - 10,
            easing: Easing.linear,
            duration: 1234,
            useNativeDriver: false
          }
        ),
        Animated.timing(
          this.state.ballLeft,
          {
            toValue: 0,
            easing: Easing.linear,
            duration: 1234,
            useNativeDriver: false
          }
        )
      ])
    );
    this.horiAnim.start();  
  }

  componentWillUnmount() {
    this.vertiAnim.stop();
    this.horiAnim.stop();  
  }

  gameOver() {
    this.vertiAnim.stop();
    this.horiAnim.stop();  
  }

  render() {
    return (
        <>
            <View style={{width:'100%', height:'90%', backgroundColor:this.state.bgcolor}}>
                <Animated.View style={[this.Styles.bar, this.Styles.enemy, {left: this.state.ballLeft}]}></Animated.View>
                <View style={this.Styles.field}>
                    <Animated.View style={[this.Styles.ball, {left: this.state.ballLeft, top: this.state.ballTop}]}></Animated.View>
                </View>
                <Animated.View style={[this.Styles.bar, this.Styles.player, {left:this.state.playerLeft}]} {...this.panResponder.panHandlers}></Animated.View>
            </View>
            <View style={this.Styles.scoreBoard}>
              <Text>Player Life: {this.state.playerLife}</Text>
            </View>
        </>
    );
  }

  Styles = StyleSheet.create({
    field: {
      backgroundColor: 'gray',
      height:450
    },
    bar: {
      width: 50,
      height: 10,
      backgroundColor: 'white'
    },
    ball: {
      width: 10,
      height: 10,
      backgroundColor: 'red'
    },
    enemy: {
      marginTop:40
    },
    player: {
      marginBottom:40
    },
    scoreBoard: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 20
    }
  })
}


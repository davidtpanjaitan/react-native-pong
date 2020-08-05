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
  Dimensions
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Easing } from 'react-native-reanimated';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftPos: new Animated.Value(0),
      topPos: new Animated.Value(0)
    };
  }
  
  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.leftPos,
          {
            toValue: Dimensions.get('window').width - 10,
            easing: Easing.linear,
            duration: 1000,
            useNativeDriver: false
          }
        ),
        Animated.timing(
          this.state.leftPos,
          {
            toValue: 0,
            easing: Easing.linear,
            duration: 1000,
            useNativeDriver: false
          }
        )
      ],
      {useNativeDriver:true}),
      {useNativeDriver:true}
    ).start()
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.topPos,
          {
            toValue: 20,
            easing: Easing.linear,
            duration: 100,
            useNativeDriver: false
          }
        ),
        Animated.timing(
          this.state.topPos,
          {
            toValue: 0,
            easing: Easing.linear,
            duration: 100,
            useNativeDriver: false
          }
        )
      ])
    ).start()
  }

  compon

  render() {
    return (
      <View>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>The Impossible Game</Text>
                <Text style={styles.sectionDescription}>
                  This game is just pong, but the opponent is perfect and i haven't really implemented a way to end the game, but it's a nice use of react native animation
                </Text>
              </View>
              <Animated.View style={[styles.blueBox, {width:10, height:10, left:this.state.leftPos, top:this.state.topPos}]}></Animated.View>
              <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, styles.blueBox]}>Warning</Text>
                <Text style={styles.sectionDescription}>
                  The game uses DOM manipulation to animate so it's really not optimized and you might experience lag.
                </Text>
              </View>
              <Button
              style={{width:100}}
                onPress={() => {
                  this.props.navigation.navigate('Other')
                }}
                title="Start playing"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  blueBox : {
    backgroundColor: 'rgb(255,0,0)',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
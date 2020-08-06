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
  FlatList
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { Easing } from 'react-native-reanimated';

import { connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor } from '../store';
import { bindActionCreators } from 'redux';
import { actions } from '../Action/TimeActions';

class HomeScreen extends React.Component {
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

  parseDatetime(date) {
    let dateString = (new Date(date)).toISOString().split('T')
    dateString = dateString[0] +' '+ dateString[1].substring(0,8)
    return dateString;
  }

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
                  This game is just pong, but the opponent is perfect. There is no real win condition, but it's a nice use of react native animation, so try to survive as long as you can.
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
                onPress={() => {
                  this.props.navigation.navigate('Other')
                }}
                title="Start playing"
              />
            </View>
          </ScrollView>
          <PersistGate loading={<Text>loading scores...</Text>} persistor={persistor}>
            <View style={styles.scoreBoard}>
              <Text style={styles.bestTime}>Best time: {this.props.timeScore.bestTime} seconds</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Score history</Text>
                <Button 
                  onPress={()=>this.props.clearHistoryDispatch()}
                  title="Clear"
                />
              </View>
              <FlatList
                data={this.props.timeScore.timeHistory}
                renderItem={({item}) => 
                  <View style={styles.listItem}>
                    <Text>{item.time} seconds</Text>
                    <Text>{this.parseDatetime(item.datetime)}</Text>
                  </View>
                }
              />
            </View>
          </PersistGate>
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
    marginBottom: 16
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
  scoreBoard: {
    margin: 15,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  bestTime: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 7,
    borderTopColor: 'gray',
    borderTopWidth: 1
  }
});

const mapStateToProps = (state) => {
  return { timeScore: state.time }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    clearHistoryDispatch: actions.clearHistory,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
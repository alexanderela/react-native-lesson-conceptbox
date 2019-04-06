import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.conceptInput}
          onChangeText={(text) => this.setState({ text })}
        />
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    borderColor: 'pink',
    borderWidth: 2,
    margin: 10
  },
  conceptInput: {
    height: 30,
    width: 200,
    fontSize: 30,
    color: 'red',
    borderColor: 'black',
    borderWidth: 2
  },
});

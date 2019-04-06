import React from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
const uuidv4 = require('uuid/v4');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      concepts: [],
      error: ''
    }
  }

  checkInput = () => {
    const { text } = this.state

    if(text.trim() !== '') {
      this.handleSubmit()
    } else {
      this.setState({ error: 'Please enter a concept with at least 1 letter.' })
    }
  }

  handleSubmit = () => {
    const { text } = this.state
    const newConcept = { concept: text, id: uuidv4() }
    const concepts = [...this.state.concepts, newConcept]
    this.setState({ concepts })
    this.displayConcepts()
  }

  displayConcepts = () => {
    const allConcepts = this.state.concepts.map(concept => {
      return <View key={uuidv4()} style={styles.conceptTitle}>
              <Text>{concept.title}</Text>
          </View>
    })
    return allConcepts
  }

  render() {
    const { text, concepts, error } = this.state;
    const allConcepts = this.displayConcepts()

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.conceptInput}
          onChangeText={(text) => this.setState({ text })}
        />
        <Text>{this.state.error}</Text>
        <View style={styles.submitButton}>
          <Button 
            title='Add Concept'
            onPress={this.checkInput}
            color='#fff'
          />
        </View>
        <View style={styles.conceptContainer}>
          {allConcepts}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conceptTitle: {
    fontSize: 20,
    color: 'red',    
    width: 200,
    height: 100
  },
  conceptContainer: {
    borderColor: 'blue',
    borderWidth: 2,
    height: 500,
    width: 200
  },
  concepts: {
    height: 50,
    width: 200,
    fontSize: 40,
    color: '#fff',
    backgroundColor: 'red'    
  },
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
    fontSize: 20,
    color: 'red',
    borderColor: 'black',
    borderWidth: 2
  },
  submitButton: {
    height: 50,
    width: 200,
    fontSize: 40,
    color: '#fff',
    backgroundColor: '#00adff'
  }
});

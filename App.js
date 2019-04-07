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
      this.setState({ error: '' })
      this.handleSubmit()
    } else {
      this.setState({ error: 'Please enter a concept with at least 1 letter.' })
    }
  }

  handleSubmit = () => {
    const { text } = this.state
    const newConcept = { text: text, id: uuidv4() }
    const concepts = [...this.state.concepts, newConcept]

    this.setState({ concepts, text: '' })
    this.displayConcepts()
  }

  displayConcepts = () => {
    return this.state.concepts.map(concept => {
      const { text, id } = concept
      return <View key={uuidv4()} style={styles.conceptTitle}>
              <Text>{text}</Text>
              <Button
                title='X'
                onPress={() => this.removeConcept(id)} 
              />
          </View>
    })
  }

  removeConcept = (id) => {
    const concepts = this.state.concepts.filter(concept => {
      return concept.id !== id
    })
    this.setState({ concepts })
  }

  render() {
    const { text, concepts, error } = this.state;

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.conceptInput}
          onChangeText={(text) => this.setState({ text })}
          value={text}
        />

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{this.state.error}</Text>
        </View>

        <View style={styles.submitButton}>
          <Button 
            title='Add Concept'
            onPress={this.checkInput}
            color='#fff'
          />
        </View>
        <View style={styles.conceptContainer}>
          {this.displayConcepts()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    height: 35,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    margin: 3
  },
  errorText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'red',
  },
  conceptTitle: {
    fontSize: 20,
    color: 'red',    
    width: 200,
    height: 100,
    borderColor: 'orange',
    borderWidth: 2,
  },
  conceptContainer: {
    height: '100%',
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
  },
  conceptInput: {
    height: 40,
    width: 200,
    fontSize: 20,
    color: '#000',
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5
  },
  submitButton: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    width: 200,
    fontSize: 40,
    color: '#fff',
    backgroundColor: '#00adff',
    borderRadius: 5
  }
});

import React from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
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
      return <View key={uuidv4()} style={styles.concepts}>
              <TouchableOpacity 
                onPress={() => this.removeConcept(id)}
                style={styles.deleteButton}
               >
                <Text style={styles.deleteButtonText}>x</Text>
              </TouchableOpacity>
              <View style={styles.conceptContent}>
                <Text style={styles.conceptText}>{text}</Text>
              </View>
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
        <TouchableOpacity 
          onPress={this.checkInput}
          style={styles.submitButton}
         >
          <Text style={styles.submitButtonText}>Add Concept</Text>
        </TouchableOpacity>
        <View style={styles.conceptContainer}>
          {this.displayConcepts()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deleteButtonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 200,
    backgroundColor: '#00adff',
    borderRadius: 5
  },
  concepts: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 300,
    height: 100,
    color: '#fff',
    backgroundColor: '#f15432',
    paddingTop: 10,    
    paddingBottom: 20,    
    paddingLeft: 20,    
    paddingRight: 20,    
    marginBottom: 20,
    borderRadius: 10
  },
  errorContainer: {
    height: 35,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    margin: 8
  },
  errorText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'red',
  },
  conceptText: {
    color: '#fff',
    fontSize: 18,
  },
  conceptContent: {
    display: 'flex',
    alignItems: 'flex-start',
    // justifyContent: 'center',
    fontSize: 20,
    width: '100%',    
    height: 30,
  },
  conceptContainer: {
    height: '100%',
    width: 300,
    padding: 5,
    marginTop: 30
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
});

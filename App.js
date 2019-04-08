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
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTextConcept}>Concept
            <Text style={styles.toolbarTextBox}>Box</Text>
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.instructions}>
            <Text style={styles.instructionsText}>Enter your concept below:</Text>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.state.error}</Text>
          </View>
          <TextInput 
            style={styles.conceptInput}
            onChangeText={(text) => this.setState({ text })}
            value={text}
          />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructionsText: {
    color: '#050505',
    fontSize: 20,
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#eaeef0',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  toolbar: {
    alignItems: 'center',
    backgroundColor: '#7fc244',
    height: 100,
    justifyContent: 'flex-end',
    paddingBottom: 6,
    width: '100%',
  },
  toolbarTextConcept: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  toolbarTextBox: {
    color: '#f15432',
    fontSize: 30,
    fontWeight: 'normal',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#1b9aaa',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginTop: 30,
    width: 200,
  },
  concepts: {
    alignItems: 'flex-end',
    backgroundColor: '#f15432',
    borderRadius: 10,
    color: '#fff',
    height: 100,
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 20,    
    paddingLeft: 20,    
    paddingRight: 20,    
    paddingTop: 10,    
    width: 300,
  },
  errorContainer: {
    display: 'flex',
    height: 35,
    justifyContent: 'center',
    margin: 8,
    width: 200,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
  conceptText: {
    color: '#fff',
    fontSize: 18,
  },
  conceptContent: {
    alignItems: 'flex-start',
    display: 'flex',
    fontSize: 20,
    height: 30,
    width: '100%',    
  },
  conceptContainer: {
    height: '100%',
    marginTop: 30,
    padding: 5,
    width: 300,
  },
  conceptInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#050505',
    fontSize: 20,
    height: 40,
    marginTop: 10,
    paddingLeft: 10,
    width: 300,
  },
});

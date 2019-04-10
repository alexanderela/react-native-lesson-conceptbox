import React, {Component} from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
const uuidv4 = require('uuid/v4');
// import InputForm from './src/InputForm/InputForm.js';
// import ConceptContainer from './src/ConceptContainer/ConceptContainer.js';

export default class App extends Component {
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
      const { 
              concepts, 
              deleteButton, 
              deleteButtonText, 
              conceptContent, 
              conceptText 
            } = styles;

      return <View key={uuidv4()} style={concepts}>
              <TouchableOpacity 
                onPress={() => this.removeConcept(id)}
                style={deleteButton}
               >
                <Text style={deleteButtonText}>x</Text>
              </TouchableOpacity>
              <View style={conceptContent}>
                <Text style={conceptText}>{text}</Text>
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
    const { 
            container, 
            toolbar, 
            toolbarTextConcept, 
            toolbarTextBox, 
            content, 
            instructions, 
            instructionsText,
            errorContainer,
            errorText,
            conceptInput,
            submitButton,
            submitButtonText,
            conceptContainer 
          } = styles;

    return (
      <View style={container}>
        <View style={toolbar}>
          <Text style={toolbarTextConcept}>Concept
            <Text style={toolbarTextBox}>Box</Text>
          </Text>
        </View>
        <View style={content}>
          <View style={instructions}>
            <Text style={instructionsText}>Enter your concept below:</Text>
          </View>
          <View style={errorContainer}>
            <Text style={errorText}>{error}</Text>
          </View>
          <TextInput 
            style={conceptInput}
            onChangeText={(text) => this.setState({ text })}
            value={text}
          />
          <TouchableOpacity 
            onPress={this.checkInput}
            style={submitButton}
           >
            <Text style={submitButtonText}>Add Concept</Text>
          </TouchableOpacity>
          <View style={conceptContainer}>
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

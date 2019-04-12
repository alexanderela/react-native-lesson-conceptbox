import React, {Component} from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
const uuidv4 = require('uuid/v4');

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
    const trimmedText = text.trim()

    if(trimmedText !== '' && trimmedText.length <= 46) {
      this.setState({ error: '' })
      this.handleSubmit()
    } else if(trimmedText === '') {
      this.setState({ error: 'Please enter a concept with at least 1 letter.' })
    } else if(trimmedText.length > 46) {
      this.setState({ error: 'Please enter 46 or fewer characters.' })
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
              conceptContentDeleteWrapper,
              conceptContent, 
              conceptText, 
              deleteButton, 
              deleteButtonText, 
            } = styles;

      return <View key={uuidv4()} style={concepts}>
              <View style={conceptContentDeleteWrapper}>
                <View style={conceptContent}>
                  <Text style={conceptText}>{text}</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => this.removeConcept(id)}
                  style={deleteButton}
                 >
                  <Text style={deleteButtonText}>x</Text>
                </TouchableOpacity>
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
          <View>
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
  container: {
    backgroundColor: '#fff',
    flex: 1,
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
  content: {
    alignItems: 'center',
    backgroundColor: '#eaeef0',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  instructionsText: {
    color: '#050505',
    fontSize: 20,
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
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#1b9aaa',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginTop: 30,
    width: 200,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  conceptContainer: {
    alignItems: 'center',
    height: '100%',
    marginTop: 30,
    padding: 5,
    width: 300,
  },
  concepts: {
    alignItems: 'flex-end',
    backgroundColor: '#f15432',
    borderRadius: 10,
    color: '#fff',
    height: 100,
    justifyContent: 'space-between',
    marginBottom: 20,
    width: 300,
  },
  conceptContentDeleteWrapper: {
    flexDirection: 'row',
    height: '100%',
    width: 300
  },
  conceptContent: {
    alignItems: 'flex-start',
    fontSize: 20,
    height: '100%',
    justifyContent: 'center',
    paddingBottom: 20,    
    paddingLeft: 20,    
    paddingRight: 20,    
    paddingTop: 20,    
    width: '80%',    
  },
  conceptText: {
    justifyContent: 'center',
    color: '#fff',
    fontSize: 18,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#f15432',
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: '100%',
    justifyContent: 'center',
    width: '20%',
  },
  deleteButtonText: {
    fontSize: 22,
  },
});

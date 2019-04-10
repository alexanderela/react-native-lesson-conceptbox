import React from 'react';

export default class InputForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
      text: '',
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


	render() {
		return (
			<View>
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
			</View>
			)
	}
}

const styles = StyleSheet.create({
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
})
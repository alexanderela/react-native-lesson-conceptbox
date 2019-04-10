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
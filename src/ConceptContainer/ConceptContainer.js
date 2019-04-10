import React from 'react';
// import Card from '../Card/Card.js';

const ConceptContainer = () => {
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

export default ConceptContainer;
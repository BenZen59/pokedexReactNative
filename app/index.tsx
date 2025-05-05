import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
    <Text>Modifier le texte ici</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF0000',
    padding: 24,
  },
})

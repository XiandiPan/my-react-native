import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, TextInput } from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [name, setName] = useState('Cindy');
  const [person, setPerson] = useState({name: 'mario', age: 40});

  const clickHandler = () => {
    setName("Xiandi");
    setPerson({name: "lugi", age: 45})
  }

  return (
    <View style={styles.container}>
        <Text> my name is {name}</Text>
        <Text>His name is {person.name} and his age is {person.age}</Text>
        <View style={styles.buttonContainer}>
          <Button title='update state' onPress={clickHandler}/>
        </View>
        <TextInput style={styles.input}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
  marginTop: 20,
},
TextInput: {
  borderWidth: 1,
  borderColor: 'black',
  padding: 10,
  margin: 10,
}
});

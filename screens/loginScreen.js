import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import * as firebase from 'firebase';
import db from '../config.js';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      
    };
  }

  login = () => {
    if(this.state.email && this.state.password){
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        this.props.navigation.navigate('Transaction')
      })
      .catch((error) => {
        var errorCode = error.code;
        console.log(errorCode)
        if(errorCode==='auth/invalid-email'){
          alert('Wrong Email ID')
        }
        // var errorMessage = error.message;
        // alert(errorMessage)
      });
    }
    else{
      alert('Please enter Email and Password')
    }
  };

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <TextInput
          placeholder={'Email'}
          value={this.state.email}
          onChangeText={(x) => {
            this.setState({ email: x });
          }}
          style={styles.mail}
        />
        <TextInput
          placeholder={'Password'}
          value={this.state.password}
          onChangeText={(x) => {
            this.setState({ password: x });
          }}
          style={[styles.mail, { marginTop: 30 }]}
          secureTextEntry={true}
        />
        <TouchableOpacity 
        style={styles.login}
        onPress={
          this.login
        }
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mail: {
    borderWidth: 3,
    textAlign: 'center',
    marginTop: 120,
    width: '80%',
  },
  login: {
    textAlign: 'center',
    borderWidth: 3,
    width: '30%',
    marginTop: 60,
  },
});

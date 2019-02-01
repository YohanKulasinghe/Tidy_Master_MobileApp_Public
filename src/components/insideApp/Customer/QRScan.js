import React, { Component } from 'react';
 
import { StyleSheet, Text, AsyncStorage,TouchableOpacity } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { Actions } from 'react-native-router-flux';
import { View } from 'native-base';
const host = require('./../../common/config')
 
class QRScan extends Component {
  constructor(props){
    super(props)
    this.state={
      token:null,
      postid:''
    }
  }

componentWillMount(){
    this.getToken().done()    
}

handletoken(text){
  this.setState({token:text})
}

getToken = async () => {
  try {
      var token = await AsyncStorage.getItem('token')
      this.handletoken(token)
  } catch (error) {
      alert('Unknown error, token not retrive');
  }
}

  onSuccess(e) {
    fetch(host.config.hostname+'/customer/donejob', {
      method: 'POST',
      headers: {
        'Authorization': this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       'postid':e.data
      }),   
  }).then((response) => response.json())
    .then((res) => {
          if (res.state === true) {
            Actions.Finished()
          } else {
            alert(res.msg)
          }
      })
      .done();
  }
 
  render() {
    if(this.state.token!=null){
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text></Text>
        }

        bottomContent={
          <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.Finished({postid:'JFIY3DC9d'})}>
          <Text style={styles.buttonText}>test</Text>
        </TouchableOpacity>
        }
      />
    );
      }
      return(
        <View>
          <Text>Something went wrong</Text>
        </View>
      )
  }
}
 
const styles = StyleSheet.create({

});



export default QRScan;
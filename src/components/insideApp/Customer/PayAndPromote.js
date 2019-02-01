import React, { Component } from 'react';
import { View, StyleSheet, Text, WebView } from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';




 
const PolicyHTML = require('./a.html');

class PavementAndPromote extends Component{
  constructor(props){
    super(props);
    this.state={
      postid:this.props.postid
    }
  }


 
render(){
  return(

    <View style={{flex: 1, backgroundColor:'white'}}>
    
    <WebView
         source={PolicyHTML}
        
        />

      <View>

      </View>
        <Text style={{color:'red'}}>**Important</Text>
        <Text>   {this.state.postid}</Text>
        <Text>   Enter above id as POST ID and fill below form </Text>
        <Text>   Admin will review and add your job to Promote category </Text>
        <Text>   After finished Click On Go Back </Text>
      </View>
 
  )
}

}


export default PavementAndPromote;
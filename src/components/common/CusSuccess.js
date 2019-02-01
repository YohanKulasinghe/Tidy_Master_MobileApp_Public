import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
export default class CusSuccess extends Component{

constructor(props){
    super(props)
    this.state={
        msg:this.props.msg
    }
}

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={{uri: "https://png.icons8.com/good-quality/ultraviolet/200/3498db"}} />
        <Text style={styles.title}>{this.state.msg}</Text>
       
        <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.CustomerMyJob()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    paddingTop:50,
    marginHorizontal:20, 
  },
  icon:{
    width:200,
    height:200,
  },
  title:{
    fontSize:24,
    textAlign: 'center',
    marginTop:22,
    color: "#5F6D7A"
  },
  description: {
    marginTop:20,
    textAlign: 'center',
    color: "#A9A9A9",
    fontSize:16,
    margin:40,
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  loginButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize:20,
  }
});
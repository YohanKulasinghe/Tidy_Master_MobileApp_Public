import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
const host = require('./../../common/config')
import { Actions } from 'react-native-router-flux';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data:[],
        token:'',      
    };
}

componentWillMount(){
  this.getToken().done()
}

handletoken(text){
  this.setState({token:text})
}

getToken = async () => {
  try {
      let token = await AsyncStorage.getItem('token')
      this.handletoken(token)
      this.getProfileData()
  } catch (error) {
      alert(error);
  }
}

getProfileData(){
  //alert(this.state.token)
  fetch(host.config.hostname+'/user/profile', {
    method: 'GET',
    headers: {
      'Authorization': this.state.token,
      'Content-Type': 'application/json'
    }   
}).then((response) => response.json())
  .then((res) => {
        if (res.state === true) {
          this.setState({data:res.userdata})
          //console.log(res.userdata)
          //console.log('hi')
        } else {
            
        }
    })
    .done();
}

  render() {
    return (
      <View style={styles.container}>
          
          <Image style={styles.header} source={require('../../images/Happy-Hands.jpg')}/>
          <Image style={styles.avatar} source={{uri: this.state.data.photourl}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.data.firstName}  {this.state.data.lastName}</Text>
              
            <Text style={styles.info}>Tidy Master /Customer </Text>
  
            <View style={styles.details}><Text>{this.state.data.email}</Text></View>
            <View style={styles.details}><Text>{this.state.data.rolename}</Text></View>
            <View style={styles.details}><Text>{this.state.data.address}</Text></View>
            <View style={styles.details}><Text>{this.state.data.description}</Text></View>
            <View style={styles.details}><Text>{this.state.data.telephone}</Text></View>
            <View style={styles.details}><Text>{this.state.data.nic}</Text></View>
           
            <Text></Text>
              <TouchableOpacity style={styles.buttonContainer} onPress={()=>Actions.EditProfile()}>
                <Text>Edit My Details</Text>  
              </TouchableOpacity>              
            </View>
        </View>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    width: '100%',
    height: '50%'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10, 
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:5
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
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
    backgroundColor: "#5297e4",
  },
  starContainer:{
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:3
  },
  star:{
    width:40,
    height:40,
  },
  details: {
    paddingTop:25
  }
});
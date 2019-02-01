import React, { Component } from 'react';
import { View, Text,ScrollView, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, H2 } from 'native-base';
import { Actions } from 'react-native-router-flux';
const host = require('./../common/config')

export default class Registration extends Component{
  constructor(props){
    super(props);
}
state={
  firstname:this.props.firstname,
  lastname:this.props.lastname,
  nic:this.props.nic,    
  gender:this.props.gender,  
  username:this.props.username,
  email:this.props.email,
  role:this.props.role,
  telephone:this.props.telephone,
  address:this.props.address,

  photoId:'null',
  password:null,
}


register(){
  fetch(host.config.hostname+'/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accessresource':'registeramin' 
    },
    body: JSON.stringify({
      firstname:this.state.firstname,
      username:this.state.username,
      lastname:this.state.lastname,
      nic:this.state.nic,    
      email:this.state.email,
      gender:this.state.gender,
      role:this.state.role,
      photoId:this.state.photoId,
      password:this.state.password,
      phoneno:this.state.telephone,
      address:this.state.address,
       
    }),
}).then((response) => response.json())
  .then((res) => {
      if (res.state === true) {
        Actions.RegisterdSuccessfully()
        }
        else{
          alert(res.msg);
        }
  })
  .done();
}
    
  render() {
   return(
      <Container style={{padding:10, backgroundColor:'#F5F5F5'}}>
      <ScrollView>
      <View style={styles.imgContainer}>
       <Image style={styles.icon} source={require('./../images/regDetails/review.png')} />
       <Text style={styles.topic}>Please review : </Text>
       </View>
              
              <Text>Personal Details :</Text>
               <Text>Name   :{this.state.firstname} {this.state.lastname}</Text>
               <Text>NIC    :{this.state.nic}</Text>
               <Text>gender :{this.state.gender}</Text>
               <Text></Text>
               <Text>Tidy Accout Details :</Text>
               <Text>Username :{this.state.username}</Text>
               <Text>Email    :{this.state.email}</Text>
               <Text>As       :{this.state.role}</Text>
               <Text></Text>
               <Text>Contact Details :</Text>
               <Text>Mobile No :{this.state.telephone}</Text>
               <Text>Address   :{this.state.address}</Text>
               <Text></Text>
              

                <Button style={styles.regBtn} transparent primary title="goBack" onPress={() => Actions.Reg3()}><Text>Go Back and correct</Text></Button>
                <Button style={styles.regBtn} rounderd full title="Register Now" onPress={() => {this.register()}}><Text>Register Now</Text></Button>
                <Button style={styles.regBtn} transparent title="test" onPress={() => Actions.RegisterdSuccessfully()}><Text> test</Text></Button>

               </ScrollView>
      </Container>
   );
  }
}




const styles = StyleSheet.create({
  txtBox:{
   backgroundColor:'#ffffff',
   marginTop:8,
   height:60,
  },
  regBtn: {
    marginTop: 10
  },
  imgContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  icon:{
    width:200,
    height:200,
  },
  topic:{
      marginTop:5,
      color:'#C0C0C0',
      fontSize:16,
      fontFamily: 'Iowan Old Style'
    }
})
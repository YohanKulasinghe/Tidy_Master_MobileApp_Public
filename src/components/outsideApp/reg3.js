import React, { Component } from 'react';
import { View, Text,ScrollView, KeyboardAvoidingView, StyleSheet, AsyncStorage, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, H2 } from 'native-base';
import { Actions } from 'react-native-router-flux';

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
    telephone:null,
    address:null,  
  }

setTelephone=(text)=>{
    this.setState({telephone:text})
}

setAddress = (text) => {
    this.setState({address:text})
}

render(){
    return(
       <Container style={{padding:10, backgroundColor:'#F5F5F5'}}>
       <ScrollView>
       <View style={styles.imgContainer}>
       <Image style={styles.icon} source={require('./../images/regDetails/contact.png')} />
       <Text style={styles.topic}>Contact Details :</Text>
       </View>  
      
       <Form>
                
                <Item regular style={styles.txtBox}>
                  <Input placeholder='TP' 
                         onChangeText = {this.setTelephone}/> 
                </Item>
                <Item regular style={styles.txtBox}>
                  <Input placeholder='Address' 
                         onChangeText = {this.setAddress}/> 
                </Item>
               
            </Form>
           


             <Button style={styles.regBtn} transparent primary title="goBack" onPress={() => Actions.Reg2()}><Text> Go Back and correct</Text></Button>
             <Button style={styles.regBtn} rounded full primary title="Next" onPress={() => Actions.RegistrationView({
               firstname:this.state.firstname,
               lastname:this.state.lastname,
               nic:this.state.nic,    
               gender:this.state.gender,  
               username:this.state.username,
               email:this.state.email,
               role:this.state.role,
               telephone:this.state.telephone,
               address:this.state.address
                })}>

                <Text>( 3 of 4 ) Next >>></Text></Button>
                </ScrollView>
            </Container>
        )
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
    icon:{
      width:200,
      height:200,
    },
    imgContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    topic:{
        marginTop:5,
        color:'#C0C0C0',
        fontSize:16,
        fontFamily: 'Iowan Old Style'
      }
  })
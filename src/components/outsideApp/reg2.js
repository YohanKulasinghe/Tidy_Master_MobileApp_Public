import React, { Component } from 'react';
import { View, Text,ScrollView, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, H2 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

export default class Registration extends Component{
  constructor(props){
    super(props);
}

state={
    firstname:this.props.firstname,
    lastname:this.props.lastname,
    nic:this.props.nic,    
    gender:this.props.gender,  
    username:null,
    email:null,
    role:null,
    index:''   
  }

setUsername=(text)=>{
    this.setState({username:text})
}
setEmail=(text)=>{
    this.setState({email:text})
}

onSelect = (index, value) => {
    this.setState({text:index,role:value})
}



render(){
    return(
       <Container style={{padding:10, backgroundColor:'#F5F5F5'}}>
       <ScrollView>
       <View style={styles.imgContainer}>
       <Image style={styles.icon} source={require('./../images/regDetails/account.png')} />
       <Text style={styles.topic}>Tidy Accout Details :</Text>
       </View>
      
         <Form>
                  <Item regular style={styles.txtBox}>
                     <Input placeholder='Username' 
                            onChangeText = {this.setUsername}/> 
                  </Item>
                  <Item regular style={styles.txtBox}>
                     <Input placeholder='Email' 
                            onChangeText = {this.setEmail}/> 
                  </Item>
                  

                  <RadioGroup
                      onSelect = {(index, value) => this.onSelect(index, value)}>
                
                        <RadioButton 
                         value={'cleaner'} >
                          <Text>Cleaner</Text>
                        </RadioButton>
 
                       <RadioButton 
                          value={'customer'}>
                          <Text>Customer</Text>
                         </RadioButton>

                     </RadioGroup>
            </Form>

            <Button style={styles.regBtn} transparent primary title="goBack" onPress={() => Actions.Reg1()}><Text> Go Back and correct</Text></Button>

           <Button style={styles.regBtn} rounded full primary title="Next" onPress={() => Actions.Reg3({
               firstname:this.state.firstname,
               lastname:this.state.lastname,
               nic:this.state.nic,    
               gender:this.state.gender,  
               username:this.state.username,
               email:this.state.email,
               role:this.state.role })}>


               <Text>( 2 of 4 ) Next >></Text>
             
               </Button>
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
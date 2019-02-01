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
    firstname:null,
    lastname:null,
    nic:null,    
    gender:null,  
    index:''
  }

onSelect = (index, value) => {
    this.setState({text:index,gender:value})
}

setFirstname=(text)=>{
    this.setState({firstname:text})
}
setLastname=(text)=>{
     this.setState({lastname:text})
}
setNic=(text)=>{
this.setState({nic:text})
}
setGender=(text)=>{
this.setState({gender:text})
}

render(){
    return(
       <Container style={{padding:10, backgroundColor:'#F5F5F5'}}>
       <ScrollView>
        <View style={styles.imgContainer}>
       <Image style={styles.icon} source={require('./../images/regDetails/personal.png')} />
       <Text style={styles.topic}>Personal Details :</Text>
       </View>
       
         <Form>
                  <Item regular style={styles.txtBox}>
                     <Input placeholder='FirstName' 
                            onChangeText = {this.setFirstname}/> 
                  </Item>
                  <Item regular style={styles.txtBox}>
                     <Input placeholder='LastName' 
                            onChangeText = {this.setLastname}/> 
                  </Item>
               
                   <Item regular style={styles.txtBox}>
                     <Input placeholder='NIC' 
                            onChangeText = {this.setNic}/> 
                   </Item>

                    <RadioGroup
                      onSelect = {(index, value) => this.onSelect(index, value)}>
                
                        <RadioButton 
                         value={'Male'} >
                          <Text>Male</Text>
                        </RadioButton>
 
                       <RadioButton 
                          value={'Female'}>
                          <Text>Female</Text>
                         </RadioButton>

                     </RadioGroup>
                  
            </Form>

           <Button style={styles.regBtn} rounded full primary title="Next" onPress={() => Actions.Reg2({
             firstname:this.state.firstname,
             lastname:this.state.lastname,
             nic:this.state.nic,    
             gender:this.state.gender})}>
             <Text>( 1 of 4 ) Next ></Text></Button>
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
      marginTop: 20
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
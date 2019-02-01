import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon, H2 } from 'native-base';
import { Actions } from 'react-native-router-flux';
const host = require('./config')


export default class EditProfile extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            data:[],
            token:'', 
            uid:'',
            firstname:'',
            lastname:'',
            username:'',
            email:'',
            nic:'',
            gender:'',
            telephone:'',
            address:''  
        };
    }
    
    componentWillMount(){
      this.getToken().done()
    }
    
    handletoken(text){
      this.setState({token:text})
    }

    setFirstName=(text)=>{
        this.setState({firstname:text})
    }

    setLastName =(text)=>{
        this.setState({lastname:text})
    }

    setEmail =(text)=>{
        this.setState({email:text})
    }

    setNIC =(text)=>{
        this.setState({nic:text})
    }

    setPhoneNo =(text)=>{
        this.setState({telephone:text})
    }

    setAddress =(text)=>{
        this.setState({address:text})
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
              this.setState({uid:res.userdata.uid})
              this.setState({firstname:res.userdata.firstName})
              this.setState({lastname:res.userdata.lastName})
              this.setState({email:res.userdata.email})
              this.setState({nic:res.userdata.nic})
              this.setState({telephone:res.userdata.telephone})
              this.setState({address:res.userdata.address})

            } else {
                
            }
        })
        .done();
    }

    submit(){
        fetch(host.config.hostname+'/user/editprofile', {
            method: 'POST',
            headers: {
              'Authorization': this.state.token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'uid':this.state.data.uid,
                'firstname':this.state.firstname,
                'lastname':this.state.lastname,
                'username':this.state.data.username,
                'email':this.state.email,
                'nic':this.state.nic,
                'gender':this.state.data.gender,
                'phoneno':this.state.telephone,
                'address':this.state.address
            }),    
        }).then((response) => response.json())
          .then((res) => {
                if (res.state === true) {
                  alert(res.msg)
                  Actions.pop()
                } else {
                  alert(res.msg)
                }
            })
            .done();
      }
    
  render() {
    return (
        <ScrollView>
    <View style={styles.container}>
    <Text style={styles.title}>Change your data here and Submit :</Text>
      <Form>

                 <Item regular style={styles.txtBox}>
                    <Icon active name='contact'/>
                    <Input placeholder={'First Name : '+this.state.data.firstName} 
                           onChangeText = {this.setFirstName}/> 
                 </Item>

                 <Item regular style={styles.txtBox}>
                    <Icon active name='contact'/>
                    <Input placeholder={'Last Name : '+this.state.data.lastName} 
                           onChangeText = {this.setLastName}/> 
                 </Item>

                 <Item regular style={styles.txtBox}>
                    <Icon active name='mail'/>
                    <Input placeholder={'Mail : '+this.state.data.email} 
                           onChangeText = {this.setEmail}/> 
                 </Item>

                 <Item regular style={styles.txtBox}>
                    <Icon active name='ribbon'/>
                    <Input placeholder={'NIC : '+this.state.data.nic} 
                           onChangeText = {this.setNIC}/> 
                 </Item>

                 <Item regular style={styles.txtBox}>
                    <Icon active name='call'/>
                    <Input placeholder={'Mobile No : '+this.state.data.telephone} 
                           onChangeText = {this.setPhoneNo}/> 
                 </Item>

                 <Item regular style={styles.txtBox}>
                    <Icon active name='bicycle'/>
                    <Input placeholder={this.state.data.address} 
                           onChangeText = {this.setAddress}/> 
                 </Item>

        </Form>
        <View style={styles.btnRow}>
        <TouchableOpacity style={styles.buttonContainer} onPress = {()=>Actions.ChangePassword(this.state.uid)}>
                   <Text> Change Password  </Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress = {()=>this.submit()}>
                   <Text> Submit  </Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress = {()=>Actions.pop()}>
                   <Text> Go Back  </Text> 
        </TouchableOpacity>
        </View>
     </View>
     </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    paddingTop:50,
  },
  txtBox:{ 
    width:'100%',
    marginTop:2,
    backgroundColor:'#ffffff',
    height:60,
   },
   btnRow: {
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
   },
   btn: {
    flex:1,
    textAlign:"center",
    alignItems:"center",
    marginTop:45,
    marginHorizontal:20,
    color:'red',
    fontFamily: 'Iowan Old Style' 
  },
  title:{
    textAlign:"center",
    alignItems:"center",
    marginTop:5,
    marginBottom:10,
    color:'#C0C0C0',
    fontFamily: 'Iowan Old Style'
  },
  buttonContainer: {
    marginTop:20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    padding:20,
    width:120,
    borderRadius:30,
    margin:5,
    backgroundColor: "#5297e4",
  },
});
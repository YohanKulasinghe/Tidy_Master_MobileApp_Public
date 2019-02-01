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
            uid:this.props.uid,
            token:'', 
            oldPassword:'',
            newPassword:'',
        };
    }
    
    componentWillMount(){
      this.getToken().done()
    }
    
    handletoken(text){
      this.setState({token:text})
    }

    setOldPassword=(text)=>{
        this.setState({oldPassword:text})
    }

    setNewPassword =(text)=>{
        this.setState({newPassword:text})
    }

    
    getToken = async () => {
      try {
          let token = await AsyncStorage.getItem('token')
         
          this.handletoken(token)
      } catch (error) {
          alert(error);
      }
    }
    

    change(){
        fetch(host.config.hostname+'/user/editpassword', {
            method: 'POST',
            headers: {
              'Authorization': this.state.token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'uid':this.state.uid,
                'oldpassword':this.state.oldPassword,
                'newpassword':this.state.newPassword,
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
    <Text style={styles.title}>Enter your Old and New Passwords</Text>
      <Form>

                 <Item regular style={styles.txtBox}>
                    <Icon active name='key'/>
                    <Input placeholder={'Old Password'} 
                           onChangeText = {this.setOldPassword}/> 
                 </Item>

                 <Item regular style={styles.txtBox}>
                    <Icon active name='key'/>
                    <Input placeholder={'New Password'} 
                           onChangeText = {this.setNewPassword}/> 
                 </Item>

              
        </Form>
        <View style={styles.btnRow}>
        <TouchableOpacity style={styles.buttonContainer} onPress = {()=>this.change()}>
                   <Text> Change  </Text> 
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
    marginHorizontal:20,
    borderRadius:30,
    width:170,
    backgroundColor: "#5297e4",
  },
});
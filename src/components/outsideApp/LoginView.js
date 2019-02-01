import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon, H2 } from 'native-base';
import { Actions, Reducer } from 'react-native-router-flux';
const host = require('./../common/config')


class LoginView extends Component {

  constructor(props){
    super(props);
    
  }
  state={
    username:'',
    password:''
  };
  setUsername=(text)=>{
    this.setState({username:text})
  }
  setPassword =(text)=>{
    this.setState({password:text})
  }

  async setToken(mytoken){
    try{
      await AsyncStorage.setItem("token",mytoken);
    }catch(error){
      alert("token store error");
    }
  }

  async setUid(uid){
    try{
      await AsyncStorage.setItem("uid",uid);
    }catch(error){
      alert("User id store error");
    }
  }


  login(username,password){
    fetch(host.config.hostname+'/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      
  }).then((response) => response.json())
    .then((res) => {
          if (res.state === true) {
            if(res.user.role =='cleaner'){
              this.setToken(res.token);
              this.setUid(res.user.id);
              Actions.CleanerJobList();
            }else if(res.user.role=='customer'){
              this.setToken(res.token);
              this.setUid(res.user.id);
              Actions.CustomerMyJob();
            }
            else{ 
             alert('wrong')
            }
          } else {
              alert(res.msg)
          }
      })
      .done();
  }


  render() {
    return (
      <Container style={styles.container}>
      <Content style={styles.content}>
        <Image source={require('./../images/logo.png')}  style={styles.img} />

          <H2 style={styles.header}> LOGIN </H2>

              <Form>
                 <Item regular style={styles.txtBox}>
                    <Icon active name='contact'/>
                    <Input placeholder='Username' 
                           onChangeText = {this.setUsername}/> 
                 </Item>
                 <Item regular style={styles.txtBox}>
                    <Icon active name='key'/>
                    <Input placeholder='Password' 
                          secureTextEntry={true}
                           onChangeText = {this.setPassword}/> 
                 </Item>
              </Form>

          <View style={styles.buttonblock}>
          <Button style={styles.signBtn} full rounded info
                  onPress = {() => this.login(this.state.username, this.state.password)}>
                   <Text> Login  </Text> 
          </Button>
          <View style={styles.blockUnderLogin}>
            <TouchableOpacity>
              <Text style={styles.forgot}> Forget password ? </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {Actions.Reg1()}}>
              <Text style={styles.signBtn}> Sign Up </Text>
            </TouchableOpacity>
          </View>
          </View>
      
          </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    padding:6,
    backgroundColor:'#F5F5F5'
  },
  content:{
    marginTop: 30
  },
  img:{
    width:145,
    height:120,
    alignSelf:"center",
    marginTop:20
  },
  header:{
    alignItems:"center",
    textAlign:"center",
    marginTop:20,
    marginBottom:30,
    fontFamily: 'Iowan Old Style'
  },
  txtBox:{
   backgroundColor:'#ffffff',
   marginTop:1,
   height:60,
  },
  blockUnderLogin: {
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  forgot:{
    flex:1,
    textAlign:"center",
    alignItems:"center",
    marginTop:20,
    color:'#C0C0C0',
    fontFamily: 'Iowan Old Style'
  },
  signBtn: {
    flex:1,
    textAlign:"center",
    alignItems:"center",
    marginTop:20,
    color:'red',
    fontFamily: 'Iowan Old Style' 
  }
})


export default LoginView;

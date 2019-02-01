import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage, Image } from 'react-native';
import {Actions } from 'react-native-router-flux';
import { Content, List, ListItem, Body, Left, Button, Icon, Separator } from 'native-base';
const host = require('./../../common/config');

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            data:[],
        }
    }

    componentDidMount() {
        this.getToken().done();
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

    logout = () => {
        fetch(host.config.hostname+'/user/logout', {
            method: 'GET',
            headers: {
                'Authorization': this.state.token,
                'Content-type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.state === true) {
                    alert('Suucssfully Logout'),
                    Actions.LoginView()
                } else {
                    alert(res.msg)
                }
            })
            .done();
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
      }
      


  render() {
    return (
        <View style={{flex:1}}> 

            <View style={{flex: 1,overflow: 'hidden',alignItems: 'center',backgroundColor: '#5297e4'}}>
                <Image square style={styles.avatar} source={{uri: this.state.data.photourl}}/>
                <Text style={styles.name}>{this.state.data.firstName}  {this.state.data.lastName}</Text>      
                <Text style={styles.info}>Tidy Master - 4.8 </Text>
            </View>

            <View style={{flex: 2}}>
                <Content>
                    <List>
                    <Separator bordered noTopBorder />
                    <ListItem icon onPress={()=>Actions.CustomerMyJob()}>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9501" }}>
                            <Icon active name="briefcase" />
                        </Button>
                    </Left>
                    <Body>
                    <Text style={styles.description}>My Jobs</Text>
                    </Body>
                    </ListItem>

                    <ListItem icon onPress={()=>Actions.CustomerProfile()}>
                    <Left>
                        <Button style={{ backgroundColor: "#4CDA64" }}>
                            <Icon active name="contact" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={styles.description}>My Profile</Text>
                    </Body>
                    </ListItem>

                    <Separator bordered/>

                    <ListItem icon onPress={()=>Actions.AddNewJob()}>
                    <Left>
                        <Button style={{ backgroundColor: "#4CDA64", marginTop: 2 }}>
                            <Icon active name="add" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={styles.description}>Add New Job</Text>
                    </Body>
                    </ListItem>

                    <ListItem icon onPress={()=>Actions.CusUpCommingJob()}>
                    <Left>
                        <Button style={{ backgroundColor: "#4CDA64", marginTop: 2 }}>
                            <Icon active name="send" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={styles.description}>Up Comming Job</Text>
                    </Body>
                    </ListItem>

                    <ListItem icon onPress={()=>Actions.CusDoneHistoryJob()}>
                    <Left>
                        <Button style={{ backgroundColor: "#4CDA64", marginTop: 2 }}>
                            <Icon active name="done-all" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={styles.description}>Done History</Text>
                    </Body>
                    </ListItem>

                    <Separator bordered/>

                    <ListItem icon onPress={()=>this.logout()}>
                        <Left>
                            <Button style={{ backgroundColor: "#4CDA64", marginTop: 2 }}>
                            <Icon active name="log-out" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={styles.description}>Log Out</Text>
                        </Body>
                    </ListItem>

                    </List>
                </Content>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
    description:{
        fontSize:16,
        color: "#696969",
        marginTop:5,
        fontWeight: "400",
      },
      avatar: {
        width: 120,
        height: 120,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10, 
        alignSelf:'center',
        position: 'absolute',
        marginTop:15
      },
      name:{
        fontSize:23,
        color: "#ffffff",
        fontWeight: "600",
        marginTop:145
      },
      info:{
        fontSize:15,
        color: "#ffffff",
        marginTop:2,
      },
})
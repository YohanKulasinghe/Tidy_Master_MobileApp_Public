import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, Alert, StyleSheet, Image, ActivityIndicator,View } from 'react-native';
import { Container, Fab, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon, Header,Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
const host = require('./../common/config')

class BasicJobView extends Component {

  constructor(props) {
    super(props);

    this.state = {
        data:null,
        token:'',      
    };
}

componentWillMount(){
   // this.getToken().done() 
   this.getAllJobs()
}

async getToken(){
  try{
    let thistoken=await AsyncStorage.getItem("token");
    if(thistoken!=null){
      this.initial(thistoken);
    }else{
      this.getAllJobs();
    }
  }catch(error){
    alert("token get error");
  }
}

initial(thistoken){
  fetch(host.config.hostname+'/cleaner/iscleaner', {
    method: 'POST',
    headers: {
      'Authorization': thistoken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

    }),
    
}).then((response) => response.json())
  .then((res) => {
        if (res.state === true) {
            Actions.CleanerJobList();
        } else{ 
            Actions.CustomerMyJob();
          }
    })
    .done();
}


getAllJobs(){
  
  fetch(host.config.hostname+'/cleaner/getalljobs', {
    method: 'POST',
    headers: {
     
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
     
    }),    
}).then((response) => response.json())
  .then((res) => {
        if (res.state === true) {
          this.setState({data:res.jobs})
         // console.log(res.customerjobs)
        } else {
            
        }
    })
    .done();
}

  render() {
    if (!this.state.data) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }
    return (
      <Container>
        <Header><Body>
            <Title>Welcome to TidyMaster</Title>
          </Body></Header>
          <Image style={styles.header} source={require('./../images/welcome.jpg')}/>
        
          <Text style={styles.forgot}>Tap on a Job to continue</Text>
          
        <Content>
          <List dataArray={this.state.data} renderRow={(item) =>
          
            <ListItem >
              <Body>
              <TouchableOpacity onPress={() => {Alert.alert("Hi, Tidy", "You Have to Login Buddy"),Actions.LoginView()}}>
               
                <Text>{item.title}</Text>
                
                <Text note>Location : {item.joblocation}</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Text>   </Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    width: '100%',
    height: '50%'
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  forgot:{
    textAlign:"center",
    alignItems:"center",
    color:'#C0C0C0',
    margin:3,
    fontFamily: 'Iowan Old Style'
  },
})


export default BasicJobView;
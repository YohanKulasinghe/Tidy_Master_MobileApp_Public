import React, { Component } from "react";
import { TouchableOpacity, AsyncStorage, StyleSheet, ActivityIndicator, Image, View } from 'react-native'
import { Container, Button, Content, List, ListItem, Body, Text  } from "native-base";
import { Actions } from 'react-native-router-flux';
const host = require('../../common/config')

export default class CusHistoryJobDetails extends Component {

  constructor(props){
    super(props);
    this.state={
      postid:this.props.postid,
      data:null,
      token:this.props.token
    }
    
}


  handletoken(text){
    this.setState({token:text})
  }
  

  async getToken(){
    try{
      let thistoken=await AsyncStorage.getItem("token");
      this.handletoken(thistoken);
      this.getSingleJob()
    }catch(error){
      alert(error);
    }
  }

  componentWillMount(){
  this.getToken()
  }

  getSingleJob(){
    fetch(host.config.hostname+'/cleaner/singlejob', {
      method: 'POST',
      headers: {
        'Authorization':this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "postid":this.state.postid
      }),    
  }).then((response) => response.json())
    .then((res) => {
          if (res.state === true) {
            this.setState({data:res.customerjobs})
            console.log(res)
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
          <Content>
            <List dataArray={this.state.data} renderRow={(item) =>
            
            <ListItem >
            <Body>
            <View style={styles.item}>
              <Image style={{width: 30, height: 30}} source={ require('./../../images/jobDetails/category.png')}></Image>
              <Text>{item.catogaryname}</Text>
            </View>
            <View style={styles.item}>
              <Image style={{width: 30, height: 30}} source={ require('./../../images/jobDetails/title.png')}></Image>
              <Text>{item.title}</Text>
            </View>
            <View style={styles.item}>
              <Image style={{width: 30, height: 30}} source={ require('./../../images/jobDetails/levelofjob.png')}></Image>
              <Text>{item.levelofjob}</Text>
            </View>
            <View style={styles.item}>
              <Image style={{width: 30, height: 30}} source={ require('./../../images/jobDetails/priceperhour.png')}></Image>
              <Text>Rs:{item.priceperhour}/= per hour</Text>
            </View>
            <View style={styles.item}>
              <Image style={{width: 30, height: 30}} source={ require('./../../images/jobDetails/joblocation.png')}></Image>
              <Text>{item.joblocation}</Text>
            </View>
            <View style={styles.item}>
              <Image style={{width: 30, height: 30}} source={ require('./../../images/jobDetails/date.png')}></Image>
              <Text note>{item.jobdate}</Text>
            </View>
            <View style={styles.item}>
              <Image style={{width: 30, height: 30}} source={ require('./../../images/jobDetails/gender.png')}></Image>
              <Text note>Prefered {item.gender} Cleaners</Text>
            </View>
            <View style={styles.item}>
              <Image style={{width: 30, height: 30}} source={ require('./../../images/jobDetails/timeforstartjob.png')}></Image>
              <Text note>Start at {item.timeforstartjob} </Text>
            </View>
            <View style={styles.item}>
              <Image style={{width: 30, height: 30}} source={ require('./../../images/jobDetails/time.png')}></Image>
              <Text note>{item.estimatedtime} Hours May Required</Text>
            </View>
            <View style={styles.item}>
              <Image style={{width: 30, height: 30}} source={ require('./../../images/jobDetails/number.png')}></Image>
              <Text note>{item.numberofcleaners} required( Pavement done to each one seperately )</Text>
            </View>


                  
                <Button full rounded style={styles.confirm} onPress={()=>Actions.MyLocation({postid:item.postid})}>
                 <Text>Share My Location</Text></Button>

                <Button full rounded style={styles.confirm} onPress={()=>Actions.QRCode({postid:item.postid})}>
                 <Text>Pay Me</Text></Button>


                 
                </Body>
              </ListItem>
              }>
            </List>


            

          </Content>
        </Container>
      );
    }
  }


  const styles = StyleSheet.create({
    confirm:{
    marginTop:20,
    marginHorizontal:5
    },
    indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    },
    item:{  
      flex:1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'flex-start',
      marginTop:3
  }
  })
import React, { Component } from "react";
import { ScrollView, AsyncStorage, StyleSheet, ActivityIndicator, Image, View } from 'react-native'
import { Container, Button, Content, List, ListItem, Body, Text, Item  } from "native-base";
import { Actions } from 'react-native-router-flux';
const host = require('../../common/config')

export default class CleanerFinishedJobDetails extends Component {

  constructor(props){
    super(props);
    this.state={
      postid:this.props.postid,
      data:[],
      ads:[],
      token:this.props.token,
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
      this.addverticements()
    }catch(error){
      alert(error);
    }
  }

  componentWillMount(){
  this.getToken()
  }

  toArray(obj){
    parcelIds = list.vendorURL.map((obj) => obj.vendorURL);
    console.log(parcelIds)
  }

addverticements(){
    fetch(host.config.hostname+'/user/displayadvertiesment', {
      method: 'POST',
      headers: {
        'Authorization': this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       
      }),    
  }).then((response) => response.json())
    .then((res) => {
          if (res.state === true) {
            var i;
            for( i=0;i<res.add.length;i++){
                this.state.ads.push(res.add[i].vendorURL);
                console.log(res.add[i].vendorURL)
            }
            console.log(this.state.ads)
          } else {
              
          }
      })
      .done();
  }

  count(){
    fetch(host.config.hostname+'/user/countAdViews', {
      method: 'POST',
      headers: {
        'Authorization': this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       
      }),    
  }).then((response) => response.json())
    .then((res) => {
          if (res.state === true) {
            var i;
            for( i=0;i<res.add.length;i++){
                this.state.ads.push(res.add[i].vendorURL);
                console.log(res.add[i].vendorURL)
            }
            console.log(this.state.ads)
          } else {
              
          }
      })
      .done();
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
        <View>
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
           
            </Body>
          </ListItem>
              }>
            </List>
    </View>
         
    <View>
          <List dataArray={this.state.ads} renderRow={(item) =>
          
            <ListItem >
              <Body>
                <View>
                  <Image style={styles.header} source={{uri: item}}/>
                  </View>
              </Body>
            </ListItem>
            }>
          </List>

          </View>
     
        

            
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
  },
  header:{
    width: "100%",
    height: "50%"
  }
  })
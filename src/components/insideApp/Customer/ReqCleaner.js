import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import {Button} from 'native-base';
import { Actions } from 'react-native-router-flux';
const host = require('./../../common/config')

export default class ReqCleaner extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data:null,
        token:'', 
        username:this.props.username,
        userId:'',
        postid:this.props.postid
    };
}

componentWillMount(){
  this.getToken().done()
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

getProfileData(){
  fetch(host.config.hostname+'/admin/userprofile', {
    method: 'POST',
    headers: {
      'Authorization': this.state.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
     'username':this.state.username
    }),   
}).then((response) => response.json())
  .then((res) => {
        if (res.state === true) {
          this.setState({data:res.userdata})
          this.setState({userId:res.userdata.uid})
        } else {
            
        }
    })
    .done();
}


acceptCleaner(){
  fetch(host.config.hostname+'/customer/selectcleanerforjob', {
    method: 'POST',
    headers: {
      'Authorization': this.state.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "cleanerid":this.state.cleanerid,
      "postid":this.state.postid
    }),   
}).then((response) => response.json())
  .then((res) => {
        if (res.state === true) {
          alert(res.msg);
          Actions.CusUpCommingJob()
        } else {
          alert(res.msg)
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
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: this.state.data.photourl}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.data.firstName} {this.state.data.lastName}</Text>
              
            <Text style={styles.info}>Tidy Master - 4.8 </Text>

            <View style={styles.starContainer}>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
             </View>
             <Text></Text>
            
            <View style={styles.details}><Text>{this.state.data.email}</Text></View>
            <View style={styles.details}><Text>{this.state.data.rolename}</Text></View>
            <View style={styles.details}><Text>{this.state.data.address}</Text></View>
            <View style={styles.details}><Text>{this.state.data.description}</Text></View>
           
            <View style={styles.acceptBtnRow}>

              <Button style={styles.signBtn} full rounded info onPress = {Actions.ReqCleanerReview.bind(this)}>
                   <Text> See Reviws  </Text> 
              </Button>

              <Button style={styles.signBtn} full rounded info onPress = {this.acceptCleaner.bind(this)}>
                   <Text> Accept  </Text> 
              </Button>

          </View>
            
            </View>
        </View>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:5
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  starContainer:{
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:3
  },
  star:{
    width:40,
    height:40,
  },
  details: {
    paddingTop:25
  },
  acceptBtnRow: {
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  signBtn: {
    flex:1,
    textAlign:"center",
    alignItems:"center",
    marginTop:45,
    marginHorizontal:20,
    color:'red',
    fontFamily: 'Iowan Old Style' 
  },
  indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    }
});
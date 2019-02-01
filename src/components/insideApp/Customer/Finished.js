import React, { Component } from 'react';
 
import {
  Platform,
  StyleSheet,
  ListView,
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { Item, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
const host = require('./../../common/config')


class Finished extends Component {
  constructor(props){
    super(props)
    this.state={
      uid:'',
      postid:this.props.postid,
      complaign:'',
      rate:''
    }
  }

  componentWillMount(){
    this.getToken()
    }

  setComplaign=(text)=>{
    this.setState({complaign:text})
  } 

  setComplaign=(text)=>{
    this.setState({rate:text})
  } 

  
  handletoken(text){
    this.setState({token:text})
  }
  

  async getToken(){
    try{
      let thistoken=await AsyncStorage.getItem("token");
      this.handletoken(thistoken);
      this.appliedCleaners()
    }catch(error){
      alert(error);
    }
  }

  rate(){
  
    fetch(host.config.hostname+'/customer/ratecleaner', {
      method: 'POST',
      headers: {
        'Authorization': this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "uid":this.state.uid,
        "rate":this.state.rate
      }),    
  }).then((response) => response.json())
    .then((res) => {
          if (res.state === true) {
           alert('Rate is Submited')
          } else {
            alert(res.msg)
          }
      })
      .done();
  }

  appliedCleaners(){
    fetch(host.config.hostname+'/customer/getappliedcleaners', {
      method: 'POST',
      headers: {
        'Authorization': this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "postid":this.state.postid
      }),    
  }).then((response) => response.json())
    .then((res) => {
          if (res.state === true) {
            this.setState({uid:res.cleaners.uid})
            console.log(res.cleaners)
          } else {
              
          }
      })
      .done();
  }
  

  render() {

    let rate = [{
      value: '1',
    }, {
      value: '2',
    }, {
      value: '3',
    }, {
      value: '4',
    }, {
      value: '5',
    }];



    return (
      <ScrollView>
      <View style={styles.container}>
      <Image style={styles.icon} source={{uri: "https://png.icons8.com/good-quality/ultraviolet/200/3498db"}} />
      <Text style={styles.title}>Congratulation, You have successfully Finished Job</Text>
      <View>

      <Dropdown
            label='Rate'
            data={rate}
            onChangeText={this.selectRate}
          />
      
      <TouchableOpacity style={styles.buttonContainer} onPress={() => this.rate()}>
        <Text style={styles.buttonText}>Submit rate</Text>
      </TouchableOpacity>


      <Item regular style={styles.txtBox}>
                     <Input placeholder='Complaign or Review'
                            multiline={true}
                            numberOfLines={10}  
                            onChangeText = {this.setComplaign}/> 
      </Item>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => this.complaign()}>
        <Text style={styles.buttonText}>Submit Complaign</Text>
      </TouchableOpacity>

      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.CustomerMyJob()}>
        <Text style={styles.buttonText}>GoBack</Text>
      </TouchableOpacity>
    </View>

    </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    paddingTop:50,   
  },
  icon:{
    width:200,
    height:200,
  },
  title:{
    fontSize:24,
    textAlign: 'center',
    marginTop:22,
    color: "#5F6D7A",
    marginHorizontal:10, 
  },
  description: {
    marginTop:20,
    textAlign: 'center',
    color: "#A9A9A9",
    fontSize:16,
    margin:40,
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  loginButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize:20,
  },
  txtBox:{
    backgroundColor:'#ffffff',
    marginTop:8,
    height:100,
   },
});


export default Finished;
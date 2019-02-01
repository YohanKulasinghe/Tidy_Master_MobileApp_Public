import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, StyleSheet, View, ScrollView } from 'react-native';
import { Container, DatePicker, Input, Item, Text, Form, Button } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import { Actions } from 'react-native-router-flux';
const host = require('./../../common/config')

class Addnewjob extends Component {

  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
    this.state = {
        uid:'',
        token:'',
        title:null,  
        numberofcleaners:null,  
        pricePerHour:null,
        location:null,
        levelofjob:null,
        startTime:null,
        estimatedTime:null,
        date:new Date(),
        gender:'',
        catogaryname:'',
        drop_down_data:[],
        fdate:'8-4-2019'
    };
}

  componentWillMount(){
    this.getToken().done()
    this.getUid().done()
    
}

handletoken(text){
  this.setState({token:text})
}

setDate(newDate) {
  this.setState({date: newDate})
}

handleUid(text){
  this.setState({uid:text})
}

getToken = async () => {
  try {
      var token = await AsyncStorage.getItem('token')
      this.handletoken(token)
  } catch (error) {
      alert('Unknown error, token not retrive');
  }
}

getUid= async () => {
  try {
      var uid = await AsyncStorage.getItem('uid')
      this.handleUid(uid)
  } catch (error) {
      alert('Unknown error, User Id Not get');
  }
}


setTitle=(text)=>{
  this.setState({title:text})
}

setNumberOfCleaners=(text)=>{
  this.setState({numberofcleaners:text})
}

setPricePerHour=(text)=>{
  this.setState({pricePerHour:text})
}

setStartTime=(text)=>{
  this.setState({startTime:text})
}

setLocation=(text)=>{
  this.setState({location:text})
}

setEstimatedTime=(text)=>{
  this.setState({estimatedTime:text})
}



addNewJob(){
  fetch(host.config.hostname+'/customer/jobpost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': this.state.token
    },
    body: JSON.stringify({
       uid:this.state.uid,
       catogaryname:this.state.catogaryname,
       jobtitle:this.state.title,
       levelofjob:this.state.levelofjob,
       gender:this.state.gender,
       numberofcleaners:this.state.numberofcleaners,
       priceperhour:this.state.pricePerHour,
       estimatedtime:this.state.estimatedTime,
       timeforstartjob:this.state.startTime,
       joblocation:this.state.location,
       jobdate:this.state.fdate,
    }),
}).then((response) => response.json())
  .then((res) => {
      if (res.state === true) {
        alert('your job is published');
        Actions.CusSuccess({msg:'Your Job added thank you..'})
        }
        else{
          alert('Try again');
        }
  })
  .done();
}


selectGender=(text)=>{
  this.setState({gender:text})
}

selectLevel=(text)=>{
  this.setState({levelofjob:text})
}

selectCategory=(text)=>{
  this.setState({catogaryname:text})
}
   

  render() {
    let gender = [{
      value: 'Male',
    }, {
      value: 'Female',
    }, {
      value: 'Any',
    }];

    let level = [{
      value: 'Easy',
    }, {
      value: 'Medium',
    }, {
      value: 'High',
    }];

    let category = [
      {
          value : "Gardening"
      },
      {
          value: "Bathroom Cleaning"
      },
      {
          value: "Kitchen Cleaning"
      },
      {
          value: "Fencing"
      },
      {
          value: "Roof Cleaning"
      },
      {
          value: "High pressure water"
      },
      {
          value: "After Party / Events Cleaning"
      },
      {
          value: "Carpet Cleaning"
      },
      {
          value: "Window Cleaning"
      },
      {
          value: "Post Construction Cleans"
      },
      {
          value: "Electrical Service"
      }];



    return (
      <Container style={{padding:10, backgroundColor:'#F5F5F5'}}>
      <ScrollView>
       <Text>Fill following Details </Text>
         <Form>
                  <Item regular style={styles.txtBox}>
                     <Input placeholder='Title' 
                            onChangeText = {this.setTitle}/> 
                  </Item>

                  <Dropdown
                     label='Select Category'
                     data={category} 
                     onChangeText={this.selectCategory}
                  />

                  <Item regular style={styles.txtBox}>
                     <Input placeholder='Number of Cleaner' 
                            onChangeText = {this.setNumberOfCleaners}/> 
                  </Item>

                  <Dropdown
                        label='Preferd Gender of Cleaner'
                        data={gender}
                        onChangeText={this.selectGender}
                    />
               
                   <Item regular style={styles.txtBox}>
                     <Input placeholder='Price Per Hour' 
                            onChangeText = {this.setPricePerHour}/> 
                   </Item>

                   <Dropdown
                        label='Level of Job'
                        data={level}
                        onChangeText={this.selectLevel}
                    />

                   <Item regular style={styles.txtBox}>
                     <Input placeholder='Time For Start Job' 
                            onChangeText = {this.setStartTime}/> 
                   </Item>

                   <Item regular style={styles.txtBox}>
                     <Input placeholder='Job Address' 
                            onChangeText = {this.setLocation}/> 
                   </Item>

                   <Item regular style={styles.txtBox}>
                     <Input placeholder='Estimated Time' 
                            onChangeText = {this.setEstimatedTime}/> 
                   </Item>

                   <DatePicker
                     defaultDate={new Date(2018, 4, 4)}
                      minimumDate={new Date(2018, 1, 1)}
                      maximumDate={new Date(2018, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Select date"
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={this.setDate}
                      disabled={false}
                      />

                     
                   
          </Form>

          <Button full rounded style={styles.confirm} onPress={() => {this.addNewJob()}}>
            <Text>Add Job</Text></Button>


            {/* <Text>{this.state.uid}</Text>
            <Text>{this.state.catogaryname}</Text>
            <Text>{this.state.title}</Text>
            <Text>{this.state.levelofjob}</Text>
            <Text>{this.state.gender}</Text>
            <Text>{this.state.numberofcleaners}</Text>
            <Text>{this.state.pricePerHour}</Text>
            <Text>{this.state.estimatedTime}</Text>
            <Text>{this.state.startTime}</Text>
            <Text>{this.state.fdate}</Text>
            <Text>{this.state.location}</Text> */}

       </ScrollView>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  txtBox:{
   backgroundColor:'#ffffff',
   marginTop:8,
   height:60,
  },
  regBtn: {
    marginTop: 10
  }
})

export default Addnewjob;
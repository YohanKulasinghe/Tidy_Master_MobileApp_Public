import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, ActivityIndicator, StyleSheet  } from 'react-native';
import { Container, Fab, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
const host = require('../../common/config')

class CusDoneHistoryJob extends Component {

  constructor(props) {
    super(props);

    this.state = {
        data:null,
        token:'', 
        id:''  
    };
     
}

  componentDidMount(){
    this.getToken().done()
}

handletoken(text){
  this.setState({token:text})
}


async getToken(){
  try{
    let thistoken=await AsyncStorage.getItem("token");
    this.handletoken(thistoken);
    //console.warn(this.state.token)
    this.getCompletedJobs()
  }catch(error){
    alert(error);
  }
}

getCompletedJobs(){
  fetch(host.config.hostname+'/customer/viewcompletedjob', {
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
          this.setState({data:res.customerjobs})
          //console.log(res.customerjobs)
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
              <TouchableOpacity onPress={() => {Actions.CusHistoryJobDetails({postid:item.postid})}}>

                <Text>{item.title}</Text>
                <Text>({item.levelofjob})</Text>
                <Text note>Location   : {item.joblocation}</Text>
                <Text note>Per Hour   : Rs:{item.priceperhour}/=</Text>

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
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});

export default CusDoneHistoryJob;
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Fab, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
const host = require('./../../common/config')

class CusUpCommingJob extends Component {

  constructor(props) {
    super(props);

    this.state = {
        data:null,
        token:'',      
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
      var token = await AsyncStorage.getItem('token')
      this.handletoken(token)
      this.getCompletedJobs()
  } catch (error) {
      alert('Unknown error, token not retrive');
  }
}


getCompletedJobs(){
  
  fetch(host.config.hostname+'/cleaner/cleanerrunningjobs', {
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
          console.log(res)
          this.setState({data:res.customerjobs})    
        } else {
            alert('Upcommig Job taken faild')
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
              <TouchableOpacity onPress={() => {Actions.CleanerUpCommingJobDetails({postid:item.postid})}}>
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

export default CusUpCommingJob;
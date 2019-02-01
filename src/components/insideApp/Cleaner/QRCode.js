import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
 
import { StyleSheet, View, Text } from 'react-native';
 
class QRCodeGenerator extends Component {
  constructor(props){
    super(props);
    this.state = {
    postid: this.props.postid
  }
}
  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.state.postid}
          size={200}
          bgColor='#000000'
          fgColor='white'/>


          <Text style={styles.txt}>Please Scan This QR Code From Your Job Owner</Text>
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    description:{
        fontSize:16,
        color: "#696969",
        marginTop:5,
        fontWeight: "400",
      },
    txt:{
      textAlign:"center",
      alignItems:"center",
      marginTop:20,
      fontFamily: 'Iowan Old Style',
      fontSize:16,
      }
});
 

export default QRCodeGenerator;
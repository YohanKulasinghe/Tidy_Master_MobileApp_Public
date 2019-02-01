import React, { Component } from "react";

import Tab1 from './CusPromotedJob';
import Tab2 from './ActiveJob';
import { Container, Content, Icon, Tab, Tabs,TabHeading, Text } from "native-base";

export default class CustomerMyJob extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content>
      
        <Tabs>
          <Tab heading={<TabHeading style={{backgroundColor: '#1078ed'}}><Icon name="flame" /><Text>Promoted</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={<TabHeading style={{backgroundColor: '#1078ed'}}><Text>Normal</Text></TabHeading>}>
            <Tab2 />
          </Tab>
        </Tabs>
      
        </Content>
      </Container>
    );
  }
}

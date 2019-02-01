import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import Tab1 from './PramotedJob';
import Tab2 from './ClassicJob';

export default class TabsExample extends Component {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading={ <TabHeading style={{backgroundColor: '#1078ed'}}><Icon name="flame" /><Text>Promoted</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: '#1078ed'}}><Text>Classic</Text></TabHeading>}>
            <Tab2 />
          </Tab>

        </Tabs>
      </Container>
    );
  }
}
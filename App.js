import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Icon } from 'native-base';

import BasicJobView from './src/components/outsideApp/BasicJobView';
import LoginView from './src/components/outsideApp/LoginView';

import Reg1 from './src/components/outsideApp/reg1';
import Reg2 from './src/components/outsideApp/reg2';
import Reg3 from './src/components/outsideApp/reg3';
import RegistrationView from './src/components/outsideApp/RegistrationView';
import RegisterdSuccessfully from './src/components/outsideApp/RegisterdSuccessfully';


import SideMenu1 from './src/components/insideApp/Customer/SideMenu';
import CustomerMyJob from './src/components/insideApp/Customer/CustomerMyJob';
import CustomerProfile from './src/components/insideApp/Customer/CustomerProfile';
import CusHistoryJobDetails from './src/components/insideApp/Customer/CusHistoryJobDetails';
import CusActiveJobDetails from './src/components/insideApp/Customer/CusActiveJobDetails';
import ReqCleaner from './src/components/insideApp/Customer/ReqCleaner';
import ReqCleanerReview from './src/components/insideApp/Customer/ReqCleanerReview';
import CusUpCommingJob from './src/components/insideApp/Customer/CusUpCommingJob';
import CusDoneHistoryJob from './src/components/insideApp/Customer/CusDoneHistoryJob';
import CusUpCommingJobDetails from './src/components/insideApp/Customer/CusUpCommingJobDetails';
import CusPromotedJobDetails from './src/components/insideApp/Customer/CusPromotedJobDetails';



import SideMenu2 from './src/components/insideApp/Cleaner/SideMenu';
import CleanerJobList from './src/components/insideApp/Cleaner/CleanerJobList';
import CleanerProfile from './src/components/insideApp/Cleaner/CleanerProfile';
import JobOwnerView from './src/components/insideApp/Cleaner/JobOwnerView';
import CleanerFinishedJob from './src/components/insideApp/Cleaner/CleanerFinishedJob';
import CleanerAppliedJobs from './src/components/insideApp/Cleaner/CleanerAppliedJobs';
import CleanerJobDetails from './src/components/insideApp/Cleaner/CleanerJobDetails';
import CleanerFinishedJobDetails from './src/components/insideApp/Cleaner/CleanerFinishedJobDetails';
import CleanerApplyJobDetails from './src/components/insideApp/Cleaner/CleanerApplyJobDetails';
import CleanerUpCommingJob from './src/components/insideApp/Cleaner/CleanerUpCommingJob';
import CleanerUpCommingJobDetails from './src/components/insideApp/Cleaner/CleanerUpCommingJobDetails';

import AddNewJob from './src/components/insideApp/Customer/AddNewJob';
import QRScan from './src/components/insideApp/Customer/QRScan';
import QRCode from './src/components/insideApp/Cleaner/QRCode';
import Finished from './src/components/insideApp/Customer/Finished';
import MyLocation from './src/components/insideApp/Cleaner/MyLocation';
import ViewCleanerLocation from './src/components/insideApp/Customer/ViewCleanerLocation';
import EditProfile from './src/components/common/EditProfile';
import ChangePassword from './src/components/common/ChangePassword';
import CusSuccess from './src/components/common/CusSuccess';
import CleSuccess from './src/components/common/CleSuccess';
import PayAndPromote from './src/components/insideApp/Customer/PayAndPromote';




const MenuIcon = () => {
  return (
    <Icon name='menu' size={30}/>
  )
}

export default class App extends Component {
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#1078ed' }}>
        <Scene
          key='root'
          >

         <Scene
                initial
                key="BasicJobView"
                title='BasicJobView'
                hideNavBar
                component={BasicJobView}
                />
                
                <Scene
                
                 key="LoginView"
                 title='LoginView'
                 hideNavBar
                 component={LoginView}/>  

                  <Scene
                 key="Reg1"
                 title='Reg1'
                 hideNavBar
                 component={Reg1}/>   

                <Scene
                 key="Reg2"
                 title='Reg2'
                 hideNavBar
                 component={Reg2}/>  

                 <Scene
                 
                 key="Reg3"
                 title='Reg3'
                 hideNavBar
                 component={Reg3}/>  

                  <Scene
                 key="RegistrationView"
                 title='RegistrationView'
                 hideNavBar
                 component={RegistrationView}/>  

                  <Scene
                 key="RegisterdSuccessfully"
                 title='RegisterdSuccessfully'
                 hideNavBar
                 component={RegisterdSuccessfully}/> 

           <Scene
                  
                  key="drawerCustomer"
                  drawer
                  contentComponent={SideMenu1}
                  drawerIcon={MenuIcon}
                  deawerWith={300}
                  hideNavBar
                  >

                 <Scene
                  key="CustomerMyJob"
                  title="My Job"
                  component={CustomerMyJob}
                  />

                 <Scene
                 
                  key="CustomerProfile"
                  title="My Profile"
                  component={CustomerProfile}
                  />

                 <Scene
                  key="AddNewJob"
                  title='Add New Job'
                  component={AddNewJob}
                  /> 

                  <Scene

                    key='CusUpCommingJob'
                    title='Up Comming Job'
                    component={CusUpCommingJob}
                    />

                  <Scene
                 
                 key="CusDoneHistoryJob"
                 title='History Job'
                 component={CusDoneHistoryJob}
                 /> 

                  </Scene>

                  <Scene

                    key='CusUpCommingJobDetails'
                    title='Up Comming Job Details'
                    component={CusUpCommingJobDetails}
                    />


                <Scene
                 
                 key="CusHistoryJobDetails"
                 title='History Job Details'
                 component={CusHistoryJobDetails}
                 /> 

                 
                <Scene
                 
                 key="CusActiveJobDetails"
                 title='Active Job Details'
                 component={CusActiveJobDetails}
                 /> 

                <Scene
                 
                 key="CusPromotedJobDetails"
                 title='Promoted Job Details'
                 component={CusPromotedJobDetails}
                 /> 

                <Scene
                 
                 key="ReqCleaner"
                 title='Requested Cleaner'
                 component={ReqCleaner}
                 />

                <Scene
                 
                 key="ReqCleanerReview"
                 title='ReqCleanerReview'
                 component={ReqCleanerReview}
                 />


  
                  <Scene
                 
                 key="CleanerJobDetails"
                 title='My Job Details'
                 component={CleanerJobDetails}
                 /> 

                <Scene
                 
                 key="CleanerFinishedJobDetails"
                 title='My Finished Job Details'
                 component={CleanerFinishedJobDetails}
                 /> 

                <Scene
                 
                 key="CleanerApplyJobDetails"
                 title='Applied Job Details'
                 component={CleanerApplyJobDetails}
                 /> 
            

             <Scene
                 
                 key="QRScan"
                 title="Scan Code"
                 component={QRScan}
                 /> 
             
             <Scene
                 
                 key="QRCode"
                 title="My Pay Code"
                 component={QRCode}
                 /> 

                <Scene
                 
                 key="Finished"
                 title="Finished"
                 component={Finished}
                 /> 

                <Scene
                 
                 key="MyLocation"
                 title="My Location"
                 component={MyLocation}
                 /> 

                <Scene
                 
                 key="ViewCleanerLocation"
                 title="View Cleaner Location"
                 component={ViewCleanerLocation}
                 /> 
              <Scene         
                  key="drawerCleaner"
                  drawer
                  contentComponent={SideMenu2}
                  drawerIcon={MenuIcon}
                  deawerWith={300}
                  hideNavBar
                  >

              <Scene
                  key="CleanerJobList"
                  title="CleanerJobList"
                  component={CleanerJobList}
                  />

                 <Scene
                 
                  key="CleanerProfile"
                  title="My Profile"
                  component={CleanerProfile}
                  /> 

                <Scene
                 
                 key="JobOwnerView"
                 title="Job Owner View"
                 component={JobOwnerView}
                 /> 

                <Scene
                 
                 key="CleanerUpCommingJob"
                 title="My UpComming Job"
                 component={CleanerUpCommingJob}
                 />

                   <Scene
                 
                 key="CleanerAppliedJobs"
                 title="My Applied Jobs"
                 component={CleanerAppliedJobs}
                 /> 

                <Scene  
                 key="CleanerFinishedJob"
                 title="My Finished Job"
                 component={CleanerFinishedJob}
                 /> 
            </Scene>


            <Scene
                 
                 key="CleanerUpCommingJobDetails"
                 title="My UpComming Job Details"
                 component={CleanerUpCommingJobDetails}
                 />

                <Scene
                 
                 key="EditProfile"
                 title="Edit Profile"
                 component={EditProfile}
                 />

                <Scene
                 
                 key="ChangePassword"
                 title="Change Password"
                 component={ChangePassword}
                 />

                <Scene
                 
                 key="CusSuccess"
                 title="Success"
                 component={CusSuccess}
                 />

                 
                <Scene
                 
                 key="CleSuccess"
                 title="Success"
                 component={CleSuccess}
                 />

                <Scene
                 
                 key="PayAndPromote"
                 title="Pay And Promote"
                 component={PayAndPromote}
                 />

               </Scene>

      
      </Router>
    );
  }
}

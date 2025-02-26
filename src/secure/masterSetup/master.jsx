import React from "react";
import { Tabs } from "antd";
import OrgSetup from "./Org/OrgSetup";

const { TabPane } = Tabs;

const Master = () => {
  return (
    <div className="w-100 m-3" style={{ overflow: "auto" }}>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Org" key="1">
          <OrgSetup />
        </TabPane>
        <TabPane tab="Speciality" key="2">
          {/* <Speciality /> */}
        </TabPane>
        <TabPane tab="User Setup" key="3">
          {/* <Usersetup /> */}
        </TabPane>
        <TabPane tab="InPatient" key="4">
          {/* <InPatient /> */}
        </TabPane>
        <TabPane tab="Appointment" key="5">
          {/* <Appointment /> */}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Master;

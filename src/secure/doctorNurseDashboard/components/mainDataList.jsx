import React from 'react';
import DocOptions from './docOptions';
import RevenueDataList from './RevenueDataList';
import OthersDataList from './OthersDataList';

const MainDataList = ({ selectedCard, dashboardList, searchByPatientName , searchByStatus }) => {
  return (
    <div>
      <DocOptions cardTitle={selectedCard} searchByPatientName={searchByPatientName} searchByStatus={searchByStatus}/>
      {selectedCard === "Revenue" ? <RevenueDataList dashboardList={dashboardList}/> : <OthersDataList dashboardList={dashboardList}/>}
    </div>
  );
};

export default MainDataList;

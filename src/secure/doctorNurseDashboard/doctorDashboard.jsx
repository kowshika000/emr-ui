import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import TodayIcon from '@mui/icons-material/Today';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmergencyIcon from '@mui/icons-material/LocalHospital';
import WaitingIcon from '@mui/icons-material/HourglassEmpty';
import TelemedicineIcon from '@mui/icons-material/Computer';
import doctorImage from "../../assets/doc2.jpg";
import MainDataList from './components/mainDataList';
import { doctorDashboardCount } from "../../core/services/APIService";
import { doctorDashboardDataList } from "../../core/services/APIService";
import DoctorNurseLoader from "../../components/global/doctorNurseLoader";
import Box from '@mui/material/Box';
const cardColors = {
  "Today's Appointment": '#ADD8E6',
  'Revenue': '#d9f2d0',
  'Emergency Patient': '#fae2d5',
  'Waiting List': '#fae2d5',
  'Telemedicine Appointment': '#cce7ff',
};


const DoctorDashboard = () => {
  const [selectedCard, setSelectedCard] = useState("Today's Appointment")
  const [dashboardCountResp, setDashboardCountResp] = useState([])
  const [dashboardlistResp, setDashboardlistResp] = useState([])
  const [searchPatientName, setsearchPatientName] = useState('');
  const [PatientStatus, setPatientStatus] = useState('');

  const handleCardClick = async (title) => {
    setSelectedCard(title)
    switch (title) {
      case "Today's Appointment":
        let todaysAppointmentResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "todaysAppointment", page: 1, size: 100, ptName: searchPatientName, status: PatientStatus })
        setDashboardlistResp(todaysAppointmentResponse)
        setsearchPatientName("")
        break;
      case "Revenue":
        let revenueResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "revenue", page: 1, size: 100, ptName: searchPatientName, status: PatientStatus })
        setDashboardlistResp(revenueResponse)
        setsearchPatientName("")
        break;
      case "Emergency Patient":
        let emergencyPatientResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "emergencyPatient", page: 1, size: 100, ptName: searchPatientName, status: PatientStatus })
        setDashboardlistResp(emergencyPatientResponse)
        setsearchPatientName("")
        break;
      case "Waiting list":
        let waitingListResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "waitingList", page: 1, size: 100, ptName: searchPatientName, status: PatientStatus })
        setDashboardlistResp(waitingListResponse)
        setsearchPatientName("")
        break;
      case "Telemedicine Appointment":
        let teleAppointmentResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "teleAppointment", page: 1, size: 100, ptName: searchPatientName, status: PatientStatus })
        setDashboardlistResp(teleAppointmentResponse)
        setsearchPatientName("")
        break;
      default:
      // code block
    }

  };

  const dashboardCount = async () => {
    let response = await doctorDashboardCount("/doctorService/doctor/getCount", { doctorId: 1, ipOpFlag: 0 })
    let cardDetails = response.map((cardData) => {
      switch (cardData.displayName) {
        case "Today's Appointment":
          cardData['color'] = cardColors["Today's Appointment"]
          cardData['icon'] = <TodayIcon style={{ fontSize: '40px' }} />
          break;
        case "Revenue":
          cardData['color'] = cardColors['Revenue']
          cardData['icon'] = <MonetizationOnIcon style={{ fontSize: '40px' }} />
          break;
        case "Emergency Patient":
          cardData['color'] = cardColors['Emergency Patient']
          cardData['icon'] = <EmergencyIcon style={{ fontSize: '40px' }} />
          break;
        case "Waiting list":
          cardData['color'] = cardColors['Waiting List']
          cardData['icon'] = <WaitingIcon style={{ fontSize: '40px' }} />
          break;
        case "Telemedicine Appointment":
          cardData['color'] = cardColors['Telemedicine Appointment']
          cardData['icon'] = <TelemedicineIcon style={{ fontSize: '40px' }} />
          break;
        default:
        // code block
      }
      return cardData
    })
    setDashboardCountResp(cardDetails)
  }

  const dashboardListDefault = async () => {
    if (selectedCard === "Today's Appointment") {
      let response = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "todaysAppointment", page: 1, size: 100, ptName: searchPatientName, status: PatientStatus })
      setDashboardlistResp(response)
    }
  }
  useEffect(() => {
    dashboardCount()
    dashboardListDefault()
  }, [])

  const checkValue = (value) => {
    if (value === "" || value === undefined || value === NaN || value === null) {
      return "-"
    } else {
      return value
    }
  }

  const searchByPatientName = async (patientName) => {
    setsearchPatientName(patientName)
    switch (selectedCard) {
      case "Today's Appointment":
        let TodayAppointmentsearchPatientResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "todaysAppointment", page: 1, size: 100, ptName: patientName, status: PatientStatus })
        setDashboardlistResp(TodayAppointmentsearchPatientResponse)

        break;
      case "Revenue":
        let RevenuSearchPatientResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "revenue", page: 1, size: 100, ptName: patientName, status: PatientStatus })
        setDashboardlistResp(RevenuSearchPatientResponse)

        break;
      case "Emergency Patient":
        let EmergencySearchPatientResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "emergencyPatient", page: 1, size: 100, ptName: patientName, status: PatientStatus })
        setDashboardlistResp(EmergencySearchPatientResponse)

        break;
      case "Waiting list":
        let searchPatientResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "waitingList", page: 1, size: 100, ptName: patientName, status: PatientStatus })
        setDashboardlistResp(searchPatientResponse)

        break;
      case "Telemedicine Appointment":
        let TeleSearchPatientResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "teleAppointment", page: 1, size: 100, ptName: patientName, status: PatientStatus })
        setDashboardlistResp(TeleSearchPatientResponse)

        break;
      default:
      // code block
    }
  }

  const searchByStatus = async (value) => {
    if (value === 'Old Patient') {
      setPatientStatus('O')
    } else if (value === "New Patient") {
      setPatientStatus('N')
    } else if (value === "Revisit") {
      setPatientStatus('R')
    } else if (value === "Walking") {
      setPatientStatus('W')
    }
    switch (selectedCard) {
      case "Today's Appointment":
        let TodayAppointmentsearchPatientResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "todaysAppointment", page: 1, size: 100, ptName: searchPatientName, status: value ? value.label.charAt(0) : "" })
        setDashboardlistResp(TodayAppointmentsearchPatientResponse)
        break;
      case "Revenue":
        let RevenuSearchPatientResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "revenue", page: 1, size: 100, ptName: searchPatientName, status: value ? value.label.charAt(0) : "" })
        setDashboardlistResp(RevenuSearchPatientResponse)
        break;
      case "Emergency Patient":
        let EmergencySearchPatientResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "emergencyPatient", page: 1, size: 100, ptName: searchPatientName, status: value ? value.label.charAt(0) : "" })
        setDashboardlistResp(EmergencySearchPatientResponse)
        break;
      case "Waiting list":
        let searchPatientResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "waitingList", page: 1, size: 100, ptName: searchPatientName, status: value ? value.label.charAt(0) : "" })
        setDashboardlistResp(searchPatientResponse)
        break;
      case "Telemedicine Appointment":
        let TeleSearchPatientResponse = await doctorDashboardDataList("/doctorService/doctor/getDataList", { doctorId: 1, ipOpFlag: 0, context: "teleAppointment", page: 1, size: 100, ptName: searchPatientName, status: value ? value.label.charAt(0) : "" })
        setDashboardlistResp(TeleSearchPatientResponse)
        break;
      default:
      // code block
    }
  }


  return (
    <div>
      {dashboardCountResp.length === 0 && dashboardlistResp.length === 0
        ?
        <DoctorNurseLoader />
        :
        <div>
          <Container fluid >
            <Row className="flex-nowrap">
              <Col xs={12} sm={6} md={4} lg={2}>
                <Card style={{ width: '200px', height: '200px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                  <Card.Img variant="top" src={doctorImage} style={{ height: '60%' }} />
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <Card.Title className="text-center">Welcome, Dr. John!</Card.Title>
                  </Card.Body>
                </Card>
              </Col>

              {dashboardCountResp.map((card, index) => (
                <Col xs={12} sm={6} md={4} lg={2} key={card.displayIndex}>
                  <Button variant="light" className="p-0" onClick={() => handleCardClick(card.displayName)}>
                    <Card style={{ width: '200px', height: '200px', backgroundColor: card.color, borderRadius: '10px', boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)` }}>
                      <Card.Body className="d-flex flex-column align-items-center justify-content-center text-white">
                        {card.icon}
                        <Card.Title className="mt-2">{checkValue(card.displayName)}</Card.Title>
                        <Card.Text className="mt-1" style={{ fontSize: '24px' }}>{checkValue(card.totalCount)}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Button>
                </Col>
              ))}
            </Row>
            <MainDataList selectedCard={selectedCard} dashboardList={dashboardlistResp} searchByPatientName={searchByPatientName} searchByStatus={searchByStatus} />
          </Container>
        </div>
      }


    </div>
  );
};

export default DoctorDashboard;

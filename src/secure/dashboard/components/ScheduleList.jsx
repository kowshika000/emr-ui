import React, { useEffect, useState } from "react";
import { Table, Input, Select, Pagination, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { scheduleList } from "../../../Redux/slice/dashboard/scheduleListSlice";
import moment from "moment";
import { MedicalInformationOutlined } from "@mui/icons-material";
import EMRLoader from "../../../components/global/loader/EMRLoaderOverlay";
import EMRMenuIcon from "../../../components/global/EMRMenuIcon";

const { Option } = Select;

const ScheduleList = () => {
  const [filters, setFilters] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.schedule);
  const appointmentData = data?.data;

  useEffect(() => {
    if (appointmentData) {
      setAppointments(appointmentData);
    }
  }, [appointmentData]);

  useEffect(() => {
    dispatch(scheduleList(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (key, date) => {
    const formattedDate = date ? moment(date).format("DD/MM/YYYY") : "";
    setFilters((prev) => ({ ...prev, [key]: formattedDate }));
  };

  const onCreatePatientVisit = () => {
    navigate("/secure/registration", { state: {} });
  };

  const dropDownMenuItems = [
    {
      name: "Create Patient Visit",
      icon: MedicalInformationOutlined,
      callback: onCreatePatientVisit,
    },
  ];

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (_, __, index) => (page - 1) * rowsPerPage + index + 1,
    },
    {
      title: "Schedule Date",
      dataIndex: "scheduleDate",
      key: "scheduleDate",
      filterDropdown: () => (
        <DatePicker
          format="DD/MM/YYYY"
          onChange={(date) => handleDateChange("scheduleDate", date)}
        />
      ),
    },
    {
      title: "MR Number",
      dataIndex: "mrdNo",
      key: "mrdNo",
      filterDropdown: () => (
        <Input
          placeholder="Search MR Number"
          onChange={(e) => handleFilterChange("mrdNo", e.target.value)}
        />
      ),
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      filterDropdown: () => (
        <Input
          placeholder="Search Mobile"
          onChange={(e) => handleFilterChange("mobile", e.target.value)}
        />
      ),
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      filterDropdown: () => (
        <Input
          placeholder="Search Patient Name"
          onChange={(e) => handleFilterChange("patientName", e.target.value)}
        />
      ),
    },
    {
      title: "Doctor",
      dataIndex: "doctorName",
      key: "doctorName",
      filterDropdown: () => (
        <Input
          placeholder="Search Doctor"
          onChange={(e) => handleFilterChange("doctorName", e.target.value)}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "appointmentStatus",
      key: "appointmentStatus",
      filterDropdown: () => (
        <Select
          style={{ width: "100%" }}
          onChange={(value) => handleFilterChange("appointmentStatus", value)}
        >
          <Option value="">--All--</Option>
          <Option value="re_confirmed">Re-Confirmed</Option>
          <Option value="booked">Booked</Option>
          <Option value="no_show">No Show</Option>
          <Option value="cancelled">Cancelled</Option>
          <Option value="arrived">Arrived</Option>
          <Option value="concluded">Concluded</Option>
          <Option value="being_seen">Being Seen</Option>
        </Select>
      ),
    },
    {
      title: "Options",
      key: "actions",
      render: (row) => (
        <EMRMenuIcon
          itemsArray={dropDownMenuItems}
          callbackParam={{ data: row, from: "schedule_list" }}
        />
      ),
    },
  ];

  return (
    <div>
      <EMRLoader show={loading} />

      <Table
        dataSource={appointments}
        columns={columns}
        rowKey={(record) => record.id}
        className="table-container mt-3"
      />
    </div>
  );
};

export default ScheduleList;

import React, { useEffect, useState } from "react";
import { Table, Input, Select, DatePicker, Space } from "antd";
import { Schedule } from "@mui/icons-material";
import moment from "moment";
import EMRMenuIcon from "../../../components/global/EMRMenuIcon";

const { Option } = Select;

const PatientVaccinationSchedule = () => {
  const [data, setData] = useState([
    {
      id: 1,
      s_no: "1",
      mr_number: "23435455",
      patient_name: "Mr. Praveen",
      mobile: "9876543210",
      schedule_date: "27/12/2024",
      vaccination_name: "Covaccine",
      remarks: "Null",
      status: "Being Seen",
      vaccine_date: "27/12/2024",
    },
    {
      id: 2,
      s_no: "2",
      mr_number: "432335455",
      patient_name: "Mr. Praveen",
      mobile: "9854643210",
      schedule_date: "07/11/2024",
      vaccination_name: "Covaccine",
      remarks: "Null",
      status: "Being Seen",
      vaccine_date: "12/10/2024",
    },
    {
      id: 3,
      s_no: "3",
      mr_number: "412335455",
      patient_name: "Mr. Praveen",
      mobile: "4576543210",
      schedule_date: "12/09/2024",
      vaccination_name: "Covaccine",
      remarks: "Null",
      status: "Being Seen",
      vaccine_date: "11/06/2024",
    },
  ]);

  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  const statusOptions = [
    "--All--",
    "Re-Confirmed",
    "Booked",
    "No Show",
    "Cancelled",
    "Arrived",
    "Concluded",
    "Being Seen",
  ];

  const handleFilterChange = (columnId, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [columnId]: value }));
  };

  const handleDateChange = (columnId, date) => {
    const formattedDate = date ? moment(date).format("DD/MM/YYYY") : "";
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: formattedDate,
    }));
  };

  useEffect(() => {
    let filtered = data.filter((row) =>
      Object.keys(filters).every((columnId) => {
        const filterValue = filters[columnId]?.toLowerCase() || "";
        if (!filterValue || filterValue === "--all--") return true;
        return String(row[columnId]).toLowerCase().includes(filterValue);
      })
    );
    setFilteredData(filtered);
  }, [filters, data]);

  const columns = [
    { title: "S.No", dataIndex: "s_no", key: "s_no" },
    {
      title: "MR Number",
      dataIndex: "mr_number",
      key: "mr_number",
      filterDropdown: () => (
        <Input
          placeholder="Search MR Number"
          onChange={(e) => handleFilterChange("mr_number", e.target.value)}
        />
      ),
    },
    {
      title: "Patient Name",
      dataIndex: "patient_name",
      key: "patient_name",
      filterDropdown: () => (
        <Input
          placeholder="Search Patient"
          onChange={(e) => handleFilterChange("patient_name", e.target.value)}
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
      title: "Schedule Date",
      dataIndex: "schedule_date",
      key: "schedule_date",
      filterDropdown: () => (
        <DatePicker
          format="DD/MM/YYYY"
          onChange={(date) => handleDateChange("schedule_date", date)}
        />
      ),
    },
    {
      title: "Vaccination Name",
      dataIndex: "vaccination_name",
      key: "vaccination_name",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      filterDropdown: () => (
        <Input
          placeholder="Search Remarks"
          onChange={(e) => handleFilterChange("remarks", e.target.value)}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filterDropdown: () => (
        <Select
          defaultValue="--All--"
          onChange={(value) => handleFilterChange("status", value)}
        >
          {statusOptions.map((status, index) => (
            <Option key={index} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Vaccine Date",
      dataIndex: "vaccine_date",
      key: "vaccine_date",
      filterDropdown: () => (
        <DatePicker
          format="DD/MM/YYYY"
          onChange={(date) => handleDateChange("vaccine_date", date)}
        />
      ),
    },
    {
      title: "Options",
      key: "actions",
      render: (row) => (
        <EMRMenuIcon
          itemsArray={[{ name: "Schedule Appointment", icon: Schedule }]}
          callbackParam={{ data: row, from: "schedule_list" }}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        className="table-container mt-3"
      />
    </div>
  );
};

export default PatientVaccinationSchedule;

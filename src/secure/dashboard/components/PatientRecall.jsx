import React, { useEffect, useState } from "react";
import { Table, Input, Select, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const PatientRecall = () => {
  const [data, setData] = useState([
    {
      id: 1,
      s_no: "1",
      mr_number: "23435455",
      visit_date: "27/12/2024",
      patient_name: "Mr. Praveen",
      doctor: "Mr. Jhon",
      recall_date: "27/12/2024",
      status: "Being Seen",
    },
    {
      id: 2,
      s_no: "2",
      mr_number: "2345455",
      visit_date: "27/12/2024",
      patient_name: "Mr. Praveen",
      doctor: "Mr. Jhon",
      recall_date: "27/12/2024",
      status: "Being Seen",
    },
    {
      id: 3,
      s_no: "3",
      mr_number: "5435t4555",
      visit_date: "27/12/2024",
      patient_name: "Mr. Praveen",
      doctor: "Mr. Jhon",
      recall_date: "27/12/2024",
      status: "Being Seen",
    },
  ]);

  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let result = data.filter((row) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        if (key === "status" && filters[key] === "--All--") return true;
        return String(row[key])
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      })
    );
    setFilteredData(result);
  }, [filters, data]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (key, date) => {
    setFilters((prev) => ({
      ...prev,
      [key]: date ? moment(date).format("DD/MM/YYYY") : "",
    }));
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
      key: "s_no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "MR Number",
      dataIndex: "mr_number",
      key: "mr_number",
      filterDropdown: () => (
        <Input
          onChange={(e) => handleFilterChange("mr_number", e.target.value)}
        />
      ),
    },
    {
      title: "Visit Date",
      dataIndex: "visit_date",
      key: "visit_date",
      filterDropdown: () => (
        <DatePicker
          onChange={(date) => handleDateChange("visit_date", date)}
          format="DD/MM/YYYY"
        />
      ),
    },
    {
      title: "Patient Name",
      dataIndex: "patient_name",
      key: "patient_name",
      filterDropdown: () => (
        <Input
          onChange={(e) => handleFilterChange("patient_name", e.target.value)}
        />
      ),
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      filterDropdown: () => (
        <Input onChange={(e) => handleFilterChange("doctor", e.target.value)} />
      ),
    },
    {
      title: "Recall Date",
      dataIndex: "recall_date",
      key: "recall_date",
      filterDropdown: () => (
        <DatePicker
          onChange={(date) => handleDateChange("recall_date", date)}
          format="DD/MM/YYYY"
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
          <Option value="--All--">--All--</Option>
          <Option value="Re-Confirmed">Re-Confirmed</Option>
          <Option value="Booked">Booked</Option>
          <Option value="No Show">No Show</Option>
          <Option value="Cancelled">Cancelled</Option>
          <Option value="Arrived">Arrived</Option>
          <Option value="Concluded">Concluded</Option>
          <Option value="Being Seen">Being Seen</Option>
        </Select>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      className="table-container mt-3"
    />
  );
};

export default PatientRecall;

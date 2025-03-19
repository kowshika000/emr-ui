import React, { useState } from "react";
import { Table, Input, Select, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const PatientList = () => {
  const [filter, setFilter] = useState({});
  const [statusFilter, setStatusFilter] = useState("--All--");

  const handleFilterChange = (columnId, value, type) => {
    if (type === "select") {
      setStatusFilter(value);
    }
    setFilter({ ...filter, [columnId]: value });
  };

  const handleDateChange = (columnId, date) => {
    let value = date ? moment(date).format("DD/MM/YYYY") : "";
    setFilter({ ...filter, [columnId]: value });
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
      key: "s_no",
    },
    {
      title: "Registration Date",
      dataIndex: "patient_type",
      key: "patient_type",
    },
    {
      title: "MRD Number",
      dataIndex: "mr_number",
      key: "mr_number",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          onBlur={() => confirm()}
          placeholder="Search MRD Number"
        />
      ),
      onFilter: (value, record) =>
        record.mr_number.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Patient Name",
      dataIndex: "patient_name",
      key: "patient_name",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          onBlur={() => confirm()}
          placeholder="Search Patient Name"
        />
      ),
      onFilter: (value, record) =>
        record.patient_name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "DOB",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Gender",
      dataIndex: "recall_date",
      key: "recall_date",
    },
    {
      title: "Nationality",
      dataIndex: "Plan_of_care",
      key: "Plan_of_care",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Select
          value={selectedKeys[0]}
          onChange={(value) => {
            setSelectedKeys(value ? [value] : []);
            confirm();
          }}
          style={{ width: "100%" }}
        >
          <Option value="--All--">--All--</Option>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      ),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Options",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => <a href="#">Edit</a>,
    },
  ];

  const data = []; // Add your patient data here

  return (
    <div>
      <Table
        className="table-container"
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.s_no}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PatientList;

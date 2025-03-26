import React, { useEffect, useState } from "react";
import { Table, Input, Select, DatePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { patientList } from "../../../../Redux/slice/registration/patientList";

const { Option } = Select;

const PatientList = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.todayPatientList);
  const [filter, setFilter] = useState({});
  const [statusFilter, setStatusFilter] = useState("--All--");

  console.log("data", data);

  const handleFilterChange = (columnId, value, type) => {
    if (type === "select") {
      setStatusFilter(value);
    }
    setFilter({ ...filter, [columnId]: value });
  };

  const handleDateChange = (columnId, date) => {
    let value = date ? moment(date).format("YYYY-MM-DD") : "";
    setFilter({ ...filter, [columnId]: value });
  };

  useEffect(() => {
    dispatch(patientList());
  }, []);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : "--"),
    },
    {
      title: "MRD Number",
      dataIndex: "mrdNo",
      key: "mrdNo",
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
      dataIndex: "patientName",
      key: "patientName",
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
      dataIndex: "dob",
      key: "dob",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : "--"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
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

  return (
    <div>
      <Table
        className="table-container"
        columns={columns}
        dataSource={data || []}
        rowKey={(record, index) => index}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          onChange: (page, pageSize) =>
            setPagination({ current: page, pageSize }),
        }}
      />
    </div>
  );
};

export default PatientList;

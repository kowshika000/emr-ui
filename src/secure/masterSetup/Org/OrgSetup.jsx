import React, { useState } from "react";
import AddOrg from "./AddOrg";
import { Table } from "antd";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { EditOrgBranch, EditOrgName } from "./EditOrg";
import { IconButton } from "@mui/material";

const OrgSetup = () => {
  const [transfer, setTransfer] = useState(false);
  const [hospitalNameEdit, setHospitalNameEdit] = useState();
  const [hospitalBranchEdit, setHospitalBranchEdit] = useState();

  const handleTransfer = () => {
    setTransfer(true);
  };

  const handleEdit = () => {
    setHospitalBranchEdit(true);
  };
  const handleDelete = () => {
    // setDeleteModal(true);
  };

  const columns = [
    {
      title: "S No",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Branch Name",
      dataIndex: "BranchName",
      key: "BranchName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Speciality/Department",
      dataIndex: "SpecialityDepartment",
      key: "SpecialityDepartment",
      render: (text, record) => (
        <span
          style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => handleTransfer(record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Options",
      key: "actions",
      render: (_, record) => (
        <div>
          <EditOutlined
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => handleEdit()}
          />
          <DeleteOutline
            style={{ color: "red", cursor: "pointer", marginLeft: "10px" }}
            onClick={() => handleDelete()}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      sNo: 1,
      BranchName: "ABC Hospital-Thanjavur",
      address: "123 Street, NY",
      SpecialityDepartment: "Add",
    },
    {
      key: "2",
      sNo: 2,
      BranchName: "ABC Hospital-Kumbakonam",
      address: "456 Avenue, LA",
      SpecialityDepartment: "",
    },
  ];

  return (
    <div>
      <AddOrg />
      <div className="table-container">
        <h6>
          ABC Hospital{" "}
          <span>
            <IconButton size="small" onClick={() => setHospitalNameEdit(true)}>
              <EditOutlined />
            </IconButton>
          </span>
        </h6>
        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          className="m-4"
        />
      </div>
      {hospitalNameEdit && (
        <EditOrgName onClose={() => setHospitalNameEdit(false)} />
      )}
      {hospitalBranchEdit && (
        <EditOrgBranch onClose={() => setHospitalBranchEdit(false)} />
      )}
    </div>
  );
};

export default OrgSetup;

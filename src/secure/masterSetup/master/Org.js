import React, { useState } from "react";
import "./Org.css";
import FormInputs from "./FormInputsComponents/FormInputs";
import { EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import {
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  Typography,
  ListItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { GrEdit } from "react-icons/gr";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Org = () => {
  const [transfer, setTransfer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayfeild, setDisplayFeild] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [checked, setChecked] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [left, setLeft] = useState(["peadiatrics", "Diabetes", "Opthomology"]);
  const [right, setRight] = useState(["Dental", "Cardialogy", "Gynecology"]);
  const [editmodal, setEditModal] = useState(false);

  const intersection = (a, b) => a.filter((value) => b.includes(value));
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => {
    setChecked((prevChecked) =>
      prevChecked.includes(value)
        ? prevChecked.filter((item) => item !== value)
        : [...prevChecked, value]
    );
  };

  const handleCheckedRight = () => {
    setRight([...right, ...leftChecked]);
    setLeft(left.filter((item) => !leftChecked.includes(item)));
    setChecked(checked.filter((item) => !leftChecked.includes(item)));
  };

  const handleCheckedLeft = () => {
    setLeft([...left, ...rightChecked]);
    setRight(right.filter((item) => !rightChecked.includes(item)));
    setChecked(checked.filter((item) => !rightChecked.includes(item)));
  };

  const customList = (title, items) => (
    <Paper sx={{ width: 350, height: 330, overflow: "auto" }}>
      <Typography align="center" variant="h6" sx={{ mt: 1 }}>
        {title}
      </Typography>
      <List dense component="div">
        {items.map((value) => (
          <ListItem key={value} disablePadding>
            <ListItemButton onClick={() => handleToggle(value)}>
              <ListItemText primary={value + 1} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  const handletrnsfer = () => {
    setTransfer(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
    setEditModal(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setDeleteModal(false);
    setEditModal(false);
  };

  const handleCancel = () => {
    setDeleteModal(false);
    setEditModal(false);
  };
  const handleTransfer = () => {
    setTransfer(true);
  };

  const handleEdit = () => {
    setEditModal(true);
  };

  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    zone: "",
    city: "",
    branches: "",
    TRNno: "",
    DHAlicense: "",
    DHAusername: "",
    Emailid: "",
    Websitelink: "",
    Location: "",
    Address: "",
    Password: "",
    Mobno: "",
    Logo: "",
    name: "",
    Address: "",
    district: "",
    city: "",
    Editname: "",
    EditAddress: "",
    Editdistrict: "",
    Editcity: "",
  });

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeild = () => {
    setDisplayFeild(true);
    setHidden(false);
  };

  const handleDelete = () => {
    setDeleteModal(true);
  };
  const handleEditCancel = () => {
    setIsModalOpen(false);
    setEditModal(false);
  };
  const handleEditOk = () => {
    setEditModal(false);
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "S.no",
      dataIndex: "sNo",
      key: "sNo",
      onHeaderCell: () => ({
        style: {
          backgroundColor: " rgb(0, 128, 128)",
          color: "white",
          fontWeight: "bold",
        },
      }),
    },
    {
      title: "Branch Name",
      dataIndex: "BranchName",
      key: "BranchName",
      onHeaderCell: () => ({
        style: {
          backgroundColor: " rgb(0, 128, 128)",
          color: "white",
          fontWeight: "bold",
        },
      }),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      onHeaderCell: () => ({
        style: {
          backgroundColor: " rgb(0, 128, 128)",
          color: "white",
          fontWeight: "bold",
        },
      }),
    },
    {
      title: "Speciality/Department",
      dataIndex: "SpecialityDepartment",
      key: "SpecialityDepartment",
      onHeaderCell: () => ({
        style: {
          backgroundColor: " rgb(0, 128, 128)",
          color: "white",
          fontWeight: "bold",
        },
      }),
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
      onHeaderCell: () => ({
        style: {
          backgroundColor: " rgb(0, 128, 128)",
          color: "white",
          fontWeight: "bold",
        },
      }),
      render: (_, record) => (
        <div>
          <EditOutlined
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => handleEdit()}
          />
          <DeleteOutlined
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
    <div className="container-fluid">
      {hidden && (
        <div className="card m-4 ">
          <p className="m-4" style={{ fontWeight: "600" }}>
            Create Org
          </p>

          <div className="">
            <div className="row m-4">
              <div className="col-sm ">
                <FormInputs
                  id="org-input"
                  label="Enter Hospital Name"
                  value={formData.hospitalName}
                  onChange={handleChange("hospitalName")}
                  required
                />
              </div>
              <div className="col-sm ">
                <FormInputs
                  id="org-input"
                  label="Address"
                  value={formData.address}
                  onChange={handleChange("address")}
                  required
                />
              </div>
              <div className="col-sm">
                <FormInputs
                  id="org-input"
                  label="Zone"
                  value={formData.zone}
                  onChange={handleChange("zone")}
                />
              </div>
              <div className="col-sm">
                <FormInputs
                  id="org-input"
                  label="City"
                  value={formData.city}
                  onChange={handleChange("city")}
                />
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary mb-4"
                style={{ marginLeft: "48%" }}
                onClick={handleFeild}
              >
                save
              </button>
            </div>
          </div>
        </div>
      )}

      {displayfeild && (
        <>
          <div className="row m-4 mt-5">
            <p style={{ fontWeight: "600" }}>Create Branch</p>
            <div className="col-sm">
              <FormInputs
                label="Enter No of branches"
                value={formData.branches}
                onChange={handleChange("branches")}
              />
            </div>
            <div className="col-sm">
              <FormInputs
                label="TRN No"
                value={formData.TRNno}
                onChange={handleChange("TRNno")}
                type="text"
              />
            </div>
            <div className="col-sm">
              <FormInputs
                label="DHA License Number"
                value={formData.DHAlicense}
                onChange={handleChange("DHAlicense")}
                type="number"
              />
            </div>
            <div className="col-sm">
              <FormInputs
                label="DHA Username"
                value={formData.DHAusername}
                onChange={handleChange("DHAusername")}
                type="text"
              />
            </div>
          </div>

          <div className="row m-4">
            <div className="col-sm">
              <FormInputs
                label="Email Id"
                value={formData.Emailid}
                onChange={handleChange("Emailid")}
                type="email"
              />
            </div>
            <div className="col-sm">
              <FormInputs
                label="Website link"
                value={formData.Websitelink}
                onChange={handleChange("Websitelink")}
              />
            </div>
            <div className="col-sm">
              <FormInputs
                label="Location"
                value={formData.Location}
                onChange={handleChange("Location")}
              />
            </div>
            <div className="col-sm">
              <FormInputs
                label="Address"
                value={formData.Address}
                onChange={handleChange("Address")}
              />
            </div>
          </div>

          <div className="row m-4">
            <div className="col-sm">
              <FormInputs
                label="Password"
                value={formData.Password}
                onChange={handleChange("Password")}
                type="password"
              />
            </div>
            <div className="col-sm">
              <FormInputs
                label="Mobile No"
                value={formData.Mobno}
                onChange={handleChange("Mobno")}
                type="number"
              />
            </div>
            <div className="col-sm">
              <FormInputs
                label="Upload Photo"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("Selected file:", file);
                }}
                inputProps={{ accept: "image/*" }}
              />
            </div>
            <div className="col-sm ">
              <button className="btn btn-sm btn-primary">Upload</button>
              <button className="btn btn-sm btn-success mx-3">Create</button>
            </div>
          </div>
        </>
      )}

      <div className="table-content m-4">
        <div className="d-flex">
          <p style={{ fontWeight: "600" }}>ABC Hospital</p>
          <GrEdit
            style={{ marginTop: "5px", marginLeft: "10px" }}
            onClick={showModal}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        className="m-4"
      />

      <Modal
        title="Mapping Speciality to branch1  "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <>
            <button onClick={handleEditOk} className="btn btn-primary">
              Update
            </button>
            <button onClick={handleEditCancel} className="btn btn-danger mx-2">
              Cancel
            </button>
          </>,
        ]}
      >
        <div className="mt-2">
          <FormInputs
            label="Name"
            value={formData.name}
            onChange={handleChange("name")}
            required
          />
          <FormInputs
            className="mt-2"
            label="Address"
            value={formData.Address}
            onChange={handleChange("Address")}
            required
          />
          <FormInputs
            className="mt-2"
            label="district"
            value={formData.district}
            onChange={handleChange("district")}
            required
          />
          <FormInputs
            className="mt-2"
            label="city"
            value={formData.city}
            onChange={handleChange("city")}
            required
          />
        </div>
      </Modal>

      <BootstrapDialog
        onClose={handletrnsfer}
        aria-labelledby="customized-dialog-title"
        open={transfer}
        sx={{ "& .MuiDialog-paper": { width: "80%", maxWidth: "900px" } }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handletrnsfer}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
            <Grid item>{customList("Select list of Specialities", left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList("Branch 1 Speciality", right)}</Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handletrnsfer}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <Modal
        tittle=""
        open={deletemodal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button onClick={handleCancel} className="btn btn-primary">
            Cancel
          </button>,
          <button className="btn btn-danger mx-2" onClick={handleOk}>
            Delete
          </button>,
        ]}
      >
        <p>Are you Sure want to delete!</p>
      </Modal>

      <Modal
        title=""
        open={editmodal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button onClick={handleCancel} className="btn btn-primary">
            Cancel
          </button>,
          <button className="btn btn-success mx-2" onClick={handleOk}>
            Edit
          </button>,
        ]}
      >
        <div className="mt-2">
          <FormInputs
            label="Name"
            value={formData.Editname}
            onChange={handleChange("Editname")}
            required
          />
          <FormInputs
            className="mt-2"
            label="Address"
            value={formData.EditAddress}
            onChange={handleChange("EditAddress")}
            required
          />
          <FormInputs
            className="mt-2"
            label="district"
            value={formData.Editdistrict}
            onChange={handleChange("Editdistrict")}
            required
          />
          <FormInputs
            className="mt-2"
            label="city"
            value={formData.Editcity}
            onChange={handleChange("Editcity")}
            required
          />
        </div>
      </Modal>
    </div>
  );
};

export default Org;

import React, { useState } from 'react'
import { EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import FormInputs from './FormInputsComponents/FormInputs';
import { ReloadOutlined } from "@ant-design/icons";
import { Modal } from 'antd';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Usersetup = () => {

    const [formData, setFormData] = useState({
        Name: "",
        RoleType: "",
        UserName: "",
        LoginPassword: "",
        PasswordGroup: "",
        Arabic: "",
        Type: "",
        ClinicalCode: "",
        ServiceCode: "",
        ConsultationFees: "",
        ClinicalLogin: "",
        ClinicalPassword: "",
        PasswordGroup1: ""





    })

    const handleChange = (field) => (value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === "RoleType" && value === "Doctor") {
            setDoctorOpen(true);
        } else if (field === "RoleType") {
            setDoctorOpen(false);
        }


        if (field === "PasswordGroup") {
            if (value === "Easy Password") {
                setFormData((prev) => ({
                    ...prev,
                    PasswordGroup1: "12345",
                }));
            } else if (value === "Strong Password") {
                setFormData((prev) => ({
                    ...prev,
                    PasswordGroup1: generateStrongPassword(),
                }));
            }
        }
    };


    const generateStrongPassword = () => {
        return Math.random().toString(36).slice(-10) + "!@#";
    };






    const [open, setOpen] = useState(false);
    const [doctorOpen, setDoctorOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    }

    const showModal = () => {
        setOpen(true);
    };

    const handleDoctor = () => {
        setDoctorOpen(false)
        setOpen(false)
    }

    const DN = [
        { id: '1', value: 'Doctor', label: "Doctor" },
        { id: '2', value: 'nurse', label: "Nurse" },
        { id: '3', value: 'labtechnisian', label: "labtechnisian" },
        { id: '4', value: 'inventory', label: "inventory" },
        { id: '5', value: 'billing', label: "billing" },
        { id: '6', value: 'receptionist', label: "receptionist" },
        { id: '7', value: 'Accountant', label: "Accountant" },
        { id: '8', value: 'insurance', label: "insurance" },

    ]

    const pass = [{ id: '1', value: 'easy', label: 'Easy Password' },
    { id: '2', value: 'storng', label: 'Strong Password' }]

    const columns = [
        {
            title: "S.no",
            dataIndex: "sNo",
            key: "sNo",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "UserType",
            dataIndex: "UserType",
            key: "UserType",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "UserName",
            dataIndex: "UserName",
            key: "UserName",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "Employeeid",
            dataIndex: "Employeeid",
            key: "Employeeid",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "Roleassaigned",
            dataIndex: "Roleassaigned",
            key: "Roleassaigned",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "Status",
            dataIndex: "Status",
            key: "Status",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "createdby",
            dataIndex: "createdby",
            key: "createdby",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "Options",
            key: "actions",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
            render: (_, record) => (
                <div>
                    <EditOutlined
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => console.log("Edit", record)}
                    />

                    <ReloadOutlined style={{ color: "green", cursor: "pointer", marginLeft: "10px" }}
                        onClick={() => console.log("Refresh", record)}
                    />

                    <DeleteOutlined style={{ color: "red", cursor: "pointer", marginLeft: "10px" }}
                        onClick={() => console.log("delete", record)} />
                </div>
            ),
        },
    ];






    const data = [
        {
            key: "1",
            sNo: 1,
            UserType: "Administrator",
            UserName: "Peter",
            Employeeid: '601',
            Roleassaigned: "CEO",
            Status: "Active",
            createdby: "Admin"


        },
        {
            key: "2",
            sNo: 2,
            UserType: "Doctor",
            UserName: "Hari",
            Employeeid: '602',
            Roleassaigned: "Surgeon",
            Status: "Active",
            createdby: ""

        },

    ]


    return (


        <>
            <div className='container-fluid'>
<div className='content m-4'>

<div style={{display:'flex',justifyContent:"flex-end"}}>
<button className='Addnewuser-b btn btn-sm btn-primary ' onClick={showModal}>Add New User</button>
    
</div>


                <div className='row '>
                    <Table columns={columns} dataSource={data} size="middle" className="mt-5" />
                </div>
                <Modal
                    title="Add New User"
                    centered
                    open={open}
                    onOk={handleDoctor}
                    onCancel={() => setOpen(false)}
                    width={1000}
                >



                    <div className='row'>
                        <div className='col-sm'>
                            <FormInputs
                                label="Name "
                                value={formData.Name}
                                onChange={handleChange("Name")}
                                required
                            />
                        </div>

                        <div className='col-sm'>
                            <FormInputs

                                label="UserName"
                                value={formData.UserName}
                                onChange={handleChange("UserName")}
                                required
                            />
                        </div>

                        <div className='col-sm'>
                            <FormInputs
                                label="Arabic"
                                value={formData.Arabic}
                                onChange={handleChange("Arabic")}
                                required
                            />

                        </div>

                        <div className='col-sm'>


                            <FormInputs
                                type='password'
                                label="LoginPassword"
                                value={formData.LoginPassword}
                                onChange={handleChange("LoginPassword")}
                                required
                            />
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-sm mt-3'>
                            <FormInputs


                                label={"RoleType"}
                                required={true}
                                type="select"
                                options={DN}
                                value={formData.RoleType}
                                onChange={handleChange("RoleType")}
                            />
                        </div>

                        <div className='col-sm mt-3'>
                            <FormInputs

                                label={"PasswordGroup"}
                                required={true}
                                type="select"
                                options={pass}
                                value={formData.PasswordGroup}
                                onChange={handleChange("PasswordGroup")}
                            />
                        </div>



                    </div>

                    {doctorOpen && (
                        <>
                            <div className=' mt-5'>


                                <div className='row'>
                                    <div className='col-sm'>
                                        <FormInputs

                                            label="Type"
                                            value={formData.Type}
                                            onChange={handleChange("Type")}
                                            required
                                        />
                                    </div>
                                    <div className='col-sm'>
                                        <FormInputs

                                            label="ClinicalCode"
                                            value={formData.ClinicalCode}
                                            onChange={handleChange("ClinicalCode")}
                                            required
                                        />
                                    </div>
                                    <div className='col-sm'>
                                        <FormInputs

                                            label="ServiceCode"
                                            value={formData.ServiceCode}
                                            onChange={handleChange("ServiceCode")}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm'>
                                        <FormInputs

                                            label="ConsultationFees"
                                            value={formData.ConsultationFees}
                                            onChange={handleChange("ConsultationFees")}
                                            required
                                        />
                                    </div>
                                    <div className='col-sm'>
                                        <FormInputs

                                            label="ClinicalLogin"
                                            value={formData.ClinicalLogin}
                                            onChange={handleChange("ClinicalLogin")}
                                            required
                                        />
                                    </div>
                                    <div className='col-sm'>
                                        <FormInputs

                                            label="ClinicalPassword"
                                            value={formData.ClinicalPassword}
                                            onChange={handleChange("ClinicalPassword")}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm'>
                                        <FormInputs
                                            style={{ width: "310px" }}
                                            type={showPassword ? "text" : "password"}  // Toggle between text and password
                                            label="PasswordGroup1"
                                            value={formData.PasswordGroup1}
                                            onChange={handleChange("PasswordGroup1")}
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                    </div>

                                </div>
                            </div>
                        </>
                    )}


                </Modal>



                </div>

            </div>

        </>
    )
}

export default Usersetup
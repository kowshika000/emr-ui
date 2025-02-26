import React, { useState } from 'react'
import { EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import FormInputs from './FormInputsComponents/FormInputs';
import { Modal } from 'antd';



const Speciality = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        Name: '',
        Code: '',
        Type: "",

    })
    const handleChange = (field) => (value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
            title: " status",
            dataIndex: "status",
            key: "status",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "DepartmentName",
            dataIndex: "DepartmentName",
            key: "DepartmentName",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "DepartmentType",
            dataIndex: "DepartmentType",
            key: "DepartmentType",
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
            status: "Active",
            DepartmentName: "Billing",
            DepartmentType: 'medical',



        },
        {
            key: "2",
            sNo: 2,
            status: "Active",
            DepartmentName: "Anesthesia",
            DepartmentType: 'medical',

        },
        {
            key: "3",
            sNo: 3,
            status: "New",
            DepartmentName: "New Spec",
            DepartmentType: 'medical',

        },
    ]

    return (
        <>
            <div className='container-fluid'>
                <div className='content m-4'>


                    <div className='header  '>
                        <p style={{ fontWeight: "600" }}>Speciality Master</p>
                        <button className='btn btn-sm btn-primary' onClick={showModal}>Add Department</button>
                    </div>
                    <div className='row '>
                        <Table columns={columns} dataSource={data} size="middle" className="mt-5" />
                    </div>
                    <Modal title=" " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <div className='mt-2'>

                            <FormInputs
                                label="Name"
                                value={formData.Name}
                                onChange={handleChange("Name")}
                                required
                            />


                            <FormInputs
                                className='mt-3'
                                label="Code"
                                value={formData.Code}
                                onChange={handleChange("Code")}
                                required
                            />
                            <div className='mt-3'> 
                            <FormInputs

                                style={{ width: "470px" }}
                                label={"Type"}
                                required={true}
                                type="select"
                                //   options={OPTION.visitOptions}
                                value={formData.Type}
                                onChange={handleChange("Type")}
                            /></div>

                            <div className='mt-3 '>
                                <input className='form-check-input ' type='radio' name='options' />
                                <label className='mx-2'>Enable</label>

                                <input className='form-check-input' type='radio' name='options' />
                                <label className='mx-2'>Disable</label>

                            </div>

                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default Speciality
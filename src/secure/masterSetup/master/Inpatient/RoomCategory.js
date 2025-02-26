import React, { useState } from 'react'
import FormInputs from '../FormInputsComponents/FormInputs'
import { FaRegFileExcel } from "react-icons/fa6";
import { EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons"

const RoomCategory = () => {
    const [formData, setFormData] = useState({
        roomcategory: "",

    })

    const category = [{ id: '1', value: 'SharingRoom', label: 'SharingRoom' },
         { id: '2', value: 'TwinSharing', label: 'TwinSharing' }, 
         { id: '3', value: 'SingleRoom', label: 'SingleRoom' }]

    const handleChange = (field) => (value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
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
            title: "RoomType",
            dataIndex: "RoomType",
            key: "RoomType",
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
                    // onClick={() => handleEdit()}
                    />
                    <DeleteOutlined style={{ color: "red", cursor: "pointer", marginLeft: "10px" }}
                    // onClick={() => handleDelete()}
                    />
                </div>
            ),
        },
    ];


    const data = [
        {
            key: "1",
            sNo: 1,
            RoomType: "Sharing Room",
        },
        {
            key: "2",
            sNo: 2,
            RoomType: " Twin Sharing",

        },
        {
            key: "3",
            sNo: 3,
            RoomType: "Single Room",

        },
    ];


    return (
        <>
            <div className='container-fluid'>
                <div className='content'>
                    <div className='row'>
                        <div className='col-sm'>
                            <FormInputs
                                style={{ width: "230px" }}
                                id='org-input'
                                label="roomcategory"
                                type='select'
                                options={category}
                                value={formData.roomcategory}
                                onChange={handleChange("roomcategory")}
                                required
                            />
                        </div>

                    </div>
                    <div className='uploads-buttons mt-5'>

                        <div> <button className='btn btn-sm btn-primary' style={{ width: "180px" }}>Save</button></div>
                        <div>
                            <button className='btn btn-success btn-sm' style={{ width: "280px" }}>Bulk Upload <FaRegFileExcel style={{ marginTop: "-7px" }} /></button>

                        </div>

                    </div>
                    <Table columns={columns} dataSource={data} size="middle" className="mt-5" />
                </div>
            </div>
        </>
    )
}

export default RoomCategory
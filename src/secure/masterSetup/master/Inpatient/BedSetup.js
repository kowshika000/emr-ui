import React, { useState } from 'react'
import FormInputs from '../FormInputsComponents/FormInputs';
import { FaRegFileExcel } from "react-icons/fa6";
import { EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons"

const BedSetup = () => {
    const [formData, setFormData] = useState({
        roomno: "",
        wardname: '',
        bedno: '',
        roomtype: '',
        bedspeciality: '',
        roomcategory: '',
        rate: '',

    })

    const handleChange = (field) => (value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const rootype = [{ id: '1', value: 'DayCase', label: 'DayCase' },
    { id: '2', value: 'WardRoom', label: 'WardRoom' },
    { id: '3', value: 'SemiPrivateRoom', label: 'SemiPrivateRoom' },
    { id: '4', value: 'PrivateRoom', label: 'PrivateRoom' },
    { id: '5', value: 'VipRoom', label: 'VipRoom' },
    { id: '6', value: 'VvipRoom', label: 'VvipRoom' },
    { id: '7', value: 'ICU', label: 'ICU' },
    { id: '8', value: 'NICU', label: 'NICU' }]

    const Speciality = [{ id: '1', value: 'normal', label: 'Normal' },
    { id: '2', value: 'vendilator', label: 'Vendilator' }]



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
            title: "RoomNo/Name",
            dataIndex: "RoomNo/Name",
            key: "RoomNo/Name",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "WardName",
            dataIndex: "WardName",
            key: "WardName",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "BedNo",
            dataIndex: "BedNo",
            key: "BedNo",
            onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
            }),
        },
        {
            title: "Rate",
            dataIndex: "Rate",
            key: "Rate",
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
            title: "BedSpeciality",
            dataIndex: "BedSpeciality",
            key: "BedSpeciality",
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
            RoomNoName: '',
            WardName: "",
            BedNo:'',
            Rate:'',
            RoomType: "",
            BedSpeciality: "",


        },
        {
            key: "2",
            sNo: 2,
            RoomNoName: '',
            WardName: "",
            BedNo:'',
            Rate:'',
            RoomType: "",
            BedSpeciality: "",

        },
    ];


    return (

        <>
            <div className='container-fluid'>
                <div className='content m-4'>
                    <div className='row'>
                        <div className='col'>
                            <FormInputs
                                style={{ width: "230px" }}
                                id='org-input'
                                label="RoomName/No"
                                value={formData.roomno}
                                onChange={handleChange("roomno")}
                                required
                            />
                        </div>
                        <div className='col'>
                            <FormInputs
                                style={{ width: "230px" }}
                                id='org-input'
                                label="wardName"
                                value={formData.wardname}
                                onChange={handleChange("wardname")}
                                required
                            />
                        </div>
                        <div className='col'>
                            <FormInputs
                                style={{ width: "230px" }}
                                id='org-input'
                                label="BedNo"
                                value={formData.bedno}
                                onChange={handleChange("bedno")}
                                required
                            />
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col'>
                            <FormInputs
                                style={{ width: "230px" }}
                                id='org-input'
                                label="roomtype"
                                options={rootype}
                                type='select'
                                value={formData.roomtype}
                                onChange={handleChange("roomtype")}
                                required
                            />
                        </div>
                        <div className='col'>
                            <FormInputs
                                style={{ width: "230px" }}
                                id='org-input'
                                label="BedSpeciality"
                                options={Speciality}
                                type='select'
                                value={formData.bedspeciality}
                                onChange={handleChange("bedspeciality")}
                                required
                            />
                        </div>
                        <div className='col'>
                            <FormInputs
                                style={{ width: "230px" }}
                                id='org-input'
                                label="Rate"
                                value={formData.rate}
                                onChange={handleChange("rate")}
                                required
                            />
                        </div>

                    </div>
                    <div className='uploads-buttons1 mt-5'>

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

export default BedSetup
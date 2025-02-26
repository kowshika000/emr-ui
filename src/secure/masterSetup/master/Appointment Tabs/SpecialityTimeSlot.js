import React, { useState } from 'react'
import FormInputs from '../FormInputsComponents/FormInputs';
import { EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const SpecialityTimeSlot = () => {
     const [formData, setFormData] = useState({
   
            speciality: "",
            starttime: "",
            endtime: "",
            intervalminutes: "",
    
          
      })
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
          title: "Speciality",
          dataIndex: "Speciality", 
          key: "Speciality",
          onHeaderCell: () => ({
            style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
          }),
        },
        {
          title: "StartTime",
          dataIndex: "StartTime", 
          key: "StartTime",
          onHeaderCell: () => ({
            style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
          }),
        },
        {
            title: "EndTime",
        dataIndex: "EndTime", 
        key: "EndTime",
        onHeaderCell: () => ({
          style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
        }),
      },
        {
          title: "IntervalMinutes",
          dataIndex: "IntervalMinutes", 
          key: "IntervalMinutes",
          onHeaderCell: () => ({
            style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
    
          }),
         
        },
        {
            title: 'Status',
            dataIndex: "Status", 
            key: "Status",
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
          Speciality: "General Surgery",
          StartTime: "08:00",
          EndTime:'21:00',
          IntervalMinutes: "30",
          Status:'Active',

    
    
        },
        {
          key: "2",
          sNo: 2,
          Speciality: "Anesthetics",
          StartTime: "10:00",
          EndTime:'16:00',
          IntervalMinutes: "30",
          Status:'Active',
        },
      ];


    return (
        <>
            <div className='container-fluid'>
                <div className='content'>
                    <div className='row'>
                        <div className='col-sm'>
                            <FormInputs
                                id='org-input'
                                label="Speciality"
                                type='select'
                                value={formData.speciality}
                                onChange={handleChange("speciality")}
                                required
                            />

                        </div>
                        <div className='col-sm'>
                            <FormInputs
                                id='org-input'
                                label="Start Time"
                                type='select'
                                value={formData.starttime}
                                onChange={handleChange("starttime")}
                                required
                            />
                        </div>
                        <div className='col-sm'>
                            <FormInputs
                                id='org-input'
                                label="End Time"
                                type='select'
                                value={formData.endtime}
                                onChange={handleChange("endtime")}
                                required
                            />
                        </div>
                        <div className='col-sm'>
                            <FormInputs
                                id='org-input'
                                label="interval Minutes"
                                type='select'
                                value={formData.intervalminutes}
                                onChange={handleChange("intervalminutes")}
                                required
                            />
                        </div>
                    </div>

                    <div className='uploads-button mt-5'>

                        <div> <button className='btn btn-sm btn-primary' style={{ width: "180px" }}>Save</button></div>

                    </div>


<div className='row'>
    <Table columns={columns} dataSource={data} size="middle" className="mt-5" />
</div>
                </div>
            </div>
        </>
    )
}

export default SpecialityTimeSlot
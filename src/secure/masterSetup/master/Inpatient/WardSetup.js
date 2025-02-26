import React, { useState } from 'react'
import FormInputs from '../FormInputsComponents/FormInputs'
import { FaRegFileExcel } from "react-icons/fa6";
import { EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons"


const WardSetup = () => {

  const [formData, setFormData] = useState({
    wardtype: "",
    wardname:"",
    warddescription:"",
    nobeds:""

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
      title: "WardType",
      dataIndex: "WardType", 
      key: "WardType",
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
      title: "NoOfRooms",
      dataIndex: "NoOfRooms", 
      key: "NoOfRooms",
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
      WardType: "General Ward",
      WardName: "General Ward A",
      NoOfRooms: "4",


    },
    {
      key: "2",
      sNo: 2,
      WardType: "General Ward",
      WardName: "General Ward B",
      NoOfRooms: "4",
    },
  ];

  return (
    <>
      <div className='container-fluid mt-5'>
        <div className='content m-4'>
          <div className='row '>


            <div className="col-sm">
              <FormInputs
                id='org-input'
                label="Ward Type"
                value={formData.wardtype}
                onChange={handleChange("wardtype")}
                required
              />
            </div>
            <div className="col-sm">
              <FormInputs
                id='org-input'
                label="Ward Name"
                value={formData.wardname}
                onChange={handleChange("wardname")}
                required
              />
            </div>
            <div className="col-sm">
              <FormInputs
                id='org-input'
                label="Ward Description"
                value={formData.warddescription}
                onChange={handleChange("warddescription")}
                required
              />
            </div>
            <div className="col-sm">
              <FormInputs
                id='org-input'
                label="Number of Beds"
                value={formData.nobeds}
                onChange={handleChange("nobeds")}
                required
              />
            </div>
            <div className='uploads-buttons mt-4'>

              <div> <button className='btn btn-sm btn-primary' style={{width:"180px"}}>Save</button></div>
              <div>
                <button className='btn btn-success btn-sm' style={{width:"280px"}}>Bulk <FaRegFileExcel  style={{marginTop:"-7px"}}/></button>

              </div>

            </div>
          </div>

          <Table columns={columns} dataSource={data} size="middle" className="mt-5" />
        </div>
      </div>
    </>
  )
}

export default WardSetup
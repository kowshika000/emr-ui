import React, { useState } from 'react'
import FormInputs from '../FormInputsComponents/FormInputs'
import { FaRegFileExcel } from "react-icons/fa6";
import { EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons"

const RoomSetup = () => {
      const [formData, setFormData] = useState({
        roomno: "",
        wardname:'',
        roomtype:'',
        roomcategory:''
    
        })
    
        const rootype = [{id:'1',value:'DayCase',label:'DayCase'},
            {id:'2',value:'WardRoom',label:'WardRoom'},
            {id:'3',value:'SemiPrivateRoom',label:'SemiPrivateRoom'},
            {id:'4',value:'PrivateRoom',label:'PrivateRoom'},
            {id:'5',value:'VipRoom',label:'VipRoom'},
            {id:'6',value:'VvipRoom',label:'VvipRoom'},
            {id:'7',value:'ICU',label:'ICU'},
            {id:'8',value:'NICU',label:'NICU'}]

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
              title: "RoomType",
              dataIndex: "RoomType", 
              key: "RoomType",
              onHeaderCell: () => ({
                style: { backgroundColor: " rgb(0, 128, 128)", color: "white", fontWeight: "bold" },
        
              }),
             
            },
            {
                title: "RoomCategory",
                dataIndex: "RoomCategory", 
                key: "RoomCategory",
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
              RoomNoName:'',
              WardName: "",
              RoomType: "",
              RoomCategory: "",
        
        
            },
            {
              key: "2",
              sNo: 2,
              RoomNoName:'',
              WardName: "",
              RoomType: "",
              RoomCategory: "",
        
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
                                label="RoomCategory"
                                options={category}
                                type='select'
                                value={formData.roomcategory}
                                onChange={handleChange("roomcategory")}
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

export default RoomSetup
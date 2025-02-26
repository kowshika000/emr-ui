import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Avatar, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: 'sNo',
    headerName: 'Queue No',
    width: 150,
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    cellClassName: 'centeredCell',
    headerAlign: 'center'
  },
  {
    field: 'mrdNo',
    headerName: 'MRD No',
    width: 150,
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    cellClassName: 'centeredCell',
    headerAlign: 'center'
  },
  {
    field: 'name',
    headerName: 'Patient Name',
    width: 200,
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    cellClassName: 'centeredCell',
    headerAlign: 'center'
  },
  {
    field: 'consultationDate',
    headerName: 'Last Consultation Date',
    width: 200,
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    cellClassName: 'centeredCell',
    headerAlign: 'center'
  },
  {
    field: 'procedure',
    headerName: 'Procedure',
    width: 180,
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    cellClassName: 'centeredCell',
    headerAlign: 'center'
  },
  {
    field: 'insuranceName',
    headerName: 'Insurance',
    width: 180,
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    cellClassName: 'centeredCell',
    headerAlign: 'center'
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Avatar sx={{ bgcolor: params.value.color, color: '#fff' }}>
          {params.value.initials}
        </Avatar>
      </div>
    ),
    cellClassName: 'centeredCell',
    headerAlign: 'center'
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <ActionsMenu mrdNo={params.row.mrdNo} />
      </div>
    ),
    cellClassName: 'centeredCell',
    headerAlign: 'center'
  },
];

export default function OthersDataList({ dashboardList }) {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const transformedData = dashboardList.map((item, index) => ({
      id: item.mrdNo || index,
      sNo: item.sNo,
      mrdNo: item.mrdNo,
      name: item.name,
      consultationDate: item.consultationDate || '-',
      procedure: item.procedure || '-',
      insuranceName: item.insuranceName,
      status: {
        color: item.status === 'N' ? '#ADD8E6' : '#fae2d0',
        initials: item.status === 'N' ? 'N' : item.status
      },
      actions: item.mrdNo,
    }));

    setRows(transformedData);
  }, [dashboardList]);




  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}

function ActionsMenu({ mrdNo }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    if (action === "Open encounter") {
      navigate('/doctor/doctorEmr')
    }

    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuClick('Refer to OP')}>
          <ListItemIcon>
            <LocalHospitalIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Refer to OP" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick('Refer to IP')}>
          <ListItemIcon>
            <AssignmentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Refer to IP" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick('View Order Form')}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View Order Form" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick('Download Report')}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Download Report" />
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View Paitent Details" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick('Open encounter')}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Open encounter" />
        </MenuItem>
      </Menu>
    </div>
  );
}

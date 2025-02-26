import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Typography,
  Divider,
  DialogActions,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  '.MuiDataGrid-columnHeaders': {
    textAlign: 'center',
  },
  '.MuiDataGrid-groupHeader': {
    textAlign: 'center',
  },
  '& .MuiDataGrid-scrollbar--horizontal': {
    height: '8px !important',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  },
  '& .MuiDataGrid-scrollbar--horizontal .MuiDataGrid-scrollbarContent': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
  '& .MuiDataGrid-scrollbar--horizontal .MuiDataGrid-scrollbarContent:hover': {
    backgroundColor: '#555',
  },
}));

export default function RevenueDataList({ dashboardList }) {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };


  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); 
  };

  
  const handleEmpty = (value) => (value ? value : '-');

  
  const columns = [
    { field: 'sno', headerName: 'S. No', width: 90 },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      valueGetter: (params) => formatDate(params.row.date), 
    },
    {
      field: 'regNo',
      headerName: 'Reg No',
      width: 150,
      valueGetter: (params) => handleEmpty(params.row.regNo), 
    },
    {
      field: 'patientName',
      headerName: 'Patient Name',
      width: 200,
      valueGetter: (params) => handleEmpty(params.row.patientName), 
    },
    {
      field: 'view',
      headerName: 'Revenue Details',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickOpen(params.row)}
        >
          View
        </Button>
      ),
    },
    {
      field: 'gross',
      headerName: 'Gross',
      width: 150,
      align: 'right',
      headerAlign: 'center',
      valueGetter: (params) => handleEmpty(params.row.gross), 
    },
    {
      field: 'discount',
      headerName: 'Discount',
      width: 150,
      align: 'right',
      headerAlign: 'center',
      valueGetter: (params) => handleEmpty(params.row.discount), 
    },
    {
      field: 'net',
      headerName: 'Net',
      width: 150,
      align: 'right',
      headerAlign: 'center',
      valueGetter: (params) => handleEmpty(params.row.net), 
    },
    {
      field: 'revenue',
      headerName: 'Revenue',
      width: 150,
      align: 'right',
      headerAlign: 'center',
      valueGetter: (params) => handleEmpty(params.row.revenue), 
    },
  ];


  const rows = dashboardList.map((item, index) => ({
    id: index + 1,
    sno: index + 1,
    date: item.date,
    regNo: item.regNo,
    patientName: item.patientName,
    gross: item.gross,
    discount: item.discount,
    net: item.net,
    revenue: item.revenue,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <CustomDataGrid rows={rows} columns={columns} pageSize={5} />

      
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Revenue Details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedRow && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Date: </strong>
                  {formatDate(selectedRow.date)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Reg No: </strong>
                  {handleEmpty(selectedRow.regNo)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Patient Name: </strong>
                  {handleEmpty(selectedRow.patientName)}
                </Typography>
              </Grid>
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Gross: </strong>
                  {handleEmpty(selectedRow.gross)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Discount: </strong>
                  {handleEmpty(selectedRow.discount)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Net: </strong>
                  {handleEmpty(selectedRow.net)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Revenue: </strong>
                  {handleEmpty(selectedRow.revenue)}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

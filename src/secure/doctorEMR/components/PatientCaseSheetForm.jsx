import React from 'react';
import { Box, TextField, Button, Typography, Divider, Grid } from '@mui/material';
import { useFormik } from 'formik';

const PatientCaseSheetForm = ({ caseSheetFormValues, initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      chiefCompliant: '',
      hopi: '',
      pastMedicalHistory: '',
      pastSurgicalHistory: '',
      familyHistory: '',
      examination: '',
      treatmentPlan: '',
      progressNote: '',
      followUpNote: '',
      diagnosis: '',
      medication: '',
      investigation: '',
      treatment: ''
    },
    enableReinitialize: true, 
    onSubmit: (values) => {
      caseSheetFormValues(values); 
    },
  });

  return (
    <Box
      sx={{
        maxWidth: 1250,
        mx: 'auto',
        p: 2,
        borderRadius: 4,
        border: '1px solid #ccc',
        height: '80vh', 
        overflow: 'hidden', 
        marginTop: '10px',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1,
          borderBottom: '1px solid #ccc',
          padding: '8px 0',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2, fontFamily: 'Arial, sans-serif' }}>
          Case Sheet
        </Typography>
        <Divider variant="middle" sx={{ borderBottomWidth: 2, width: '5%', margin: '0.5rem auto', borderColor: 'black' }} />
      </Box>
      <Box
        sx={{
          overflowY: 'auto', 
          height: 'calc(100% - 100px)', 
          paddingTop: 2,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Chief Complaint"
                name="chiefCompliant"
                value={formik.values.chiefCompliant}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="HOPI"
                name="hopi"
                value={formik.values.hopi}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Past Medical History"
                name="pastMedicalHistory"
                value={formik.values.pastMedicalHistory}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Past Surgical History"
                name="pastSurgicalHistory"
                value={formik.values.pastSurgicalHistory}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Family History"
                name="familyHistory"
                value={formik.values.familyHistory}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Examination"
                name="examination"
                value={formik.values.examination}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Treatment Plan"
                name="treatmentPlan"
                value={formik.values.treatmentPlan}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Progress Note"
                name="progressNote"
                value={formik.values.progressNote}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Follow Up Note"
                name="followUpNote"
                value={formik.values.followUpNote}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Diagnosis"
                name="diagnosis"
                value={formik.values.diagnosis}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Medication"
                name="medication"
                value={formik.values.medication}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Investigation"
                name="investigation"
                value={formik.values.investigation}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Treatment"
                name="treatment"
                value={formik.values.treatment}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} container justifyContent="flex-end">
              <Grid item xs={3}>
                <Button variant="contained" fullWidth type="submit">Submit</Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default PatientCaseSheetForm;

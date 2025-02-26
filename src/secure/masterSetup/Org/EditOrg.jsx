import { Button, Dialog, DialogContent } from "@mui/material";
import React from "react";
import FormInput from "../../../components/FormFields/FormInput";

export const EditOrgName = ({ onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogContent>
        <h6>Edit Hospital</h6>
        <div>
          <FormInput label={" Hospital Name"} />
          <FormInput label={"Address"} />
          <FormInput label={"Zone(district)"} />
          <FormInput label={"City"} />
          <FormInput label={"Postal Code"} />
          <div>
            <Button>Update</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const EditOrgBranch = ({ onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogContent>
        <h6>Edit Branch</h6>
        <div className="form-container">
          <FormInput label={" No. of Branches"} />
          <FormInput label={"Logo"} type="file" />
          <FormInput label={"TRN No"} />
          <FormInput label={"Location"} />
          <FormInput label={"DHA License No"} />
          <FormInput label={"Address"} />
          <FormInput label={"DHA User Name"} />
          <FormInput label={"Password"} />
          <FormInput label={"Email ID"} />
          <FormInput label={"Mobile No"} />
          <FormInput label={"Website Link"} />
          <div>
            <Button color="primary">Update</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

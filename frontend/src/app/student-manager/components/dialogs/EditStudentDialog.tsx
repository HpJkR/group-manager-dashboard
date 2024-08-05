import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';

interface StudentDialogProps {
  open: boolean;
  onClose: () => void;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  avatar: string;
  onFirstnameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastnameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const EditStudentDialog: React.FC<StudentDialogProps> = ({
                                                           open,
                                                           onClose,
                                                           firstname,
                                                           lastname,
                                                           email,
                                                           phone,
                                                           avatar,
                                                           onFirstnameChange,
                                                           onLastnameChange,
                                                           onEmailChange,
                                                           onPhoneChange,
                                                           onAvatarChange,
                                                           onSave
                                                         }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit Student</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="First Name"
        fullWidth
        variant="outlined"
        value={firstname}
        onChange={onFirstnameChange}
      />
      <TextField
        margin="dense"
        label="Last Name"
        fullWidth
        variant="outlined"
        value={lastname}
        onChange={onLastnameChange}
      />
      <TextField
        margin="dense"
        label="Email"
        fullWidth
        variant="outlined"
        value={email}
        onChange={onEmailChange}
      />
      <TextField
        margin="dense"
        label="Phone"
        fullWidth
        variant="outlined"
        value={phone}
        onChange={onPhoneChange}
      />
      <TextField
        margin="dense"
        label="Avatar URL"
        fullWidth
        variant="outlined"
        value={avatar}
        onChange={onAvatarChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onSave} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default EditStudentDialog;

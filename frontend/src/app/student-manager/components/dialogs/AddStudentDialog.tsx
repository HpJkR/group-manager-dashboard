"use client"

import React, {useCallback, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from '@mui/material';
import {useGetAllClassesQuery} from '@/src/graphql/Classes/generated/GetAllClasses.generated';
import {useAddStudentMutation} from '@/src/graphql/Student/generated/AddStudent.generated';
import {toast} from 'react-toastify';

interface AddStudentDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddStudentDialog: React.FC<AddStudentDialogProps> = ({open, onClose, onSuccess}) => {
  const {data: classData, loading: classLoading, error: classError} = useGetAllClassesQuery();
  const [addStudent] = useAddStudentMutation();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [classId, setClassId] = useState<number | ''>('');

  const handleAddStudent = useCallback(async () => {
    if (classId === '') {
      toast.error('Please select a class.');
      return;
    }

    try {
      const validClassId: number = Number(classId);
      await addStudent({
        variables: {
          data: {
            firstname,
            lastname,
            email,
            telephone,
            avatar,
            classId: validClassId,
          },
        },
      });
      toast.success('Student successfully added!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error('Error adding student');
    }
  }, [addStudent, classId, email, firstname, lastname, onClose, onSuccess, telephone, avatar]);

  if (classLoading) return <div>Loading classes...</div>;
  if (classError) return <div>Error loading classes: {classError.message}</div>;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Student</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="First Name" fullWidth value={firstname}
                   onChange={(e) => setFirstname(e.target.value)}/>
        <TextField margin="dense" label="Last Name" fullWidth value={lastname}
                   onChange={(e) => setLastname(e.target.value)}/>
        <TextField margin="dense" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}/>
        <TextField margin="dense" label="Phone" fullWidth value={telephone}
                   onChange={(e) => setTelephone(e.target.value)}/>
        <TextField margin="dense" label="Avatar URL" fullWidth value={avatar}
                   onChange={(e) => setAvatar(e.target.value)}/>
        <TextField select margin="dense" label="Class" fullWidth value={classId}
                   onChange={(e) => setClassId(e.target.value === '' ? '' : Number(e.target.value))}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {classData?.getAllClasses.map((classItem) => (
            <MenuItem key={classItem.id} value={classItem.id}>
              {classItem.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleAddStudent} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentDialog;

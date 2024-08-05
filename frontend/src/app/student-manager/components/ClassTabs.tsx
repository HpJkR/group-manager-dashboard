"use client"

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, Typography} from '@mui/material';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {useGetAllClassesQuery} from '@/src/graphql/Classes/generated/GetAllClasses.generated';
import {useGetAllStudentsQuery} from '@/src/graphql/Student/generated/GetAllStudents.generated';
import {useDeleteStudentMutation} from '@/src/graphql/Student/generated/DeleteStudent.generated';
import {useUpdateStudentMutation} from '@/src/graphql/Student/generated/UpdateStudent.generated';
import {toast} from 'react-toastify';
import StudentActions from './StudentActions';
import EditStudentDialog from './dialogs/EditStudentDialog';
import AddStudentDialog from './dialogs/AddStudentDialog';
import TabPanel from './TabPanel';
import {UserPlusIcon} from "@heroicons/react/24/outline";

const ClassTabs: React.FC = () => {
  const {data: classData, loading: classLoading, error: classError} = useGetAllClassesQuery();
  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
    refetch: refetchStudents
  } = useGetAllStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();

  const [value, setValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [updatedFirstname, setUpdatedFirstname] = useState('');
  const [updatedLastname, setUpdatedLastname] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedAvatar, setUpdatedAvatar] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<any>(null);

  useEffect(() => {
    if (classLoading || studentLoading) return;
  }, [classLoading, studentLoading]);

  useEffect(() => {
    if (classError || studentError) return;
  }, [classError, studentError]);

  const studentsByClass = useMemo(() => {
    if (!studentData?.getAllStudents) return {};
    return studentData.getAllStudents.reduce((acc, student) => {
      if (student.class?.id) {
        if (!acc[student.class.id]) {
          acc[student.class.id] = [];
        }
        acc[student.class.id].push(student);
      }
      return acc;
    }, {} as Record<number, typeof studentData.getAllStudents>);
  }, [studentData]);

  const handleChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }, []);

  const handleDeleteStudent = useCallback(async () => {
    if (!studentToDelete) return;
    try {
      await deleteStudent({variables: {deleteStudentId: studentToDelete.id}});
      await refetchStudents();
      toast.success("Student successfully deleted!");
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Error deleting student");
    }
  }, [deleteStudent, refetchStudents, studentToDelete]);

  const handleOpenEditDialog = useCallback((student: any) => {
    setSelectedStudent(student);
    setUpdatedFirstname(student.firstname || '');
    setUpdatedLastname(student.lastname || '');
    setUpdatedEmail(student.email || '');
    setUpdatedPhone(student.telephone || '');
    setUpdatedAvatar(student.avatar || '');
    setEditDialogOpen(true);
  }, []);

  const handleUpdateStudent = useCallback(async () => {
    try {
      await updateStudent({
        variables: {
          data: {
            firstname: updatedFirstname,
            lastname: updatedLastname,
            email: updatedEmail,
            telephone: updatedPhone,
            avatar: updatedAvatar
          },
          updateStudentId: selectedStudent.id,
        },
      });
      setEditDialogOpen(false);
      setSelectedStudent(null);
      await refetchStudents();
      toast.success("Student successfully updated!");
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Error updating student");
    }
  }, [updateStudent, updatedFirstname, updatedLastname, updatedEmail, updatedPhone, updatedAvatar, selectedStudent, refetchStudents]);

  const handleAddStudentSuccess = useCallback(() => {
    refetchStudents();
  }, [refetchStudents]);

  const columns: GridColDef[] = [
    {field: 'firstname', headerName: 'Firstname', headerClassName: 'super-app-theme--header', width: 150},
    {field: 'lastname', headerName: 'Lastname', headerClassName: 'super-app-theme--header', width: 150},
    {field: 'email', headerName: 'Email', headerClassName: 'super-app-theme--header', width: 200},
    {field: 'telephone', headerName: 'Phone', headerClassName: 'super-app-theme--header', width: 150},
    {
      field: 'avatar',
      headerName: 'Avatar',
      headerClassName: 'super-app-theme--header',
      width: 150,
      display: 'flex',
      renderCell: (params: GridRenderCellParams) => (
        <img src={params.value} alt="Avatar" style={{width: '40px', height: '40px', borderRadius: '50%'}}/>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <StudentActions
          onEdit={() => handleOpenEditDialog(params.row)}
          onDelete={() => {
            setDeleteDialogOpen(true);
            setStudentToDelete(params.row);
          }}
        />
      ),
    },
  ];

  if (classLoading || studentLoading) return <Typography>Loading...</Typography>;
  if (classError || studentError) return <Typography>Error: {classError?.message || studentError?.message}</Typography>;

  return (
    <Box sx={{flexGrow: 1, display: 'flex', height: '100vh'}}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="class tabs"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          height: '100%',
          '& .MuiTabs-flexContainer': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%',
          },
        }}
      >
        {classData?.getAllClasses.map((classItem, index) => (
          <Tab key={classItem.id} label={classItem.name} {...a11yProps(index)} />
        ))}
      </Tabs>
      {classData?.getAllClasses.map((classItem, index) => (
        <TabPanel key={classItem.id} value={value} index={index}>
          <Typography variant="h1" className="text-3xl font-bold">{classItem.name}</Typography>
          <Typography>Years: {classItem.year}</Typography>
          <Box
            sx={{
              height: 600,
              width: 'fit-content',
              '& .super-app-theme--header': {
                backgroundColor: '#FE7835',
              },
              '& .css-t89xny-MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
              },
            }}
          >
            <DataGrid
              rows={studentsByClass?.[classItem.id] || []}
              columns={columns}
              disableRowSelectionOnClick
            />
          </Box>
        </TabPanel>
      ))}
      {selectedStudent && (
        <EditStudentDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          firstname={updatedFirstname}
          lastname={updatedLastname}
          email={updatedEmail}
          phone={updatedPhone}
          avatar={updatedAvatar}
          onFirstnameChange={(e) => setUpdatedFirstname(e.target.value)}
          onLastnameChange={(e) => setUpdatedLastname(e.target.value)}
          onEmailChange={(e) => setUpdatedEmail(e.target.value)}
          onPhoneChange={(e) => setUpdatedPhone(e.target.value)}
          onAvatarChange={(e) => setUpdatedAvatar(e.target.value)}
          onSave={handleUpdateStudent}
        />
      )}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this student?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteStudent} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <AddStudentDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSuccess={handleAddStudentSuccess}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddDialogOpen(true)}
        sx={{position: 'fixed', top: 16, right: 16}}
        startIcon={<UserPlusIcon width={20} height={20}/>}
      >
        Add Student
      </Button>
    </Box>
  );
};

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default ClassTabs;


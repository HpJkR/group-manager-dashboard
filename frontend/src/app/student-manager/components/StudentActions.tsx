import React from 'react';
import {IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface StudentActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const StudentActions: React.FC<StudentActionsProps> = ({onEdit, onDelete}) => (
  <div className="flex items-center h-full gap-4">
    <IconButton onClick={onEdit} className="p-0">
      <EditIcon/>
    </IconButton>
    <IconButton onClick={onDelete} className="p-0">
      <DeleteIcon/>
    </IconButton>
  </div>
);

export default StudentActions;

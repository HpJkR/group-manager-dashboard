"use client";
import React, {useState} from 'react';
import {Button} from '@mui/material';
import {useGetAllStudentsQuery} from "@/src/graphql/Student/generated/GetAllStudents.generated";
import {useGetAllClassesQuery} from "@/src/graphql/Classes/generated/GetAllClasses.generated";
import {toast} from 'react-toastify';
import ClassSelector from './ClassSelector';
import StudentSelector from './StudentSelector';
import DistributionOptions from './DistributionOptions';
import GroupDisplay from './GroupDisplay';

interface StudentOption {
  label: string;
  id: number;
  classId: number;
}

interface ClassOption {
  label: string;
  id: number;
}

const GroupForm: React.FC = () => {
  const {data: studentData, loading: studentLoading, error: studentError} = useGetAllStudentsQuery();
  const {data: classData, loading: classLoading, error: classError} = useGetAllClassesQuery();

  const [students, setStudents] = useState<string[]>([]);
  const [numGroups, setNumGroups] = useState<number>(1);
  const [autoDistribute, setAutoDistribute] = useState<boolean>(true);
  const [groups, setGroups] = useState<string[][]>([]);
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);

  const handleStudentsChange = (_event: React.ChangeEvent<{}>, value: StudentOption[]) => {
    setStudents(value.map(student => student.label));
  };

  const handleNumGroupsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumGroups(parseInt(event.target.value, 10));
  };

  const handleAutoDistributeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoDistribute(event.target.checked);
  };

  const handleClassesChange = (_event: React.ChangeEvent<{}>, value: ClassOption[]) => {
    setSelectedClasses(value.map(cls => cls.id));
  };

  const handleSubmit = () => {
    if (selectedClasses.length === 0) {
      toast.error('Please select at least one class.');
      return;
    }
    if (students.length < 2) {
      toast.error('Please select at least two students.');
      return;
    }

    const shuffledStudents = [...students].sort(() => 0.5 - Math.random());
    const numGroupsToCreate: number = autoDistribute ? Math.ceil(students.length / 2) : numGroups;
    const newGroups: string[][] = Array.from({length: numGroupsToCreate}, () => []);

    shuffledStudents.forEach((student, index) => {
      newGroups[index % numGroupsToCreate].push(student);
    });

    setGroups(newGroups);
    toast.success('Groups formed successfully!');
  };

  if (studentLoading || classLoading) return <p>Loading...</p>;
  if (studentError || classError) return <p>Error loading data</p>;

  const classOptions: ClassOption[] = classData?.getAllClasses.map(cls => ({
    label: `${cls.name} (${cls.year})`,
    id: cls.id,
  })) || [];

  const studentOptions: StudentOption[] = studentData?.getAllStudents.map(student => ({
    label: `${student.firstname} ${student.lastname}`,
    id: student.id,
    classId: student.class?.id || 0,
  })) || [];

  const filteredStudentOptions = studentOptions.filter(student => selectedClasses.includes(student.classId));

  return (
    <div className="flex flex-col gap-8 p-6">
      <h1 className="text-xl font-bold mb-4">Form groups</h1>
      <ClassSelector options={classOptions} onChange={handleClassesChange}/>
      <StudentSelector
        options={filteredStudentOptions}
        selected={students}
        onChange={handleStudentsChange}
      />
      <DistributionOptions
        autoDistribute={autoDistribute}
        numGroups={numGroups}
        onAutoDistributeChange={handleAutoDistributeChange}
        onNumGroupsChange={handleNumGroupsChange}
      />
      <Button onClick={handleSubmit} variant="contained" color="success" className="mt-4">
        Form groups
      </Button>
      <GroupDisplay groups={groups}/>
    </div>
  );
};

export default GroupForm;

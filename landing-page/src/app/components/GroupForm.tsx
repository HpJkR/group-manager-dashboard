"use client";
import React, {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import ClassSelector from './ClassSelector';
import StudentSelector from './StudentSelector';
import DistributionOptions from './DistributionOptions';
import GroupDisplay from './GroupDisplay';
import {toast} from "react-toastify";

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
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [numGroups, setNumGroups] = useState<number>(1);
  const [autoDistribute, setAutoDistribute] = useState<boolean>(true);
  const [groups, setGroups] = useState<string[][]>([]);
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [classOptions, setClassOptions] = useState<ClassOption[]>([]);
  const [studentOptions, setStudentOptions] = useState<StudentOption[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        const classes: ClassOption[] = data.classes.map((cls: any) => ({
          label: `${cls.name} (${cls.year})`,
          id: cls.id,
        }));
        const students: StudentOption[] = data.students.map((student: any) => ({
          label: `${student.firstname} ${student.lastname}`,
          id: student.id,
          classId: student.classId,
        }));
        setClassOptions(classes);
        setStudentOptions(students);
      })
      .catch((error) => {
        toast.error('Failed to load data');
        console.error('Error loading data:', error);
      });
  }, []);

  const handleStudentsChange = (_event: React.ChangeEvent<{}>, value: StudentOption[]) => {
    setStudents(value);
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

    const studentLabels = students.map(student => student.label);
    const shuffledStudents = [...studentLabels].sort(() => 0.5 - Math.random());
    const numGroupsToCreate: number = autoDistribute ? Math.ceil(studentLabels.length / 2) : numGroups;
    const newGroups: string[][] = Array.from({length: numGroupsToCreate}, () => []);

    shuffledStudents.forEach((student, index) => {
      newGroups[index % numGroupsToCreate].push(student);
    });

    setGroups(newGroups);
    toast.success('Groups formed successfully!');
  };

  const filteredStudentOptions = studentOptions.filter(student => selectedClasses.includes(student.classId));

  return (
    <div className="flex flex-col gap-8 p-6">
      <h1 className="text-xl font-bold mb-4">Form groups</h1>
      <ClassSelector options={classOptions} onChange={handleClassesChange}/>
      <StudentSelector
        options={filteredStudentOptions}
        selected={students.map(student => student.label)}
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

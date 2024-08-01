"use client";
import React, {ChangeEvent, useState} from 'react';

const GroupForm: React.FC = () => {
  const [students, setStudents] = useState<string[]>(['']);
  const [numGroups, setNumGroups] = useState<number>(1);
  const [autoDistribute, setAutoDistribute] = useState<boolean>(true);
  const [groups, setGroups] = useState<string[][]>([]);

  const handleStudentChange = (index: number, value: string) => {
    const newStudents = [...students];
    newStudents[index] = value;
    setStudents(newStudents);
  };

  const handleAddStudent = () => {
    setStudents([...students, '']);
  };

  const handleNumGroupsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumGroups(parseInt(event.target.value, 10));
  };

  const handleAutoDistributeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAutoDistribute(event.target.checked);
  };

  const handleSubmit = () => {
    const shuffledStudents = [...students].sort(() => 0.5 - Math.random());
    let newGroups: string[][];

    if (autoDistribute) {
      // Automatic distribution of students into groups
      const optimalNumGroups = Math.ceil(students.length / 2);
      newGroups = Array.from({length: optimalNumGroups}, () => []);
      shuffledStudents.forEach((student, index) => {
        newGroups[index % optimalNumGroups].push(student);
      });
    } else {
      // Manual distribution based on specified number of groups
      newGroups = Array.from({length: numGroups}, () => []);
      shuffledStudents.forEach((student, index) => {
        newGroups[index % numGroups].push(student);
      });
    }

    setGroups(newGroups);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Former les groupes</h1>
      <div className="space-y-2">
        {students.map((student, index) => (
          <input
            key={index}
            type="text"
            value={student}
            onChange={(e) => handleStudentChange(index, e.target.value)}
            placeholder={`Apprenant ${index + 1}`}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        ))}
        <button
          onClick={handleAddStudent}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Ajouter un apprenant
        </button>
      </div>
      <div className="mt-4">
        <label className="block mb-2">Répartition automatique :</label>
        <input
          type="checkbox"
          checked={autoDistribute}
          onChange={handleAutoDistributeChange}
          className="mr-2"
        />
        {autoDistribute ? null : (
          <div className="mt-4">
            <label className="block mb-2">Nombre de groupes :</label>
            <input
              type="number"
              value={numGroups}
              onChange={handleNumGroupsChange}
              min="1"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
      >
        Former les groupes
      </button>
      <div className="mt-4">
        {groups.map((group, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-semibold">Groupe {index + 1}</h2>
            <ul className="list-disc list-inside">
              {group.map((student, studentIndex) => (
                <li key={studentIndex}>{student}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupForm;

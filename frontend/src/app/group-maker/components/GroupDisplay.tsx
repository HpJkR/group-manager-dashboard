import React from 'react';

interface GroupDisplayProps {
  groups: string[][];
}

const GroupDisplay: React.FC<GroupDisplayProps> = ({groups}) => (
  <div className="mt-4">
    {groups.map((group, index) => (
      <div key={index} className="mb-4">
        <h2 className="text-lg font-semibold">Group {index + 1}</h2>
        <ul className="list-disc list-inside">
          {group.map((student, studentIndex) => (
            <li key={studentIndex}>{student}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default GroupDisplay;

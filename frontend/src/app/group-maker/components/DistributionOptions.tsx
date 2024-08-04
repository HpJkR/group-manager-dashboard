import React from 'react';
import {Checkbox} from '@mui/material';
import NumberInput from "@/src/app/components/NumberInput";

interface DistributionOptionsProps {
  autoDistribute: boolean;
  numGroups: number;
  onAutoDistributeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNumGroupsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DistributionOptions: React.FC<DistributionOptionsProps> = ({
                                                                   autoDistribute,
                                                                   numGroups,
                                                                   onAutoDistributeChange,
                                                                   onNumGroupsChange
                                                                 }) => (
  <div className="flex flex-col items-start gap-2">
    <div className="flex items-center">
      <Checkbox
        checked={autoDistribute}
        onChange={onAutoDistributeChange}
      />
      <label>Enable automatic distribution</label>
    </div>
    {!autoDistribute && (
      <div className="flex flex-col items-center gap-2">
        <label className="font-bold">Number of groups</label>
        <NumberInput
          value={numGroups.toString()}
          onChange={onNumGroupsChange}
          aria-label="Number of groups"
        />
      </div>
    )}
  </div>
);

export default DistributionOptions;

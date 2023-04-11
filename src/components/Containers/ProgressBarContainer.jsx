import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBarContainer = ({ attackType }) => {
  return (
    <div className="flex flex-wrap gap-3 md:flex-nowrap">
      {attackType[0] &&
        attackType.map(
          (attack, index) =>
            attack.name !== null && (
              <div key={index} className="w-28 h-28">
                <CircularProgressbar
                  value={attack.damage}
                  text={attack.name}
                  styles={buildStyles({
                    pathColor: `${attack.damage < 40 ? '#FF7F7F' : '#50C878'}`,
                    textColor: `${attack.damage < 40 ? '#FF7F7F' : '#50C878'}`,
                  })}
                />
              </div>
            )
        )}
    </div>
  );
};

export default ProgressBarContainer;

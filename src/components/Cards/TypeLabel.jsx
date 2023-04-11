import React from 'react';

const TypeLabel = ({ type }) => {
  return (
    <span
      className={`py-1 px-2 text-xs rounded-md ${
        type === 'Grass'
          ? 'bg-green-500'
          : type === 'Water'
          ? 'bg-blue-400'
          : type === 'Poison'
          ? 'bg-purple-500'
          : type === 'Fire'
          ? 'bg-orange-400'
          : type === 'Bug'
          ? 'bg-green-900'
          : type === 'Flying'
          ? 'bg-blue-800'
          : 'bg-slate-500'
      }`}
    >
      {type}
    </span>
  );
};

export default TypeLabel;

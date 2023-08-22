import React from "react";

interface HeaderProps {
  name: string;
  action?: React.ReactElement;
}

const Header: React.FC<HeaderProps> = ({ name, action }) => {
  return (
    <div className="bg-white rounded-[8px]">
      <div className="flex py-2 px-4 justify-between items-center">
        <h1 className="font-semibold text-md">{name}</h1>
        {action && <div className="flex flex-row items-center">{action}</div>}
      </div>
    </div>
  );
};

export default Header;

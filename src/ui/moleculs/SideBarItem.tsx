import React from 'react';
import { NavLink } from 'react-router-dom';

interface ISideBarItemProps {
    to: string,
    title : string,
    imageComponent : React.ReactNode;
}

export const SideBarItem : React.FC<ISideBarItemProps> = ({title, to, imageComponent}) => {
  return (
    <NavLink to={to} className="w-9/12 m-auto flex flex-row items-center justify-start">
      <div className=' flex flex-row justify-start gap-1 items-center hover:cursor-pointer py-sm'>
        <div>
          {imageComponent}
        </div>
        <div className='pl-sm'>
          {title}
        </div>
      </div>
    </NavLink>
  )
}

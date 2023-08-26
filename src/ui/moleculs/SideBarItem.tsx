import React from 'react';

interface ISideBarItemProps {
    title : string,
    imageComponent : React.ReactNode;
}

export const SideBarItem : React.FC<ISideBarItemProps> = ({title, imageComponent}) => {
  return (
    <div className='flex flex-row gap-1 items-center hover:cursor-pointer py-sm'>
        <div>
            {imageComponent}
        </div>
        <div className='ml-4'>
            {title}
        </div>
    </div>
  )
}

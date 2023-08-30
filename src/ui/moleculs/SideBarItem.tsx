import React from 'react';

interface ISideBarItemProps {
    title : string,
    imageComponent : React.ReactNode;
}

export const SideBarItem : React.FC<ISideBarItemProps> = ({title, imageComponent}) => {
  return (
    <div className='w-9/12 m-auto flex flex-row justify-start gap-1 items-center hover:cursor-pointer py-sm'>
        <div>
            {imageComponent}
        </div>
        <div className='ml-sm'>
            {title}
        </div>
    </div>
  )
}

import React from 'react';
// 导入 FontAwesomeIcon 组件
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 导入你要用的具体图标
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  return (
    <div className="flex items-center justify-center mb-12 space-x-4">
      {/* If using an image logo: <img src={logo} alt="Logo" className="h-10 w-10" /> */}
      <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-blue-600" />
      <div>
        <h1 className="font-['Pacifico'] text-4xl text-blue-600 mb-2">智教优备</h1>
        <p className="font-['Arial'] text-gray-600 text-sm tracking-widest">SMART EDUPLAN</p>
      </div>
    </div>
  );
};
export default Header


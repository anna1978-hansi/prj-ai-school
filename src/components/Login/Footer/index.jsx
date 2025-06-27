import React from 'react';

const Footer = () => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <div className="text-center text-sm text-gray-500">
        登录即表示您同意
        <a href="#" className="text-primary hover:text-secondary">《服务条款》</a>
        和
        <a href="#" className="text-primary hover:text-secondary">《隐私政策》</a>
      </div>
    </div>
  );
};

export default Footer;
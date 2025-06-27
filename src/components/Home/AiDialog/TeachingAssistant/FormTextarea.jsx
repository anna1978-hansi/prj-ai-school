// FormTextarea.js
import React from 'react';

const FormTextarea = ({ label, placeholder, value, rows = 4 }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-md h-24 resize-vertical focus:ring-primary focus:border-primary"
                defaultValue={value} // 使用 defaultValue 来设置初始值
                rows={rows}
            ></textarea>
        </div>
    );
};

export default FormTextarea;

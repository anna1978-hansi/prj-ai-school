// FormTextarea.js
import React from 'react';

const FormTextarea = ({
    label,
    placeholder,
    value = '',
    onChange,
    rows = 4,
    readOnly = false
}) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-md h-24 resize-vertical focus:ring-primary focus:border-primary transition-colors ${readOnly ? 'bg-gray-50 cursor-not-allowed' : ''
                    }`}
                value={value}
                onChange={handleChange}
                rows={rows}
                readOnly={readOnly}
            ></textarea>
        </div>
    );
};

export default FormTextarea;

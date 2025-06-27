import React from 'react';

const SettingsCard = ({ title, children }) => {
    return (
        <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4">{title}</h3>
            {children}
        </div>
    );
};

export default SettingsCard;

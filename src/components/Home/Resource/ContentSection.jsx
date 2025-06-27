import React from 'react';
import ResourceCard from './ResourceCard.jsx';

const ContentSection = ({ title, items }) => {
    return (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">{title}</h2>
                <div className="flex space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <ResourceCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

export default ContentSection;

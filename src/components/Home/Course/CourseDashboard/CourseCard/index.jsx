import React from 'react';

const CourseCard = ({ image, title, description, students, rating, status, access }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm transition hover:shadow-lg">
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <div className="p-4">
                <div className="text-xl font-bold text-gray-800 mb-2">{title}</div>
                <p className="text-gray-600 text-sm mb-4">{description}</p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                        <i className="fas fa-user text-gray-500 text-base"></i>


                        <span>{students} 名学生</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <i className="fas fa-star text-yellow-400 text-base"></i>
                        <span>{rating}</span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <span className="text-blue-600 text-xs border border-blue-300 px-3 py-1 rounded-full">{status}</span>
                    <span className="text-blue-600 text-xs border border-blue-300 px-3 py-1 rounded-full">{access}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;

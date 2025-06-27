import React from 'react';

const ResourceCard = ({ imageUrl, title, author, avatarUrl, views, likes }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg">
            <div className="relative">
                <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
                <div className="absolute top-2 right-2 flex items-center space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center bg-black/30 text-white rounded-full hover:bg-primary transition-colors">
                        <i className="far fa-star"></i>
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-medium text-gray-800 truncate group-hover:text-primary">{title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                    <div className="flex items-center gap-2">
                        <img src={avatarUrl} alt={author} className="w-6 h-6 rounded-full" />
                        <span>{author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><i className="far fa-eye"></i>{views}</span>
                        <span className="flex items-center gap-1"><i className="far fa-thumbs-up"></i>{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;

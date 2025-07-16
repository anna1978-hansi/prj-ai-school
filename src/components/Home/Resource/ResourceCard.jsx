import React from 'react';
import LazyImage from '@/utils/LazyImage.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
const ResourceCard = ({ imageUrl, title, author, avatarUrl, views, likes, lazy }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg">
            <div className="relative">
                <LazyImage
                    src={imageUrl}
                    alt={title}
                    className="w-full h-40 object-cover"
                    placeholder="/public/img/defaultSource.jpg"
                    lazy={lazy}
                />
                <div className="absolute top-2 right-2 flex items-center space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center bg-black/30 text-white rounded-full hover:bg-primary transition-colors">
                        <FontAwesomeIcon icon={faStar} />
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-medium text-gray-800 truncate group-hover:text-primary">{title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                    <div className="flex items-center gap-2">
                        <LazyImage
                            src={avatarUrl}
                            alt={author}
                            className="w-6 h-6 rounded-full"
                            placeholder="/public/img/userpicture--64w.jpg"
                            lazy={lazy}
                        />
                        <span>{author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><FontAwesomeIcon icon={faEye} />{views}</span>
                        <span className="flex items-center gap-1"><FontAwesomeIcon icon={faThumbsUp} />{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;

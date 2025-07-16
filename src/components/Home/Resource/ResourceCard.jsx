import React from 'react';
import LazyImage from '@/utils/LazyImage.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
const ResourceCard = ({ imageUrl, title, author, avatarUrl, views, likes, lazy }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl border border-gray-100">
            <div className="relative">
                <LazyImage
                    src={imageUrl}
                    alt={title}
                    className="w-full h-44 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                    placeholder="/public/img/defaultSource.jpg"
                    lazy={lazy}
                />
                <div className="absolute top-3 right-3 flex items-center">
                    <button className="w-9 h-9 flex items-center justify-center bg-white/80 text-primary rounded-full shadow-md hover:bg-primary hover:text-white transition-colors border border-gray-200">
                        <FontAwesomeIcon icon={faStar} />
                    </button>
                </div>
            </div>
            <div className="p-3 pt-2 pb-2">
                {/* 标题部分 */}
                <h3 className="font-semibold text-gray-800 truncate group-hover:text-primary text-base mb-2">
                    {title}
                </h3>
                {/* 作者和数值统计区 */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                    {/* 左侧：头像 + 作者名 */}
                    <div className="flex items-center gap-2">
                        <LazyImage
                            src={avatarUrl}
                            alt={author}
                            className="w-7 h-7 rounded-full border border-gray-200 shadow-sm object-cover"
                            placeholder="/public/img/userpicture--64w.jpg"
                            lazy={lazy}
                        />
                        <span className="font-medium text-gray-700 truncate max-w-[80px]">{author}</span>
                    </div>
                    {/* 右侧：浏览数和点赞 */}
                    <div className="flex items-center gap-3 text-gray-500">
                        <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faEye} />
                            <span>{views}</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>{likes}</span>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ResourceCard;

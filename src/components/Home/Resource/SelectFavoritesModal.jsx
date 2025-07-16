import React from 'react';
import { favoritesData } from './data.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const SelectFavoritesModal = () => {
    // Modal visibility would be controlled by state
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out modal hidden">
            <div className="bg-white rounded-xl w-[440px] p-8 relative shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-center w-full text-gray-800">选择收藏夹</h2>
                    <button className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors p-2">
                        <FontAwesomeIcon icon={faTimes} className="text-xl" />
                    </button>
                </div>

                <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2">
                    {favoritesData.map(fav => (
                        <label key={fav.id} className="flex items-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200">
                            <input type="radio" name="favorite" className="form-radio h-5 w-5 text-primary focus:ring-primary" />
                            <span className="ml-4 text-base text-gray-700">{fav.name}</span>
                        </label>
                    ))}
                </div>

                <button className="w-full py-4 px-6 bg-primary text-white text-lg font-medium rounded-xl hover:bg-primary/90 transition-colors duration-200 shadow-lg shadow-primary/20">
                    确认收藏
                </button>
            </div>
        </div>
    );
};

export default SelectFavoritesModal;

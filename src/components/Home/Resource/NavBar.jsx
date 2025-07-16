import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
    return (
        <nav className="flex items-center justify-between py-4 px-6">
            <div className="flex items-center gap-12">
                {/* Logo or other nav links can go here */}
            </div>
            <div className="flex items-center space-x-6">
                <button className="!rounded-button px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20">
                    <FontAwesomeIcon icon={faUpload} className="mr-2" />投稿
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

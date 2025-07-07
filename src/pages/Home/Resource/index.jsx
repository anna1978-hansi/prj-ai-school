import React from 'react';

import Navbar from '../../../components/Home/Resource/NavBar.jsx';
import SearchSection from '../../../components/Home/Resource/SearchSection.jsx';
import Banner from '../../../components/Home/Resource/Banner.jsx';
import ContentSection from '../../../components/Home/Resource/ContentSection.jsx';
import CreatePostModal from '../../../components/Home/Resource/CreatePostModal.jsx';
import SelectFavoritesModal from '../../../components/Home/Resource/SelectFavoritesModal.jsx';

import { coursesData, designsData, resourcesData } from '../../../components/Home/Resource/data.jsx';

const Resource = () => {
    return (
        // The modals would be rendered here but hidden by default.
        // Their visibility would be toggled with JavaScript (state).
        <div className="bg-gradient-to-br from-indigo-50 to-gray-100">
            <CreatePostModal />
            <SelectFavoritesModal />

            <div className="container mx-auto">
                <Navbar />
                <SearchSection />
                <Banner />

                <main className="px-6">
                    <ContentSection title="精品课程" items={coursesData} />
                    <ContentSection title="教学设计" items={designsData} />
                    <ContentSection title="海量资源" items={resourcesData} />
                </main>
            </div>
        </div >
    );
};

export default Resource;

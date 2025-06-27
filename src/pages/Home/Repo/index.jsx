import React from 'react';
import RepoSidebar from "@/components/Home/Repo/RepoSidebar/index.jsx";

const Repo = () => {
    return (
        <div>
            <div className="w-[1440px] mx-auto bg-gradient-to-b from-white to-blue-50">
                <div className="flex min-h-[calc(100vh-64px)]">
                    <RepoSidebar/>
                </div>
            </div>
        </div>
    )
}
    export default Repo;

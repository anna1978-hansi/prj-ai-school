import React from 'react';
import Sidebar from "@/components/UserManagement/Sidebar.jsx";
import AccountSettings from "@/components/UserManagement/AccountSettings.jsx";
import EmailModal from "@/components/UserManagement/EmailModal.jsx";
import PasswordModal from "@/components/UserManagement/PasswordModal.jsx";

const UserManagement = () => {
    return (
        <div className="w-[1440px] mx-auto">
            <div className="flex min-h-screen">
                <Sidebar />
                <AccountSettings />
            </div>

            {/* Modals would be rendered here.
        Toggle the `isVisible` prop to true to see them.
      */}
            <EmailModal isVisible={false} />
            <PasswordModal isVisible={false} />
        </div>
    );
};

export default UserManagement;

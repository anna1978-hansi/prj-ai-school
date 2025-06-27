import React from 'react';

import ChatHistorySidebar from "@/components/Home/AiDialog/TeachingAssistant/ChatHistorySidebar.jsx";
import ChatPanel from "@/components/Home/AiDialog/TeachingAssistant/ChatPanel.jsx";
import TeachingDesignPanel from "@/components/Home/AiDialog/TeachingAssistant/TeachingDesignPanel.jsx";

const TeachingAssistant = () => {
    return (
        <div className="bg-gray-50">
            {/*<Header />*/}
            <main className="mx-auto max-w-screen-xl">
                <div className="flex h-[calc(100vh-6rem)] gap-4 py-4">
                    <ChatHistorySidebar />
                    <div className="flex flex-1 gap-4">
                        <ChatPanel />
                        <TeachingDesignPanel />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeachingAssistant;

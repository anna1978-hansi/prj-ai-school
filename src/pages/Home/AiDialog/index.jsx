import { Outlet } from 'react-router-dom';

function AiDialog() {
    return (
        <div>
            {/* 渲染子页面 */}
            <Outlet />
        </div>
    );
}

export default AiDialog;

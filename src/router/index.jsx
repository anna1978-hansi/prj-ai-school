import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Login/Register/index.jsx';
import ForgetPassWord from '../pages/Login/ForgetPassWord/index.jsx';
import Home from "@/pages/Home/index.jsx";
import AiDialog from "@/pages/Home/AiDialog/index.jsx";
import Resource from "@/pages/Home/Resource/index.jsx";
import Repo from "@/pages/Home/Repo/index.jsx";
import Course from "@/pages/Home/Course/index.jsx";
import Message from "@/pages/Home/Message/index.jsx";
import TeachingAssistant from "@/pages/Home/AiDialog/TeachingAssistant.jsx";
import LearningAnalysis from "@/pages/Home/AiDialog/LearningAnalysis.jsx";
import TeachingPlan from "@/pages/Home/AiDialog/TeachingPlan.jsx";
import UserManagement from "@/pages/UserManagement/index.jsx";
import ChatPage from "@/pages/Home/ChatRoom/ChatPage.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, removeAccessToken } from '@/store/modules/auth/actions';
import axios from 'axios';

// 美观的加载动画组件
const LoadingSpinner = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
    <div style={{ color: '#2563eb', fontWeight: 600, fontSize: 18 }}>正在校验身份，请稍候...</div>
  </div>
);

// AuthGuard 组件，负责身份校验和加载动画
const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth ? state.auth.accessToken : null);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        setAuthed(true);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.post('/api/api/refresh', {}, { withCredentials: true });
        console.log(res.data);
        if (res.data && res.data.code === 200 && res.data.data.accessToken) {
          dispatch(setAccessToken(res.data.data.accessToken));
          setAuthed(true);
        } else {
          dispatch(removeAccessToken());
          setAuthed(false);
        }
      } catch (e) {
        dispatch(removeAccessToken());
        setAuthed(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, [accessToken, dispatch]);

  if (loading) return <LoadingSpinner />;
  if (!authed) return <Navigate to="/login" replace />;
  return children;
};

// 创建路由配置
const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forget-password',
    element: <ForgetPassWord />,
  },
  {
    path: 'user-management',
    element: <UserManagement />
  },
  {
    path: '/home',
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Course />
      },
      {
        path: 'aiDialog',
        element: <AiDialog />,
        children: [
          {
            index: true,
            element: <TeachingAssistant />
          },
          {
            path: 'assistant', // /home/aiDialog/assistant
            element: <TeachingAssistant />
          },
          {
            path: 'analysis', // /home/aiDialog/analysis
            element: <LearningAnalysis />
          },
          {
            path: 'plan', // /home/aiDialog/plan
            element: <TeachingPlan />
          }
        ]
      },
      {
        path: 'resource',
        element: <Resource />
      },
      {
        path: 'repository',
        element: <Repo />
      },
      {
        path: 'course',
        element: <Course />
      },
      {
        path: 'message', //home/message
        element: <Message />
      },
      {
        path: 'chat',
        element: <ChatPage />
      }
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }

]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

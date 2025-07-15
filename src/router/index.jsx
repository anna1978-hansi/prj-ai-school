import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Routes, Route, Navigate } from 'react-router-dom';
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


const isAuthenticated = async (dispatch, getState) => {
  const accessToken = getState().auth.accessToken;
  if (accessToken) return true;

  // 没有token，尝试刷新
  try {
    const res = await axios.post('/refresh');
    if (res.data.code === 200 && res.data.accessToken) {
      dispatch(setAccessToken(res.data.accessToken));
      return true;
    }
    // 刷新失败
    dispatch(removeAccessToken());
    return false;
  } catch (e) {
    dispatch(removeAccessToken());
    return false;
  }
};

// 受保护的路由组件，支持异步鉴权
const ProtectedRoute = ({ children }) => {
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
        const res = await axios.post('/refresh');
        if (res.data.code === 200 && res.data.accessToken) {
          dispatch(setAccessToken(res.data.accessToken));
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

  if (loading) return <div>正在校验身份，请稍候...</div>;
  if (!authed) return <Navigate to="/login" replace />;
  return children;
};

// 创建路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
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
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
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

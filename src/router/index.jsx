import React from 'react';
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

// 简单的身份验证检查，实际项目中应该使用更复杂的身份验证逻辑
const isAuthenticated = () => {
  // 这里可以检查localStorage或其他存储中的token
  return localStorage.getItem('isLoggedIn') === 'true';
};

// 受保护的路由组件 - 这个在createBrowserRouter中可以通过loader实现，但为了保持简单，我们保留这个组件
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // 如果未认证，重定向到登录页面
    return <Navigate to="/login" replace />;
  }

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
    element: <Home />,
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

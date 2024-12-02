import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import TodoApp from './TodoApp';
import Navbar from './Navbar';
import Auth from './auth';
import { AuthProvider } from './context/AuthContext';

const Layout = () => (
  <div className="min-h-screen bg-gray-900 text-white">
    <Navbar />
    <main className="container mx-auto px-4 pt-20">
      <Outlet />
    </main>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <TodoApp />,
      },
      {
        path: '/auth',
        element: <Auth/>,
      }
    ],
  },
]);

export default App;

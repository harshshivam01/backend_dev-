import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Clock, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  ChefHat, 
  ListOrdered,
  Bell
} from 'lucide-react';

// Mock data with more detailed time-series
const orderTrendsData = [
  { date: 'Jan', orders: 120, revenue: 3500 },
  { date: 'Feb', orders: 145, revenue: 4200 },
  { date: 'Mar', orders: 180, revenue: 5300 },
  { date: 'Apr', orders: 220, revenue: 6500 },
  { date: 'May', orders: 265, revenue: 7800 },
  { date: 'Jun', orders: 300, revenue: 9000 }
];

const orderHistoryData = [
  { id: 1, customer: 'John Doe', total: 45.99, status: 'Completed', date: '2024-03-15' },
  { id: 2, customer: 'Jane Smith', total: 32.50, status: 'In Progress', date: '2024-03-16' },
  { id: 3, customer: 'Mike Johnson', total: 55.75, status: 'Completed', date: '2024-03-17' },
  { id: 4, customer: 'Emily Brown', total: 22.99, status: 'Pending', date: '2024-03-18' }
];

const RestaurantDashboard = () => {
  const [orders, setOrders] = useState(orderHistoryData);
  const [activeSection, setActiveSection] = useState('overview');

  // Simulate new order placement
  const simulateNewOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      customer: `Customer ${Math.floor(Math.random() * 100)}`,
      total: parseFloat((Math.random() * 100).toFixed(2)),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    // Add new order to the list
    setOrders(prevOrders => [newOrder, ...prevOrders]);

    // Show toast notification
    toast.success(`New Order #${newOrder.id} placed by ${newOrder.customer}!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // Render Order History Table
  const renderOrderHistory = () => (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-800 flex items-center">
          <ListOrdered className="mr-2 text-purple-600" /> Order History
        </h2>
        <button 
          onClick={simulateNewOrder}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Bell className="mr-2" size={18} /> Simulate New Order
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-100">
              <th className="p-3 text-left text-purple-800">Order ID</th>
              <th className="p-3 text-left text-purple-800">Customer</th>
              <th className="p-3 text-left text-purple-800">Total</th>
              <th className="p-3 text-left text-purple-800">Status</th>
              <th className="p-3 text-left text-purple-800">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-purple-50 transition-colors">
                <td className="p-3 text-gray-700">#{order.id}</td>
                <td className="p-3 text-gray-700">{order.customer}</td>
                <td className="p-3 text-gray-700">${order.total.toFixed(2)}</td>
                <td className="p-3">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${order.status === 'Completed' ? 'bg-green-200 text-green-800' : 
                      order.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' : 
                      'bg-purple-200 text-purple-800'}
                  `}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-gray-700">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Overview Section
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: ShoppingCart, color: 'purple', value: '256', label: 'Total Orders' },
          { icon: DollarSign, color: 'green', value: '$4,352.75', label: 'Total Revenue' },
          { icon: Users, color: 'indigo', value: '42', label: 'New Customers' },
          { icon: ChefHat, color: 'pink', value: '28', label: 'Active Menu Items' }
        ].map(({ icon: Icon, color, value, label }, index) => (
          <div 
            key={index} 
            className={`bg-gradient-to-br from-${color}-100 to-${color}-200 rounded-xl shadow-md p-6 flex items-center transform transition hover:scale-105`}
          >
            <Icon className={`text-${color}-600 mr-4`} size={48} />
            <div>
              <p className={`text-${color}-800 text-sm mb-1`}>{label}</p>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart with Gradient */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-purple-800 mb-4">Monthly Order & Revenue Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={orderTrendsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6e6fa" />
            <XAxis dataKey="date" stroke="#8a4fff" />
            <YAxis stroke="#8a4fff" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(126, 58, 242, 0.9)', 
                color: 'white',
                borderRadius: '12px'
              }} 
              labelStyle={{ color: 'white' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#8a4fff" 
              strokeWidth={3}
              dot={{ r: 6, fill: '#8a4fff' }}
              activeDot={{ r: 8, fill: '#7e3af2', stroke: 'white', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#e6a0ff" 
              strokeWidth={3}
              dot={{ r: 6, fill: '#e6a0ff' }}
              activeDot={{ r: 8, fill: '#d946ef', stroke: 'white', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-8">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-800">Restaurant Admin Dashboard</h1>
      </header>

      {/* Navigation */}
      <nav className="mb-8 flex space-x-4">
        {['Overview', 'Orders'].map(section => (
          <button 
            key={section}
            onClick={() => setActiveSection(section.toLowerCase())}
            className={`
              px-4 py-2 rounded-lg transition-all duration-300 
              ${activeSection === section.toLowerCase() 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'bg-white text-purple-700 hover:bg-purple-100 hover:shadow-sm'}
            `}
          >
            {section}
          </button>
        ))}
      </nav>

      {/* Conditional Rendering */}
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'orders' && renderOrderHistory()}
    </div>
  );
};

export default RestaurantDashboard;
// src/app/AdminDashboard/page.tsx
'use client';
import axios from 'axios';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { 
  Users, 
  Trash2, 
  MapPin, 
  FileText, 
  Menu, 
  X, 
  User, 
  Settings, 
  Bell,
  ChevronRight,
  TrendingUp,
  Building2,
  UserCheck,
  LogOut,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type ActiveTab = 'dashboard' | 'rejected' | 'locations' | 'workers' | 'reports' | 'settings' |'Approved';

interface Worker {
  id: number;
  name: string;
  phone: string;
  status: 'Active' | 'Inactive';
  tasks: number;
}

interface Location {
  id: number;
  name: string;
  zone: string;
  lat: string;
  lng: string;
  activePoints: number;
}

interface Report {
  id: number;
  user: string;
  location: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'In Progress';
  priority: 'High' | 'Medium' | 'Low';
  count: number;
  date: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); 
  const [userEmail, setUserEmail] = useState<string>(""); // ✅ state for email
  const [showEmail, setShowEmail] = useState<boolean>(false); // ✅ toggle email visibility

  // ✅ Fetch user email from backend
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const token = localStorage.getItem("token") || ""; // prevent null issue
        const res = await axios.get("http://localhost:5000/api/verify-session", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUserEmail(res.data.email);
      } catch (err) {
        console.error("Error fetching user email:", err);
      }
    };
    fetchEmail();
  }, []);
  // 🚫 Disable back navigation after logout
useEffect(() => {
  const handlePopState = () => {
    router.replace('/login');
  };

  window.addEventListener('popstate', handlePopState);
  return () => window.removeEventListener('popstate', handlePopState);
}, [router]);

// 🔥 Logout function
const handleLogout = async () => {
  try {
    // Call backend logout API
    await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });

    // Clear localStorage/session data
    localStorage.removeItem('token');

    // Disable browser back arrow
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };

    // Redirect to login page
    router.replace('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};



  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  
  // Modal states
  const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [showPasswordSuccessPopup, setShowPasswordSuccessPopup] = useState(false);
  const [showReportDetailsModal, setShowReportDetailsModal] = useState(false);
  const [showEditLocationModal, setShowEditLocationModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  // New states for editing worker
  const [showEditWorkerModal, setShowEditWorkerModal] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);

  // Form states
  const [workerForm, setWorkerForm] = useState({
    name: '',
    phone: ''
  });

  const [locationForm, setLocationForm] = useState({
    name: '',
    zone: '',
    lat: '',
    lng: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Data states with real-time updates
  const [workers, setWorkers] = useState<Worker[]>([
    { id: 1, name: 'Rajesh Kumar', phone: '+91-9876543210', status: 'Active', tasks: 45 },
    { id: 2, name: 'Amit Sharma', phone: '+91-9876543211', status: 'Active', tasks: 38 },
    { id: 3, name: 'Priya Singh', phone: '+91-9876543212', status: 'Inactive', tasks: 52 },
    { id: 4, name: 'Vijay Patel', phone: '+91-9876543213', status: 'Active', tasks: 41 },
    { id: 5, name: 'Sunita Devi', phone: '+91-9876543214', status: 'Active', tasks: 48 }
  ]);

  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: 'Zone A - North', zone: 'Zone A', lat: '28.7041', lng: '77.1025', activePoints: 12 },
    { id: 2, name: 'Zone B - South', zone: 'Zone B', lat: '28.5355', lng: '77.3910', activePoints: 13 },
    { id: 3, name: 'Zone C - East', zone: 'Zone C', lat: '28.6692', lng: '77.4538', activePoints: 14 },
    { id: 4, name: 'Zone D - West', zone: 'Zone D', lat: '28.6692', lng: '77.0870', activePoints: 15 },
    { id: 5, name: 'Zone E - Central', zone: 'Zone E', lat: '28.6139', lng: '77.2090', activePoints: 16 },
    { id: 6, name: 'Zone F - Industrial', zone: 'Zone F', lat: '28.4595', lng: '77.0266', activePoints: 17 }
  ]);

  const [reports, setReports] = useState<Report[]>([
    { id: 1, user: 'Rahul Verma', location: 'MG Road', status: 'Pending', priority: 'High', count: 25, date: '2025-10-01' },
    { id: 2, user: 'Neha Gupta', location: 'Park Street', status: 'Pending', priority: 'Medium', count: 15, date: '2025-10-02' },
    { id: 3, user: 'Arun Kumar', location: 'Lake View', status: 'Pending', priority: 'High', count: 30, date: '2025-10-03' },
    { id: 4, user: 'Sita Sharma', location: 'Market Area', status: 'Pending', priority: 'High', count: 22, date: '2025-10-04' },
    { id: 5, user: 'Mohan Das', location: 'Station Road', status: 'Pending', priority: 'Medium', count: 18, date: '2025-10-05' }
  ]);
  //--
  const filteredReports = reports.filter((report) =>
  report.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  report.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  report.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  report.priority?.toLowerCase().includes(searchTerm.toLowerCase())
);


  // Stats calculations (dynamic)
  const stats = {
    registeredUsers: 156,
    totalLocations: locations.length,
    totalRequests: reports.length,
    resolvedReports: reports.filter(r => r.status === 'Approved').length,
    activeWorkers: workers.filter(w => w.status === 'Active').length,
    pendingReports: reports.filter(r => r.status === 'Pending').length
  };

  // Export to Excel function
  const exportToExcel = (data: any[], filename: string) => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(','));
    return [headers, ...rows].join('\n');
  };

  // Add Worker with state update
  const handleAddWorker = (e: React.FormEvent) => {
    e.preventDefault();
    const newWorker: Worker = {
      id: workers.length + 1,
      name: workerForm.name,
      phone: workerForm.phone,
      status: 'Active',
      tasks: 0
    };
    setWorkers([...workers, newWorker]);
    setShowAddWorkerModal(false);
    setWorkerForm({ name: '', phone: ''});
  };

  // Add Location with state update
  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const newLocation: Location = {
      id: locations.length + 1,
      name: locationForm.name,
      zone: locationForm.zone,
      lat: locationForm.lat,
      lng: locationForm.lng,
      activePoints: 0
    };
    setLocations([...locations, newLocation]);
    setShowAddLocationModal(false);
    setLocationForm({ name: '', zone: '', lat: '', lng: '' });
  };

  // Update Password
// 🔹 Function to handle password update
const handleUpdatePassword = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Check new password match
    if (passwordForm.new !== passwordForm.confirm) {
      alert("New password and confirm password do not match ");
      return;
    }

    // Get token from localStorage
    const token = localStorage.getItem("token") || "";

    if (!token) {
      alert("Session expired. Please login again.");
      router.replace("/login");
      return;
    }

    // API call to backend
    const response = await axios.post(
      "http://localhost:5000/api/change-password",
      {
        currentPassword: passwordForm.current,
        newPassword: passwordForm.new,
        confirmPassword: passwordForm.confirm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
        withCredentials: true,
      }
    );

    alert(response.data.message || "Password updated successfully !!");

    // Clear form after success
    setPasswordForm({ current: "", new: "", confirm: "" });
  } catch (error: any) {
    console.error("Password update error:", error);
    alert(error.response?.data?.message || "Failed to update password !!");
  }
};

  // Approve Report with state update
  const handleApproveReport = (reportId: number) => {
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: 'Approved' as const } : r
    ));
    setShowReportDetailsModal(false);
    setSelectedReport(null);
  };

  // Reject Report with state update
  const handleRejectReport = (reportId: number) => {
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: 'Rejected' as const } : r
    ));
    setShowReportDetailsModal(false);
    setSelectedReport(null);
  };

  // Add function to handle worker editing
  const handleEditWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorker) return;

    setWorkers(workers.map(worker => 
      worker.id === editingWorker.id 
        ? {
            ...worker,
            name: workerForm.name,
            phone: workerForm.phone
          }
        : worker
    ));

    setShowEditWorkerModal(false);
    setEditingWorker(null);
    setWorkerForm({ name: '', phone: ''});
  };

  // Add function to handle worker deletion
  const handleDeleteWorker = (workerId: number) => {
    if (window.confirm('Are you sure you want to delete this worker?')) {
      setWorkers(workers.filter(worker => worker.id !== workerId));
    }
  };

  // Edit Location with state update
  const handleEditLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLocation) return;

    setLocations(locations.map(location => 
      location.id === editingLocation.id 
        ? {
            ...location,
            name: locationForm.name,
            zone: locationForm.zone,
            lat: locationForm.lat,
            lng: locationForm.lng
          }
        : location
    ));

    setShowEditLocationModal(false);
    setEditingLocation(null);
    setLocationForm({ name: '', zone: '', lat: '', lng: '' });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-800 text-white transition-all duration-300 overflow-hidden`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">RecycLens | Admin</h1>
          </div>

          <div className="mb-6">
            <p className="text-xs text-gray-400 uppercase mb-3">Main Category</p>
            <nav className="space-y-2">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <Building2 size={20} />
                <span>Dashboard</span>
              </a>
            </nav>
          </div>

          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase mb-3">Options</p>
            <nav className="space-y-2">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('rejected'); }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition group ${activeTab === 'rejected' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <div className="flex items-center space-x-3">
                  <Trash2 size={20} />
                  <span>Rejected Reports</span>
                </div>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition" />
              </a>
               <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('Approved'); }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition group ${activeTab === 'Approved' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <div className="flex items-center space-x-3">
                  <Check size={20} />
                  <span>Approved Reports</span>
                </div>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition" />
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('locations'); }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition group ${activeTab === 'locations' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <div className="flex items-center space-x-3">
                  <MapPin size={20} />
                  <span>Location Area</span>
                </div>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition" />
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('workers'); }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition group ${activeTab === 'workers' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <div className="flex items-center space-x-3">
                  <Users size={20} />
                  <span>Workers</span>
                </div>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition" />
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('reports'); }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition group ${activeTab === 'reports' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <div className="flex items-center space-x-3">
                  <FileText size={20} />
                  <span>Reports</span>
                </div>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition" />
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('settings'); }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition group ${activeTab === 'settings' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <div className="flex items-center space-x-3">
                  <Settings size={20} />
                  <span>Admin (Change Password)</span>
                </div>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition" />
              </a>
            </nav>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-700">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleLogout(); }}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-700 transition group"
            >
              <div className="flex items-center space-x-3">
                <LogOut size={20} className="text-red-500" />
                <span className="text-white">Logout</span>
              </div>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-600 hover:text-gray-800 transition"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'rejected' && 'Rejected Reports'}
                {activeTab === 'locations' && 'Location Areas'}
                {activeTab === 'workers' && 'Workers Management'}
                {activeTab === 'reports' && 'All Reports'}
                {activeTab === 'settings' && 'Admin Settings'}
              </h2>
            </div>

<div className="flex items-center space-x-4">
  {/* Notification Icon */}
  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition">
    <Bell size={20} />
  </button>

  {/* USER ICON + EMAIL DROPDOWN */}
  <div className="relative">
    <button
      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
      onClick={() => setShowEmail(!showEmail)} // toggle email visibility
    >
      <User size={20} />
    </button>

    {showEmail && (
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-50">
        <p className="text-gray-800 text-sm font-medium">
          {userEmail || "Fetching email..."}
        </p>
      </div>
    )}
  </div>
</div>

          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <>
              {showWelcome && (
                <div className="mb-6 bg-green-500 text-white rounded-lg p-4 flex items-center justify-between shadow-lg">
                  <div className="flex items-center space-x-3">
                    <User size={24} className="text-white" />
                    <div>
                      <h3 className="font-semibold text-lg">Welcome to RecycLens Admin Panel!</h3>
                      <p className="text-sm text-green-50">Manage municipal waste intelligence efficiently</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowWelcome(false)}
                    className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
                  >
                    <Check size={20} />
                  </button>
                </div>
              )}

              {/* Stats Cards - Dynamic */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-500 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition cursor-pointer">
                  <div className="flex items-start justify-between">
                    <Users size={50} className="text-white opacity-90" />
                    <div className="text-right">
                      <div className="text-5xl font-bold mb-1">{stats.registeredUsers}</div>
                      <div className="text-sm text-blue-100">Registered Users</div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition cursor-pointer">
                  <div className="flex items-start justify-between">
                    <MapPin size={50} className="text-white opacity-90" />
                    <div className="text-right">
                      <div className="text-5xl font-bold mb-1">{stats.totalLocations}</div>
                      <div className="text-sm text-orange-100">Total Locations</div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition cursor-pointer">
                  <div className="flex items-start justify-between">
                    <Trash2 size={50} className="text-white opacity-90" />
                    <div className="text-right">
                      <div className="text-5xl font-bold mb-1">{stats.totalRequests}</div>
                      <div className="text-sm text-red-100">Total Requests</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition cursor-pointer">
                  <div className="flex items-start justify-between">
                    <FileText size={50} className="text-white opacity-90" />
                    <div className="text-right">
                      <div className="text-5xl font-bold mb-1">{stats.resolvedReports}</div>
                      <div className="text-sm text-green-100">Reports Resolved</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Stats Row - Dynamic */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Active Workers</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.activeWorkers}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <UserCheck size={32} className="text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-600 text-sm">
                    <TrendingUp size={16} className="mr-1" />
                    <span>Total Workers: {workers.length}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Pending Reports</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.pendingReports}</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <FileText size={32} className="text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-yellow-600 text-sm">
                    <span>Requires attention</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Avg Response Time</p>
                      <p className="text-3xl font-bold text-gray-800">2.5h</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <TrendingUp size={32} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-600 text-sm">
                    <TrendingUp size={16} className="mr-1" />
                    <span>-15% faster</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Rejected Reports Tab */}
          {activeTab === 'rejected' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Rejected Waste Reports</h3>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center">
                      <Filter size={16} className="mr-2" />
                      Filter
                    </button>
                    <button 
                      onClick={() => {
                        const rejectedReports = reports.filter(r => r.status === 'Rejected');
                        exportToExcel(rejectedReports, 'rejected_reports');
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
                    >
                      <Download size={16} className="mr-2" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reports.filter(r => r.status === 'Rejected').map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">#REP00{report.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{report.user}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{report.location}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                              {report.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{report.date}</td>
                          <td className="px-4 py-3 text-sm">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {reports.filter(r => r.status === 'Rejected').length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                            No rejected reports found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Approved Reports Tab */}
          {activeTab === 'Approved' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Approved Waste Reports</h3>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center">
                      <Filter size={16} className="mr-2" />
                      Filter
                    </button>
                    <button 
                      onClick={() => {
                        const approvedReports = reports.filter(r => r.status === 'Approved');
                        exportToExcel(approvedReports, 'approved_reports');
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
                    >
                      <Download size={16} className="mr-2" />
                      Export
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reports.filter(r => r.status === 'Approved').map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">#REP00{report.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{report.user}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{report.location}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {report.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              report.priority === 'High' ? 'bg-red-100 text-red-800' :
                              report.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {report.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{report.date}</td>
                          <td className="px-4 py-3 text-sm">
                            <button 
                              onClick={() => {
                                setSelectedReport(report);
                                setShowReportDetailsModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {reports.filter(r => r.status === 'Approved').length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                            No approved reports found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Locations Tab - Dynamic */}
          {activeTab === 'locations' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Location Areas ({locations.length} Locations)</h3>
                  <button 
                    onClick={() => setShowAddLocationModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Location
                  </button>
                </div>

                <div className="mb-6 h-96 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.89796500175!2d77.04417477908105!3d28.527252725941965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1728481234567!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {locations.map((location) => (
                    <div key={location.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="bg-orange-100 p-2 rounded-lg">
                            <MapPin size={24} className="text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{location.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{location.activePoints} Active Points</p>
                            <p className="text-xs text-gray-500 mt-1">Lat: {location.lat}, Lng: {location.lng}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              setEditingLocation(location);
                              setLocationForm({
                                name: location.name,
                                zone: location.zone,
                                lat: location.lat,
                                lng: location.lng
                              });
                              setShowEditLocationModal(true);
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Edit size={16} />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Eye size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Workers Tab - Dynamic */}
          {activeTab === 'workers' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Workers Management ({workers.length} Workers)</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => exportToExcel(workers, 'workers_data')}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center"
                    >
                      <Download size={16} className="mr-2" />
                      Export
                    </button>
                    <button 
                      onClick={() => setShowAddWorkerModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Worker
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tasks</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {workers.map((worker) => (
                        <tr key={worker.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">#W{String(worker.id).padStart(3, '0')}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{worker.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{worker.phone}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${worker.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {worker.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{worker.tasks}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => {
                                  setEditingWorker(worker);
                                  setWorkerForm({
                                    name: worker.name,
                                    phone: worker.phone,
                                  });
                                  setShowEditWorkerModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteWorker(worker.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                              <button className="text-green-600 hover:text-green-800" title="View">
                                <Eye size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab - Dynamic */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">All Waste Reports ({reports.length} Reports)</h3>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search reports..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                    </div>
                    <button 
                      onClick={() => exportToExcel(reports, 'all_reports')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
                    >
                      <Download size={16} className="mr-2" />
                      Export
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">#REP{String(report.id).padStart(3, '0')}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{report.user}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{report.location}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              report.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              report.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                              report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              report.priority === 'High' ? 'bg-red-100 text-red-800' :
                              report.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {report.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {report.count >= 20 ? (
                              <span className="flex items-center text-red-600 font-semibold">
                                <AlertTriangle size={14} className="mr-1" />
                                {report.count}
                              </span>
                            ) : (
                              <span className="text-gray-600">{report.count}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{report.date}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => {
                                  setSelectedReport(report);
                                  setShowReportDetailsModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Eye size={16} />
                              </button>
                              {report.status === 'Pending' && (
                                <>
                                  <button 
                                    onClick={() => handleApproveReport(report.id)}
                                    className="text-green-600 hover:text-green-800"
                                    title="Approve"
                                  >
                                    <CheckCircle size={16} />
                                  </button>
                                  <button 
                                    onClick={() => handleRejectReport(report.id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Reject"
                                  >
                                    <XCircle size={16} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Change Password</h3>
                <form onSubmit={handleUpdatePassword} className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter current password"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={passwordForm.new}
                      onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirm}
                      onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals remain the same but are now reactive to state changes */}
      {/* Add Worker Modal */}
      {showAddWorkerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add New Worker</h3>
              <button onClick={() => setShowAddWorkerModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddWorker} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={workerForm.name}
                  onChange={(e) => setWorkerForm({...workerForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter worker name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={workerForm.phone}
                  onChange={(e) => setWorkerForm({...workerForm, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+91-XXXXXXXXXX"
                  required
                />
              </div>
             
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddWorkerModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Add Worker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Location Modal */}
      {showAddLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add New Location</h3>
              <button onClick={() => setShowAddLocationModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddLocation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                <input
                  type="text"
                  value={locationForm.name}
                  onChange={(e) => setLocationForm({...locationForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter location name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
                <select
                  value={locationForm.zone}
                  onChange={(e) => setLocationForm({...locationForm, zone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Zone</option>
                  <option value="Zone A">Zone A - North</option>
                  <option value="Zone B">Zone B - South</option>
                  <option value="Zone C">Zone C - East</option>
                  <option value="Zone D">Zone D - West</option>
                  <option value="Zone E">Zone E - Central</option>
                  <option value="Zone F">Zone F - Industrial</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                  <input
                    type="text"
                    value={locationForm.lat}
                    onChange={(e) => setLocationForm({...locationForm, lat: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="28.7041"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                  <input
                    type="text"
                    value={locationForm.lng}
                    onChange={(e) => setLocationForm({...locationForm, lng: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="77.1025"
                    required
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">Click on the map to select coordinates or enter manually</p>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddLocationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Add Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      {showReportDetailsModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Report Details</h3>
              <button onClick={() => setShowReportDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Report ID:</span>
                <span className="font-semibold">#REP{String(selectedReport.id).padStart(3, '0')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">User:</span>
                <span className="font-semibold">{selectedReport.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-semibold">{selectedReport.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Report Count:</span>
                <span className={`font-semibold ${selectedReport.count >= 20 ? 'text-red-600' : 'text-gray-800'}`}>
                  {selectedReport.count} reports
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Priority:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedReport.priority === 'High' ? 'bg-red-100 text-red-800' :
                  selectedReport.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedReport.priority}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedReport.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  selectedReport.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedReport.status}
                </span>
              </div>
              {selectedReport.count >= 20 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
                  <AlertTriangle size={20} className="text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">
                    High priority! This location has {selectedReport.count} reports requiring immediate attention.
                  </p>
                </div>
              )}
            </div>
            {selectedReport.status === 'Pending' && (
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => handleRejectReport(selectedReport.id)}
                  className="flex-1 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition flex items-center justify-center"
                >
                  <XCircle size={16} className="mr-2" />
                  Reject
                </button>
                <button
                  onClick={() => handleApproveReport(selectedReport.id)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Password Success Popup */}
      {showPasswordSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="text-green-600" size={48} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
            <p className="text-gray-600">Password updated successfully</p>
          </div>
        </div>
      )}

      {/* Edit Location Modal */}
      {showEditLocationModal && editingLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Edit Location</h3>
              <button 
                onClick={() => {
                  setShowEditLocationModal(false);
                  setEditingLocation(null);
                  setLocationForm({ name: '', zone: '', lat: '', lng: '' });
                }} 
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditLocation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                <input
                  type="text"
                  value={locationForm.name}
                  onChange={(e) => setLocationForm({...locationForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter location name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
                <select
                  value={locationForm.zone}
                  onChange={(e) => setLocationForm({...locationForm, zone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Zone</option>
                  <option value="Zone A">Zone A - North</option>
                  <option value="Zone B">Zone B - South</option>
                  <option value="Zone C">Zone C - East</option>
                  <option value="Zone D">Zone D - West</option>
                  <option value="Zone E">Zone E - Central</option>
                  <option value="Zone F">Zone F - Industrial</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                  <input
                    type="text"
                    value={locationForm.lat}
                    onChange={(e) => setLocationForm({...locationForm, lat: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="28.7041"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                  <input
                    type="text"
                    value={locationForm.lng}
                    onChange={(e) => setLocationForm({...locationForm, lng: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="77.1025"
                    required
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">Click on the map to select coordinates or enter manually</p>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditLocationModal(false);
                    setEditingLocation(null);
                    setLocationForm({ name: '', zone: '', lat: '', lng: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Worker Modal */}
      {showEditWorkerModal && editingWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Edit Worker</h3>
              <button 
                onClick={() => {
                  setShowEditWorkerModal(false);
                  setEditingWorker(null);
                  setWorkerForm({ name: '', phone: ''});
                }} 
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditWorker} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={workerForm.name}
                  onChange={(e) => setWorkerForm({...workerForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter worker name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={workerForm.phone}
                  onChange={(e) => setWorkerForm({...workerForm, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+91-XXXXXXXXXX"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditWorkerModal(false);
                    setEditingWorker(null);
                    setWorkerForm({ name: '', phone: ''});
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

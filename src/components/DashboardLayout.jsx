import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
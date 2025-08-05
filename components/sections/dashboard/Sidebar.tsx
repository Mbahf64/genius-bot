"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Shield,
  Bot,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";
import { Modal } from "antd";
import { ActiveTab } from "./ActiveTab";
import { useAuth } from "@/hooks/useAuth"; // 👈 Make sure this exposes `user` and `logout`

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems = [
    { id: "dashboard" as ActiveTab, label: "Dashboard", icon: LayoutDashboard },
    { id: "content" as ActiveTab, label: "Content Management", icon: FileText },
    { id: "security" as ActiveTab, label: "Security & Access", icon: Shield },
  ];

  const handleTabClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsModalOpen(false);
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full w-72 bg-gray-900 text-white flex flex-col z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Mobile close button */}
      <div className="lg:hidden absolute top-4 right-4">
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">GeniusBot</h1>
            <p className="text-gray-400 text-sm">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 min-h-[44px] ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm sm:text-base">
                      {item.label}
                    </span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Admin Info + Logout */}
      <div className="p-4 border-t border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">
            {user?.firstName?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <p className="font-medium text-sm">{user?.firstName || "Admin User"}</p>
            <p className="text-gray-400 text-xs">
              {user?.email || "admin@company.com"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* AntD Logout Modal */}
      <Modal
        title="Confirm Logout"
        open={isModalOpen}
        onOk={confirmLogout}
        onCancel={() => setIsModalOpen(false)}
        okText="Yes, Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

import React from 'react';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Upload,
  Eye,
  Settings
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const colorKeys = ['blue', 'emerald', 'amber', 'purple'] as const;
  type ColorKey = typeof colorKeys[number];

  const kpis: {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'neutral';
    icon: React.ElementType;
    color: ColorKey;
  }[] = [
    {
      title: 'Total Queries Today',
      value: '247',
      change: '+12.3%',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '89',
      change: '+5.2%',
      changeType: 'positive',
      icon: Users,
      color: 'emerald'
    },
    {
      title: 'Success Rate',
      value: '87.4%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'amber'
    },
    {
      title: 'Documents',
      value: '1,234',
      change: '+45',
      changeType: 'neutral',
      icon: FileText,
      color: 'purple'
    },
  ];

  const systemStatus = [
    { name: 'Vertex AI Search API', status: 'online' as const, latency: '145ms' },
    { name: 'Slack Integration', status: 'online' as const, latency: '89ms' },
    { name: 'Data Indexing Service', status: 'warning' as const, latency: '2.3s' },
  ];

  const recentActivity = [
    { user: 'sarah@company.com', query: 'What is the vacation policy for remote workers?', time: '2 minutes ago' },
    { user: 'mike@company.com', query: 'How do I submit expenses?', time: '5 minutes ago' },
    { user: 'jen@company.com', query: 'What are the company benefits?', time: '8 minutes ago' },
    { user: 'alex@company.com', query: 'Where is the employee handbook?', time: '12 minutes ago' },
    { user: 'taylor@company.com', query: 'How do I request time off?', time: '15 minutes ago' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Command centre for your GeniusBot system</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            emerald: 'bg-emerald-50 text-emerald-600',
            amber: 'bg-amber-50 text-amber-600',
            purple: 'bg-purple-50 text-purple-600',
          };

          return (
            <div key={kpi.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${colorClasses[kpi.color]}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className={`text-sm font-medium ${
                  kpi.changeType === 'positive' ? 'text-emerald-600' : 
                  kpi.changeType === 'neutral' ? 'text-gray-600' : 'text-gray-600'
                }`}>
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-gray-600 text-xs sm:text-sm">{kpi.title}</p>
            </div>
          );
        })}
      </div>

      {/* System Status and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">System Status</h2>
          <div className="space-y-4">
            {systemStatus.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(service.status)}
                  <span className="font-medium text-gray-900 text-sm sm:text-base">{service.name}</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600">{service.latency}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs sm:text-sm font-medium flex-shrink-0">
                  {activity.user[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{activity.query}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <button className="flex items-center space-x-3 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors min-h-[44px]">
            <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <span className="font-medium text-blue-900 text-sm sm:text-base">Upload Document</span>
          </button>
          <button className="flex items-center space-x-3 p-3 sm:p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors min-h-[44px]">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
            <span className="font-medium text-emerald-900 text-sm sm:text-base">View Query Logs</span>
          </button>
          <button className="flex items-center space-x-3 p-3 sm:p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors min-h-[44px] sm:col-span-2 lg:col-span-1">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            <span className="font-medium text-amber-900 text-sm sm:text-base">Manage Access</span>
          </button>
        </div>
      </div>
    </div>
  );
};
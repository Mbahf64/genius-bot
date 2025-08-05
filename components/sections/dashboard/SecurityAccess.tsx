import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle,
  AlertCircle,
  FileText,
  Lock,
  Unlock,
  Save,
  X,
  UserCheck,
  UserX
} from 'lucide-react';

interface IAMGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  members: string[];
  createdDate: string;
  lastModified: string;
}

export const SecurityAccess: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState('all-employees@company.com');
  const [activeTab, setActiveTab] = useState<'overview' | 'groups' | 'documents' | 'audit'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGroupForEdit, setSelectedGroupForEdit] = useState<IAMGroup | null>(null);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    id: ''
  });

  const [iamGroups, setIamGroups] = useState<IAMGroup[]>([
    {
      id: 'all-employees@company.com',
      name: 'All Employees',
      description: 'Standard access for all company employees',
      memberCount: 234,
      members: ['sarah@company.com', 'mike@company.com', 'jen@company.com'],
      createdDate: '2024-01-01',
      lastModified: '2024-01-20'
    },
    {
      id: 'executives@company.com',
      name: 'Executives',
      description: 'Senior leadership and C-suite access',
      memberCount: 8,
      members: ['ceo@company.com', 'cto@company.com', 'cfo@company.com'],
      createdDate: '2024-01-01',
      lastModified: '2024-01-19'
    },
    {
      id: 'hr-department@company.com',
      name: 'HR Department',
      description: 'Human Resources team access',
      memberCount: 15,
      members: ['hr-director@company.com', 'recruiter@company.com'],
      createdDate: '2024-01-01',
      lastModified: '2024-01-18'
    },
    {
      id: 'it-department@company.com',
      name: 'IT Department',
      description: 'Information Technology team access',
      memberCount: 22,
      members: ['it-director@company.com', 'sysadmin@company.com'],
      createdDate: '2024-01-01',
      lastModified: '2024-01-17'
    },
    {
      id: 'finance-department@company.com',
      name: 'Finance Department',
      description: 'Finance and accounting team access',
      memberCount: 12,
      members: ['finance-director@company.com', 'accountant@company.com'],
      createdDate: '2024-01-01',
      lastModified: '2024-01-16'
    },
    {
      id: 'business-development@company.com',
      name: 'Business Development',
      description: 'Sales and business development access',
      memberCount: 31,
      members: ['sales-director@company.com', 'account-manager@company.com'],
      createdDate: '2024-01-01',
      lastModified: '2024-01-15'
    }
  ]);

  const accessibleDocuments = [
    {
      id: 1,
      filename: 'Employee_Handbook_2024.pdf',
      type: 'pdf',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      accessLevel: ['all-employees@company.com']
    },
    {
      id: 2,
      filename: 'IT_Security_Guidelines.pdf',
      type: 'pdf',
      uploadDate: '2024-01-12',
      size: '1.8 MB',
      accessLevel: ['all-employees@company.com', 'it-department@company.com']
    },
    {
      id: 3,
      filename: 'Benefits_Package_Overview.pdf',
      type: 'pdf',
      uploadDate: '2024-01-08',
      size: '1.2 MB',
      accessLevel: ['all-employees@company.com']
    },
    {
      id: 4,
      filename: 'Company_Policies_2024.docx',
      type: 'docx',
      uploadDate: '2024-01-05',
      size: '980 KB',
      accessLevel: ['all-employees@company.com']
    },
    {
      id: 5,
      filename: 'Executive_Strategy_2024.pptx',
      type: 'pptx',
      uploadDate: '2024-01-22',
      size: '4.2 MB',
      accessLevel: ['executives@company.com']
    },
    {
      id: 6,
      filename: 'HR_Performance_Review_Policy.docx',
      type: 'docx',
      uploadDate: '2024-01-10',
      size: '856 KB',
      accessLevel: ['hr-department@company.com']
    },
    {
      id: 7,
      filename: 'Financial_Reports_Q4.xlsx',
      type: 'xlsx',
      uploadDate: '2024-01-20',
      size: '3.1 MB',
      accessLevel: ['finance-department@company.com', 'executives@company.com']
    },
    {
      id: 8,
      filename: 'Sales_Playbook_2024.pdf',
      type: 'pdf',
      uploadDate: '2024-01-18',
      size: '2.8 MB',
      accessLevel: ['business-development@company.com']
    }
  ];

  const auditLog = [
    {
      id: 1,
      action: 'Document Access',
      user: 'sarah@company.com',
      document: 'Employee_Handbook_2024.pdf',
      timestamp: '2024-01-22 14:30:15',
      result: 'Granted',
      group: 'all-employees@company.com'
    },
    {
      id: 2,
      action: 'Document Access',
      user: 'mike@company.com',
      document: 'HR_Performance_Review_Policy.docx',
      timestamp: '2024-01-22 14:28:42',
      result: 'Denied',
      group: 'hr-department@company.com'
    },
    {
      id: 3,
      action: 'Group Assignment',
      user: 'admin@company.com',
      document: 'Executive_Strategy_2024.pptx',
      timestamp: '2024-01-22 14:25:18',
      result: 'Updated',
      group: 'executives@company.com'
    },
    {
      id: 4,
      action: 'Group Created',
      user: 'admin@company.com',
      document: 'finance-department@company.com',
      timestamp: '2024-01-22 13:15:30',
      result: 'Success',
      group: 'finance-department@company.com'
    },
    {
      id: 5,
      action: 'Document Access',
      user: 'jen@company.com',
      document: 'Financial_Reports_Q4.xlsx',
      timestamp: '2024-01-22 12:45:22',
      result: 'Denied',
      group: 'finance-department@company.com'
    }
  ];

  const handleCreateGroup = () => {
    if (!newGroup.name || !newGroup.description) {
      alert('Please fill in all required fields.');
      return;
    }

    const groupId = newGroup.id || `${newGroup.name.toLowerCase().replace(/\s+/g, '-')}@company.com`;
    
    const group: IAMGroup = {
      id: groupId,
      name: newGroup.name,
      description: newGroup.description,
      memberCount: 0,
      members: [],
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setIamGroups([...iamGroups, group]);
    setNewGroup({ name: '', description: '', id: '' });
    setShowCreateModal(false);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (confirm('Are you sure you want to delete this IAM group? This action cannot be undone.')) {
      setIamGroups(iamGroups.filter(group => group.id !== groupId));
    }
  };

  const getGroupName = (groupId: string) => {
    return iamGroups.find(group => group.id === groupId)?.name || groupId;
  };

  const getDocumentsForGroup = (groupId: string) => {
    return accessibleDocuments.filter(doc => 
      doc.accessLevel.includes(groupId)
    );
  };

  const filteredGroups = iamGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedGroupData = iamGroups.find(group => group.id === selectedGroup);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Security & Access Control</h1>
        <p className="text-gray-600">Manage document access permissions, IAM groups, and security policies</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base min-h-[44px] ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base min-h-[44px] ${
              activeTab === 'groups'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            IAM Groups
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base min-h-[44px] ${
              activeTab === 'documents'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Document Access
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base min-h-[44px] ${
              activeTab === 'audit'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Audit Log
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Security Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium text-blue-900">Total Groups</h3>
                </div>
                <p className="text-2xl font-bold text-blue-900">{iamGroups.length}</p>
              </div>
              
              <div className="p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-medium text-emerald-900">Total Members</h3>
                </div>
                <p className="text-2xl font-bold text-emerald-900">
                  {iamGroups.reduce((sum, group) => sum + group.memberCount, 0)}
                </p>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <h3 className="font-medium text-amber-900">Protected Documents</h3>
                </div>
                <p className="text-2xl font-bold text-amber-900">{accessibleDocuments.length}</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <h3 className="font-medium text-purple-900">Active Groups</h3>
                </div>
                <p className="text-2xl font-bold text-purple-900">
                  {iamGroups.filter(group => group.memberCount > 0).length}
                </p>
              </div>
            </div>

            {/* Access Control Rules */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">How IAM Access Control Works</h3>
              <div className="text-xs sm:text-sm text-blue-800 space-y-2">
                <p><strong>1. Document Upload:</strong> When uploading documents, administrators assign one or more IAM groups that can access each document.</p>
                <p><strong>2. User Query:</strong> When a user asks a question, the system identifies their IAM group memberships.</p>
                <p><strong>3. Filtered Search:</strong> Vertex AI Search only searches within documents the user has access to based on their group memberships.</p>
                <p><strong>4. Secure Results:</strong> Users can only receive answers from documents their IAM groups have permission to access.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-medium text-emerald-900 text-sm sm:text-base">Identity Verification</h3>
                </div>
                <p className="text-xs sm:text-sm text-emerald-700">
                  All users are verified through Google Cloud IAM before document access is granted.
                </p>
              </div>
              
              <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium text-blue-900 text-sm sm:text-base">Document Filtering</h3>
                </div>
                <p className="text-xs sm:text-sm text-blue-700">
                  Search queries are pre-filtered to only include documents where the user&#39;s IAM groups match the document&#39;s assigned access levels.
                </p>
              </div>
              
              <div className="p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h3 className="font-medium text-amber-900 text-sm sm:text-base">Audit Logging</h3>
                </div>
                <p className="text-xs sm:text-sm text-amber-700">
                  All access attempts are logged with user identity, document, and access result for compliance.
                </p>
              </div>
              
              <div className="p-3 sm:p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <h3 className="font-medium text-purple-900 text-sm sm:text-base">Multi-Level Access</h3>
                </div>
                <p className="text-xs sm:text-sm text-purple-700">
                  Documents can be assigned to multiple IAM groups. Users need membership in at least one assigned group to access the document.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* IAM Groups Tab */}
        {activeTab === 'groups' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search IAM groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
                />
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors min-h-[44px] text-sm sm:text-base"
              >
                <Plus className="w-4 h-4" />
                <span>Create Group</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredGroups.map((group) => (
                <div key={group.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base">{group.name}</h3>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          setSelectedGroupForEdit(group);
                          setShowEditModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(group.id)}
                        className="p-1 hover:bg-gray-100 rounded text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">{group.description}</p>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{group.memberCount} members</span>
                    </span>
                    <span>Modified: {group.lastModified}</span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 font-mono truncate">{group.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Access Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Document Access Matrix</h3>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] text-sm sm:text-base"
              >
                {iamGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedGroupData && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {selectedGroupData.name} - Accessible Documents ({getDocumentsForGroup(selectedGroup).length})
                </h4>
                <p className="text-sm text-gray-600 mb-4">{selectedGroupData.description}</p>
                
                <div className="space-y-3">
                  {getDocumentsForGroup(selectedGroup).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900 text-sm sm:text-base">{doc.filename}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{doc.size} • {doc.uploadDate}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {doc.accessLevel.map((level, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {getGroupName(level)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 sm:p-2 hover:bg-gray-100 rounded text-gray-600 min-w-[32px] min-h-[32px] flex items-center justify-center">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Audit Log Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Access Audit Log</h3>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm">Timestamp</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm">Action</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm hidden sm:table-cell">User</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm hidden md:table-cell">Resource</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm">Result</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm hidden lg:table-cell">Group</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLog.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{entry.timestamp}</td>
                      <td className="py-4 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{entry.action}</td>
                      <td className="py-4 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm hidden sm:table-cell">{entry.user}</td>
                      <td className="py-4 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm hidden md:table-cell truncate max-w-[200px]">{entry.document}</td>
                      <td className="py-4 px-2 sm:px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.result === 'Granted' || entry.result === 'Success' ? 'bg-emerald-100 text-emerald-800' :
                          entry.result === 'Denied' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {entry.result}
                        </span>
                      </td>
                      <td className="py-4 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm hidden lg:table-cell">
                        {getGroupName(entry.group)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Create New IAM Group</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Name *
                </label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Marketing Department"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Describe the purpose and scope of this group"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group ID (Optional)
                </label>
                <input
                  type="text"
                  value={newGroup.id}
                  onChange={(e) => setNewGroup({ ...newGroup, id: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Auto-generated if left empty"
                />
                <p className="text-xs text-gray-500 mt-1">
                  If not specified, will be auto-generated as: {newGroup.name.toLowerCase().replace(/\s+/g, '-')}@company.com
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Create Group</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
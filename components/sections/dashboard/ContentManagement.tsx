import React, { useState } from "react";
import {
  Upload,
  Search,
  Filter,
  FileText,
  Calendar,
  HardDrive,
  Users,
  MoreHorizontal,
  Download,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Plus,
  X,
  Check,
  AlertCircle,
  Shield,
} from "lucide-react";
import axiosInstance from "@/utils/axiosinstance";
import toast from "react-hot-toast";

export const ContentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [selectedAccessLevels, setSelectedAccessLevels] = useState<{
    [key: string]: string[];
  }>({});
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [isUploading, setIsUploading] = useState(false);

  //"group must be one of the following values: Employees, IT Department, HR Department, Executives"

  const iamGroups = [
    {
      id: "Employees",
      name: "All Employees",
      description: "Standard access for all company employees",
      memberCount: 234,
    },
    {
      id: "Executives",
      name: "Executives",
      description: "Senior leadership and C-suite access",
      memberCount: 8,
    },
    {
      id: "HR Department",
      name: "HR Department",
      description: "Human Resources team access",
      memberCount: 15,
    },
    {
      id: "IT Department",
      name: "IT Department",
      description: "Information Technology team access",
      memberCount: 22,
    },
    {
      id: "Finance Department",
      name: "Finance Department",
      description: "Finance and accounting team access",
      memberCount: 12,
    },
    {
      id: "Business Development",
      name: "Business Development",
      description: "Sales and business development access",
      memberCount: 31,
    },
    {
      id: "Legal Department",
      name: "Legal Department",
      description: "Legal and compliance team access",
      memberCount: 6,
    },
  ];

  const documents = [
    {
      id: 1,
      filename: "Employee_Handbook_2024.pdf",
      type: "pdf",
      uploadDate: "2024-01-15",
      lastModified: "2024-01-20",
      size: "2.4 MB",
      accessLevel: ["employees"],
      status: "indexed",
    },
    {
      id: 2,
      filename: "HR_Performance_Review_Policy.docx",
      type: "docx",
      uploadDate: "2024-01-10",
      lastModified: "2024-01-18",
      size: "856 KB",
      accessLevel: ["hr-department"],
      status: "indexed",
    },
    {
      id: 3,
      filename: "Executive_Strategy_2024.pptx",
      type: "pptx",
      uploadDate: "2024-01-05",
      lastModified: "2024-01-22",
      size: "4.2 MB",
      accessLevel: ["executives"],
      status: "pending",
    },
    {
      id: 4,
      filename: "IT_Security_Guidelines.pdf",
      type: "pdf",
      uploadDate: "2024-01-12",
      lastModified: "2024-01-19",
      size: "1.8 MB",
      accessLevel: ["employees"],
      status: "indexed",
    },
    {
      id: 5,
      filename: "Benefits_Package_Overview.pdf",
      type: "pdf",
      uploadDate: "2024-01-08",
      lastModified: "2024-01-16",
      size: "1.2 MB",
      accessLevel: ["employees"],
      status: "indexed",
    },
  ];

  const groupMap = {
    "All Employees": "Employees",
    "Finance Team": "Finance",
    Management: "Managers",
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-blue-600" />;
  };

  const getStatusBadge = (status: string) => {
    const classes: Record<"indexed" | "pending" | "error", string> = {
      indexed: "bg-emerald-100 text-emerald-800",
      pending: "bg-amber-100 text-amber-800",
      error: "bg-red-100 text-red-800",
    };

    const allowedStatuses = ["indexed", "pending", "error"] as const;
    type StatusType = (typeof allowedStatuses)[number];

    const statusKey = allowedStatuses.includes(status as StatusType)
      ? (status as StatusType)
      : "indexed";

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${classes[statusKey]}`}
      >
        {status}
      </span>
    );
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadFiles(files);

    // Initialize access levels for each file
    const initialAccessLevels: { [key: string]: string[] } = {};
    files.forEach((file) => {
      initialAccessLevels[file.name] = ["employees"]; // Default to all employees
    });
    setSelectedAccessLevels(initialAccessLevels);

    if (files.length > 0) {
      setShowUploadModal(true);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadFiles(files);

    // Initialize access levels for each file
    const initialAccessLevels: { [key: string]: string[] } = {};
    files.forEach((file) => {
      initialAccessLevels[file.name] = ["employees"];
    });
    setSelectedAccessLevels(initialAccessLevels);

    if (files.length > 0) {
      setShowUploadModal(true);
    }
  };

  const toggleAccessLevel = (fileName: string, groupId: string) => {
    setSelectedAccessLevels((prev) => {
      const currentLevels = prev[fileName] || [];
      const isSelected = currentLevels.includes(groupId);

      if (isSelected) {
        return {
          ...prev,
          [fileName]: currentLevels.filter((id) => id !== groupId),
        };
      } else {
        return {
          ...prev,
          [fileName]: [...currentLevels, groupId],
        };
      }
    });
  };

  const simulateUpload = async (file: File) => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: Math.min(progress, 100),
        }));
      }, 200);
    });
  };

  const handleUpload = async () => {
    setIsUploading(true);

    const filesWithoutAccess = uploadFiles.filter(
      (file) =>
        !selectedAccessLevels[file.name] ||
        selectedAccessLevels[file.name].length === 0
    );

    if (filesWithoutAccess.length > 0) {
      alert(
        "Please assign at least one access level to all files before uploading."
      );
      setIsUploading(false);
      return;
    }

    try {
      for (const file of uploadFiles) {
        const accessGroups = selectedAccessLevels[file.name]; // e.g., ["employees"]

        // Capitalize the first letter of the first group
        const group =
          accessGroups[0].charAt(0).toUpperCase() + accessGroups[0].slice(1);

        const res = await axiosInstance.post("/admin/gcs/generate-upload-url", {
          file_name: file.name,
          group: group,
        });
        const uploadUrl = res.data.url;
        const publicUrl = res.data.publicUrl;

        console.log("✅ Upload URL:", uploadUrl);
        console.log("🌐 Public URL:", publicUrl);

        // Step 2: Upload the file directly to GCS
        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/octet-stream",
          },
          body: file,
        });

        if (!uploadRes.ok) {
          const text = await uploadRes.text(); // may contain error from GCS
          console.error("Upload failed:", uploadRes.status, text);
        } else {
          console.log("Upload success");
        }

        // Step 3: Fake progress bar fill
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 100,
        }));
      }

      // Finish up
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadFiles([]);
        setSelectedAccessLevels({});
        setUploadProgress({});
        setIsUploading(false);
        toast.success("Files uploaded successfully!");
      }, 500);
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
      toast.error("Upload failed. Please try again.");
    }
  };

  const getGroupName = (groupId: string) => {
    return iamGroups.find((group) => group.id === groupId)?.name || groupId;
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFilter === "all" || doc.type === selectedFilter)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Content Management
        </h1>
        <p className="text-gray-600">Manage your knowledge base documents</p>
      </div>

      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Document Repository
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors min-h-[44px] text-sm sm:text-base">
              <Upload className="w-4 h-4" />
              <span
                className="hidden sm:inline"
                onClick={() => setShowUploadModal(true)}
              >
                Upload Document
              </span>
              <span
                className="sm:hidden"
                onClick={() => setShowUploadModal(true)}
              >
                Upload
              </span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors min-h-[44px] text-sm sm:text-base">
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Re-index All</span>
              <span className="sm:hidden">Re-index</span>
            </button>
          </div> 
        </div>

       
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] w-full sm:w-auto"
          >
            <option value="all">All Types</option>
            <option value="pdf">PDF</option>
            <option value="docx">Word</option>
            <option value="pptx">PowerPoint</option>
          </select>
        </div>

      
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm">
                  Document
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm hidden sm:table-cell">
                  Upload Date
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm hidden md:table-cell">
                  Size
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm hidden lg:table-cell">
                  Access Level
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm">
                  Status
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-2 sm:px-4">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(doc.type)}
                      <span className="font-medium text-gray-900 text-sm truncate max-w-[120px] sm:max-w-none">
                        {doc.filename}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 sm:px-4 text-gray-600 text-sm hidden sm:table-cell">
                    {doc.uploadDate}
                  </td>
                  <td className="py-4 px-2 sm:px-4 text-gray-600 text-sm hidden md:table-cell">
                    {doc.size}
                  </td>
                  <td className="py-4 px-2 sm:px-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {doc.accessLevel.map((level, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {getGroupName(level)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-2 sm:px-4">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="py-4 px-2 sm:px-4">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button className="p-1 sm:p-2 hover:bg-gray-100 rounded text-gray-600 min-w-[32px] min-h-[32px] flex items-center justify-center">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 sm:p-2 hover:bg-gray-100 rounded text-gray-600 min-w-[32px] min-h-[32px] flex items-center justify-center hidden sm:flex">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 sm:p-2 hover:bg-gray-100 rounded text-gray-600 min-w-[32px] min-h-[32px] flex items-center justify-center hidden sm:flex">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 sm:p-2 hover:bg-gray-100 rounded text-red-600 min-w-[32px] min-h-[32px] flex items-center justify-center">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>  */}

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
          Upload New Document
        </h2>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            Drag and drop your files here
          </p>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            or click to browse
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors min-h-[44px] text-sm sm:text-base"
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById("file-input")?.click();
            }}
          >
            Select Files
          </button>
          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.docx,.pptx,.txt,.doc,.xlsx"
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-xs sm:text-sm text-gray-500 mt-4">
            Supported formats: PDF, DOCX, PPTX, TXT (Max 50MB)
          </p>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Configure Document Access
              </h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isUploading}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {uploadFiles.map((file, fileIndex) => (
                  <div
                    key={fileIndex}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                          {file.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                          {file.type || "Unknown type"}
                        </p>
                      </div>
                    </div>

                    {isUploading && uploadProgress[file.name] !== undefined && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">
                            Uploading...
                          </span>
                          <span className="text-sm text-gray-600">
                            {Math.round(uploadProgress[file.name])}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[file.name]}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Shield className="w-5 h-5 text-amber-600" />
                        <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                          Access Levels (IAM Groups)
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4">
                        Select which IAM groups can access this document. Users
                        must be members of at least one selected group.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {iamGroups.map((group) => {
                          const isSelected =
                            selectedAccessLevels[file.name]?.includes(
                              group.id
                            ) || false;
                          return (
                            <div
                              key={group.id}
                              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                isSelected
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() =>
                                toggleAccessLevel(file.name, group.id)
                              }
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <h5 className="font-medium text-gray-900 text-sm">
                                      {group.name}
                                    </h5>
                                    {isSelected && (
                                      <Check className="w-4 h-4 text-blue-600" />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1">
                                    {group.description}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {group.memberCount} members
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {(!selectedAccessLevels[file.name] ||
                        selectedAccessLevels[file.name].length === 0) && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <p className="text-sm text-red-800">
                              Please select at least one access level for this
                              document.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 sm:p-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {uploadFiles.length} file{uploadFiles.length !== 1 ? "s" : ""}{" "}
                selected
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors min-h-[44px] text-sm sm:text-base"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={
                    isUploading ||
                    uploadFiles.some(
                      (file) =>
                        !selectedAccessLevels[file.name] ||
                        selectedAccessLevels[file.name].length === 0
                    )
                  }
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors min-h-[44px] text-sm sm:text-base"
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {isUploading ? "Uploading..." : "Upload Documents"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

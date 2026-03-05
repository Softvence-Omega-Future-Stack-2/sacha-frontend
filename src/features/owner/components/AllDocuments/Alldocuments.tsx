// AllDocuments.tsx
import React, { useState } from 'react';
import {
  Upload,
  CheckCircle,
  Trash2,
  RefreshCw,
  FileText,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import Title from '../Title';
import {
  useAddTenantProofMutation,
  useGetTenantProofsQuery,
  useUpdateTenantProofMutation,
} from '../../../../redux/featuresAPI/tenantProofApi/tenantProofApi';
import type { ITenantProof } from '../../../../redux/featuresAPI/tenantProofApi/tenantProofApi';

// Type for uploaded file
interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
}

// Document category type
interface DocumentCategory {
  id: string;
  field: keyof Omit<ITenantProof, 'id' | 'created_at' | 'updated_at'>;
  title: string;
  uploadedFile?: UploadedFile;
  isRecommended?: boolean;
}

const AllDocuments: React.FC = () => {

  // API Hooks
  const { data: proofsData, isLoading: isFetching, refetch } = useGetTenantProofsQuery();
  const [addTenantProof, { isLoading: isAdding }] = useAddTenantProofMutation();
  const [updateTenantProof, { isLoading: isUpdating }] = useUpdateTenantProofMutation();

  const proofRecord = proofsData && proofsData.length > 0 ? proofsData[0] : null;

  // Main document categories
  const [documents, setDocuments] = useState<DocumentCategory[]>([
    { id: '1', field: 'identity_doc', title: 'Identity document' },
    { id: '2', field: 'proof_address', title: 'Proof of address' },
    { id: '3', field: 'proof_income', title: 'Proof of income' },
    { id: '4', field: 'payslip', title: 'Payslip' },
    { id: '5', field: 'proof_profession', title: 'Proof of professional status', isRecommended: true },
    { id: '6', field: 'text_notice', title: 'Tax notice', isRecommended: true },
  ]);

  // Track new files selected for upload
  const [newFiles, setNewFiles] = useState<Record<string, File>>({});

  // Effect to sync fetched data into UI state
  React.useEffect(() => {
    if (proofRecord) {
      setDocuments(prev => prev.map(doc => {
        const fileUrl = proofRecord[doc.field as keyof ITenantProof] as string | null;
        if (fileUrl) {
          return {
            ...doc,
            uploadedFile: {
              id: `api-${doc.id}`,
              name: fileUrl.split('/').pop() || 'document',
              size: 0, // We don't have size info from URL usually
              type: 'application/pdf',
              url: fileUrl,
              uploadedAt: new Date(),
            }
          };
        }
        return doc;
      }));
    }
  }, [proofRecord]);

  // Additional optional files (managed locally for now as API doesn't seem to support them separately yet)
  const [additionalFiles, setAdditionalFiles] = useState<UploadedFile[]>([]);

  // UI states
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Check if any file is uploaded
  const hasAnyFile = documents.some((d) => d.uploadedFile) || additionalFiles.length > 0;

  // Upload file for main categories
  const handleMainUpload = (categoryId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Store in newFiles state for later upload
    setNewFiles(prev => ({ ...prev, [categoryId]: file }));

    const previewFile: UploadedFile = {
      id: `new-${categoryId}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date(),
    };

    setDocuments((prev) =>
      prev.map((doc) => (doc.id === categoryId ? { ...doc, uploadedFile: previewFile } : doc))
    );
  };

  // Delete main category file (optimistic UI clear)
  const deleteMainFile = (categoryId: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === categoryId ? { ...doc, uploadedFile: undefined } : doc))
    );
    setNewFiles(prev => {
      const updated = { ...prev };
      delete updated[categoryId];
      return updated;
    });
  };

  // Upload additional files (multiple)
  const handleAdditionalUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date(),
    }));

    setAdditionalFiles((prev) => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} file(s) added successfully`);
  };

  // Remove additional file
  const removeAdditionalFile = (id: string) => {
    setAdditionalFiles((prev) => prev.filter((f) => f.id !== id));
    toast.info('File removed');
  };

  // Continue Application with API Integration
  const handleContinue = async () => {
    if (!hasAnyFile) {
      toast.error('Please upload at least one document before continuing.');
      return;
    }

    const formData = new FormData();
    let hasNewFiles = false;

    // Map local new files to FormData using the correct field names
    documents.forEach(doc => {
      const file = newFiles[doc.id];
      if (file) {
        formData.append(doc.field, file);
        hasNewFiles = true;
      }
    });

    // If no new files and no existing record, we can't really "upload" anything but URLs
    // But usually if record exists, we want to allow PATCH even if just replacing one.

    if (!hasNewFiles && !proofRecord) {
      toast.info("No new documents to upload.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (proofRecord) {
        // Update existing record
        await updateTenantProof({ id: proofRecord.id, data: formData }).unwrap();
        toast.success('Documents updated successfully!');
      } else {
        // Create new record
        await addTenantProof(formData).unwrap();
        toast.success('Documents uploaded successfully!');
      }

      refetch();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error?.data?.message || 'Failed to submit application', {
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <div >
        {/* Header */}
        <Title title="All Documents" paragraph='Upload and manage all required documents for your rental application.' />


        {/* Empty State / Loading State */}
        {isFetching && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="mt-4 text-gray-500">Loading your documents...</p>
          </div>
        )}

        {!isFetching && !hasAnyFile && (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300 mb-10">
            <FileText className="mx-auto h-16 w-16 text-gray-300" />
            <p className="mt-6 text-2xl font-semibold text-gray-700">
              No documents uploaded yet
            </p>
            <p className="mt-2 text-gray-500">
              Start uploading your documents below to complete your application.
            </p>
          </div>
        )}

        {/* Main Documents */}
        <div className="space-y-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                    {doc.isRecommended && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Recommended
                      </span>
                    )}
                  </div>

                  {doc.uploadedFile && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-900">{doc.uploadedFile.name}</p>
                            <p className="text-sm text-green-700">
                              {doc.uploadedFile.size > 0 ? formatFileSize(doc.uploadedFile.size) + ' • ' : ''}
                              {doc.uploadedFile.uploadedAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!doc.uploadedFile && (
                    <p className="mt-3 text-sm text-gray-500">
                      {doc.isRecommended
                        ? `Recommended: ${doc.field.replace(/_/g, ' ')}`
                        : `Required: ${doc.field.replace(/_/g, ' ')}`}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 items-center">
                  {doc.uploadedFile ? (
                    <>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleMainUpload(doc.id, e.target.files)}
                        />
                        <span className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                          <RefreshCw className="w-4 h-4" />
                          Replace
                        </span>
                      </label>
                      <button
                        onClick={() => deleteMainFile(doc.id)}
                        className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleMainUpload(doc.id, e.target.files)}
                      />
                      <span className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Documents */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            Additional documents (Optional)
          </h2>

          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
              }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleAdditionalUpload(e.dataTransfer.files);
            }}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-lg font-medium text-gray-700">
              Drag & drop files here, or click to browse
            </p>
            <label className="mt-5 inline-block">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleAdditionalUpload(e.target.files)}
              />
              <span className="px-8 py-3.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                Choose Files
              </span>
            </label>
          </div>

          {additionalFiles.length > 0 && (
            <div className="mt-8 space-y-3">
              <p className="text-sm font-medium text-gray-700">
                Uploaded additional files ({additionalFiles.length})
              </p>
              {additionalFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} • {file.uploadedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeAdditionalFile(file.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Continue Button with Loader + Toast */}
        <div className="mt-12 text-center">
          <button
            onClick={handleContinue}
            disabled={isSubmitting}
            className={`px-10 py-4 text-white text-lg font-semibold rounded-xl shadow-lg transition-all flex items-end gap-3 mx-auto min-w-[260px] justify-end ${isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }`}
          >
            {isSubmitting || isAdding || isUpdating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>{proofRecord ? 'Updating...' : 'Uploading...'}</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>{proofRecord ? 'Update  Documents' : 'Upload Documents'}</span>
              </>
            )}
          </button>

          <p className="mt-4 text-sm text-gray-500">
            {isSubmitting
              ? 'Please wait while we process your application...'
              : hasAnyFile
                ? 'You can always come back later to update documents.'
                : 'Upload at least one document to continue.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllDocuments;
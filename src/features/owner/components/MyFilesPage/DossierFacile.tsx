import { useState, useEffect } from 'react';
import { Info, UploadCloud, Loader2, Trash2, FileText } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import {
  useGetTenantProofsQuery,
  useAddTenantProofMutation,
  useUpdateTenantProofMutation,
  useDeleteTenantProofMutation,
  type ITenantProof,
} from '../../../../redux/featuresAPI/tenantProofApi/tenantProofApi';
// Recommended for Next.js
import deccier from '../../../../assets/dashboard/DossierFile.png';

const DropzoneArea = ({
  fullWidth = false,
  onFileSelect,
  existingFile
}: {
  fullWidth?: boolean;
  onFileSelect: (file: File | null) => void;
  existingFile?: string | null;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  const getFileName = (url: string) => {
    return url.split('/').pop() || 'Existing Document';
  };

  return (
    <div className={`space-y-4 ${fullWidth ? 'w-full' : ''}`}>
      {(selectedFile || existingFile) ? (
        <div className={`flex flex-col gap-3 p-5 rounded-2xl border bg-white shadow-sm transition-all ${selectedFile ? 'border-blue-200 ring-2 ring-blue-50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className={`p-2 rounded-lg ${selectedFile ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <FileText className={`w-5 h-5 ${selectedFile ? 'text-blue-600' : 'text-gray-500'}`} />
              </div>
              <div className="flex flex-col">
                <span className="truncate font-semibold text-gray-800 text-sm">
                  {selectedFile ? selectedFile.name : getFileName(existingFile!)}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  {selectedFile ? 'Ready to upload' : 'Currently on server'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                onFileSelect(null);
              }}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
              title="Remove document"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {existingFile && !selectedFile && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100 w-fit">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold text-green-700">VERIFIED ON SERVER</span>
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`group border-2 border-dashed rounded-2xl bg-gray-50 p-10 text-center cursor-pointer transition-all
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-white hover:shadow-lg'}
          `}
        >
          <input {...getInputProps()} />
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white border border-gray-200 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 shadow-sm">
            <UploadCloud className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <p className="text-gray-600 font-semibold text-sm leading-relaxed">
            {isDragActive
              ? 'Drop your file here...'
              : 'Click to upload or drag & drop'}
          </p>
          <p className="text-xs text-gray-400 mt-2 font-medium">Support: PDF, JPG, PNG (Max 5MB)</p>
        </div>
      )}
    </div>
  );
};

export default function DossierFacilePage() {
  const { data: proofs, isLoading: isFetching } = useGetTenantProofsQuery();
  const [addProof, { isLoading: isAdding }] = useAddTenantProofMutation();
  const [updateProof, { isLoading: isUpdating }] = useUpdateTenantProofMutation();

  const existingProof = proofs && proofs.length > 0 ? proofs[0] : null;

  type FieldKey =
    | 'identity'
    | 'address'
    | 'income'
    | 'payslip'
    | 'professional'
    | 'tax';

  const documents = [
    { key: 'identity' as const, label: 'Identity document', apiField: 'identity_doc' },
    { key: 'address' as const, label: 'Proof of address', apiField: 'proof_address' },
    { key: 'income' as const, label: 'Proof of income', apiField: 'proof_income' },
    { key: 'payslip' as const, label: 'Payslip', apiField: 'payslip' },
    { key: 'professional' as const, label: 'Proof of professional status', apiField: 'proof_profession' },
    { key: 'tax' as const, label: 'Tax notice', apiField: 'text_notice' },
  ];

  const [openFields, setOpenFields] = useState<Record<FieldKey, boolean>>({
    identity: false,
    address: false,
    income: false,
    payslip: false,
    professional: false,
    tax: false,
  });

  // Auto-open fields that have existing files
  useEffect(() => {
    if (existingProof) {
      const newOpenFields: Record<string, boolean> = { ...openFields };
      documents.forEach(doc => {
        if (existingProof[doc.apiField as keyof ITenantProof]) {
          newOpenFields[doc.key] = true;
        }
      });
      setOpenFields(newOpenFields as Record<FieldKey, boolean>);
    }
  }, [existingProof]);

  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null | 'DELETE'>>({});

  const toggleField = (key: FieldKey) => {
    setOpenFields((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFileChange = (key: string, file: File | null | 'DELETE') => {
    setSelectedFiles(prev => ({ ...prev, [key]: file }));
  };


  const handleSave = async () => {
    const formData = new FormData();
    let hasChanges = false;

    Object.entries(selectedFiles).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
        hasChanges = true;
      } else if (value === 'DELETE') {
        formData.append(key, ""); // Send empty to PATCH clear
        hasChanges = true;
      }
    });

    if (!hasChanges) {
      toast.error("No new changes to save.");
      return;
    }

    try {
      let response;
      if (existingProof) {
        response = await updateProof({ id: existingProof.id, data: formData }).unwrap();
      } else {
        response = await addProof(formData).unwrap();
      }
      toast.success(response?.message || "Changes saved successfully!", {
        style: {
          background: '#061251',
          color: '#fff',
          borderRadius: '12px',
        }
      });
      setSelectedFiles({});
    } catch (err: any) {
      console.error("Upload failed:", err);
      toast.error(err?.data?.message || "Failed to sync with server.");
    }
  };

  const [deleteProof, { isLoading: isDeletingAll }] = useDeleteTenantProofMutation();

  const handleDeleteAll = async () => {
    if (!existingProof) return;
    if (!window.confirm("Are you sure you want to delete all uploaded documents?")) return;

    try {
      await deleteProof(existingProof.id).unwrap();
      toast.success("All documents deleted.");
      setSelectedFiles({});
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete documents.");
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        <p className="text-gray-500 font-medium">Fetching your documents...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8">
        <div className="space-y-10">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
              Share your file with<br />Dossier Facile
            </h1>
            <div className="flex items-center gap-3 text-right">
              <img
                src={deccier}
                alt="Dossier Facile"
                width={120}
                height={56}
                className="h-14 w-auto"
              />
            </div>
          </div>

          {/* URL Input */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                URL of your file on Dossier Facile
              </h2>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Ex: https://..."
              className="w-full px-5 py-4 bg-[#FFFFFF] border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Documents Section */}
          <div className="rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Complete your application on My Appart
                </h2>
                <Info className="w-5 h-5 text-gray-400" />
              </div>

              {existingProof && (
                <button
                  onClick={handleDeleteAll}
                  disabled={isDeletingAll}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {isDeletingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Delete All Documents
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {documents.map((doc) => {
                const isUploaded = !!existingProof?.[doc.apiField as keyof ITenantProof];
                return (
                  <div key={doc.key} className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-[#F0F0F0] bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-bold text-sm tracking-tight">{doc.label}</span>
                        <span className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Application Requirement</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleField(doc.key as FieldKey)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${openFields[doc.key as FieldKey] || isUploaded
                          ? 'bg-white text-blue-600 border border-blue-100 hover:border-blue-200'
                          : 'bg-[#1077FF] text-white hover:bg-blue-700 hover:shadow-blue-100'
                          }`}
                      >
                        {isUploaded ? 'FILES ON SERVER' : (openFields[doc.key as FieldKey] ? 'CLOSE DRAWER' : 'ADD DOCUMENT')}
                      </button>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${openFields[doc.key as FieldKey] ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <DropzoneArea
                        onFileSelect={(file) => handleFileChange(doc.apiField, file ? file : (existingProof?.[doc.apiField as keyof ITenantProof] ? 'DELETE' : null))}
                        existingFile={selectedFiles[doc.apiField] === 'DELETE' ? null : (existingProof?.[doc.apiField as keyof ITenantProof] as string | null)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Save Button */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-end gap-6 border-t border-gray-100 pt-10">
              <span className="text-xs text-gray-400 font-medium max-w-xs text-center sm:text-right italic">
                All uploaded documents are processed securely and shared only with verified owners.
              </span>
              <button
                onClick={handleSave}
                disabled={isAdding || isUpdating}
                className={`w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-5 rounded-2xl text-white font-extrabold text-sm tracking-widest transition-all shadow-2xl active:scale-95 ${isAdding || isUpdating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#1077FF] hover:bg-blue-800 hover:shadow-blue-300'
                  }`}
              >
                {(isAdding || isUpdating) ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    SYNCING CHANGES...
                  </>
                ) : (
                  'COMMIT CHANGES'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { Download } from 'lucide-react';

interface DocumentItem {
  name: string;
  format: string;
  fileName: string;
}

const documents: DocumentItem[] = [
  { name: 'Furnished rental agreement', format: 'PDF', fileName: 'furnished-rental-agreement.pdf' },
  { name: 'Furnished rental agreement', format: 'PDF', fileName: 'furnished-rental-agreement.docx' },
  { name: 'Current situation report', format: 'PDF', fileName: 'current-situation-report.pdf' },
  { name: 'Current situation report', format: 'PDF', fileName: 'current-situation-report.docx' },
  { name: 'Unfurnished rental agreement', format: 'PDF', fileName: 'unfurnished-rental-agreement.pdf' },
  { name: 'Unfurnished rental agreement', format: 'PDF', fileName: 'unfurnished-rental-agreement.docx' },
  { name: 'Rent receipt', format: 'PDF', fileName: 'rent-receipt.pdf' },
  { name: 'Rent receipt', format: 'PDF', fileName: 'rent-receipt.docx' },
];

export default function BeautifulModelsPage() {
  const handleDownload = (fileName: string) => {

    const link = document.createElement('a');
    link.href = `/documents/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div >
      <div>
        <h1 className="text-2xl sm:text-2xl font-medium text-[#06125] mb-8 ">
          Beautiful Models
        </h1>

        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-white rounded-lg  transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {doc.name}
                  </p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    {doc.format}
                  </p>
                </div>

                <button
                  onClick={() => handleDownload(doc.fileName)}
                  className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  <span className="hidden sm:inline">Download {doc.format}</span>
                  <span className="sm:hidden">Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
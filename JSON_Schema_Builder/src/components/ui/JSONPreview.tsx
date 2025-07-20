import React from 'react';

interface JsonPreviewProps {
  jsonPreview: string;
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ jsonPreview }) => (
  <div className="bg-white rounded-lg border">
    <div className="px-4 py-3 border-b bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-800">JSON Preview</h3>
    </div>
    <div className="p-4">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-sm font-mono h-96 lg:h-[500px]">
        <code>{jsonPreview}</code>
      </pre>
    </div>
  </div>
);
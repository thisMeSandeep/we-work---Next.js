import React from "react";

const FilePreview = ({ fileUrl }: { fileUrl: string }) => {
  const downloadUrl = fileUrl.replace("/upload/", "/upload/fl_attachment/");

  return (
    <a
      href={downloadUrl}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Download Resume
    </a>
  );
};

export default FilePreview;

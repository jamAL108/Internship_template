'use client';
import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';

const DocxViewer = ({ docxFile }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      try {
        const result = await mammoth.convertToHtml({ arrayBuffer: e.target.result });
        setContent(result.value);
      } catch (error) {
        console.error('Error converting docx to html:', error);
      }
    };

    fileReader.readAsArrayBuffer(docxFile);
  }, [docxFile]);

  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default DocxViewer;

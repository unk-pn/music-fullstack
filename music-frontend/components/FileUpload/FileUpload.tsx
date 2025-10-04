import React, { ReactNode, useRef } from 'react';

interface FileUploadProps {
  setFile: (file: File) => void;
  accept: string;
  children: ReactNode;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children, className }) => {
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  return (
    <div onClick={() => ref.current?.click()} className={className}>
      <input
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
};
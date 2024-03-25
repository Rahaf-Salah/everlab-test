import { useDropzone } from "react-dropzone";
import { FileUploaderProps } from "../types";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { FC } from "react";

const FileUploader: FC<FileUploaderProps> = ({ onUpload }) => {
  const { getInputProps, getRootProps } = useDropzone({
    onDrop: (files: File[]) => {
      onUpload(files[0]);
    },
  });
  return (
    <div {...getRootProps()} className="w-1/2 cursor-pointer m-auto">
      <input {...getInputProps()} />
      <div className="font-sans  flex flex-col justify-center items-center border-2 border-dashed border-cyan-600 mt-16 py-10 rounded-xl gap-4">
        <FileUploadIcon fontSize="large" className="text-cyan-600 " />
        <p className="font-bold">Drop your file here</p>
        <p>OR</p>
        <button className="border-2 border-cyan-600 text-cyan-600 font-bold rounded-xl p-2 hover:bg-cyan-50">
          Select File
        </button>
      </div>
    </div>
  );
};

export default FileUploader;

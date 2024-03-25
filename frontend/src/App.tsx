import { useState } from "react";
import "./App.css";
import FileUploader from "./components/FileUploader";
import RisksTable from "./components/RisksTable";
import axios from "axios";

function App() {
  const [risks, setRisks] = useState([]);

  const onUpload = async (file: File) => {
    setRisks([]);

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("http://localhost:3000/parser", formData);
    setRisks(response.data.risks);
  };
  return (
    <>
      <FileUploader onUpload={onUpload} />
      <RisksTable rows={risks} />
    </>
  );
}

export default App;

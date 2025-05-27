"use client";

import { ChangeEvent, useState } from "react";

const LoginPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(event.target.files as FileList)[0];

    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    const form = new FormData();

    if (!selectedFile) return;

    form.append("upload_preset", "Food Delivery");
    form.append("upload", selectedFile);
    // form.append("folder", food - imagess);

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/tugozz/image/upload",
      { method: "POST", body: "adfa" }
    );

    const parsed = await response.json();
    console.log(parsed.url);
  };

  return (
    <div className="bg-red-50 w-20 h-20">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default LoginPage;

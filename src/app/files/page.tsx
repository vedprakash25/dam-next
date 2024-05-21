"use client";
import { Calistoga } from "next/font/google";
import { ChangeEvent, FormEvent, useState } from "react";

function Files() {
  const [file, setFile] = useState<File | null>(null);
  const [task, setTask] = useState("");

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files![0];
    setFile(selectedFile);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedText = e.target.value;
    setTask(selectedText);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(":Submitted");
    handleFileUpload();
  };

  const handleFileUpload = async () => {
    if (!file) {
      return 0;
    }

    const fromData = new FormData();
    fromData.append("file", file, file.name);

    try {
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: fromData,
      });

      if (!response.ok) {
        console.log("Failed to upload file");
      }

      const files = await response.json();
      console.log(files);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="h-screen max-w-sm mx-auto p-5">
      <h1 className="text-3xl font-semibold text-center">Files</h1>

      <form className="flex flex-col gap-5 mt-4" onSubmit={handleSubmit}>
        <input onChange={onChange} type="text" name="name" />
        <input onChange={onChangeFile} type="file" name="file" />

        <button
          type="submit"
          className="ml-auto border border-gray-500 rounded-md px-2 py-1"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default Files;

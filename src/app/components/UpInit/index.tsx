"use client";
import React, { FormEvent, ChangeEvent, useState } from "react";
import { writeFile } from "fs/promises";
import { join } from "path";
interface UpInit {}

const UpInit: React.FC<UpInit> = () => {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Remove default handler
    e.preventDefault();
    if (!file) return; //
    try {
      // create new payload
      const data = new FormData();
      data.set("file", file);

      // call api
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <input type="submit" value="Upload" />
    </form>
  );
};

export default UpInit;

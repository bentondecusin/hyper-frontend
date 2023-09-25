"use client";
import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";

interface InitQuery {}
const InitQuery: React.FC<InitQuery> = () => {
  const onQuerySubmit = async (e: any) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <form onSubmit={onQuerySubmit} style={{ background: "yellow" }}>
      <input style={{ background: "blue" }} type="text" name="text" />
    </form>
  );
};

export default InitQuery;

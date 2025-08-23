import React from "react";
import Editor from "@monaco-editor/react";

export default function CodingEditor() {
  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <Editor
        height="300px"
        defaultLanguage="javascript"
        defaultValue="// Write your code here..."
        theme="vs-dark"
      />
    </div>
  );
}

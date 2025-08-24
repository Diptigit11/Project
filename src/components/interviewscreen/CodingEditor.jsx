import React, { useState, useEffect } from "react";
import { Play, Save, RotateCcw, Code2, CheckCircle } from "lucide-react";

export default function CodingEditor({ 
  language = "javascript", 
  initialCode = "", 
  onCodeChange,
  question 
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Language templates
  const getLanguageTemplate = (lang) => {
    const templates = {
      javascript: `// ${question?.text || 'Solve the problem below'}
function solution() {
    // Write your code here
    
}

// Test your solution
console.log(solution());`,
      
      python: `# ${question?.text || 'Solve the problem below'}
def solution():
    # Write your code here
    pass

# Test your solution
print(solution())`,
      
      java: `// ${question?.text || 'Solve the problem below'}
public class Solution {
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.solution());
    }
    
    public String solution() {
        // Write your code here
        return "";
    }
}`,
      
      "c++": `// ${question?.text || 'Solve the problem below'}
#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    string solution() {
        // Write your code here
        return "";
    }
};

int main() {
    Solution sol;
    cout << sol.solution() << endl;
    return 0;
}`,
      
      csharp: `// ${question?.text || 'Solve the problem below'}
using System;

public class Solution {
    public static void Main() {
        Solution sol = new Solution();
        Console.WriteLine(sol.solution());
    }
    
    public string solution() {
        // Write your code here
        return "";
    }
}`,
      
      go: `// ${question?.text || 'Solve the problem below'}
package main

import "fmt"

func solution() string {
    // Write your code here
    return ""
}

func main() {
    fmt.Println(solution())
}`,
      
      rust: `// ${question?.text || 'Solve the problem below'}
fn solution() -> String {
    // Write your code here
    String::new()
}

fn main() {
    println!("{}", solution());
}`
    };
    
    return templates[lang] || templates.javascript;
  };

  // Initialize code with template if no initial code
  useEffect(() => {
    if (!initialCode.trim()) {
      const template = getLanguageTemplate(language);
      setCode(template);
    } else {
      setCode(initialCode);
    }
  }, [language, initialCode, question]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    setIsSaved(false);
  };

  const handleSave = () => {
    if (onCodeChange) {
      onCodeChange(code);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your code? This will clear all your work.")) {
      const template = getLanguageTemplate(language);
      setCode(template);
      setOutput("");
      setIsSaved(false);
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    
    // Simulate code execution (in a real app, you'd send this to a code execution service)
    setTimeout(() => {
      try {
        if (language === "javascript") {
          // Basic JavaScript execution simulation
          const mockOutput = "Code executed successfully!\nOutput: (simulated result)";
          setOutput(mockOutput);
        } else {
          setOutput(`Code execution simulated for ${language}.\nIn a real environment, this would compile and run your ${language} code.`);
        }
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
      setIsRunning(false);
    }, 1500);
  };

  const getLanguageDisplayName = (lang) => {
    const names = {
      javascript: "JavaScript",
      python: "Python",
      java: "Java",
      "c++": "C++",
      csharp: "C#",
      go: "Go",
      rust: "Rust"
    };
    return names[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code2 size={20} className="text-[#012A4A]" />
          <h3 className="font-semibold text-[#012A4A]">
            Code Editor - {getLanguageDisplayName(language)}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          {isSaved && (
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <CheckCircle size={16} />
              Saved
            </div>
          )}
        </div>
      </div>

      {/* Question Display */}
      {question && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">
            {question.text}
          </p>
        </div>
      )}

      {/* Code Editor */}
      <div className="mb-4">
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="w-full h-80 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-lg border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-[#012A4A] focus:border-transparent"
          placeholder={`Write your ${getLanguageDisplayName(language)} code here...`}
          spellCheck={false}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleRun}
          disabled={isRunning || !code.trim()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isRunning || !code.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Running...
            </>
          ) : (
            <>
              <Play size={16} />
              Run Code
            </>
          )}
        </button>

        <button
          onClick={handleSave}
          disabled={!code.trim()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            !code.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#012A4A] text-white hover:bg-[#024169]"
          }`}
        >
          <Save size={16} />
          Save Code
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-all"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      {/* Output Section */}
      {(output || isRunning) && (
        <div className="border-t border-gray-300 pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Output:</h4>
          <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm min-h-[100px]">
            {isRunning ? (
              <div className="flex items-center gap-2 text-yellow-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
                Executing code...
              </div>
            ) : (
              <pre className="whitespace-pre-wrap">{output || "No output yet. Run your code to see results."}</pre>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Instructions:</strong> Write your solution in the code editor above. 
          Click "Run Code" to test your solution, then "Save Code" to submit your answer.
          The code execution is simulated in this demo.
        </p>
      </div>
    </div>
  );
}
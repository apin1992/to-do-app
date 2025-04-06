import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Add a new task
  const addTask = () => {
    if (input.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: input, completed: false }, // Add a task (no completed flag now)
      ]);
      setInput(""); // Clear the input field
    }
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(index, 1);
      return newTasks;
    });
  };

  // Handle the Enter key to add a task
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className={`App ${darkMode ? "" : "light-mode"}`}>
      <h1 className={darkMode ? "" : "light-mode"}>📝 My To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} // Handle the Enter key to add a task
        placeholder="Enter a task"
        className={darkMode ? "" : "light-mode"}
      />
      <button onClick={addTask}>Add</button>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              color: darkMode ? "white" : "black", // Set white for tasks in both dark and light mode
              backgroundColor: darkMode ? "black" : "white", // Background color change based on mode
            }}
          >
            {task.text}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent any issues with event bubbling
                deleteTask(index);
              }}
              style={{
                marginLeft: "10px",
                color: "red",
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

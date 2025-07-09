import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const createNote = async () => {
    if (!title || !content) return alert("All fields required");
    try {
      const res = await API.post("/notes", { title, content });
      setNotes([res.data, ...notes]);
      setTitle("");
      setContent("");
    } catch (err) {
      alert("Failed to create note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      alert("Failed to delete note");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({ email: payload.email, name: payload.name });
    getNotes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
        <div>
          <h2 className="text-xl font-semibold">Welcome, {user?.username || user?.name || user?.email}</h2>
          <p className="text-sm text-gray-600">Manage your notes below</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded mb-3"
        />
        <button
          onClick={createNote}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Create Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="p-4 border rounded shadow-sm bg-white"
          >
            <h3 className="font-semibold text-lg">{note.title}</h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
            <button
              onClick={() => deleteNote(note._id)}
              className="mt-2 text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

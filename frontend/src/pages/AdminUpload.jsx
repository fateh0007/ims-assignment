import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useNavigate, useLocation } from 'react-router-dom';

const API = import.meta.env.VITE_API || 'http://localhost:5001';

export default function AdminUpload(){
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // read optional redirect query param ?redirect=/course/slug
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirect') || '/';

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return setMsg('Choose a file first');
    const fd = new FormData();
    fd.append('doc', file);
    try {
      const res = await axios.post(API + '/api/uploads/document', fd);
      setMsg('Uploaded: ' + res.data.doc.originalName);
      setTimeout(()=> navigate(redirectTo), 700);
    } catch (e) {
      setMsg('Upload failed: ' + (e.message||''));
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="flex-1 md:ml-64 px-4 sm:px-6 lg:px-10 py-5">
        <Topbar title="Admin Upload" />
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 max-w-lg">
          <h2 className="text-sm font-semibold text-slate-800 mb-3">Upload a document</h2>
          <form onSubmit={submit} className="space-y-3 text-sm">
            <input
              type="file"
              className="block w-full text-xs text-slate-700 border border-slate-200 rounded-lg cursor-pointer bg-slate-50"
              onChange={e=> setFile(e.target.files[0])}
            />
            <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">
              Upload
            </button>
          </form>
          <p className="mt-3 text-xs text-slate-600">{msg}</p>
        </div>
      </main>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API || 'http://localhost:5001';

export default function Home(){
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get(API + '/api/courses')
      .then(r=> setCourses(r.data || []))
      .catch(err => { console.error(err); setCourses([]); })
      .finally(()=> setLoading(false));
  },[]);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="flex-1 md:ml-64 px-4 sm:px-6 lg:px-10 py-5">
        <Topbar title="Courses" />
        <div className="mt-4">
          {loading && <p className="text-slate-500">Loading courses...</p>}
          {!loading && courses.length === 0 && <p className="text-slate-500">No courses found. Run <code>npm run seed</code> in backend.</p>}
          {!loading && courses.length > 0 && (
            <div className="grid gap-4">
              {courses.map(c=> (
                <div key={c._id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{c.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{c.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-emerald-600">₹{c.price || 0}</div>
                      <Link to={'/course/' + c.slug} className="inline-block mt-3 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm">View Course</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

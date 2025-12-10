import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const API = import.meta.env.VITE_API || 'http://localhost:5001';

export default function CourseDetail(){
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get(API + '/api/courses/' + slug)
      .then(r=> setCourse(r.data))
      .catch(err=> { console.error(err); setCourse(null); })
      .finally(()=> setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="app-shell">
        <Sidebar />
        <main className="flex-1 md:ml-64 px-6 py-6">
          <Topbar title="Loading..." />
          <p className="text-slate-500 mt-4">Loading course...</p>
        </main>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="app-shell">
        <Sidebar />
        <main className="flex-1 md:ml-64 px-6 py-6">
          <Topbar title="Course not found" />
          <p className="text-slate-500 mt-4">Course not found. Ensure backend has data and slug is correct.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="flex-1 md:ml-64 px-6 py-6">
        <Topbar title={course.title} />
        <section className="mt-3 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{course.title}</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-slate-500">
                <span className="px-2 py-1 bg-slate-100 rounded-md text-[11px]">Batch: Default_Batch</span>
                <span>Status: <span className="font-medium text-emerald-600">Completed</span></span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            { (course.sections || []).map((s, idx)=> (
              <div key={idx}>
                <div className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-emerald-100 flex items-center justify-center text-[13px] font-semibold text-slate-700">{idx+1}</div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{s.title}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{s.lessons?.length || 0} Lectures</div>
                    </div>
                  </div>
                  <div className="text-slate-400">+</div>
                </div>
              </div>
            )) }
          </div>
        </section>

        <div className="mt-6 flex justify-end">
          <Link to={'/course/' + course.slug + '/lms'} className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow-sm hover:bg-emerald-700">Go to LMS</Link>
        </div>
      </main>
    </div>
  );
}

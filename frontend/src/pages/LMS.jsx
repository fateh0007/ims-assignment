import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import SummaryModal from '../components/SummaryModal';

const API = import.meta.env.VITE_API || 'http://localhost:5001';

export default function LMS(){
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [summary, setSummary] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [docs, setDocs] = useState([]);

  useEffect(()=> {
    axios.get(API + '/api/courses/' + slug)
      .then(r=> setCourse(r.data))
      .catch(()=> setCourse(null));
    axios.get(API + '/api/uploads')
      .then(r=> setDocs(r.data))
      .catch(()=> setDocs([]));
  }, [slug]);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="flex-1 md:ml-64 px-4 sm:px-6 lg:px-10 py-5">
        <Topbar title={course?.title || 'Course LMS'} />

        <div className="grid lg:grid-cols-3 gap-4">
          <section className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800">Lessons</h2>
            </div>
            <div className="px-5 py-3">
              <ul className="space-y-2 text-sm">
                {(course?.sections || []).flatMap((s, si)=> 
                  s.lessons.map((l, li)=>(
                    <li key={`${si}-${li}`} className="flex items-center justify-between border border-slate-100 rounded-md px-3 py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-xs text-slate-500">
                          <i className="fa fa-play" />
                        </div>
                        <span>{l.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">Video</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">Documents</h3>
              {docs.length === 0 && (
                <p className="text-xs text-slate-500">Upload a document from the Admin page to see it here.</p>
              )}
              <ul className="space-y-2 text-sm">
                {docs.map(doc=>(
                  <li key={doc._id} className="flex items-center justify-between border border-slate-100 rounded-md px-3 py-2">
                    <span className="truncate text-xs">{doc.originalName}</span>
                    <button
                      onClick={()=> { setShowModal(true); setSummary('Summarising...'); axios.post(API + '/api/summarize/' + doc._id).then(r=> setSummary(r.data.summary)).catch(()=> setSummary('Error summarising')); }}
                      className="text-[11px] px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-medium"
                    >
                      Summarise
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 text-xs text-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-800 text-sm">Progress</span>
                <span className="text-[11px] text-slate-500">Student demo</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{width:'30%'}}></div>
              </div>
              <p className="small text-xs text-slate-500">Professional</p>

              <a href="/admin/upload" className="inline-flex mt-3 text-[11px] px-3 py-1.5 rounded bg-slate-900 text-white">
                Go to Admin Upload
              </a>
            </div>
          </aside>
        </div>

        <SummaryModal show={showModal} onClose={()=> setShowModal(false)} summary={summary} />
      </main>
    </div>
  );
}

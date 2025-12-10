import React from 'react';
export default function Sidebar(){
  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-sidebar to-sidebarDark text-white px-5 py-6 flex-col z-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center text-lg font-bold">I</div>
        <div>
          <div className="text-sm tracking-wide uppercase font-semibold">Imarticus</div>
          <div className="text-[11px] text-emerald-100">Learning</div>
        </div>
      </div>
      <nav className="flex flex-col gap-1 text-sm">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10">
          <i className="fa fa-book text-emerald-100" />
          <span>Course</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5">
          <i className="fa fa-comments text-emerald-100" />
          <span>Discussion</span>
        </button>
      </nav>
      <div className="mt-auto pt-8 border-t border-white/10 text-xs">
        <div className="mb-2 text-emerald-50">Facing problems?</div>
        <button className="px-3 py-2 rounded-md bg-white text-sidebar text-xs font-semibold shadow-sm">Get help</button>
      </div>
    </aside>
  );
}

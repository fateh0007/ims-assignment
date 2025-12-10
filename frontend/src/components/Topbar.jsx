import React from 'react';
export default function Topbar({ title }){
  return (
    <header className="flex items-center justify-between h-16">
      <div>
        <h1 className="text-[19px] font-semibold text-slate-800">{title}</h1>
        <p className="text-xs text-slate-400 mt-1">My Courses &gt; {title}</p>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <button className="relative text-slate-500">
          <i className="fa fa-bell" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-semibold">FA</div>
          <span className="text-slate-700 text-sm font-medium">Fateh Alam</span>
        </div>
      </div>
    </header>
  );
}

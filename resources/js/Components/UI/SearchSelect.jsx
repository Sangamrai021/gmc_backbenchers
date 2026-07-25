import { useState, useRef, useEffect } from 'react';

export default function SearchSelect({ options = [], value, onChange, placeholder = 'Search...', labelKey = 'name', valueKey = 'id', className = '' }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find(o => o[valueKey] === value);
  const filtered = options.filter(o =>
    o[labelKey]?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? selected[labelKey] : placeholder}
        </span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Type to search..." autoFocus
              className="w-full text-xs border-0 outline-none focus:ring-0 p-1 bg-transparent" />
          </div>
          <div className="overflow-y-auto max-h-48">
            {filtered.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-3">No results</p>
            ) : filtered.map(o => (
              <button key={o[valueKey]} type="button" onClick={() => { onChange(o[valueKey]); setOpen(false); setSearch(''); }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-indigo-50 transition-colors ${
                  o[valueKey] === value ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'
                }`}>
                {o[labelKey]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
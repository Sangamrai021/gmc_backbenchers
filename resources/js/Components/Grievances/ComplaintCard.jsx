import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { StatusBadge, PriorityBadge } from '../UI/Badge';

export default function ComplaintCard({ grievance }) {
  return (
    <Link href={route('grievances.show-reference', grievance.reference_code)}
      className="block bg-white rounded-xl border border-gray-200/60 p-4 hover:shadow-md hover:border-gray-300 transition-all group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-mono text-[10px] text-gray-400">{grievance.reference_code}</span>
        <div className="flex items-center gap-1 shrink-0">
          <PriorityBadge priority={grievance.priority} />
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
        {grievance.title}
      </h3>

      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
        {grievance.description}
      </p>

      {grievance.institution && (
        <p className="text-[10px] text-gray-400 mt-2">{grievance.institution}</p>
      )}

      <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-100">
        <StatusBadge status={grievance.status} />

        <div className="flex items-center gap-3 ml-auto text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {grievance.upvotes_count || 0}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {grievance.comments_count || 0}
          </span>
        </div>
      </div>

      {grievance.social_proof && (
        <p className="text-[10px] text-gray-400 mt-2 italic">{grievance.social_proof}</p>
      )}
    </Link>
  );
}
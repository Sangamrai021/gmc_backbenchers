import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { StatusBadge, PriorityBadge } from '../UI/Badge';

export default function ComplaintCard({ grievance }) {
  return (
    <Link href={route('grievances.show-reference', grievance.reference_code)}
      className="block bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
      
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-xs font-bold text-outline tracking-wider bg-surface-container-low px-2 py-0.5 rounded-md inline-block w-max">
            #{grievance.reference_code}
          </span>
          <StatusBadge status={grievance.status} />
        </div>
        <div className="shrink-0">
          <PriorityBadge priority={grievance.priority} />
        </div>
      </div>

      <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1 mb-2 leading-tight">
        {grievance.title}
      </h3>

      <p className="text-sm text-on-surface-variant font-medium line-clamp-2 mb-4 leading-relaxed">
        {grievance.description}
      </p>

      {grievance.institution && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-outline uppercase tracking-wider mb-4 bg-surface-container-lowest p-2 rounded-lg border border-surface-container-low">
            <span className="material-symbols-outlined text-[14px]">account_balance</span>
            <span className="truncate">{grievance.institution}</span>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container-low">
        
        {grievance.social_proof ? (
            <p className="text-xs font-medium text-primary italic max-w-[60%] truncate">"{grievance.social_proof}"</p>
        ) : (
            <p className="text-xs font-medium text-outline">No updates yet</p>
        )}

        <div className="flex items-center gap-3 shrink-0 text-xs font-bold text-on-surface-variant">
          <span className="flex items-center gap-1 bg-surface-container-lowest px-2 py-1 rounded-md border border-surface-container-low">
            <span className="material-symbols-outlined text-[14px] text-error">keyboard_double_arrow_up</span>
            {grievance.upvotes_count || 0}
          </span>
          <span className="flex items-center gap-1 bg-surface-container-lowest px-2 py-1 rounded-md border border-surface-container-low">
            <span className="material-symbols-outlined text-[14px] text-blue-500">forum</span>
            {grievance.comments_count || 0}
          </span>
        </div>
      </div>
    </Link>
  );
}
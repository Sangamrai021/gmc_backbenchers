import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '../../Context/LanguageContext';
import { StatusBadge, PriorityBadge } from '../../Components/UI/Badge';
import ProgressSteps from '../../Components/UI/ProgressSteps';

export default function Show({ grievance }) {
  const { t, lang } = useLanguage();
  const isNp = lang === 'np';

  return (
    <>
      <Head title={`${grievance.reference_code}`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center gap-3 mb-5">
          <Link href={route('grievances.feed')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isNp ? 'पछाडि' : 'Back'}
          </Link>
          <span className="text-gray-300">|</span>
          <span className="font-mono text-sm font-bold text-indigo-600">{grievance.reference_code}</span>
          <StatusBadge status={grievance.status} />
          <PriorityBadge priority={grievance.priority} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-5 sm:p-7">
          <h1 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{grievance.title}</h1>

          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{grievance.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-100">
              {[
                { label: isNp ? 'संस्था' : 'Institution', value: grievance.institution },
                { label: isNp ? 'श्रेणी' : 'Category', value: grievance.category },
                { label: isNp ? 'प्राथमिकता' : 'Priority', value: grievance.priority },
                { label: isNp ? 'मिति' : 'Date', value: grievance.bs_created_at },
              ].filter(i => i.value).map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl px-3 py-2.5">
                  <p className="text-[9px] font-medium text-gray-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-xs font-semibold text-gray-900 mt-0.5 truncate">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-medium">{grievance.upvotes_count || 0}</span>
              <span className="text-gray-400">{isNp ? 'प्रतिक्रिया' : 'reactions'}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-medium">{grievance.comments_count || 0}</span>
              <span className="text-gray-400">{isNp ? 'टिप्पणी' : 'comments'}</span>
            </span>
          </div>
        </div>

        {grievance.events && grievance.events.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-5 sm:p-7 mt-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">{isNp ? 'प्रगति' : 'Progress Timeline'}</h2>
            <ProgressSteps currentStatus={grievance.status} events={grievance.events} />
          </div>
        )}
      </div>
    </>
  );
}
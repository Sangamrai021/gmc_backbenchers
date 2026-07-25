import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '../../Context/LanguageContext';
import ComplaintCard from '../../Components/Grievances/ComplaintCard';
import { useState } from 'react';

export default function Feed({ grievances, filters, categories }) {
  const { t, lang } = useLanguage();
  const isNp = lang === 'np';

  return (
    <>
      <Head title={`${t('nav.feed')}`} />

      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {isNp ? 'उजुरी फीड' : 'Grievances Feed'}
              </h1>
              <p className="text-xs sm:text-sm text-blue-200/80 mt-0.5">
                {isNp ? 'विद्यार्थीहरूले रिपोर्ट गरेका उजुरीहरू' : 'Browse grievances reported by students'}
              </p>
            </div>
            <Link href={route('grievances.create')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-indigo-900 text-sm font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t('submit.submit_btn')}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {grievances.data.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200/60 p-12 text-center">
            <p className="text-gray-500">{isNp ? 'कुनै उजुरी भेटिएन' : 'No grievances found'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {grievances.data.map(grievance => (
              <ComplaintCard key={grievance.id} grievance={grievance} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
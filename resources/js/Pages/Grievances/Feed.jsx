import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '../../Context/LanguageContext';
import ComplaintCard from '../../Components/Grievances/ComplaintCard';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Feed({ grievances, filters, categories }) {
  const { t, lang } = useLanguage();
  const isNp = lang === 'np';
  const { auth } = usePage().props;

  // Render content
  const content = (
    <div className="min-h-screen bg-surface-container-lowest pb-12">
      <Head title={`${t('nav.feed')}`} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mt-10 -mr-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mb-10 -ml-10 mix-blend-overlay pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
                {isNp ? 'उजुरी फीड' : 'Community Grievances'}
              </h1>
              <p className="text-primary-50 font-medium text-lg max-w-xl">
                {isNp ? 'विद्यार्थीहरूले रिपोर्ट गरेका उजुरीहरू' : 'Browse and track issues reported by students. Transparency and quick resolutions.'}
              </p>
            </div>
            <Link href={route('grievances.create')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-bold hover:bg-primary-50 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              {t('submit.submit_btn')}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {grievances.data.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-16 text-center">
            <div className="w-20 h-20 bg-surface-container mx-auto rounded-full flex items-center justify-center mb-4 text-outline">
                <span className="material-symbols-outlined text-4xl">inbox</span>
            </div>
            <p className="text-on-surface-variant text-lg font-bold">
              {isNp ? 'कुनै उजुरी भेटिएन' : 'No grievances reported yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grievances.data.map(grievance => (
              <ComplaintCard key={grievance.id} grievance={grievance} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // If user is authenticated, wrap with AuthenticatedLayout so it feels like part of the Student Panel
  if (auth?.user) {
      return <AuthenticatedLayout header={isNp ? 'उजुरी फीड' : 'Grievances'}>{content}</AuthenticatedLayout>;
  }

  // Otherwise, just return the content (for guests)
  return content;
}
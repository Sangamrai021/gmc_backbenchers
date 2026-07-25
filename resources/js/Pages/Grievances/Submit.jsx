import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '../../Context/LanguageContext';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Submit({ institutions, categories, semesters, subjects, priorities }) {
  const { t, lang } = useLanguage();
  const { auth } = usePage().props;
  const user = auth?.user;
  const [step, setStep] = useState(0);

  const { data, setData, post, processing, errors, reset } = useForm({
    institution_id: user?.institution_id || '',
    semester_id: '',
    subject_id: '',
    category_id: '',
    priority: 'medium',
    title: '',
    description: '',
    is_anonymous: !user,
    photo: null,
    video: null,
    website: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post('/grievances', {
      forceFormData: true,
      onSuccess: () => { reset(); setStep(0); },
    });
  }

  function handlePhotoChange(e) {
    setData('photo', e.target.files[0]);
    setData('video', null);
  }

  function handleVideoChange(e) {
    setData('video', e.target.files[0]);
    setData('photo', null);
  }

  const filteredCategories = categories;
  const steps = ['issue_details', 'description', 'review'];

  function canProceed() {
    if (step === 0) return data.institution_id && data.category_id && data.priority && data.title;
    if (step === 1) return data.description && data.description.length >= 10;
    return true;
  }

  return (
    <>
      <Head title={`${t('submit.title')}`} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <button onClick={() => i < step && setStep(i)} disabled={i > step}
                  className={`flex items-center gap-2 transition-all ${i <= step ? 'cursor-pointer' : 'cursor-default'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step ? 'bg-indigo-600 text-white shadow-md' :
                    i === step ? 'bg-indigo-600 text-white shadow-md ring-4 ring-indigo-100 scale-110' :
                    'bg-gray-100 text-gray-400'}`}>
                    {i < step ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${i <= step ? 'text-gray-900' : 'text-gray-400'}`}>
                    {i === 0 ? t('submit.issue_details') : i === 1 ? t('submit.desc_label') : t('submit.your_info')}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-3 bg-gray-200 rounded" />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="absolute opacity-0 pointer-events-none" tabIndex={-1} aria-hidden="true">
            <input type="text" name="website" autoComplete="off" value={data.website} onChange={e => setData('website', e.target.value)} tabIndex={-1} />
          </div>

          {step === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-5 sm:p-7 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('submit.org_label')}</label>
                <select value={data.institution_id} onChange={e => setData('institution_id', e.target.value)}
                  className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                  <option value="">Select institution</option>
                  {institutions.map(inst => (
                    <option key={inst.id} value={inst.id}>{inst.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('submit.category_label')}</label>
                <select value={data.category_id} onChange={e => setData('category_id', e.target.value)}
                  className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {semesters.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('submit.semester_label')}</label>
                  <select value={data.semester_id} onChange={e => { setData('semester_id', e.target.value); setData('subject_id', ''); }}
                    className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                    <option value="">Select semester</option>
                    {semesters.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {subjects.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('submit.subject_label')}</label>
                  <select value={data.subject_id} onChange={e => setData('subject_id', e.target.value)}
                    className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                    <option value="">Select subject</option>
                    {subjects.filter(s => !data.semester_id || s.semester_id === parseInt(data.semester_id)).map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('submit.priority_label')}</label>
                <select value={data.priority} onChange={e => setData('priority', e.target.value)}
                  className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                  {Object.entries(priorities).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('submit.title_label')}</label>
                <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} maxLength={200}
                  placeholder={t('submit.title_placeholder')}
                  className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">
                  {t('submit.description')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  rows="6"
                  className="w-full bg-surface-container-lowest border border-surface-container-low text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-y"
                  placeholder={t('submit.description_placeholder')}
                  required
                />
                <p className="mt-2 text-xs font-bold text-outline uppercase tracking-wider">{data.description.length} / 10 {t('submit.min_chars')}</p>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">{t('submit.evidence.label')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-surface-container-low rounded-xl p-6 text-center hover:bg-surface-container-lowest transition-colors group cursor-pointer relative overflow-hidden">
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    <span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary transition-colors mb-2">add_photo_alternate</span>
                    <p className="text-sm font-bold text-on-surface-variant group-hover:text-primary transition-colors">{t('submit.evidence.photo')}</p>
                    {data.photo && <p className="text-xs text-primary font-bold mt-2 truncate">{data.photo.name}</p>}
                  </div>
                  <div className="border-2 border-dashed border-surface-container-low rounded-xl p-6 text-center hover:bg-surface-container-lowest transition-colors group cursor-pointer relative overflow-hidden">
                    <input type="file" accept="video/*" onChange={handleVideoChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    <span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary transition-colors mb-2">video_file</span>
                    <p className="text-sm font-bold text-on-surface-variant group-hover:text-primary transition-colors">{t('submit.evidence.video')}</p>
                    {data.video && <p className="text-xs text-primary font-bold mt-2 truncate">{data.video.name}</p>}
                  </div>
                </div>
                {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
                {errors.video && <p className="mt-1 text-sm text-red-600">{errors.video}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">{t('submit.website')}</label>
                <input
                  type="url"
                  value={data.website}
                  onChange={e => setData('website', e.target.value)}
                  className="w-full bg-surface-container-lowest border border-surface-container-low text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  placeholder="https://"
                />
                {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
              </div>

              {!user && (
                <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-low flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">info</span>
                  <p className="text-sm text-on-surface-variant font-medium">{t('submit.anonymous_note')}</p>
                </div>
              )}

              {user && (
                <label className="flex items-center gap-4 cursor-pointer group border-t border-surface-container-low pt-6">
                  <div className={`relative w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${data.is_anonymous ? 'bg-primary' : 'bg-surface-container-high'}`}>
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out flex items-center justify-center ${data.is_anonymous ? 'translate-x-6' : 'translate-x-0'}`}>
                      {data.is_anonymous && <span className="material-symbols-outlined text-[14px] text-primary">visibility_off</span>}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-on-surface">{t('submit.anonymous')}</span>
                    <p className="text-xs text-on-surface-variant mt-0.5 font-medium">Your identity is hidden from peers.</p>
                  </div>
                </label>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-on-surface border-b border-surface-container-low pb-2">Review Summary</h3>
              <div className="bg-surface-container-lowest rounded-2xl p-6 space-y-4 border border-surface-container-low">
                <div><span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Title</span> <span className="font-bold text-on-surface text-lg">{data.title}</span></div>
                <div><span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Priority</span> <span className="font-bold text-primary">{priorities[data.priority]}</span></div>
                <div><span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Description</span> <span className="font-medium text-on-surface-variant leading-relaxed">{data.description}</span></div>
                <div><span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Anonymous Mode</span> <span className="font-bold text-on-surface">{data.is_anonymous ? 'Yes' : 'No'}</span></div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-container-low">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)}
                className="px-6 py-3 text-sm font-bold bg-surface-container-low text-on-surface-variant rounded-xl hover:bg-surface-container transition-colors">
                Back
              </button>
            ) : <div />}

            {step < 2 ? (
              <button type="button" onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}
                className="px-8 py-3 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 shadow-md transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none">
                Next Step
              </button>
            ) : (
              <button type="submit" disabled={processing}
                className="px-8 py-3 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none">
                <span className="material-symbols-outlined text-[18px]">send</span>
                {processing ? t('submit.submitting') : t('submit.submit_btn')}
              </button>
            )}
          </div>
        </form>
      </div>
      </>
   
   
  );

  if (user) {
      return <AuthenticatedLayout header={t('submit.title')}>{content}</AuthenticatedLayout>;
  }

  return content;
}
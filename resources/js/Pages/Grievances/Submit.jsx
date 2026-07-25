import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '../../Context/LanguageContext';
import { useState } from 'react';

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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-5 sm:p-7 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('submit.desc_label')}</label>
                <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={6}
                  placeholder={t('submit.desc_placeholder')}
                  className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                <p className="text-xs text-gray-400 mt-1">{data.description.length}/5000</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('submit.photo_label')}</label>
                <input type="file" accept="image/*" onChange={handlePhotoChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('submit.video_label')}</label>
                <input type="file" accept="video/*" onChange={handleVideoChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
              </div>

              {!user && (
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={data.is_anonymous} onChange={e => setData('is_anonymous', e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-gray-700">{t('submit.anonymous_label')}</span>
                </label>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-5 sm:p-7 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Review Summary</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                <p><span className="text-gray-500">Title:</span> <span className="font-medium">{data.title}</span></p>
                <p><span className="text-gray-500">Priority:</span> <span className="font-medium">{priorities[data.priority]}</span></p>
                <p><span className="text-gray-500">Description:</span> <span className="font-medium">{data.description.substring(0, 100)}...</span></p>
                <p><span className="text-gray-500">Anonymous:</span> <span className="font-medium">{data.is_anonymous ? 'Yes' : 'No'}</span></p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Back
              </button>
            ) : <div />}

            {step < 2 ? (
              <button type="button" onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            ) : (
              <button type="submit" disabled={processing}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                {processing ? t('submit.submitting') : t('submit.submit_btn')}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
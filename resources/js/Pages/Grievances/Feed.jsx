import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '../../Context/LanguageContext';
import ComplaintCard from '../../Components/Grievances/ComplaintCard';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Feed({ grievances, filters, categories, institutions = [], semesters = [], subjects = [], priorities = {} }) {
  const { t, lang } = useLanguage();
  const isNp = lang === 'np';
  const { auth, flash } = usePage().props;
  const user = auth?.user;

  // Modals state
  const [submitOpen, setSubmitOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [step, setStep] = useState(0);

  // Submit Form state
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
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

  // Track Form state
  const trackForm = useForm({
    code: ''
  });

  // Watch flash messages to auto-close modals
  useEffect(() => {
    if (flash?.info || flash?.warning) { // store redirects to show-reference which we don't have here since it redirects away, but just in case
       // Actually store redirects to grievances.show-reference so modal closing doesn't matter much.
    }
  }, [flash]);

  function handleSubmit(e) {
    e.preventDefault();
    post(route('grievances.store'), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => { 
        reset(); 
        setStep(0);
        setSubmitOpen(false);
      },
    });
  }

  function handleTrackSubmit(e) {
    e.preventDefault();
    trackForm.get(route('grievances.track'), {
      preserveState: true,
      onSuccess: () => setTrackOpen(false)
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

  const steps = ['issue_details', 'description', 'review'];

  function canProceed() {
    if (step === 0) return data.institution_id && data.category_id && data.priority && data.title;
    if (step === 1) return data.description && data.description.length >= 10;
    return true;
  }

  const content = (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Head title={`${t('nav.feed')}`} />

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden flex flex-col gap-3">
        <button
          onClick={() => setTrackOpen(true)}
          className="w-12 h-12 bg-white text-gray-700 border border-gray-300 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">search</span>
        </button>
        <button
          onClick={() => setSubmitOpen(true)}
          className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-all hover:scale-110 active:scale-95"
        >
          <span className="material-symbols-outlined text-[24px]">edit_square</span>
        </button>
      </div>

      {/* Premium Header - Clean White */}
      <div className="bg-white border-b border-gray-200 -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 mb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {isNp ? 'उजुरी फीड' : 'Community Grievances'}
              </h1>
              <p className="text-sm text-gray-500 mt-1 max-w-xl">
                {isNp ? 'विद्यार्थीहरूले रिपोर्ट गरेका उजुरीहरू' : 'Browse and track issues reported by students. Transparency and quick resolutions.'}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setTrackOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-gray-400">search</span>
                Track Grievance
              </button>
              <button
                onClick={() => setSubmitOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Submit Grievance
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {grievances.data.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-16 text-center">
            <div className="w-16 h-16 bg-gray-50 mx-auto rounded-xl flex items-center justify-center mb-4 border border-gray-100 text-gray-400">
                <span className="material-symbols-outlined text-3xl">inbox</span>
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              {isNp ? 'कुनै उजुरी भेटिएन' : 'No grievances reported yet.'}
            </h3>
            <p className="text-xs text-gray-500">
                Be the first to report an issue or concern.
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

      {/* TRACK MODAL */}
      <Modal show={trackOpen} onClose={() => setTrackOpen(false)} maxWidth="md">
        <div className="p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Track Grievance</h2>
                <button onClick={() => setTrackOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            
            <form onSubmit={handleTrackSubmit}>
                <div>
                    <InputLabel htmlFor="code" value="Tracking Code" />
                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        value={trackForm.data.code}
                        className="mt-1 block w-full uppercase"
                        placeholder="e.g. GRV-X8H2B1"
                        onChange={(e) => trackForm.setData('code', e.target.value.toUpperCase())}
                        required
                    />
                    <InputError message={trackForm.errors.code} className="mt-2" />
                </div>
                
                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setTrackOpen(false)}
                        className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={trackForm.processing}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {trackForm.processing ? 'Tracking...' : 'Track Issue'}
                    </button>
                </div>
            </form>
        </div>
      </Modal>

      {/* SUBMIT MODAL */}
      <Modal show={submitOpen} onClose={() => setSubmitOpen(false)} maxWidth="2xl">
        <div className="p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">{t('submit.title')}</h2>
                <button onClick={() => setSubmitOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full -z-10"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-red-600 transition-all duration-300 -z-10 rounded-full" 
                     style={{ width: `${(step / 2) * 100}%` }}></div>
                
                {steps.map((s, i) => (
                  <div key={s} className="flex flex-col items-center gap-2 bg-white px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      i <= step ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <InputLabel value={`${t('submit.institution')} *`} />
                      <select
                        value={data.institution_id}
                        onChange={e => setData('institution_id', e.target.value)}
                        className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm text-sm"
                        required
                      >
                        <option value="">{t('submit.select_institution')}</option>
                        {institutions.map(inst => (
                          <option key={inst.id} value={inst.id}>{inst.name}</option>
                        ))}
                      </select>
                      <InputError message={errors.institution_id} className="mt-2" />
                    </div>
                    <div>
                      <InputLabel value={`${t('submit.category')} *`} />
                      <select
                        value={data.category_id}
                        onChange={e => setData('category_id', e.target.value)}
                        className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm text-sm"
                        required
                      >
                        <option value="">{t('submit.select_category')}</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      <InputError message={errors.category_id} className="mt-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <InputLabel value={t('submit.semester')} />
                      <select
                        value={data.semester_id}
                        onChange={e => setData('semester_id', e.target.value)}
                        className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm text-sm"
                      >
                        <option value="">{t('submit.optional')}</option>
                        {semesters.map(sem => (
                          <option key={sem.id} value={sem.id}>{sem.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <InputLabel value={t('submit.subject')} />
                      <select
                        value={data.subject_id}
                        onChange={e => setData('subject_id', e.target.value)}
                        className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm text-sm"
                      >
                        <option value="">{t('submit.optional')}</option>
                        {subjects.map(sub => (
                          <option key={sub.id} value={sub.id}>{sub.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <InputLabel value={`${t('submit.title')} *`} />
                    <TextInput
                      type="text"
                      value={data.title}
                      onChange={e => setData('title', e.target.value)}
                      className="mt-1 block w-full"
                      placeholder={t('submit.title_placeholder')}
                      required
                    />
                    <InputError message={errors.title} className="mt-2" />
                  </div>

                  <div>
                    <InputLabel value={t('submit.priority.label')} />
                    <div className="mt-2 flex gap-4">
                      {Object.entries(priorities).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="priority"
                            value={key}
                            checked={data.priority === key}
                            onChange={e => setData('priority', e.target.value)}
                            className="text-red-600 border-gray-300 focus:ring-red-500"
                          />
                          <span className="text-sm font-medium text-gray-700">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <InputLabel value={`${t('submit.description')} *`} />
                    <textarea
                      value={data.description}
                      onChange={e => setData('description', e.target.value)}
                      rows="5"
                      className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm text-sm resize-y"
                      placeholder={t('submit.description_placeholder')}
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">{data.description.length} / 10 {t('submit.min_chars')}</p>
                    <InputError message={errors.description} className="mt-2" />
                  </div>

                  <div>
                    <InputLabel value={t('submit.evidence.label')} />
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer relative overflow-hidden">
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <span className="material-symbols-outlined text-gray-400 mb-1">add_photo_alternate</span>
                        <p className="text-xs font-medium text-gray-600">{t('submit.evidence.photo')}</p>
                        {data.photo && <p className="text-xs text-red-600 font-bold mt-1 truncate">{data.photo.name}</p>}
                      </div>
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer relative overflow-hidden">
                        <input type="file" accept="video/*" onChange={handleVideoChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <span className="material-symbols-outlined text-gray-400 mb-1">video_file</span>
                        <p className="text-xs font-medium text-gray-600">{t('submit.evidence.video')}</p>
                        {data.video && <p className="text-xs text-red-600 font-bold mt-1 truncate">{data.video.name}</p>}
                      </div>
                    </div>
                    <InputError message={errors.photo} className="mt-2" />
                    <InputError message={errors.video} className="mt-2" />
                  </div>

                  <div className="absolute opacity-0 pointer-events-none" tabIndex={-1} aria-hidden="true">
                    <input type="text" name="website" autoComplete="off" value={data.website} onChange={e => setData('website', e.target.value)} tabIndex={-1} />
                  </div>

                  {!user ? (
                    <div className="bg-blue-50 rounded-md p-3 flex items-start gap-2">
                      <span className="material-symbols-outlined text-blue-500 text-[18px]">info</span>
                      <p className="text-xs text-blue-800">{t('submit.anonymous_note')}</p>
                    </div>
                  ) : (
                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-md border border-gray-200">
                      <input
                        type="checkbox"
                        checked={data.is_anonymous}
                        onChange={e => setData('is_anonymous', e.target.checked)}
                        className="rounded border-gray-300 text-red-600 shadow-sm focus:ring-red-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{t('submit.anonymous')}</span>
                        <p className="text-xs text-gray-500">Your identity is hidden from peers.</p>
                      </div>
                    </label>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-sm">
                    <div className="mb-3"><span className="font-semibold text-gray-500 block text-xs">Title</span> <span className="font-medium text-gray-900">{data.title}</span></div>
                    <div className="mb-3"><span className="font-semibold text-gray-500 block text-xs">Priority</span> <span className="font-medium text-red-600">{priorities[data.priority]}</span></div>
                    <div className="mb-3"><span className="font-semibold text-gray-500 block text-xs">Description</span> <span className="text-gray-700">{data.description}</span></div>
                    <div><span className="font-semibold text-gray-500 block text-xs">Anonymous Mode</span> <span className="font-medium text-gray-900">{data.is_anonymous ? 'Yes' : 'No'}</span></div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                {step > 0 ? (
                  <button type="button" onClick={() => setStep(step - 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Back
                  </button>
                ) : <div />}

                {step < 2 ? (
                  <button type="button" onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50">
                    Next Step
                  </button>
                ) : (
                  <button type="submit" disabled={processing}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50">
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    {processing ? t('submit.submitting') : t('submit.submit_btn')}
                  </button>
                )}
              </div>
            </form>
        </div>
      </Modal>

    </div>
  );

  // If user is authenticated, wrap with AuthenticatedLayout so it feels like part of the Student/Teacher Panel
  if (auth?.user) {
      return <AuthenticatedLayout header={isNp ? 'उजुरी फीड' : 'Grievances'}>{content}</AuthenticatedLayout>;
  }

  // Otherwise, just return the content (for guests)
  return content;
}
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

  const content = (
    <div className="min-h-screen bg-surface-container-lowest pb-12 pt-6">
      <Head title={t('submit.title')} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mt-10 -mr-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold mb-2 tracking-tight">{t('submit.title')}</h1>
            <p className="text-primary-50 font-medium text-lg">{t('submit.subtitle')}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-container rounded-full -z-10"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-300 -z-10 rounded-full" 
                 style={{ width: `${(step / 2) * 100}%` }}></div>
            
            {steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-2 bg-surface-container-lowest px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  i <= step ? 'bg-primary text-white shadow-md' : 'bg-surface-container-high text-outline'
                }`}>
                  {i + 1}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider hidden sm:block ${i <= step ? 'text-primary' : 'text-outline'}`}>
                  {t(`submit.steps.${s}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">
                    {t('submit.institution')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.institution_id}
                    onChange={e => setData('institution_id', e.target.value)}
                    className="w-full bg-surface-container-lowest border border-surface-container-low text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    required
                  >
                    <option value="">{t('submit.select_institution')}</option>
                    {institutions.map(inst => (
                      <option key={inst.id} value={inst.id}>{inst.name}</option>
                    ))}
                  </select>
                  {errors.institution_id && <p className="mt-1 text-sm text-red-600">{errors.institution_id}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">
                    {t('submit.category')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.category_id}
                    onChange={e => setData('category_id', e.target.value)}
                    className="w-full bg-surface-container-lowest border border-surface-container-low text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    required
                  >
                    <option value="">{t('submit.select_category')}</option>
                    {filteredCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">{t('submit.semester')}</label>
                  <select
                    value={data.semester_id}
                    onChange={e => setData('semester_id', e.target.value)}
                    className="w-full bg-surface-container-lowest border border-surface-container-low text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  >
                    <option value="">{t('submit.optional')}</option>
                    {semesters.map(sem => (
                      <option key={sem.id} value={sem.id}>{sem.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">{t('submit.subject')}</label>
                  <select
                    value={data.subject_id}
                    onChange={e => setData('subject_id', e.target.value)}
                    className="w-full bg-surface-container-lowest border border-surface-container-low text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  >
                    <option value="">{t('submit.optional')}</option>
                    {subjects.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">
                  {t('submit.title')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={e => setData('title', e.target.value)}
                  className="w-full bg-surface-container-lowest border border-surface-container-low text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  placeholder={t('submit.title_placeholder')}
                  required
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-3 uppercase tracking-wide">{t('submit.priority.label')}</label>
                <div className="flex gap-4">
                  {Object.entries(priorities).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="priority"
                        value={key}
                        checked={data.priority === key}
                        onChange={e => setData('priority', e.target.value)}
                        className="w-5 h-5 text-primary border-gray-300 focus:ring-primary cursor-pointer"
                      />
                      <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{label}</span>
                    </label>
                  ))}
                </div>
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

              <div className="absolute opacity-0 pointer-events-none" tabIndex={-1} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  value={data.website}
                  onChange={e => setData('website', e.target.value)}
                  tabIndex={-1}
                />
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
    </div>
  );

  if (user) {
      return <AuthenticatedLayout header={t('submit.title')}>{content}</AuthenticatedLayout>;
  }

  return content;
}
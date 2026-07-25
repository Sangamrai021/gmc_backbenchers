import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import QuestionCard from '@/Components/QuestionCard';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ discussions, filters, subjects }) {
    const { flash } = usePage().props;
    const [askOpen, setAskOpen] = useState(false);
    const [trackOpen, setTrackOpen] = useState(false);
    const [trackToken, setTrackToken] = useState('');
    const [trackError, setTrackError] = useState('');
    const [tracking, setTracking] = useState(false);
    
    // Modal Form State
    const [form, setForm] = useState({
        discussionable_type: 'subject',
        discussionable_id: subjects?.length > 0 ? subjects[0].id : '',
        title: '',
        body: '',
        category: '',
        is_anonymous: false,
    });
    
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        router.post(route('questions.store'), form, {
            onSuccess: () => {
                setAskOpen(false);
                setProcessing(false);
                setForm({ ...form, title: '', body: '', is_anonymous: false });
            },
            onError: () => setProcessing(false)
        });
    };

    const handleTrackSubmit = (e) => {
        e.preventDefault();
        setTracking(true);
        setTrackError('');
        router.post(route('questions.track'), { token: trackToken }, {
            preserveState: true,
            onError: (errors) => {
                setTrackError(errors.token || 'No question found with that tracking token.');
                setTracking(false);
            },
            onFinish: () => setTracking(false)
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Community Q&A" />

            {/* Mobile Ask Button (Floating) */}
            <div className="fixed bottom-4 right-4 z-40 md:hidden">
                <button
                    onClick={() => setAskOpen(true)}
                    className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 active:scale-95"
                    title="Ask a Question"
                >
                    <span className="material-symbols-outlined text-[24px]">edit_square</span>
                </button>
            </div>

            {/* Premium Header */}
            <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-950 -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mb-8 shadow-inner">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                Anonymous Q&A
                            </h1>
                            <p className="text-sm sm:text-base text-blue-200/80 mt-1 max-w-xl">
                                Explore doubts, share knowledge, and help students learn without the fear of judgement.
                            </p>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={() => setTrackOpen(true)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                <span className="material-symbols-outlined text-[20px]">search</span>
                                Track Question
                            </button>
                            <button
                                onClick={() => setAskOpen(true)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-900 text-sm font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                <span className="material-symbols-outlined text-[20px]">edit_square</span>
                                Ask a Question
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Flash Messages */}
            <div className="max-w-5xl mx-auto px-4 sm:px-0 mb-6">
                {flash?.tracking_token && (
                    <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-green-600">check_circle</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-base">Your question has been posted successfully!</h3>
                            <p className="text-sm mt-1">If you posted anonymously, save this tracking token to check the status later:</p>
                            <div className="mt-3 flex items-center gap-3">
                                <span className="bg-white px-4 py-2 rounded-xl border border-green-200 font-mono font-bold tracking-widest text-lg shadow-inner">
                                    {flash.tracking_token}
                                </span>
                                <button 
                                    onClick={() => navigator.clipboard.writeText(flash.tracking_token)}
                                    className="text-sm font-medium text-green-700 hover:text-green-900 bg-green-100/50 hover:bg-green-200 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    Copy Token
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {flash?.error && !trackOpen && (
                     <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 shadow-sm text-sm font-medium">
                        {flash.error}
                     </div>
                )}
            </div>

            {/* Feed Grid */}
            <div className="max-w-5xl mx-auto pb-12">
                
                {/* Filters Tab Bar */}
                <div className="flex gap-2 pb-6 overflow-x-auto custom-scrollbar">
                    <Link href={route('questions.index')} className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors border ${!filters.status ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                        All Questions
                    </Link>
                    <Link href={route('questions.index', { status: 'open' })} className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors border ${filters.status === 'open' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                        Unanswered
                    </Link>
                    <Link href={route('questions.index', { status: 'resolved' })} className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors border ${filters.status === 'resolved' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                        Resolved
                    </Link>
                </div>

                {discussions.data.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                            <span className="material-symbols-outlined text-4xl text-gray-400">forum</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No questions found</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            It looks quiet here. Be the first to start a meaningful discussion.
                        </p>
                        <button
                            onClick={() => setAskOpen(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Start a Discussion
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {discussions.data.map(discussion => (
                                <QuestionCard key={discussion.id} discussion={discussion} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {discussions.links && discussions.links.length > 3 && (
                            <div className="mt-8 flex items-center justify-center gap-2">
                                {discussions.links.map((link, i) => {
                                    if (!link.url) {
                                        return (
                                            <span key={i} className="px-4 py-2 text-sm text-gray-400 font-medium rounded-xl border border-transparent" dangerouslySetInnerHTML={{ __html: link.label }} />
                                        );
                                    }
                                    return (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            preserveScroll
                                            className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors border ${
                                                link.active
                                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Ask Question Modal */}
            {askOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div 
                        className="absolute inset-0" 
                        onClick={() => setAskOpen(false)}
                    ></div>
                    <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-full overflow-hidden animate-in zoom-in-95 duration-200">
                        
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined">live_help</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Ask a Question</h3>
                                    <p className="text-xs text-gray-500 font-medium">Get help from the community</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setAskOpen(false)}
                                className="text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-100 p-2 rounded-full transition-colors border border-gray-100 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form id="ask-question-form" onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Subject / Course</label>
                                        <select
                                            value={form.discussionable_id}
                                            onChange={(e) => setForm({ ...form, discussionable_id: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-sm"
                                            required
                                        >
                                            {subjects?.length === 0 && <option value="">No subjects found...</option>}
                                            {subjects?.map((subject) => (
                                                <option key={subject.id} value={subject.id}>
                                                    {subject.name} {subject.semester ? `(${subject.semester.name})` : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Category <span className="font-normal text-gray-400">(Optional)</span></label>
                                        <select
                                            value={form.category}
                                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-sm"
                                        >
                                            <option value="">Select category...</option>
                                            <option value="conceptual">Conceptual Problem</option>
                                            <option value="assignment">Assignment / Lab</option>
                                            <option value="exam">Exam Preparation</option>
                                            <option value="career">Career / General</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Question Title</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-sm placeholder:text-gray-400"
                                        placeholder="e.g. How do polymorphic relations work in Laravel?"
                                        required
                                        maxLength={255}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Details & Context</label>
                                    <textarea
                                        value={form.body}
                                        onChange={(e) => setForm({ ...form, body: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-sm placeholder:text-gray-400 resize-y"
                                        rows={5}
                                        placeholder="Explain your doubt in detail. What have you tried? Where are you stuck?"
                                        required
                                    />
                                </div>

                                {/* Anonymous Toggle */}
                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-bold text-indigo-900">Post Anonymously</h4>
                                        <p className="text-xs text-indigo-700 mt-0.5">Your identity will be hidden from other students.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, is_anonymous: !form.is_anonymous })}
                                        className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${form.is_anonymous ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                        role="switch"
                                        aria-checked={form.is_anonymous}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out flex items-center justify-center ${form.is_anonymous ? 'translate-x-5' : 'translate-x-0'}`}
                                        >
                                            {form.is_anonymous && <span className="material-symbols-outlined text-[12px] text-indigo-600">visibility_off</span>}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 rounded-b-3xl">
                            <button
                                type="button"
                                onClick={() => setAskOpen(false)}
                                className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="ask-question-form"
                                disabled={processing}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                                        Posting...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                        Post Question
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Track Question Modal */}
            {trackOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div 
                        className="absolute inset-0" 
                        onClick={() => setTrackOpen(false)}
                    ></div>
                    <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Track Question</h3>
                                    <p className="text-xs text-gray-500 font-medium">Look up an anonymous post</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setTrackOpen(false)}
                                className="text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-100 p-2 rounded-full transition-colors border border-gray-100 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <form id="track-question-form" onSubmit={handleTrackSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Tracking Token</label>
                                    <input
                                        type="text"
                                        value={trackToken}
                                        onChange={(e) => setTrackToken(e.target.value.toUpperCase())}
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono tracking-wider text-sm placeholder:text-gray-400 placeholder:font-sans placeholder:tracking-normal"
                                        placeholder="e.g. QA-ABCDEF"
                                        required
                                    />
                                </div>
                                
                                {trackError && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                                        <p className="text-red-700 text-xs font-medium">{trackError}</p>
                                    </div>
                                )}
                                {(flash?.error && !trackError) && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                                        <p className="text-red-700 text-xs font-medium">{flash.error}</p>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 rounded-b-3xl">
                            <button
                                type="button"
                                onClick={() => setTrackOpen(false)}
                                className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="track-question-form"
                                disabled={tracking || !trackToken}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {tracking ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        Lookup
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d1d5db; }
            `}} />
        </AuthenticatedLayout>
    );
}

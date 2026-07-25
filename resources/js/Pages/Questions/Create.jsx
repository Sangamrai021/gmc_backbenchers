import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ subjects }) {
    const { auth } = usePage().props;
    const [form, setForm] = useState({
        discussionable_type: 'subject',
        discussionable_id: subjects.length > 0 ? subjects[0].id : '',
        title: '',
        body: '',
        category: '',
        is_anonymous: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('questions.store'), form);
    };

    return (
        <AuthenticatedLayout header="Ask a Question">
            <Head title="Ask a Question" />

            <div className="max-w-3xl mx-auto pb-12 mt-4 space-y-4">
                
                {/* Header Section */}
                <div className="bg-surface-container-lowest border border-surface-container-low rounded-2xl p-5 shadow-sm">
                    <h2 className="text-xl font-bold text-on-surface mb-1">Start a Discussion</h2>
                    <p className="text-on-surface-variant text-sm font-medium">Stuck on a problem? Ask clearly and get help from peers or teachers.</p>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">Subject</label>
                                <div className="relative">
                                    <select
                                        value={form.discussionable_id}
                                        onChange={(e) => setForm({ ...form, discussionable_id: e.target.value })}
                                        className="w-full bg-surface-container-lowest border border-surface-container-low text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        required
                                    >
                                        <option value="">Select a subject...</option>
                                        {subjects.map((subject) => (
                                            <option key={subject.id} value={subject.id}>
                                                {subject.name} {subject.semester ? `(${subject.semester.name})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">Category <span className="text-outline font-normal">(Optional)</span></label>
                                <div className="relative">
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full bg-surface-container-lowest border border-surface-container-low text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    >
                                        <option value="">Select category...</option>
                                        <option value="conceptual">Conceptual Problem</option>
                                        <option value="assignment">Assignment Problem</option>
                                        <option value="exam">Exam Preparation</option>
                                        <option value="career">Career Question</option>
                                        <option value="technical">Technical Issue</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">Question Title</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full bg-surface-container-lowest border border-surface-container-low text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-outline"
                                placeholder="e.g. How does recursion work in Java?"
                                required
                                maxLength={255}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">Details & Context</label>
                            <textarea
                                value={form.body}
                                onChange={(e) => setForm({ ...form, body: e.target.value })}
                                className="w-full bg-surface-container-lowest border border-surface-container-low text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-outline resize-y"
                                rows={6}
                                placeholder="Explain your doubt in detail. What have you tried? Where are you stuck?"
                                required
                            />
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-surface-container-low gap-6">
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <div
                                    onClick={() => setForm({ ...form, is_anonymous: !form.is_anonymous })}
                                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${
                                        form.is_anonymous ? 'bg-primary' : 'bg-surface-container-high'
                                    }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out flex items-center justify-center ${
                                            form.is_anonymous ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                    >
                                        {form.is_anonymous && <span className="material-symbols-outlined text-[14px] text-primary">visibility_off</span>}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-on-surface">Ask Anonymously</span>
                                    <p className="text-xs text-on-surface-variant mt-0.5 font-medium">Your identity is hidden from peers.</p>
                                </div>
                            </label>

                            <div className="flex gap-4 w-full md:w-auto">
                                <Link
                                    href={route('questions.index')}
                                    className="px-6 py-3 text-sm font-bold bg-surface-container-low text-on-surface-variant rounded-xl hover:bg-surface-container hover:text-on-surface transition-colors flex-1 text-center"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="px-8 py-3 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all flex-1 md:flex-none flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                    Post Question
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

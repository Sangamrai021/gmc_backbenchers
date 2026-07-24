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
        is_anonymous: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('questions.store'), form);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Ask a Question</h2>
            }
        >
            <Head title="Ask a Question" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select
                                    value={form.discussionable_id}
                                    onChange={(e) => setForm({ ...form, discussionable_id: e.target.value })}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                >
                                    {subjects.map((subject) => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.name} ({subject.semester?.name})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select category (optional)</option>
                                    <option value="conceptual">Conceptual Problem</option>
                                    <option value="assignment">Assignment Problem</option>
                                    <option value="exam">Exam Preparation</option>
                                    <option value="career">Career Question</option>
                                    <option value="technical">Technical Issue</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Summarize your question in one line"
                                    required
                                    maxLength={255}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                                <textarea
                                    value={form.body}
                                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    rows={6}
                                    placeholder="Explain your question in detail. Include what you've tried and what you're stuck on."
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <div
                                        onClick={() => setForm({ ...form, is_anonymous: !form.is_anonymous })}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${
                                            form.is_anonymous ? 'bg-indigo-600' : 'bg-gray-300'
                                        }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                                                form.is_anonymous ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Post anonymously</span>
                                        <p className="text-xs text-gray-500">Your name will be hidden. Only admins can see who posted.</p>
                                    </div>
                                </label>

                                <div className="flex gap-3">
                                    <Link
                                        href={route('questions.index')}
                                        className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Post Question
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

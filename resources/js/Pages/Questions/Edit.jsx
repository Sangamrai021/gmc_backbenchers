import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ discussion }) {
    const [form, setForm] = useState({
        title: discussion.title,
        body: discussion.body,
        category: discussion.category || '',
        is_anonymous: discussion.is_anonymous,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route('questions.update', discussion.id), form);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Question</h2>
            }
        >
            <Head title="Edit Question" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">No category</option>
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
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                                <textarea
                                    value={form.body}
                                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    rows={6}
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
                                    <span className="text-sm font-medium text-gray-700">Post anonymously</span>
                                </label>

                                <div className="flex gap-3">
                                    <Link
                                        href={route('questions.show', discussion.id)}
                                        className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Save Changes
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

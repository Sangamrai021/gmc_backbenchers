import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateSubject({ semesters }) {
    const [form, setForm] = useState({
        semester_id: semesters.length > 0 ? semesters[0].id : '',
        name: '',
        code: '',
        description: '',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.subjects.store'), form);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Subject</h2>}
        >
            <Head title="Create Subject" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                                <select value={form.semester_id} onChange={(e) => setForm({ ...form, semester_id: e.target.value })}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                    required>
                                    {semesters.map((sem) => (
                                        <option key={sem.id} value={sem.id}>{sem.name} ({sem.institution?.name})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                    required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                                <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 font-mono" />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="is_active" checked={form.is_active}
                                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active</label>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t">
                                <Link href={route('admin.subjects.index')} className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Cancel</Link>
                                <button type="submit" className="px-6 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

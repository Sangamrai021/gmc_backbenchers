import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function SubjectIndex({ subjects }) {
    const handleDelete = (subject) => {
        if (confirm(`Delete ${subject.name}?`)) {
            router.delete(route('admin.subjects.destroy', subject.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Subjects</h2>
                    <Link
                        href={route('admin.subjects.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700"
                    >
                        Create Subject
                    </Link>
                </div>
            }
        >
            <Head title="Subjects" />

            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    {subjects.data.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <p className="text-gray-500">No subjects yet.</p>
                            <Link href={route('admin.subjects.create')} className="text-indigo-600 hover:text-indigo-800 text-sm mt-2 inline-block">
                                Create the first subject
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teachers</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {subjects.data.map((subject) => (
                                        <tr key={subject.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{subject.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 font-mono">{subject.code}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{subject.semester?.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{subject.teachers_count || 0}</td>
                                            <td className="px-6 py-4 text-right text-sm">
                                                <Link href={route('admin.subjects.edit', subject.id)} className="text-indigo-600 hover:text-indigo-800 mr-3">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(subject)} className="text-red-600 hover:text-red-800">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

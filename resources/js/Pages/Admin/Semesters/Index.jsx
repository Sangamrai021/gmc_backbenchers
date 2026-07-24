import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function SemesterIndex({ semesters }) {
    const handleDelete = (semester) => {
        if (confirm(`Delete ${semester.name}?`)) {
            router.delete(route('admin.semesters.destroy', semester.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Semesters</h2>
                    <Link
                        href={route('admin.semesters.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700"
                    >
                        Create Semester
                    </Link>
                </div>
            }
        >
            <Head title="Semesters" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    {semesters.data.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <p className="text-gray-500">No semesters yet.</p>
                            <Link href={route('admin.semesters.create')} className="text-indigo-600 hover:text-indigo-800 text-sm mt-2 inline-block">
                                Create the first semester
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invite Code</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Institution</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {semesters.data.map((semester) => (
                                        <tr key={semester.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{semester.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 font-mono">{semester.invite_code}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{semester.institution?.name}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-2 py-1 text-xs rounded-full ${semester.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {semester.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm">
                                                <Link href={route('admin.semesters.edit', semester.id)} className="text-indigo-600 hover:text-indigo-800 mr-3">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(semester)} className="text-red-600 hover:text-red-800">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {semesters.total > semesters.per_page && (
                        <div className="mt-6 flex justify-center gap-2">
                            {semesters.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 text-sm rounded ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

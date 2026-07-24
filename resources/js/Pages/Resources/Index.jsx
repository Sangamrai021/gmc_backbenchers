import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ resources }) {
    const { user } = usePage().props.auth;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Resources</h2>}
        >
            <Head title="Resources" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        {(user.role === 'teacher' || user.role === 'institution_admin' || user.role === 'super_admin') && (
                            <Link href={route('resources.create')} className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">
                                Create Resource
                            </Link>
                        )}
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {resources.data.length === 0 ? (
                                <p className="text-gray-500">No resources found.</p>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {resources.data.map(resource => (
                                        <li key={resource.id} className="py-4 flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{resource.title}</h3>
                                                <p className="text-sm text-gray-500">{resource.subject.name} | {resource.type}</p>
                                                {resource.description && <p className="text-gray-700 mt-1">{resource.description}</p>}
                                                {resource.file_url && (
                                                    <a href={resource.file_url} target="_blank" rel="noreferrer" className="text-indigo-600 text-sm hover:underline mt-2 inline-block">
                                                        View Attachment
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex space-x-2">
                                                {(user.role === 'super_admin' || user.role === 'institution_admin' || user.id === resource.teacher_id) && (
                                                    <>
                                                        <Link href={route('resources.edit', resource.id)} className="text-blue-600 hover:underline">Edit</Link>
                                                        <Link href={route('resources.destroy', resource.id)} method="delete" as="button" className="text-red-600 hover:underline">Delete</Link>
                                                    </>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

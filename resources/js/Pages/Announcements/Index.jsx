import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ announcements }) {
    const { user } = usePage().props.auth;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Announcements</h2>}
        >
            <Head title="Announcements" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        {(user.role === 'teacher' || user.role === 'institution_admin' || user.role === 'super_admin') && (
                            <Link href={route('announcements.create')} className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">
                                Post Announcement
                            </Link>
                        )}
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {announcements.data.length === 0 ? (
                                <p className="text-gray-500">No announcements found.</p>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {announcements.data.map(announcement => (
                                        <li key={announcement.id} className="py-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">{announcement.title}</h3>
                                                    <p className="text-sm text-gray-500">Subject: {announcement.subject.name} | Posted by: {announcement.user.name}</p>
                                                    <div className="text-gray-700 mt-2 whitespace-pre-wrap">{announcement.content}</div>
                                                </div>
                                                <div className="flex space-x-2">
                                                    {(user.role === 'super_admin' || user.role === 'institution_admin' || user.id === announcement.user_id) && (
                                                        <>
                                                            <Link href={route('announcements.edit', announcement.id)} className="text-blue-600 hover:underline">Edit</Link>
                                                            <Link href={route('announcements.destroy', announcement.id)} method="delete" as="button" className="text-red-600 hover:underline">Delete</Link>
                                                        </>
                                                    )}
                                                </div>
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

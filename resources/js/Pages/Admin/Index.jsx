import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminIndex({ stats, institution }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {institution ? `${institution.name} - Admin` : 'Super Admin'}
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                            <p className="text-3xl font-bold text-indigo-600">{stats.semesters}</p>
                            <p className="text-sm text-gray-500 mt-1">Semesters</p>
                            <Link href={route('admin.semesters.index')} className="text-xs text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
                                Manage &rarr;
                            </Link>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                            <p className="text-3xl font-bold text-indigo-600">{stats.subjects}</p>
                            <p className="text-sm text-gray-500 mt-1">Subjects</p>
                            <Link href={route('admin.subjects.index')} className="text-xs text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
                                Manage &rarr;
                            </Link>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                            <p className="text-3xl font-bold text-indigo-600">{stats.teachers}</p>
                            <p className="text-sm text-gray-500 mt-1">Teachers</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                            <div className="space-y-2">
                                <Link href={route('admin.semesters.create')} className="block text-sm text-indigo-600 hover:text-indigo-800">
                                    + Create New Semester
                                </Link>
                                <Link href={route('admin.subjects.create')} className="block text-sm text-indigo-600 hover:text-indigo-800">
                                    + Create New Subject
                                </Link>
                                <Link href={route('admin.enrollments.index')} className="block text-sm text-indigo-600 hover:text-indigo-800">
                                    View Enrollments
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Overview</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p>Students: {stats.students}</p>
                                <p>Institutions: {stats.institutions}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-3xl font-bold text-indigo-600">{stats.questions}</div>
                            <div className="text-sm text-gray-500 mt-1">Questions</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-3xl font-bold text-green-600">{stats.answers}</div>
                            <div className="text-sm text-gray-500 mt-1">Answers</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-3xl font-bold text-blue-600">{stats.subjects}</div>
                            <div className="text-sm text-gray-500 mt-1">Subjects</div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link
                                    href={route('questions.index')}
                                    className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors"
                                >
                                    <div className="font-medium text-indigo-700">Browse Questions</div>
                                    <div className="text-sm text-indigo-500 mt-1">View and answer questions in your subjects</div>
                                </Link>
                                <Link
                                    href={route('questions.create')}
                                    className="p-4 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
                                >
                                    <div className="font-medium text-green-700">Ask a Question</div>
                                    <div className="text-sm text-green-500 mt-1">Post anonymously or publicly</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    // Check if stats exist, fallback if navigated directly without them
    const displayStats = stats || { questions: 0, answers: 0, subjects: 0 };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Student Dashboard</h2>
            }
        >
            <Head title="Student Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-lg shadow-indigo-500/20">
                        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
                        <p className="text-indigo-100 opacity-90 max-w-2xl">
                            Ready to learn? Here's an overview of your activity and quick links to get started.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100">
                            <div className="text-3xl font-bold text-indigo-600">{displayStats.subjects}</div>
                            <div className="text-sm text-gray-500 mt-1 font-medium">Enrolled Subjects</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100">
                            <div className="text-3xl font-bold text-purple-600">{displayStats.questions}</div>
                            <div className="text-sm text-gray-500 mt-1 font-medium">Questions Asked</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100">
                            <div className="text-3xl font-bold text-green-600">{displayStats.answers}</div>
                            <div className="text-sm text-gray-500 mt-1 font-medium">Answers Provided</div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Actions</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link
                                    href={route('questions.index')}
                                    className="p-5 bg-indigo-50/50 rounded-xl border border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-200 transition-colors">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="font-semibold text-indigo-900">Browse Feed</div>
                                    </div>
                                    <div className="text-sm text-indigo-600/70">View discussions and stay updated with your classes.</div>
                                </Link>
                                
                                <Link
                                    href={route('questions.create')}
                                    className="p-5 bg-purple-50/50 rounded-xl border border-purple-100 hover:bg-purple-50 hover:border-purple-200 transition-all group"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-200 transition-colors">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="font-semibold text-purple-900">Ask a Question</div>
                                    </div>
                                    <div className="text-sm text-purple-600/70">Need help? Ask a question to your peers or teachers.</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

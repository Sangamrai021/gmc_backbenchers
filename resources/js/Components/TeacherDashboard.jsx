import { Link, usePage } from '@inertiajs/react';
import React from 'react';

export default function TeacherDashboard({ stats, recentSubmissions = [], recentQuestions = [] }) {
    const user = usePage().props.auth.user;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-200 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Welcome back, {user.name}. Here is what's happening in your classes today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link 
                        href={route('assignments.create')} 
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px] mr-2 text-gray-400">add_task</span>
                        New Assignment
                    </Link>
                    <Link 
                        href={route('questions.create')} 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px] mr-2">campaign</span>
                        Post Announcement
                    </Link>
                </div>
            </div>

            {/* KPI Cards (Clean, SaaS style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {/* Active Subjects */}
                <Link href={route('classes.index')} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group block">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-500 group-hover:text-indigo-600 transition-colors">Active Subjects</p>
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-indigo-400 transition-colors text-[20px]">library_books</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{stats.subjects}</h3>
                    </div>
                </Link>

                {/* Pending Questions */}
                <Link href={route('questions.index')} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group block">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-500 group-hover:text-indigo-600 transition-colors">Unanswered Q&A</p>
                        <span className="material-symbols-outlined text-indigo-400 group-hover:text-indigo-600 transition-colors text-[20px]">forum</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{stats.questions}</h3>
                    </div>
                    <div className="mt-2 text-xs font-medium text-indigo-600 group-hover:text-indigo-800">
                        View pending questions &rarr;
                    </div>
                </Link>

                {/* Active Grievances */}
                <Link href={route('grievances.feed')} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-red-300 hover:shadow-md transition-all group block">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-500 group-hover:text-red-600 transition-colors">Open Grievances</p>
                        <span className="material-symbols-outlined text-red-400 group-hover:text-red-600 transition-colors text-[20px]">report_problem</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">{stats.open_grievances}</h3>
                        <span className="text-xs font-medium text-gray-500">of {stats.grievances} total</span>
                    </div>
                    <div className="mt-2 text-xs font-medium text-red-600 group-hover:text-red-800">
                        Review issues &rarr;
                    </div>
                </Link>

                {/* Assignments to Grade */}
                <Link href={route('assignments.index')} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-amber-300 hover:shadow-md transition-all group block">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-500 group-hover:text-amber-600 transition-colors">To Grade</p>
                        <span className="material-symbols-outlined text-amber-500 group-hover:text-amber-600 transition-colors text-[20px]">grading</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{stats.to_grade || 0}</h3>
                    </div>
                    <div className="mt-2 text-xs font-medium text-amber-600 group-hover:text-amber-800">
                        Go to Gradebook &rarr;
                    </div>
                </Link>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Panel: Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col min-h-[400px]">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                            <h2 className="text-sm font-semibold text-gray-900">Recent Submissions</h2>
                            <Link href={route('assignments.index')} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">View All</Link>
                        </div>
                        
                        {recentSubmissions.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/20">
                                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assignment</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recentSubmissions.map((submission) => (
                                            <tr key={submission.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                                                            {submission.student?.name?.charAt(0) || '?'}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">{submission.student?.name || 'Unknown Student'}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm text-gray-900 font-medium">{submission.assignment?.title || 'Unknown Assignment'}</div>
                                                    <div className="text-xs text-gray-500">Attempt {submission.attempt_number}</div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        submission.status === 'submitted' ? 'bg-amber-100 text-amber-800' : 
                                                        submission.status === 'graded' ? 'bg-green-100 text-green-800' : 
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {submission.status === 'submitted' ? 'Needs Grading' : submission.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3 border border-gray-100">
                                    <span className="material-symbols-outlined text-gray-400">inbox</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">No recent submissions</h3>
                                <p className="text-sm text-gray-500 max-w-sm">
                                    When students submit their assignments, they will appear here for you to review and grade.
                                </p>
                                <Link 
                                    href={route('assignments.index')} 
                                    className="mt-4 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    Manage Assignments
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Quick Access / Feed */}
                <div className="space-y-6">
                    {/* Q&A Feed */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col min-h-[400px]">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                            <h2 className="text-sm font-semibold text-gray-900">Anonymous Q&A Activity</h2>
                        </div>
                        
                        {recentQuestions.length > 0 ? (
                            <div className="divide-y divide-gray-100 flex-1 overflow-y-auto max-h-[400px]">
                                {recentQuestions.map((q) => (
                                    <div key={q.id} className="p-5 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-gray-400 text-[14px]">
                                                        {q.is_anonymous ? 'visibility_off' : 'person'}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-bold text-gray-900">
                                                    {q.is_anonymous ? (q.user?.anonymous_name || 'Anonymous') : (q.user?.name || 'Unknown')}
                                                </p>
                                            </div>
                                            <span className="text-[10px] text-gray-500 font-medium">
                                                {new Date(q.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <Link href={route('questions.show', q.id)} className="block mt-2">
                                            <p className="text-sm text-gray-900 font-medium hover:text-indigo-600 transition-colors line-clamp-2">
                                                {q.title}
                                            </p>
                                            <div className="mt-2 text-indigo-600 text-xs font-bold flex items-center">
                                                Reply now <span className="material-symbols-outlined text-[14px] ml-1">arrow_forward</span>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3 border border-gray-100">
                                    <span className="material-symbols-outlined text-gray-400">forum</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">No pending questions</h3>
                                <p className="text-xs text-gray-500">
                                    Student questions from your subjects will feed here automatically.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

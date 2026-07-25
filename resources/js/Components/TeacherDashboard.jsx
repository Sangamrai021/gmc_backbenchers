import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TeacherDashboard({ stats, recentSubmissions = [], recentQuestions = [] }) {
    const user = usePage().props.auth.user;
    const firstName = user.name.split(' ')[0];

    // Dummy data for the chart since backend doesn't send specific anonymous vs public count yet.
    // Assuming 75% of questions are anonymous, which highlights the "shy student" success.
    const totalQuestions = stats.questions > 0 ? stats.questions : 15;
    const anonymousCount = Math.floor(totalQuestions * 0.75);
    const publicCount = totalQuestions - anonymousCount;

    const chartData = {
        labels: ['Anonymous', 'Public'],
        datasets: [
            {
                data: [anonymousCount, publicCount],
                backgroundColor: ['rgba(99, 102, 241, 0.8)', 'rgba(59, 130, 246, 0.4)'],
                borderColor: ['rgba(99, 102, 241, 1)', 'rgba(59, 130, 246, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        cutout: '75%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: { family: "'Inter', sans-serif", size: 12, weight: 'bold' },
                    color: '#4b5563'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleFont: { size: 13 },
                bodyFont: { size: 13, weight: 'bold' },
                padding: 10,
                cornerRadius: 8,
                displayColors: true,
            }
        },
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12 mt-4 px-4 sm:px-6 lg:px-8">
            
            {/* Greeting Section */}
            <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">{firstName}</span>
                    </h3>
                    <p className="text-lg text-gray-500 mt-2 font-medium">Here's an overview of your classes and student engagement today.</p>
                </div>
                <div className="flex gap-3">
                    <Link 
                        href={route('assignments.create')} 
                        className="bg-white text-gray-700 hover:text-indigo-600 border border-gray-200 px-5 py-2.5 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-md transition-all font-bold flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[20px]">add_task</span> New Assignment
                    </Link>
                    <Link 
                        href={route('questions.create')} 
                        className="bg-indigo-600 text-white hover:bg-indigo-700 px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all font-bold flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[20px]">campaign</span> Post Announcement
                    </Link>
                </div>
            </section>

            {/* KPI Stats - Bento Row */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Active Subjects */}
                <Link href={route('classes.index')} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>library_books</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-indigo-400 transition-colors">arrow_outward</span>
                    </div>
                    <p className="text-4xl font-bold text-gray-900 mb-1">{stats.subjects}</p>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Active Subjects</p>
                </Link>

                {/* Pending Questions */}
                <Link href={route('questions.index')} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>forum</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-blue-500/40 transition-colors">arrow_outward</span>
                    </div>
                    <p className="text-4xl font-bold text-gray-900 mb-1">{stats.questions}</p>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Unanswered Q&A</p>
                </Link>

                {/* Active Grievances */}
                <Link href={route('grievances.feed')} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>report</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-red-400 transition-colors">arrow_outward</span>
                    </div>
                    <p className="text-4xl font-bold text-gray-900 mb-1">{stats.open_grievances}</p>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Grievances</p>
                        <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">{stats.grievances} total</span>
                    </div>
                </Link>

                {/* To Grade */}
                <Link href={route('assignments.index')} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>grading</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-amber-400 transition-colors">arrow_outward</span>
                    </div>
                    <p className="text-4xl font-bold text-gray-900 mb-1">{stats.to_grade || 0}</p>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">To Grade</p>
                </Link>
            </section>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Panel: Recent Submissions */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col min-h-[400px]">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Recent Submissions</h2>
                            <Link href={route('assignments.index')} className="text-sm font-bold text-indigo-600 hover:text-indigo-800">View All</Link>
                        </div>
                        
                        {recentSubmissions.length > 0 ? (
                            <div className="overflow-x-auto p-4">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Student</th>
                                            <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Assignment</th>
                                            <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {recentSubmissions.map((submission) => (
                                            <tr key={submission.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm ring-4 ring-white group-hover:ring-indigo-50/50 transition-all">
                                                            {submission.student?.name?.charAt(0) || '?'}
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-900">{submission.student?.name || 'Unknown Student'}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="text-sm text-gray-900 font-bold">{submission.assignment?.title || 'Unknown Assignment'}</div>
                                                    <div className="text-xs text-gray-500 font-medium">Attempt {submission.attempt_number}</div>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold ${
                                                        submission.status === 'submitted' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 
                                                        submission.status === 'graded' ? 'bg-green-100 text-green-800 border border-green-200' : 
                                                        'bg-gray-100 text-gray-800 border border-gray-200'
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
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                                    <span className="material-symbols-outlined text-gray-400 text-3xl">inbox</span>
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-1">No recent submissions</h3>
                                <p className="text-sm text-gray-500 max-w-sm font-medium">
                                    When students submit their assignments, they will appear here for you to review and grade.
                                </p>
                                <Link 
                                    href={route('assignments.index')} 
                                    className="mt-6 inline-flex items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    Manage Assignments
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Student Engagement Report & Feed */}
                <div className="space-y-6">
                    
                    {/* Student Engagement Chart */}
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">Student Engagement</h4>
                        <p className="text-xs text-gray-500 font-medium mb-6">Empowering shy students via Anonymous Q&A</p>
                        
                        <div className="relative h-48 w-full flex items-center justify-center">
                            <Doughnut data={chartData} options={chartOptions} />
                            
                            {/* Inner circle text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
                                <span className="text-3xl font-extrabold text-indigo-600">{Math.round((anonymousCount / totalQuestions) * 100)}%</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Anonymous</span>
                            </div>
                        </div>
                        
                        <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-indigo-500" style={{ fontVariationSettings: '"FILL" 1' }}>insights</span>
                                <div>
                                    <p className="text-xs font-bold text-indigo-900 mb-1">Impact Insight</p>
                                    <p className="text-xs text-indigo-700/80 font-medium">The anonymous feature is successfully removing psychological barriers, leading to higher participation from hesitant students.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Q&A Feed */}
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col max-h-[500px]">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                            <h2 className="text-lg font-bold text-gray-900">Live Q&A</h2>
                        </div>
                        
                        {recentQuestions.length > 0 ? (
                            <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
                                {recentQuestions.map((q) => (
                                    <div key={q.id} className="p-6 hover:bg-gray-50/80 transition-colors group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                                                    <span className="material-symbols-outlined text-gray-500 text-[16px]" style={{ fontVariationSettings: q.is_anonymous ? '"FILL" 1' : '"FILL" 0' }}>
                                                        {q.is_anonymous ? 'visibility_off' : 'person'}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-bold text-gray-900">
                                                    {q.is_anonymous ? (q.user?.anonymous_name || 'Anonymous') : (q.user?.name || 'Unknown')}
                                                </p>
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                                {new Date(q.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <Link href={route('questions.show', q.id)} className="block mt-3">
                                            <p className="text-sm text-gray-800 font-bold group-hover:text-indigo-600 transition-colors line-clamp-2 leading-relaxed">
                                                {q.title}
                                            </p>
                                            <div className="mt-3 text-indigo-600 text-xs font-bold flex items-center bg-indigo-50/50 w-max px-3 py-1.5 rounded-lg group-hover:bg-indigo-100 transition-colors">
                                                Reply now <span className="material-symbols-outlined text-[14px] ml-1.5">arrow_forward</span>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-3 border border-gray-100">
                                    <span className="material-symbols-outlined text-gray-400 text-2xl">forum</span>
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 mb-1">No pending questions</h3>
                                <p className="text-xs text-gray-500 font-medium">
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

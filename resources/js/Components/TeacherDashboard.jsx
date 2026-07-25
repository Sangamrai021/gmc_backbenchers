import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function TeacherDashboard({ stats }) {
    const user = usePage().props.auth.user;
    const [fabOpen, setFabOpen] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        // Simple radial animation for classroom health SVG on load
        const circles = document.querySelectorAll('circle[stroke-dashoffset]');
        circles.forEach(circle => {
            const target = circle.getAttribute('stroke-dashoffset');
            circle.style.strokeDashoffset = '251.2';
            setTimeout(() => {
                circle.style.strokeDashoffset = target;
            }, 500);
        });
    }, []);

    const toggleFAB = () => setFabOpen(!fabOpen);

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-8 max-w-7xl mx-auto relative min-h-screen font-sans pb-24">
            
            {/* Header Section */}
            <section className={`mb-10 transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Good Morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">{user.name}</span> 👋
                        </h2>
                        <p className="mt-2 text-lg text-gray-500 font-medium">Monitor your classes, engage with students, and drive success.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('questions.create')} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-primary bg-primary/10 hover:bg-primary/20 transition-colors shadow-sm">
                            <span className="material-symbols-outlined mr-2 text-[18px]">add</span> New Announcement
                        </Link>
                        <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                            <span className="material-symbols-outlined mr-2 text-[18px]">download</span> Export Data
                        </button>
                    </div>
                </div>
            </section>

            {/* Summary Cards Grid */}
            <section className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 transition-all duration-700 delay-100 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                
                {/* Active Subjects */}
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                    <div className="flex items-center justify-between mb-4 relative">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">auto_stories</span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                            Active
                        </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Subjects</p>
                    <h3 className="mt-1 text-3xl font-extrabold text-gray-900">{stats.subjects}</h3>
                </div>
                
                {/* Unanswered Questions */}
                <Link href={route('questions.index')} className="block bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group relative overflow-hidden cursor-pointer">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
                    <div className="flex items-center justify-between mb-4 relative">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">forum</span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 animate-pulse">
                            New
                        </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Unanswered Q&A</p>
                    <h3 className="mt-1 text-3xl font-extrabold text-gray-900">{stats.questions}</h3>
                </Link>

                {/* Pending Reviews */}
                <Link href={route('assignments.index')} className="block bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group relative overflow-hidden cursor-pointer">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                    <div className="flex items-center justify-between mb-4 relative">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">rate_review</span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                            Urgent
                        </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pending Reviews</p>
                    <h3 className="mt-1 text-3xl font-extrabold text-gray-900">12</h3>
                </Link>
                
                {/* Grievances */}
                <Link href={route('grievances.feed')} className="block bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-red-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(239,68,68,0.1)] transition-all group relative overflow-hidden cursor-pointer">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
                    <div className="flex items-center justify-between mb-4 relative">
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">report</span>
                        </div>
                        {stats.open_grievances > 0 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                {stats.open_grievances} Open
                            </span>
                        )}
                    </div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Grievances</p>
                    <h3 className="mt-1 text-3xl font-extrabold text-gray-900">{stats.grievances}</h3>
                </Link>
            </section>

            {/* Main Content Grid */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-700 delay-200 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                
                {/* Left Column: Learning Health & Submissions */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Classroom Learning Health */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 relative overflow-hidden group">
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-primary/5 to-indigo-500/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                        
                        <div className="flex justify-between items-start mb-10 relative z-10">
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">Classroom Learning Health</h4>
                                <p className="text-sm text-gray-500 mt-1">Aggregated AI performance data across all active courses</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
                            <div className="text-center p-6 bg-gray-50/80 rounded-2xl border border-gray-100/50 hover:bg-gray-50 transition-colors">
                                <div className="relative w-28 h-28 mx-auto mb-5 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle className="text-gray-200" cx="56" cy="56" fill="transparent" r="46" stroke="currentColor" strokeWidth="8"></circle>
                                        <circle className="text-primary transition-all duration-1500 ease-out" cx="56" cy="56" fill="transparent" r="46" stroke="currentColor" strokeDasharray="289" strokeDashoffset="63.5" strokeWidth="8" strokeLinecap="round"></circle>
                                    </svg>
                                    <span className="absolute font-extrabold text-2xl text-gray-800">78%</span>
                                </div>
                                <p className="font-bold text-gray-900">Understanding</p>
                                <p className="text-xs text-green-600 font-medium mt-1 flex items-center justify-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">trending_up</span> +2% this week
                                </p>
                            </div>
                            
                            <div className="text-center p-6 bg-gray-50/80 rounded-2xl border border-gray-100/50 hover:bg-gray-50 transition-colors">
                                <div className="relative w-28 h-28 mx-auto mb-5 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle className="text-gray-200" cx="56" cy="56" fill="transparent" r="46" stroke="currentColor" strokeWidth="8"></circle>
                                        <circle className="text-indigo-500 transition-all duration-1500 ease-out delay-100" cx="56" cy="56" fill="transparent" r="46" stroke="currentColor" strokeDasharray="289" strokeDashoffset="43.35" strokeWidth="8" strokeLinecap="round"></circle>
                                    </svg>
                                    <span className="absolute font-extrabold text-2xl text-gray-800">85%</span>
                                </div>
                                <p className="font-bold text-gray-900">Engagement</p>
                                <p className="text-xs text-gray-500 font-medium mt-1 flex items-center justify-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">horizontal_rule</span> Stable
                                </p>
                            </div>
                            
                            <div className="text-center p-6 bg-gray-50/80 rounded-2xl border border-gray-100/50 hover:bg-gray-50 transition-colors">
                                <div className="w-28 h-28 mx-auto mb-5 flex flex-col items-center justify-center bg-white rounded-full shadow-sm border border-gray-100">
                                    <span className="material-symbols-outlined text-4xl text-amber-500 mb-1">chat_bubble</span>
                                    <span className="font-extrabold text-2xl text-gray-800">124</span>
                                </div>
                                <p className="font-bold text-gray-900">Questions</p>
                                <p className="text-xs text-indigo-600 font-medium mt-1 flex items-center justify-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Highly Active
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Submissions Table */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-bold text-gray-900">Recent Submissions</h4>
                            <Link href={route('assignments.index')} className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">View All &rarr;</Link>
                        </div>
                        
                        <div className="overflow-x-auto -mx-8 px-8">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assignment</th>
                                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Submitted</th>
                                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <img className="w-9 h-9 rounded-full object-cover shadow-sm" src="https://ui-avatars.com/api/?name=Ram+Charan&background=random" alt="Student" />
                                                <span className="text-sm font-bold text-gray-900">Ram Charan</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-sm text-gray-700 font-medium">Java Interfaces Lab</td>
                                        <td className="py-4 text-sm text-gray-500 hidden sm:table-cell">2h ago</td>
                                        <td className="py-4">
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wide">Needs Review</span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button className="text-primary font-bold text-sm hover:underline">Review</button>
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <img className="w-9 h-9 rounded-full object-cover shadow-sm" src="https://ui-avatars.com/api/?name=Sara+Ahmed&background=random" alt="Student" />
                                                <span className="text-sm font-bold text-gray-900">Sara Ahmed</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-sm text-gray-700 font-medium">SQL Query Workshop</td>
                                        <td className="py-4 text-sm text-gray-500 hidden sm:table-cell">4h ago</td>
                                        <td className="py-4">
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wide">Needs Review</span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button className="text-primary font-bold text-sm hover:underline">Review</button>
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <img className="w-9 h-9 rounded-full object-cover shadow-sm" src="https://ui-avatars.com/api/?name=Liam+Johnson&background=random" alt="Student" />
                                                <span className="text-sm font-bold text-gray-900">Liam Johnson</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-sm text-gray-700 font-medium">Data Structures Quiz</td>
                                        <td className="py-4 text-sm text-gray-500 hidden sm:table-cell">6h ago</td>
                                        <td className="py-4">
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-800 uppercase tracking-wide">Graded</span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button className="text-gray-500 font-bold text-sm hover:text-gray-900 transition-colors">View</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: AI Insights & Feed */}
                <div className="space-y-8">
                    
                    {/* Silent Classroom Insights (AI) */}
                    <div className="bg-[#0f172a] rounded-3xl p-8 relative overflow-hidden shadow-xl text-white">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300">
                                    <span className="material-symbols-outlined">psychology</span>
                                </div>
                                <h4 className="text-lg font-bold tracking-wide">Silent Classroom Insights</h4>
                            </div>
                            <p className="text-sm text-gray-300 mb-8 leading-relaxed">AI analysis has identified common roadblocks across your current subjects.</p>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-semibold text-gray-200">Inheritance Concepts</span>
                                        <span className="font-bold text-rose-400">45 Confused</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-semibold text-gray-200">Database Normalization</span>
                                        <span className="font-bold text-amber-400">32 Confused</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: '32%' }}></div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-semibold text-gray-200">Recursion Algorithms</span>
                                        <span className="font-bold text-indigo-400">25 Confused</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full" style={{ width: '25%' }}></div>
                                    </div>
                                </div>
                            </div>
                            
                            <button className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold transition-all backdrop-blur-sm">
                                View Detailed Analysis
                            </button>
                        </div>
                    </div>

                    {/* Recent Questions Feed */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 flex flex-col h-[450px]">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-bold text-gray-900">Recent Q&A</h4>
                            <Link href={route('questions.index')} className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">Go to Forum &rarr;</Link>
                        </div>
                        
                        <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar flex-1">
                            {/* Dummy Feed Items */}
                            <div className="flex gap-4 group cursor-pointer p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex-shrink-0 relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200 flex items-center justify-center">
                                        <span className="text-indigo-700 font-bold text-sm">AN</span>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm font-bold text-gray-900">Anonymous Student</p>
                                        <span className="text-[10px] text-gray-500 font-medium">2m ago</span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">"Why do we need interfaces in Java if we can achieve similar things with Abstract classes?"</p>
                                    <div className="mt-2 text-primary text-xs font-bold flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        Reply now <span className="material-symbols-outlined text-[14px] ml-1">arrow_forward</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 group cursor-pointer p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex-shrink-0 relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200 flex items-center justify-center">
                                        <span className="text-blue-700 font-bold text-sm">AN</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm font-bold text-gray-900">Anonymous Student</p>
                                        <span className="text-[10px] text-gray-500 font-medium">15m ago</span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">"In Database normalization, is BCNF always necessary for small applications?"</p>
                                    <div className="mt-2 text-primary text-xs font-bold flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        Reply now <span className="material-symbols-outlined text-[14px] ml-1">arrow_forward</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 group cursor-pointer p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex-shrink-0 relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200 flex items-center justify-center">
                                        <span className="text-emerald-700 font-bold text-sm">AN</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm font-bold text-gray-900">Anonymous Student</p>
                                        <span className="text-[10px] text-gray-500 font-medium">1h ago</span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">"Professor, could you suggest more resources for Big O complexity analysis?"</p>
                                    <div className="mt-2 text-primary text-xs font-bold flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        Reply now <span className="material-symbols-outlined text-[14px] ml-1">arrow_forward</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Floating Action Button (FAB) */}
            <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 z-50">
                <div className={`${fabOpen ? 'flex' : 'hidden'} flex-col items-end gap-3 mb-2 ${fabOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} origin-bottom transition-all duration-300 ease-out`}>
                    <button className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-gray-100 px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 group transition-all">
                        <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">Upload Resource</span>
                        <div className="p-1.5 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">upload_file</span>
                        </div>
                    </button>
                    <button className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-gray-100 px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 group transition-all">
                        <span className="text-sm font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">Schedule Quiz</span>
                        <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-600 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">timer</span>
                        </div>
                    </button>
                    <button className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-gray-100 px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 group transition-all">
                        <span className="text-sm font-bold text-gray-700 group-hover:text-amber-600 transition-colors">Create Assignment</span>
                        <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-600 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">add_task</span>
                        </div>
                    </button>
                </div>
                <button 
                    onClick={toggleFAB}
                    className="w-16 h-16 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center group active:scale-95 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                    <span className={`material-symbols-outlined text-3xl transition-transform duration-500 ${fabOpen ? 'rotate-[135deg]' : 'group-hover:rotate-90'}`}>
                        add
                    </span>
                </button>
            </div>
            
            {/* Custom Scrollbar Styles for the feed */}
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d1d5db; }
            `}} />
        </div>
    );
}

import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function TeacherDashboard({ stats }) {
    const user = usePage().props.auth.user;
    const [fabOpen, setFabOpen] = useState(false);

    useEffect(() => {
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
        <div className="px-6 pt-6 max-w-7xl mx-auto relative min-h-screen">
            {/* Header Section */}
            <section className="mb-8">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Good Morning, {user.name} 👋</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Monitor your classes and help students learn better.</p>
            </section>

            {/* Summary Cards Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <span className="material-symbols-outlined text-primary p-2 bg-primary/5 rounded-lg">group</span>
                        <span className="text-label-md font-bold text-primary">+4%</span>
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Students</p>
                    <h3 className="font-headline-lg text-headline-lg text-on-surface">180</h3>
                </div>
                
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <span className="material-symbols-outlined text-secondary p-2 bg-secondary/5 rounded-lg">auto_stories</span>
                        <span className="text-label-md font-bold text-secondary">Active</span>
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Active Subjects</p>
                    <h3 className="font-headline-lg text-headline-lg text-on-surface">{stats.subjects}</h3>
                </div>
                
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <span className="material-symbols-outlined text-tertiary p-2 bg-tertiary/5 rounded-lg">rate_review</span>
                        <span className="text-label-md font-bold text-tertiary">Urgent</span>
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Pending Reviews</p>
                    <h3 className="font-headline-lg text-headline-lg text-on-surface">25</h3>
                </div>
                
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <span className="material-symbols-outlined text-error p-2 bg-error/5 rounded-lg">quiz</span>
                        <span className="text-label-md font-bold text-error">New</span>
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Unanswered Questions</p>
                    <h3 className="font-headline-lg text-headline-lg text-on-surface">{stats.questions}</h3>
                </div>
            </section>

            {/* Bento Layout Content */}
            <div className="grid grid-cols-12 gap-6 pb-24">
                {/* Classroom Learning Health (Large) */}
                <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-6 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div>
                            <h4 className="font-title-md text-title-md text-on-surface font-semibold" style={{ fontSize: '20px', lineHeight: '28px' }}>Classroom Learning Health</h4>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Aggregated performance data across all active courses</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-primary text-white px-4 py-1 rounded-full font-label-md text-label-md flex items-center gap-1 hover:bg-primary/90 transition-colors">
                                <span className="material-symbols-outlined text-sm">download</span> Export Report
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        <div className="text-center p-4 bg-surface-container-low rounded-xl">
                            <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle className="text-outline-variant/20" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                                    <circle className="text-primary transition-all duration-1000" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="55.2" strokeWidth="8"></circle>
                                </svg>
                                <span className="absolute font-bold text-xl">78%</span>
                            </div>
                            <p className="font-label-md text-label-md font-bold text-on-surface">Understanding Level</p>
                            <p className="text-xs text-on-surface-variant">+2% from last week</p>
                        </div>
                        
                        <div className="text-center p-4 bg-surface-container-low rounded-xl">
                            <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle className="text-outline-variant/20" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                                    <circle className="text-secondary transition-all duration-1000" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="37.6" strokeWidth="8"></circle>
                                </svg>
                                <span className="absolute font-bold text-xl">85%</span>
                            </div>
                            <p className="font-label-md text-label-md font-bold text-on-surface">Engagement</p>
                            <p className="text-xs text-on-surface-variant">Stable performance</p>
                        </div>
                        
                        <div className="text-center p-4 bg-surface-container-low rounded-xl">
                            <div className="w-24 h-24 mx-auto mb-4 flex flex-col items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-tertiary">chat_bubble</span>
                                <span className="font-bold text-xl">124</span>
                            </div>
                            <p className="font-label-md text-label-md font-bold text-on-surface">Total Questions</p>
                            <p className="text-xs text-on-surface-variant">Active interaction</p>
                        </div>
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>
                </div>

                {/* Silent Classroom Insights (Small/Accent) */}
                <div className="col-span-12 lg:col-span-4 bg-[#001a42] text-white rounded-xl p-6 flex flex-col justify-between overflow-hidden relative">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-secondary-container">visibility_off</span>
                            <h4 className="font-title-md text-title-md font-semibold" style={{ fontSize: '20px', lineHeight: '28px' }}>Silent Classroom Insights</h4>
                        </div>
                        <p className="font-body-sm text-body-sm text-primary-fixed opacity-90 mb-6">Automated AI analysis identifying common roadblocks across your classes.</p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-label-md text-label-md">Inheritance</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div className="w-[45%] h-full bg-secondary-container"></div>
                                    </div>
                                    <span className="text-xs font-bold">45 Confused</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-label-md text-label-md">Normalization</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div className="w-[32%] h-full bg-secondary-container"></div>
                                    </div>
                                    <span className="text-xs font-bold">32 Confused</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-label-md text-label-md">Recursion</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div className="w-[25%] h-full bg-secondary-container"></div>
                                    </div>
                                    <span className="text-xs font-bold">25 Confused</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button className="relative z-10 mt-8 w-full bg-white/10 hover:bg-white/20 border border-white/20 py-2 rounded-lg font-label-md text-label-md transition-all">
                        View Detailed Analysis
                    </button>
                </div>

                {/* Recent Questions Feed */}
                <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-title-md text-title-md text-on-surface font-semibold" style={{ fontSize: '20px', lineHeight: '28px' }}>Recent Questions</h4>
                        <Link href={route('questions.index')} className="text-primary font-label-md text-label-md hover:underline">View All</Link>
                    </div>
                    
                    <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 sidebar-scroll">
                        <div className="flex gap-4 group">
                            <div className="flex-shrink-0 relative">
                                <img className="w-10 h-10 rounded-full border border-outline-variant/10" src="https://ui-avatars.com/api/?name=Ram+Charan&background=random" alt="Student" />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex-1 border-b border-outline-variant/10 pb-4">
                                <div className="flex justify-between mb-1">
                                    <p className="font-label-md text-label-md font-bold text-on-surface">Ram Charan</p>
                                    <span className="text-[10px] text-on-surface-variant font-medium">2 mins ago</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface mb-2">"Why do we need interfaces in Java if we can achieve similar things with Abstract classes?"</p>
                                <button className="text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">Reply <span className="material-symbols-outlined text-xs">arrow_forward</span></button>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 group">
                            <div className="flex-shrink-0">
                                <img className="w-10 h-10 rounded-full border border-outline-variant/10" src="https://ui-avatars.com/api/?name=Ananya+S&background=random" alt="Student" />
                            </div>
                            <div className="flex-1 border-b border-outline-variant/10 pb-4">
                                <div className="flex justify-between mb-1">
                                    <p className="font-label-md text-label-md font-bold text-on-surface">Ananya S.</p>
                                    <span className="text-[10px] text-on-surface-variant font-medium">15 mins ago</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface mb-2">"In Database normalization, is BCNF always necessary for small applications?"</p>
                                <button className="text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">Reply <span className="material-symbols-outlined text-xs">arrow_forward</span></button>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 group">
                            <div className="flex-shrink-0">
                                <img className="w-10 h-10 rounded-full border border-outline-variant/10" src="https://ui-avatars.com/api/?name=Siddharth+V&background=random" alt="Student" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <p className="font-label-md text-label-md font-bold text-on-surface">Siddharth V.</p>
                                    <span className="text-[10px] text-on-surface-variant font-medium">1h ago</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface mb-2">"Professor, could you suggest more resources for Big O complexity analysis?"</p>
                                <button className="text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">Reply <span className="material-symbols-outlined text-xs">arrow_forward</span></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Submissions Table */}
                <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-title-md text-title-md text-on-surface font-semibold" style={{ fontSize: '20px', lineHeight: '28px' }}>Recent Submissions</h4>
                        <Link href={route('assignments.index')} className="text-on-surface-variant font-label-md text-label-md border border-outline-variant/30 px-4 py-1.5 rounded-lg hover:bg-surface-container-low transition-colors">View All Assignments</Link>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-outline-variant/10">
                                    <th className="pb-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Student</th>
                                    <th className="pb-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Assignment</th>
                                    <th className="pb-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Submitted</th>
                                    <th className="pb-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
                                    <th className="pb-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                <tr className="group hover:bg-surface-container-low/50 transition-colors">
                                    <td className="py-4">
                                        <div className="flex items-center gap-4">
                                            <img className="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=Ram+Charan&background=random" alt="Student" />
                                            <span className="font-body-sm text-body-sm font-medium">Ram Charan</span>
                                        </div>
                                    </td>
                                    <td className="py-4 font-body-sm text-body-sm">Java Interfaces Lab</td>
                                    <td className="py-4 font-body-sm text-body-sm text-on-surface-variant">2h ago</td>
                                    <td className="py-4">
                                        <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-secondary-container/10 text-secondary border border-secondary/20">Needs Review</span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <button className="text-primary font-bold text-xs bg-primary/5 px-4 py-2 rounded-lg hover:bg-primary/10 transition-all">Review</button>
                                    </td>
                                </tr>
                                
                                <tr className="group hover:bg-surface-container-low/50 transition-colors">
                                    <td className="py-4">
                                        <div className="flex items-center gap-4">
                                            <img className="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=Sara+Ahmed&background=random" alt="Student" />
                                            <span className="font-body-sm text-body-sm font-medium">Sara Ahmed</span>
                                        </div>
                                    </td>
                                    <td className="py-4 font-body-sm text-body-sm">SQL Query Workshop</td>
                                    <td className="py-4 font-body-sm text-body-sm text-on-surface-variant">4h ago</td>
                                    <td className="py-4">
                                        <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-secondary-container/10 text-secondary border border-secondary/20">Needs Review</span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <button className="text-primary font-bold text-xs bg-primary/5 px-4 py-2 rounded-lg hover:bg-primary/10 transition-all">Review</button>
                                    </td>
                                </tr>
                                
                                <tr className="group hover:bg-surface-container-low/50 transition-colors">
                                    <td className="py-4">
                                        <div className="flex items-center gap-4">
                                            <img className="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=Liam+Johnson&background=random" alt="Student" />
                                            <span className="font-body-sm text-body-sm font-medium">Liam Johnson</span>
                                        </div>
                                    </td>
                                    <td className="py-4 font-body-sm text-body-sm">Data Structures Quiz</td>
                                    <td className="py-4 font-body-sm text-body-sm text-on-surface-variant">6h ago</td>
                                    <td className="py-4">
                                        <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-green-500/10 text-green-600 border border-green-500/20">Graded</span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <button className="text-on-surface-variant font-bold text-xs bg-surface-container-high px-4 py-2 rounded-lg hover:bg-gray-200 transition-all">View</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Floating Action Button Cluster */}
            <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 z-50">
                <div className={`${fabOpen ? 'flex' : 'hidden'} flex-col items-end gap-2 mb-2 ${fabOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} origin-bottom transition-all duration-300`}>
                    <button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/20 px-6 py-2 rounded-xl shadow-lg hover:bg-surface-container-low group">
                        <span className="font-label-md text-label-md font-bold text-on-surface">Upload Resource</span>
                        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">upload_file</span>
                    </button>
                    <button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/20 px-6 py-2 rounded-xl shadow-lg hover:bg-surface-container-low group">
                        <span className="font-label-md text-label-md font-bold text-on-surface">Schedule Quiz</span>
                        <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">timer</span>
                    </button>
                    <button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/20 px-6 py-2 rounded-xl shadow-lg hover:bg-surface-container-low group">
                        <span className="font-label-md text-label-md font-bold text-on-surface">Create Assignment</span>
                        <span className="material-symbols-outlined text-tertiary group-hover:scale-110 transition-transform">add_task</span>
                    </button>
                </div>
                <button 
                    onClick={toggleFAB}
                    className="w-14 h-14 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center group active:scale-95 transition-all"
                >
                    <span className={`material-symbols-outlined text-3xl transition-transform duration-300 ${fabOpen ? 'rotate-45' : 'group-hover:rotate-90'}`}>
                        add
                    </span>
                </button>
            </div>
        </div>
    );
}

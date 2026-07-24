import { Link, usePage } from '@inertiajs/react';

export default function InstitutionAdminDashboard({ stats }) {
    const user = usePage().props.auth.user;

    return (
        <div className="pt-24 p-6 bg-background min-h-screen">
            {/* Welcome Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">Welcome back, {user?.name || 'Institution Administrator'} 👋</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your institution and monitor academic performance.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-surface-container-highest text-on-surface font-label-md px-4 py-2 rounded-lg hover:bg-surface-dim transition-colors">
                        <span className="material-symbols-outlined text-[18px]">download</span> Export Report
                    </button>
                    <button className="flex items-center gap-2 bg-primary text-on-primary font-label-md px-4 py-2 rounded-lg hover:brightness-110 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">add</span> Quick Action
                    </button>
                </div>
            </div>

            {/* Top Metrics (Bento-style 6-column row) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="material-symbols-outlined text-primary p-2 bg-primary-container/20 rounded-lg">group</span>
                        <span className="text-primary font-bold text-xs">+12%</span>
                    </div>
                    <p className="font-label-md text-on-surface-variant uppercase text-[10px]">Total Students</p>
                    <h3 className="font-headline-lg text-headline-lg-mobile text-on-surface">1,245</h3>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="material-symbols-outlined text-secondary p-2 bg-secondary-container/20 rounded-lg">school</span>
                        <span className="text-secondary font-bold text-xs">+2</span>
                    </div>
                    <p className="font-label-md text-on-surface-variant uppercase text-[10px]">Total Teachers</p>
                    <h3 className="font-headline-lg text-headline-lg-mobile text-on-surface">85</h3>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="material-symbols-outlined text-tertiary p-2 bg-tertiary-container/20 rounded-lg">book</span>
                        <span className="text-tertiary font-bold text-xs">Active</span>
                    </div>
                    <p className="font-label-md text-on-surface-variant uppercase text-[10px]">Active Subjects</p>
                    <h3 className="font-headline-lg text-headline-lg-mobile text-on-surface">{stats?.subjects || 62}</h3>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="material-symbols-outlined text-blue-500 p-2 bg-blue-100 rounded-lg">event_repeat</span>
                    </div>
                    <p className="font-label-md text-on-surface-variant uppercase text-[10px]">Semesters</p>
                    <h3 className="font-headline-lg text-headline-lg-mobile text-on-surface">8</h3>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="material-symbols-outlined text-orange-500 p-2 bg-orange-100 rounded-lg">assignment</span>
                        <span className="text-orange-500 font-bold text-xs">High</span>
                    </div>
                    <p className="font-label-md text-on-surface-variant uppercase text-[10px]">Assignments Wk</p>
                    <h3 className="font-headline-lg text-headline-lg-mobile text-on-surface">145</h3>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="material-symbols-outlined text-purple-500 p-2 bg-purple-100 rounded-lg">forum</span>
                        <span className="text-purple-500 font-bold text-xs">Live</span>
                    </div>
                    <p className="font-label-md text-on-surface-variant uppercase text-[10px]">Questions Today</p>
                    <h3 className="font-headline-lg text-headline-lg-mobile text-on-surface">{stats?.questions || 54}</h3>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* 1. Institution Overview & Quick Actions */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Institution Overview */}
                    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center text-primary font-bold text-xl">
                                G
                            </div>
                            <div>
                                <h3 className="font-title-md text-title-md text-on-surface">Gomendra Multiple College</h3>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span> Status: Active
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2 relative z-10">
                            <div className="flex justify-between font-body-sm">
                                <span className="text-on-surface-variant">Type</span>
                                <span className="text-on-surface font-medium">University/College</span>
                            </div>
                            <div className="flex justify-between font-body-sm">
                                <span className="text-on-surface-variant">Academic Year</span>
                                <span className="text-on-surface font-medium">AY 2026-27</span>
                            </div>
                            <div className="flex justify-between font-body-sm">
                                <span className="text-on-surface-variant">Total Capacity</span>
                                <span className="text-on-surface font-medium">1,500 Students</span>
                            </div>
                        </div>
                        <button className="mt-6 w-full py-2 border border-outline-variant rounded-lg font-label-md hover:bg-surface-container-low transition-colors relative z-10">
                            Edit Institutional Details
                        </button>
                    </div>

                    {/* Quick Actions Panel */}
                    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                        <h3 className="font-title-md text-title-md text-on-surface mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-2">
                            <button className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low hover:bg-primary-container/20 transition-all group text-left">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                                    <span className="material-symbols-outlined">event</span>
                                </div>
                                <div>
                                    <p className="font-label-md text-on-surface">Create Semester</p>
                                    <p className="text-[12px] text-on-surface-variant">Set up upcoming dates</p>
                                </div>
                            </button>
                            <button className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low hover:bg-primary-container/20 transition-all group text-left">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                                    <span className="material-symbols-outlined">person_add</span>
                                </div>
                                <div>
                                    <p className="font-label-md text-on-surface">Add Students</p>
                                    <p className="text-[12px] text-on-surface-variant">Bulk import or manual</p>
                                </div>
                            </button>
                            <Link href={route('announcements.index')} className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low hover:bg-primary-container/20 transition-all group text-left">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                                    <span className="material-symbols-outlined">campaign</span>
                                </div>
                                <div>
                                    <p className="font-label-md text-on-surface">Publish Announcement</p>
                                    <p className="text-[12px] text-on-surface-variant">Notify all departments</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2. Academic Insights (Charts) */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant h-full">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-title-md text-title-md text-on-surface">Academic Insights</h3>
                            <div className="flex bg-surface-container-low p-1 rounded-lg">
                                <button className="px-4 py-1 bg-white shadow-sm rounded-md font-label-md text-primary">Weekly</button>
                                <button className="px-4 py-1 font-label-md text-on-surface-variant">Monthly</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="font-label-md text-on-surface-variant mb-4 uppercase tracking-wide">Questions per Subject</p>
                                <div className="h-64 flex items-end gap-4 px-4 border-b border-outline-variant/30 pb-2">
                                    <div className="flex-1 group relative">
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">142</div>
                                        <div className="bg-primary/20 w-full rounded-t-lg group-hover:bg-primary transition-colors" style={{ height: '80%' }}></div>
                                        <p className="text-center font-label-md text-[10px] mt-2">Java</p>
                                    </div>
                                    <div className="flex-1 group relative">
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">98</div>
                                        <div className="bg-primary/20 w-full rounded-t-lg group-hover:bg-primary transition-colors" style={{ height: '55%' }}></div>
                                        <p className="text-center font-label-md text-[10px] mt-2">DB</p>
                                    </div>
                                    <div className="flex-1 group relative">
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">115</div>
                                        <div className="bg-primary/20 w-full rounded-t-lg group-hover:bg-primary transition-colors" style={{ height: '65%' }}></div>
                                        <p className="text-center font-label-md text-[10px] mt-2">OS</p>
                                    </div>
                                    <div className="flex-1 group relative">
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">76</div>
                                        <div className="bg-primary/20 w-full rounded-t-lg group-hover:bg-primary transition-colors" style={{ height: '40%' }}></div>
                                        <p className="text-center font-label-md text-[10px] mt-2">Math</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="font-label-md text-on-surface-variant mb-4 uppercase tracking-wide">Assignment Submission Trend</p>
                                <div className="h-64 relative border-l border-b border-outline-variant/30 ml-8">
                                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <path d="M 0 80 Q 20 60, 40 70 T 80 30 T 100 20" fill="none" stroke="#0058be" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                                        <path d="M 0 80 Q 20 60, 40 70 T 80 30 T 100 20 L 100 100 L 0 100 Z" fill="url(#gradient)" opacity="0.1"></path>
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#0058be', stopOpacity: 1 }}></stop>
                                                <stop offset="100%" style={{ stopColor: '#0058be', stopOpacity: 0 }}></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute -left-8 top-0 h-full flex flex-col justify-between font-label-md text-[10px] text-on-surface-variant pb-6">
                                        <span>200</span>
                                        <span>100</span>
                                        <span>0</span>
                                    </div>
                                    <div className="absolute -bottom-6 left-0 w-full flex justify-between font-label-md text-[10px] text-on-surface-variant pt-2">
                                        <span>Mon</span>
                                        <span>Wed</span>
                                        <span>Fri</span>
                                        <span>Sun</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Teacher Management */}
                <div className="col-span-12 lg:col-span-12">
                    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
                        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
                            <h3 className="font-title-md text-title-md text-on-surface">Teacher Management</h3>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-surface-container-high rounded-lg font-label-md hover:bg-surface-dim transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">upload_file</span> Import
                                </button>
                                <button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:brightness-110 transition-all flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">add</span> Create Teacher
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-body-sm">
                                <thead className="bg-surface-container-low text-on-surface-variant font-label-md uppercase text-[10px] tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Photo</th>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Department</th>
                                        <th className="px-6 py-4">Subjects Assigned</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant">
                                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-10 h-10 rounded-full border border-outline-variant bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">RK</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-on-surface">Dr. Rajesh Kumar</p>
                                            <p className="text-xs text-on-surface-variant">rajesh.k@academic.edu</p>
                                        </td>
                                        <td className="px-6 py-4 text-on-surface">Computer Science</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                <span className="px-2 py-0.5 bg-primary-container/20 text-primary rounded-full text-xs">Java</span>
                                                <span className="px-2 py-0.5 bg-primary-container/20 text-primary rounded-full text-xs">DSA</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-10 h-10 rounded-full border border-outline-variant bg-purple-100 text-purple-700 flex items-center justify-center font-bold">SJ</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-on-surface">Prof. Sarah Jenkins</p>
                                            <p className="text-xs text-on-surface-variant">s.jenkins@academic.edu</p>
                                        </td>
                                        <td className="px-6 py-4 text-on-surface">Physics</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                <span className="px-2 py-0.5 bg-primary-container/20 text-primary rounded-full text-xs">Quantum Mech</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">On Leave</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 4. Student Performance (Risk Widget) */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant h-full">
                        <h3 className="font-title-md text-title-md text-on-surface mb-4">Students at Risk</h3>
                        <p className="font-body-sm text-on-surface-variant mb-6 leading-relaxed">High priority students requiring intervention due to low engagement.</p>
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center text-red-700 font-bold">AK</div>
                                <div className="flex-1">
                                    <p className="font-label-md text-on-surface">Amit Karki</p>
                                    <div className="w-full bg-red-200 h-1 rounded-full mt-1">
                                        <div className="bg-red-600 h-1 rounded-full" style={{ width: '32%' }}></div>
                                    </div>
                                </div>
                                <span className="text-red-700 font-bold text-xs">32%</span>
                            </div>
                            <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center text-red-700 font-bold">SM</div>
                                <div className="flex-1">
                                    <p className="font-label-md text-on-surface">Sunita Manandhar</p>
                                    <div className="w-full bg-red-200 h-1 rounded-full mt-1">
                                        <div className="bg-red-600 h-1 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <span className="text-red-700 font-bold text-xs">45%</span>
                            </div>
                            <div className="p-4 rounded-lg bg-orange-50 border border-orange-100 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold">BR</div>
                                <div className="flex-1">
                                    <p className="font-label-md text-on-surface">Bikash Rai</p>
                                    <div className="w-full bg-orange-200 h-1 rounded-full mt-1">
                                        <div className="bg-orange-600 h-1 rounded-full" style={{ width: '58%' }}></div>
                                    </div>
                                </div>
                                <span className="text-orange-700 font-bold text-xs">58%</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 text-primary font-label-md hover:underline">View Detailed Performance Analytics</button>
                    </div>
                </div>

                {/* 5. Discussion Overview */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant h-full">
                        <h3 className="font-title-md text-title-md text-on-surface mb-6">Discussion Overview</h3>
                        <div className="flex gap-6 mb-8">
                            <div className="flex-1 p-4 bg-surface-container-low rounded-xl text-center">
                                <h4 className="font-headline-lg text-headline-lg-mobile text-primary">{stats?.questions || 42}</h4>
                                <p className="font-label-md text-[10px] uppercase text-on-surface-variant">Total Questions</p>
                            </div>
                            <div className="flex-1 p-4 bg-secondary-container/10 rounded-xl text-center">
                                <h4 className="font-headline-lg text-headline-lg-mobile text-secondary">8</h4>
                                <p className="font-label-md text-[10px] uppercase text-on-surface-variant">Unanswered</p>
                            </div>
                        </div>
                        <p className="font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] mb-4">Trending Topics</p>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">tag</span>
                                    <span className="font-body-sm font-medium">Inheritance</span>
                                </div>
                                <span className="text-[12px] text-on-surface-variant group-hover:text-primary transition-colors">12 Posts</span>
                            </div>
                            <div className="flex justify-between items-center p-2 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">tag</span>
                                    <span className="font-body-sm font-medium">Normalization</span>
                                </div>
                                <span className="text-[12px] text-on-surface-variant group-hover:text-primary transition-colors">8 Posts</span>
                            </div>
                            <div className="flex justify-between items-center p-2 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">tag</span>
                                    <span className="font-body-sm font-medium">Process Scheduling</span>
                                </div>
                                <span className="text-[12px] text-on-surface-variant group-hover:text-primary transition-colors">5 Posts</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. Activity Log (Vertical Timeline) */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant h-full overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-title-md text-title-md text-on-surface">Recent Activity</h3>
                            <button className="text-primary font-label-md hover:underline">View All</button>
                        </div>
                        <div className="relative pl-8 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant">
                            <div className="relative">
                                <div className="absolute -left-[29px] top-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center ring-4 ring-white">
                                    <span className="material-symbols-outlined text-[12px] text-on-primary">person_add</span>
                                </div>
                                <p className="font-label-md text-on-surface">New Teacher Created</p>
                                <p className="text-[12px] text-on-surface-variant">Admin added Dr. Rajesh Kumar to CS Dept.</p>
                                <p className="text-[10px] text-outline mt-1 italic">10 minutes ago</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[29px] top-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center ring-4 ring-white">
                                    <span className="material-symbols-outlined text-[12px] text-on-secondary">assignment</span>
                                </div>
                                <p className="font-label-md text-on-surface">Subject Assigned</p>
                                <p className="text-[12px] text-on-surface-variant">OS assigned to Semester IV - Sec B.</p>
                                <p className="text-[10px] text-outline mt-1 italic">2 hours ago</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[29px] top-1 w-5 h-5 rounded-full bg-tertiary flex items-center justify-center ring-4 ring-white">
                                    <span className="material-symbols-outlined text-[12px] text-on-tertiary">campaign</span>
                                </div>
                                <p className="font-label-md text-on-surface">Announcement Posted</p>
                                <p className="text-[12px] text-on-surface-variant">Mid-term schedule published for all students.</p>
                                <p className="text-[10px] text-outline mt-1 italic">Yesterday, 4:30 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

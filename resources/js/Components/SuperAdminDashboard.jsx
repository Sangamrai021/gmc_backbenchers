import { Link, usePage } from '@inertiajs/react';

export default function SuperAdminDashboard({ stats }) {
    const user = usePage().props.auth.user;

    return (
        <div className="p-6 max-w-7xl mx-auto w-full min-h-screen pb-24">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Welcome back, {user?.name || 'Admin'} 👋</h2>
                <p className="text-body-lg text-on-surface-variant">Monitor and manage your education platform.</p>
            </div>

            {/* Top Metric Cards (Asymmetric Bento) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="glass-card p-6 rounded-xl flex flex-col justify-between group hover:border-primary/30 transition-all">
                    <div>
                        <div className="w-12 h-12 bg-primary-container/20 rounded-lg flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-primary">domain</span>
                        </div>
                        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Institutions</p>
                        <h3 className="text-[32px] font-bold text-on-surface mt-1">245</h3>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-xl flex flex-col justify-between group hover:border-primary/30 transition-all">
                    <div>
                        <div className="w-12 h-12 bg-secondary-container/20 rounded-lg flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-secondary">group</span>
                        </div>
                        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Students</p>
                        <h3 className="text-[32px] font-bold text-on-surface mt-1">52,430</h3>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-xl flex flex-col justify-between group hover:border-primary/30 transition-all">
                    <div>
                        <div className="w-12 h-12 bg-tertiary-container/20 rounded-lg flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-tertiary">person</span>
                        </div>
                        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Teachers</p>
                        <h3 className="text-[32px] font-bold text-on-surface mt-1">4,820</h3>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-xl flex flex-col justify-between group hover:border-primary/30 transition-all">
                    <div>
                        <div className="w-12 h-12 bg-primary-container/20 rounded-lg flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-primary">bolt</span>
                        </div>
                        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Active Users Today</p>
                        <h3 className="text-[32px] font-bold text-on-surface mt-1">12,450</h3>
                    </div>
                </div>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* System Health & Live Insights (Column 1 & 2) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* System Health Section */}
                    <section className="bg-white glass-card rounded-xl p-6">
                        <h4 className="font-title-md text-title-md mb-4 flex items-center gap-1">
                            <span className="material-symbols-outlined text-primary">psychology</span>
                            Critical Learning Gaps
                        </h4>
                        <div className="space-y-4">
                            <div className="p-4 bg-white rounded-lg border border-error/20 flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-error font-label-md font-bold uppercase">Platform Difficulty</span>
                                    <span className="text-[10px] text-on-surface-variant">Computer Science</span>
                                </div>
                                <p className="text-body-sm font-medium">Database Normalization: 45% average failure rate across 12 institutions.</p>
                                <button className="mt-1 text-primary font-label-md self-start hover:underline">View Analytics</button>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-secondary/20 flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-secondary font-label-md font-bold uppercase">Platform Difficulty</span>
                                    <span className="text-[10px] text-on-surface-variant">Software Engineering</span>
                                </div>
                                <p className="text-body-sm font-medium">Java Inheritance: High demand for remedial resources detected.</p>
                                <button className="mt-1 text-primary font-label-md self-start hover:underline">Allocate Resources</button>
                            </div>
                        </div>
                    </section>

                    {/* Institution Table */}
                    <section className="glass-card rounded-xl p-6 mb-6">
                        <h4 className="font-title-md text-title-md mb-4">Quick Actions</h4>
                        <div className="grid grid-cols-1 gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-label-md hover:opacity-90 transition-opacity">
                                <span className="material-symbols-outlined text-[18px]">add_business</span>
                                + Create Institution
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant/30 rounded-lg font-label-md hover:bg-surface-container-low transition-colors">
                                <span className="material-symbols-outlined text-[18px]">person_add</span>
                                + Create Platform Admin
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant/30 rounded-lg font-label-md hover:bg-surface-container-low transition-colors">
                                <span className="material-symbols-outlined text-[18px]">assessment</span>
                                View Reports
                            </button>
                        </div>
                    </section>
                    
                    <section className="glass-card rounded-xl overflow-hidden">
                        <div className="p-6 flex justify-between items-center bg-white">
                            <h4 className="font-title-md text-title-md">Recent Institutions</h4>
                            <div className="flex gap-2">
                                <button className="px-4 py-1 rounded-lg border border-outline-variant/30 font-label-md hover:bg-surface-container-low">Filters</button>
                                <button className="px-4 py-1 rounded-lg bg-surface-container-highest font-label-md">Export PDF</button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-surface-container-low border-y border-outline-variant/10">
                                    <tr>
                                        <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Admin</th>
                                        <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Students</th>
                                        <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/10">
                                    <tr className="hover:bg-surface-container-low transition-colors group">
                                        <td className="px-6 py-4 font-medium">Gomendra Multiple College</td>
                                        <td className="px-6 py-4 text-body-sm">University</td>
                                        <td className="px-6 py-4 text-body-sm">Dr. K. Sharma</td>
                                        <td className="px-6 py-4 text-body-sm">1,240</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full bg-primary-container/20 text-primary text-[10px] font-bold uppercase">Active</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-primary material-symbols-outlined">more_vert</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
                
                {/* Activity & Insights (Column 3) */}
                <div className="space-y-6">
                    {/* Learning Insights Chip Card */}
                    <section className="glass-card rounded-xl p-6 bg-gradient-to-br from-primary-container/5 to-transparent">
                        <h4 className="font-title-md text-title-md mb-4 flex items-center gap-1">
                            <span className="material-symbols-outlined text-primary">psychology</span>
                            Critical Learning Gaps
                        </h4>
                        <div className="space-y-4">
                            <div className="p-4 bg-white rounded-lg border border-error/20 flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-error font-label-md font-bold uppercase">Platform Difficulty</span>
                                    <span className="text-[10px] text-on-surface-variant">Computer Science</span>
                                </div>
                                <p className="text-body-sm font-medium">Database Normalization: 45% average failure rate across 12 institutions.</p>
                                <button className="mt-1 text-primary font-label-md self-start hover:underline">View Analytics</button>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-secondary/20 flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-secondary font-label-md font-bold uppercase">Platform Difficulty</span>
                                    <span className="text-[10px] text-on-surface-variant">Software Engineering</span>
                                </div>
                                <p className="text-body-sm font-medium">Java Inheritance: High demand for remedial resources detected.</p>
                                <button className="mt-1 text-primary font-label-md self-start hover:underline">Allocate Resources</button>
                            </div>
                        </div>
                    </section>

                    {/* Activity Feed */}
                    <section className="glass-card rounded-xl p-6">
                        <h4 className="font-title-md text-title-md mb-6">Announcements & Feed</h4>
                        <div className="space-y-6 relative before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant/30">
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1 w-6 h-6 bg-primary-container/20 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-[14px]">campaign</span>
                                </div>
                                <p className="font-body-sm font-medium">New institution onboarded: Stanford University</p>
                                <span className="text-[10px] text-on-surface-variant">2 hours ago • Partnerships</span>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1 w-6 h-6 bg-secondary-container/20 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-secondary text-[14px]">forum</span>
                                </div>
                                <p className="font-body-sm font-medium">Research Discussion: "AI in Pedagogy" hits 1k replies</p>
                                <span className="text-[10px] text-on-surface-variant">5 hours ago • Social</span>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1 w-6 h-6 bg-tertiary-container/20 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-tertiary text-[14px]">security</span>
                                </div>
                                <p className="font-body-sm font-medium">System patch v4.2.1 deployed successfully</p>
                                <span className="text-[10px] text-on-surface-variant">Yesterday • Tech Ops</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2 text-center border border-outline-variant/30 rounded-lg text-on-surface-variant font-label-md hover:bg-surface-container-low transition-colors">
                            View All Activity
                        </button>
                    </section>

                    {/* Global Reach Map */}
                    <section className="glass-card rounded-xl overflow-hidden h-48 relative">
                        <div 
                            className="absolute inset-0 bg-cover bg-center grayscale opacity-50" 
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop")' }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent flex flex-col justify-end p-4">
                            <h5 className="font-label-md text-label-md font-bold uppercase text-primary">Global Reach</h5>
                            <p className="text-[10px] text-on-surface-variant">Real-time node distribution</p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer Meta Info */}
            <footer className="mt-8 py-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 text-on-surface-variant">
                    <span className="font-label-md text-label-md">© 2026 Academic Nexus v9.4.2</span>
                    <a className="font-label-md text-label-md hover:text-primary underline-offset-4 hover:underline" href="#">Documentation</a>
                    <a className="font-label-md text-label-md hover:text-primary underline-offset-4 hover:underline" href="#">Privacy Policy</a>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="font-label-md text-label-md text-on-surface-variant">Server Status: High Performance</span>
                </div>
            </footer>
        </div>
    );
}

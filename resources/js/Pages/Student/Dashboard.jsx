import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    const displayStats = stats || { questions: 0, answers: 0, subjects: 0, grievances: 0, open_grievances: 0, resolved_grievances: 0, critical_grievances: 0 };
    const { auth } = usePage().props;
    const user = auth?.user || { name: 'Student' };
    const firstName = user.name.split(' ')[0];

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Student Dashboard" />

            <div className="max-w-7xl mx-auto space-y-8 pb-12">
                {/* Greeting Section */}
                <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-4">
                    <div>
                        <h3 className="text-4xl font-extrabold text-on-surface tracking-tight">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">{firstName}</span>
                        </h3>
                        <p className="text-lg text-on-surface-variant mt-2 font-medium">Ready to conquer your classes today?</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('questions.create')} className="bg-white text-on-surface hover:text-primary border border-surface-container-low px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all font-semibold flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">add_comment</span> Ask Doubt
                        </Link>
                    </div>
                </section>

                {/* KPI Stats - Bento Row 1 */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Subjects */}
                    <Link href={route('student.subjects')} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>auto_stories</span>
                            </div>
                            <span className="material-symbols-outlined text-outline/40 group-hover:text-primary/40">arrow_outward</span>
                        </div>
                        <p className="text-4xl font-bold text-on-surface mb-1">{displayStats.subjects}</p>
                        <p className="text-sm text-on-surface-variant font-medium">Enrolled Subjects</p>
                    </Link>

                    {/* Grievances */}
                    <Link href={route('grievances.create')} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center text-error group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>report</span>
                            </div>
                            <span className="material-symbols-outlined text-outline/40 group-hover:text-error/40">arrow_outward</span>
                        </div>
                        <p className="text-4xl font-bold text-on-surface mb-1">{displayStats.grievances}</p>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-on-surface-variant font-medium">Grievances</p>
                            <span className="text-[10px] bg-error/10 text-error px-2 py-0.5 rounded-full font-bold">{displayStats.open_grievances} open</span>
                        </div>
                    </Link>

                    {/* Questions */}
                    <Link href={route('questions.index')} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>forum</span>
                            </div>
                            <span className="material-symbols-outlined text-outline/40 group-hover:text-blue-500/40">arrow_outward</span>
                        </div>
                        <p className="text-4xl font-bold text-on-surface mb-1">{displayStats.questions}</p>
                        <p className="text-sm text-on-surface-variant font-medium">Questions Asked</p>
                    </Link>

                    {/* Answers */}
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group duration-300 cursor-default">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>workspace_premium</span>
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-on-surface mb-1">{displayStats.answers}</p>
                        <p className="text-sm text-on-surface-variant font-medium">Helpful Answers</p>
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Assignments & Activity */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Ask Without Fear Hero Card */}
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 shadow-xl shadow-primary/20">
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
                            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-white/10 rounded-full blur-2xl mix-blend-overlay"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex-1 text-white">
                                    <h4 className="text-3xl font-bold mb-3">Ask Without Fear 💡</h4>
                                    <p className="text-primary-50 text-lg mb-6 max-w-md">No judgment, just learning. Ask your teachers or classmates anonymously and clear your doubts instantly.</p>
                                    <Link href={route('questions.create')} className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg">
                                        <span className="material-symbols-outlined">send</span> Post a Question
                                    </Link>
                                </div>
                                <div className="w-full md:w-auto bg-black/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-inner">
                                    <p className="text-xs font-bold text-white/80 uppercase tracking-widest mb-4">Trending Now</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between gap-4 text-white hover:text-white cursor-pointer group">
                                            <p className="text-sm font-medium">Explain Data Normalization</p>
                                            <span className="text-xs bg-white/20 px-2 py-1 rounded-md flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">visibility</span> 120</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 text-white hover:text-white cursor-pointer group">
                                            <p className="text-sm font-medium">Java Polymorphism Help</p>
                                            <span className="text-xs bg-white/20 px-2 py-1 rounded-md flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">visibility</span> 84</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Assignments */}
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-xl font-bold text-on-surface">Upcoming Assignments</h4>
                                <Link href={route('assignments.index')} className="text-sm font-bold text-primary hover:underline">View All</Link>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="group bg-surface-container-lowest border border-surface-container-low hover:border-primary/40 rounded-2xl p-5 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="text-xs font-bold text-tertiary bg-tertiary/10 px-2 py-1 rounded-md mb-2 inline-block">DUE TOMORROW</span>
                                            <h5 className="font-bold text-on-surface text-lg">Java OOP Project</h5>
                                        </div>
                                    </div>
                                    <p className="text-sm text-on-surface-variant mb-4 font-medium">Status: Not Submitted</p>
                                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full w-[25%]" style={{ transition: 'width 1s ease-in-out' }}></div>
                                    </div>
                                </div>
                                <div className="group bg-surface-container-lowest border border-surface-container-low hover:border-primary/40 rounded-2xl p-5 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded-md mb-2 inline-block">IN 3 DAYS</span>
                                            <h5 className="font-bold text-on-surface text-lg">DB Normalization Quiz</h5>
                                        </div>
                                    </div>
                                    <p className="text-sm text-on-surface-variant mb-4 font-medium">Status: In Progress</p>
                                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full w-[60%]" style={{ transition: 'width 1s ease-in-out' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Insights & Activity */}
                    <div className="space-y-6">
                        {/* Learning Insights */}
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                            <h4 className="text-xl font-bold text-on-surface mb-6">Learning Insights</h4>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-outline uppercase tracking-widest mb-3">Strong Topics</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1.5 bg-green-500/10 text-green-700 rounded-lg text-sm font-bold flex items-center gap-1.5 border border-green-500/20">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span> OOP
                                        </span>
                                        <span className="px-3 py-1.5 bg-green-500/10 text-green-700 rounded-lg text-sm font-bold flex items-center gap-1.5 border border-green-500/20">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span> HTML/CSS
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-outline uppercase tracking-widest mb-3">Needs Focus</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1.5 bg-error/10 text-error rounded-lg text-sm font-bold flex items-center gap-1.5 border border-error/20">
                                            <span className="material-symbols-outlined text-[16px]">trending_down</span> Recursion
                                        </span>
                                        <span className="px-3 py-1.5 bg-error/10 text-error rounded-lg text-sm font-bold flex items-center gap-1.5 border border-error/20">
                                            <span className="material-symbols-outlined text-[16px]">trending_down</span> SQL Joins
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                            <h4 className="text-xl font-bold text-on-surface mb-6">Recent Activity</h4>
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-container before:to-transparent">

                                <div className="relative flex items-start gap-4">
                                    <div className="relative z-10 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 ring-4 ring-white">
                                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>done_all</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-on-surface">Submitted Java Assignment</p>
                                        <p className="text-xs text-on-surface-variant font-medium mt-1">2 hours ago</p>
                                    </div>
                                </div>

                                <div className="relative flex items-start gap-4">
                                    <div className="relative z-10 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 ring-4 ring-white">
                                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>upload_file</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-on-surface">Prof. Sharma added Notes</p>
                                        <p className="text-xs text-on-surface-variant font-medium mt-1">5 hours ago</p>
                                    </div>
                                </div>

                                <div className="relative flex items-start gap-4">
                                    <div className="relative z-10 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0 ring-4 ring-white">
                                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>workspace_premium</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-on-surface">Earned 'Top Contributor'</p>
                                        <p className="text-xs text-on-surface-variant font-medium mt-1">Yesterday</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

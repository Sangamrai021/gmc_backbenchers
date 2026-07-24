import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    const displayStats = stats || { questions: 0, answers: 0, subjects: 0 };
    const { auth } = usePage().props;
    const user = auth?.user || { name: 'Student' };
    const firstName = user.name.split(' ')[0];

    return (
        <AuthenticatedLayout header="LMS Dashboard">
            <Head title="Student Dashboard" />
            
            {/* Greeting */}
            <section className="mb-10 mt-6">
                <h3 className="font-headline-lg text-headline-lg text-on-surface">Good Morning, {firstName} 👋</h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Continue learning and stay connected with your classroom.</p>
            </section>

            {/* Summary Stats Bento */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-10">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-xl custom-shadow flex items-center gap-4 hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">menu_book</span>
                    </div>
                    <div>
                        <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Total Subjects</p>
                        <p className="font-headline-md text-headline-md text-on-surface">{displayStats.subjects}</p>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="bg-white p-6 rounded-xl custom-shadow flex items-center gap-4 hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined">pending_actions</span>
                    </div>
                    <div>
                        <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Pending Tasks</p>
                        <p className="font-headline-md text-headline-md text-on-surface">3</p>
                    </div>
                </div>
                {/* Card 3 */}
                <div className="bg-white p-6 rounded-xl custom-shadow flex items-center gap-4 hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">help</span>
                    </div>
                    <div>
                        <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Questions Asked</p>
                        <p className="font-headline-md text-headline-md text-on-surface">{displayStats.questions}</p>
                    </div>
                </div>
                {/* Card 4 */}
                <div className="bg-white p-6 rounded-xl custom-shadow flex items-center gap-4 hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                        <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Helpful Answers</p>
                        <p className="font-headline-md text-headline-md text-on-surface">{displayStats.answers}</p>
                    </div>
                </div>
            </section>

            {/* Upcoming Row */}
            <section className="grid grid-cols-1 gap-gutter mb-10 lg:grid-cols-1">
                {/* Assignments */}
                <div className="bg-white p-8 rounded-xl custom-shadow grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-headline-md text-headline-md text-on-surface">Upcoming Assignments</h4>
                            <Link className="text-primary font-label-md text-label-md hover:underline" href={route('assignments.index')}>View All</Link>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl border border-outline-variant bg-surface-bright group hover:border-primary transition-colors cursor-pointer">
                                <div className="flex justify-between mb-2">
                                    <span className="font-label-md text-label-md font-bold text-on-surface">Java OOP Assignment</span>
                                    <span className="text-label-sm text-tertiary font-bold px-2 py-1 bg-tertiary/10 rounded">Due Tomorrow</span>
                                </div>
                                <p className="text-label-sm text-on-surface-variant mb-3">Status: Not Submitted</p>
                                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[25%]" style={{ transition: 'width 1s ease-in-out' }}></div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl border border-outline-variant bg-surface-bright group hover:border-primary transition-colors cursor-pointer">
                                <div className="flex justify-between mb-2">
                                    <span className="font-label-md text-label-md font-bold text-on-surface">Database Normalization Quiz</span>
                                    <span className="text-label-sm text-outline font-bold px-2 py-1 bg-surface-container rounded">In 3 Days</span>
                                </div>
                                <p className="text-label-sm text-on-surface-variant mb-3">Status: In Progress</p>
                                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[60%]" style={{ transition: 'width 1s ease-in-out' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-full">
                        <h4 className="font-headline-md text-headline-md text-on-surface mb-6">Study Hours this Week</h4>
                        <div className="flex-1 bg-surface-container-low rounded-xl p-6 flex flex-col justify-end">
                            <div className="flex items-end justify-between gap-2 h-40 px-2">
                                <div className="flex flex-col items-center gap-2 flex-1"><div className="w-full bg-primary rounded-t-lg" style={{ height: '40%' }}></div><span className="text-[10px] text-outline font-bold">M</span></div>
                                <div className="flex flex-col items-center gap-2 flex-1"><div className="w-full bg-primary rounded-t-lg" style={{ height: '65%' }}></div><span className="text-[10px] text-outline font-bold">T</span></div>
                                <div className="flex flex-col items-center gap-2 flex-1"><div className="w-full bg-primary rounded-t-lg" style={{ height: '85%' }}></div><span className="text-[10px] text-outline font-bold">W</span></div>
                                <div className="flex flex-col items-center gap-2 flex-1"><div className="w-full bg-primary rounded-t-lg" style={{ height: '50%' }}></div><span className="text-[10px] text-outline font-bold">T</span></div>
                                <div className="flex flex-col items-center gap-2 flex-1"><div className="w-full bg-primary rounded-t-lg" style={{ height: '95%' }}></div><span className="text-[10px] text-outline font-bold">F</span></div>
                                <div className="flex flex-col items-center gap-2 flex-1"><div className="w-full bg-primary rounded-t-lg" style={{ height: '30%' }}></div><span className="text-[10px] text-outline font-bold">S</span></div>
                                <div className="flex flex-col items-center gap-2 flex-1"><div className="w-full bg-primary rounded-t-lg" style={{ height: '20%' }}></div><span className="text-[10px] text-outline font-bold">S</span></div>
                            </div>
                            <p className="mt-4 text-center text-label-sm text-on-surface-variant font-bold">Total: 32.5 Hours</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ask Without Fear Section */}
            <section className="mb-10">
                <div className="relative rounded-2xl overflow-hidden min-h-[240px] flex flex-col md:flex-row items-center bg-inverse-surface p-8 gap-8">
                    <div className="relative z-10 flex-1">
                        <h4 className="font-headline-lg text-headline-lg text-white mb-4">Ask Without Fear</h4>
                        <p className="font-body-lg text-body-lg text-gray-300 mb-6 max-w-lg">Have a doubt? Ask your teacher or classmates anonymously. No judgment, just learning.</p>
                        <Link href={route('questions.create')} className="bg-primary text-white font-label-md text-label-md px-8 py-4 rounded-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 shadow-lg w-auto max-w-max">
                            <span className="material-symbols-outlined">send</span> Ask Question Now
                        </Link>
                    </div>
                    <div className="relative z-10 w-full md:w-80 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                        <p className="text-label-sm text-gray-300 uppercase font-bold mb-4">Trending Doubts</p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center group cursor-pointer">
                                <p className="text-label-md text-white group-hover:text-primary transition-colors">What is polymorphism?</p>
                                <span className="text-label-sm text-gray-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">groups</span> 42</span>
                            </div>
                            <hr className="border-white/10" />
                            <div className="flex justify-between items-center group cursor-pointer">
                                <p className="text-label-md text-white group-hover:text-primary transition-colors">Explain normalization</p>
                                <span className="text-label-sm text-gray-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">groups</span> 28</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Layout for Insights and Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-10">
                {/* Learning Insights */}
                <div className="lg:col-span-2 bg-white p-8 rounded-xl custom-shadow h-full">
                    <h4 className="font-headline-md text-headline-md text-on-surface mb-6">Your Learning Insights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="mb-6">
                                <p className="text-label-sm text-outline font-bold mb-3 uppercase tracking-widest">Strong Topics</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-sm font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">check_circle</span> OOP
                                    </span>
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-sm font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">check_circle</span> HTML/CSS
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-label-sm text-outline font-bold mb-3 uppercase tracking-widest">Need Practice</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-label-sm font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">error</span> Recursion
                                    </span>
                                    <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-label-sm font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">error</span> DB Normalization
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-center items-center">
                            <div className="w-full flex items-end gap-3 h-32 justify-center">
                                <div className="w-8 bg-primary rounded-t-lg opacity-60" style={{ height: '40%' }}></div>
                                <div className="w-8 bg-tertiary rounded-t-lg opacity-80" style={{ height: '85%' }}></div>
                                <div className="w-8 bg-primary rounded-t-lg opacity-40" style={{ height: '60%' }}></div>
                                <div className="w-8 bg-primary rounded-t-lg" style={{ height: '95%' }}></div>
                            </div>
                            <div className="flex gap-4 mt-4 text-[10px] text-outline font-bold uppercase">
                                <span>QA</span>
                                <span>Res</span>
                                <span>Asg</span>
                                <span>Att</span>
                            </div>
                            <p className="mt-4 text-label-sm text-on-surface-variant font-bold">Activity: High (88%)</p>
                        </div>
                    </div>
                </div>
                
                {/* Recent Activity Feed */}
                <div className="bg-white p-8 rounded-xl custom-shadow h-full">
                    <h4 className="font-headline-md text-headline-md text-on-surface mb-6">Recent Activity</h4>
                    <div className="space-y-6 relative timeline-line">
                        <div className="flex gap-4 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-white">
                                <span className="material-symbols-outlined text-white text-[14px]">done</span>
                            </div>
                            <div>
                                <p className="text-label-md text-on-surface">Submitted Java Assignment</p>
                                <p className="text-label-sm text-outline">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex gap-4 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-white">
                                <span className="material-symbols-outlined text-white text-[14px]">upload_file</span>
                            </div>
                            <div>
                                <p className="text-label-md text-on-surface">Prof. Sharma added DB Notes</p>
                                <p className="text-label-sm text-outline">5 hours ago</p>
                            </div>
                        </div>
                        <div className="flex gap-4 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-tertiary flex items-center justify-center ring-4 ring-white">
                                <span className="material-symbols-outlined text-white text-[14px]">question_answer</span>
                            </div>
                            <div>
                                <p className="text-label-md text-on-surface">Question got 5 answers</p>
                                <p className="text-label-sm text-outline">Yesterday</p>
                            </div>
                        </div>
                        <div className="flex gap-4 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-white">
                                <span className="material-symbols-outlined text-white text-[14px]">workspace_premium</span>
                            </div>
                            <div>
                                <p className="text-label-md text-on-surface">Earned 'Helpful Student'</p>
                                <p className="text-label-sm text-outline">2 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Resources */}
            <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-headline-md text-headline-md text-on-surface">Recent Resources</h4>
                    <Link href={route('resources.index')} className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary/20 transition-colors">Explore Library</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                    <div className="group bg-white rounded-xl custom-shadow overflow-hidden cursor-pointer">
                        <div className="h-32 bg-primary flex items-center justify-center relative overflow-hidden">
                            <span className="material-symbols-outlined text-white text-5xl relative z-10 group-hover:scale-110 transition-transform">description</span>
                        </div>
                        <div className="p-6">
                            <span className="text-label-sm text-primary font-bold px-2 py-1 bg-primary/10 rounded mb-3 inline-block">PDF DOCUMENT</span>
                            <h5 className="font-label-md text-label-md font-bold text-on-surface mb-1">Java Inheritance Notes</h5>
                            <p className="text-label-sm text-on-surface-variant">By Prof. Sharma • Oct 20</p>
                        </div>
                    </div>
                    <div className="group bg-white rounded-xl custom-shadow overflow-hidden cursor-pointer">
                        <div className="h-32 bg-tertiary flex items-center justify-center relative overflow-hidden">
                            <span className="material-symbols-outlined text-white text-5xl relative z-10 group-hover:scale-110 transition-transform">play_circle</span>
                        </div>
                        <div className="p-6">
                            <span className="text-label-sm text-tertiary font-bold px-2 py-1 bg-tertiary/10 rounded mb-3 inline-block">VIDEO LECTURE</span>
                            <h5 className="font-label-md text-label-md font-bold text-on-surface mb-1">SQL Joins Explained</h5>
                            <p className="text-label-sm text-on-surface-variant">By Dr. Anita • Oct 18</p>
                        </div>
                    </div>
                    <div className="group bg-white rounded-xl custom-shadow overflow-hidden cursor-pointer">
                        <div className="h-32 bg-primary/60 flex items-center justify-center relative overflow-hidden">
                            <span className="material-symbols-outlined text-white text-5xl relative z-10 group-hover:scale-110 transition-transform">folder_zip</span>
                        </div>
                        <div className="p-6">
                            <span className="text-label-sm text-primary font-bold px-2 py-1 bg-primary/10 rounded mb-3 inline-block">CODE SNIPPETS</span>
                            <h5 className="font-label-md text-label-md font-bold text-on-surface mb-1">CSS Grid Templates</h5>
                            <p className="text-label-sm text-on-surface-variant">By TA Mike • Oct 15</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Floating Action Button */}
            <Link href={route('questions.create')} className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:rotate-12 active:scale-95 transition-all z-50 group">
                <span className="material-symbols-outlined text-3xl">add</span>
                <span className="absolute right-full mr-4 px-3 py-1 bg-inverse-surface text-white text-label-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">Create Question</span>
            </Link>
        </AuthenticatedLayout>
    );
}

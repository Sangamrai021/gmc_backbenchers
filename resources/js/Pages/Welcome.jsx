import { Head, Link } from '@inertiajs/react';
import { 
    MessageSquare, 
    Users, 
    Award, 
    BookOpen, 
    Sparkles, 
    ArrowRight, 
    CheckCircle2, 
    GraduationCap, 
    Code2, 
    Zap,
    ChevronRight,
    ShieldCheck,
    Check
} from 'lucide-react';
import { useState } from 'react';

export default function Welcome({ auth, canLogin, canRegister, laravelVersion, phpVersion, stats }) {
    const [activeTab, setActiveTab] = useState('students');

    const defaultStats = {
        questions: stats?.questions ?? 120,
        answers: stats?.answers ?? 340,
        projects: stats?.projects ?? 45,
        subjects: stats?.subjects ?? 18,
    };

    return (
        <>
            <Head title="GMC Backbenchers - Academic & Student Innovation Platform" />
            
            <div className="min-h-screen bg-background text-on-background font-sans selection:bg-primary selection:text-on-surface relative overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] hidden pointer-events-none" />
                <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] hidden pointer-events-none" />

                <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-outline-variant transition-all">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        {/* Brand Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="size-11 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform duration-300">
                                <GraduationCap className="size-6 text-on-surface" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-extrabold text-xl tracking-tight text-on-surface flex items-center gap-1.5">
                                    GMC <span className="text-primary">Backbenchers</span>
                                </span>
                                <span className="text-[10px] text-outline font-medium tracking-wider uppercase">Academic Community</span>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-on-surface-variant">
                            <a href="#features" className="hover:text-primary transition-colors">Features</a>
                            <a href="#community" className="hover:text-primary transition-colors">Community</a>
                            <a href="#showcase" className="hover:text-primary transition-colors">Talent Hub</a>
                            <a href="#stats" className="hover:text-primary transition-colors">Metrics</a>
                        </nav>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:brightness-110 transition-all shadow-md shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    <span>Dashboard</span>
                                    <ArrowRight className="size-4" />
                                </Link>
                            ) : (
                                <>
                                    {canLogin && (
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-slate-800/60 font-medium text-sm transition-all"
                                        >
                                            Log in
                                        </Link>
                                    )}
                                    {canRegister && (
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:brightness-110 transition-all shadow-md shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5"
                                        >
                                            <span>Get Started</span>
                                            <Sparkles className="size-4 text-secondary" />
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container border border-indigo-500/30 text-primary text-xs font-semibold uppercase tracking-wider mb-8 shadow-inner">
                            <Sparkles className="size-3.5 text-primary animate-pulse" />
                            <span>Empowering College Scholars & Innovators</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-on-surface leading-[1.1]">
                            Where <span className="text-primary">Backbenchers</span> Turn Ideas Into Breakthroughs.
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-6 text-lg sm:text-xl text-on-surface-variant leading-relaxed font-normal max-w-3xl mx-auto">
                            The ultimate collaborative academic platform for students, faculty, and mentors. Solve complex course questions, discover peer mentors, exhibit engineering projects, and streamline your study workflows.
                        </p>

                        {/* CTAs */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-primary text-on-primary font-bold text-base hover:brightness-110 transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5"
                                >
                                    <span>Enter Your Dashboard</span>
                                    <ArrowRight className="size-5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-primary text-on-primary font-bold text-base hover:brightness-110 transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5"
                                    >
                                        <span>Join the Community</span>
                                        <Sparkles className="size-5 text-on-primary" />
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-surface-container-low border border-outline-variant text-on-surface hover:text-on-surface hover:bg-slate-800/80 font-bold text-base transition-all"
                                    >
                                        <span>Sign In</span>
                                        <ChevronRight className="size-5 text-outline" />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Feature Badges */}
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-outline font-medium">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-green-600" />
                                <span>Anonymous & Public Q&A</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-green-600" />
                                <span>Verified Peer Mentors</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-green-600" />
                                <span>Student Talent Showcase</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Live Stats Bar */}
                <section id="stats" className="border-y border-outline-variant bg-surface-container backdrop-blur-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant">
                                <div className="text-3xl sm:text-4xl font-extrabold text-primary">
                                    {defaultStats.questions}+
                                </div>
                                <div className="mt-1 text-sm font-medium text-outline flex items-center justify-center gap-1.5">
                                    <MessageSquare className="size-4 text-primary" />
                                    <span>Questions Asked</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant">
                                <div className="text-3xl sm:text-4xl font-extrabold text-secondary">
                                    {defaultStats.answers}+
                                </div>
                                <div className="mt-1 text-sm font-medium text-outline flex items-center justify-center gap-1.5">
                                    <Zap className="size-4 text-secondary" />
                                    <span>Solutions Provided</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant">
                                <div className="text-3xl sm:text-4xl font-extrabold text-tertiary">
                                    {defaultStats.projects}+
                                </div>
                                <div className="mt-1 text-sm font-medium text-outline flex items-center justify-center gap-1.5">
                                    <Code2 className="size-4 text-tertiary" />
                                    <span>Student Projects</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant">
                                <div className="text-3xl sm:text-4xl font-extrabold text-green-600">
                                    {defaultStats.subjects}+
                                </div>
                                <div className="mt-1 text-sm font-medium text-outline flex items-center justify-center gap-1.5">
                                    <BookOpen className="size-4 text-green-600" />
                                    <span>Active Subjects</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Features Grid */}
                <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-primary">Platform Features</h2>
                        <p className="mt-3 text-3xl sm:text-4xl font-extrabold text-on-surface">Everything You Need to Excel & Innovate</p>
                        <p className="mt-4 text-outline">Designed specifically for academic collaboration, peer mentorship, and engineering showcase.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Card 1 */}
                        <div className="group p-8 rounded-3xl bg-surface-container-low border border-outline-variant hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col justify-between">
                            <div>
                                <div className="size-14 rounded-2xl bg-primary/10 border border-indigo-500/20 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                                    <MessageSquare className="size-7" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-on-surface">Discussion Q&A Forum</h3>
                                <p className="mt-3 text-sm text-outline leading-relaxed">
                                    Post course doubts anonymously or publicly. Receive community upvotes and accepted answer badges from subject experts.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-outline-variant flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                                <span>Explore Q&A</span>
                                <ArrowRight className="size-3.5 ml-1" />
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group p-8 rounded-3xl bg-surface-container-low border border-outline-variant hover:border-secondary transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/10 flex flex-col justify-between">
                            <div>
                                <div className="size-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-secondary flex items-center justify-center group-hover:scale-110 group-hover:bg-secondary-container transition-all">
                                    <Users className="size-7" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-on-surface">Peer & Faculty Mentorship</h3>
                                <p className="mt-3 text-sm text-outline leading-relaxed">
                                    Connect directly with high-performing seniors and professors for personalized guidance, project reviews, and exam tips.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-outline-variant flex items-center text-xs font-semibold text-secondary group-hover:translate-x-1 transition-transform">
                                <span>Find Mentors</span>
                                <ArrowRight className="size-3.5 ml-1" />
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group p-8 rounded-3xl bg-surface-container-low border border-outline-variant hover:border-tertiary transition-all duration-300 hover:shadow-2xl hover:shadow-tertiary/10 flex flex-col justify-between" id="showcase">
                            <div>
                                <div className="size-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-tertiary flex items-center justify-center group-hover:scale-110 group-hover:bg-tertiary-container transition-all">
                                    <Award className="size-7" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-on-surface">Talent & Project Showcase</h3>
                                <p className="mt-3 text-sm text-outline leading-relaxed">
                                    Publish your software projects, repositories, and research. Gain recognition from peers and build a standout portfolio.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-outline-variant flex items-center text-xs font-semibold text-tertiary group-hover:translate-x-1 transition-transform">
                                <span>View Showcase</span>
                                <ArrowRight className="size-3.5 ml-1" />
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="group p-8 rounded-3xl bg-surface-container-low border border-outline-variant hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 flex flex-col justify-between">
                            <div>
                                <div className="size-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-green-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-green-200 transition-all">
                                    <BookOpen className="size-7" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-on-surface">Resource & Notice Hub</h3>
                                <p className="mt-3 text-sm text-outline leading-relaxed">
                                    Access semester notes, assignment deadlines, curated solution files, and instant institution broadcast announcements.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-outline-variant flex items-center text-xs font-semibold text-green-600 group-hover:translate-x-1 transition-transform">
                                <span>Browse Hub</span>
                                <ArrowRight className="size-3.5 ml-1" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Role Tabs Section */}
                <section id="community" className="py-20 bg-surface border-t border-outline-variant/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-secondary">Tailored Ecosystem</h2>
                            <p className="mt-3 text-3xl sm:text-4xl font-extrabold text-on-surface">Built for Every Academic Role</p>
                        </div>

                        {/* Tab Buttons */}
                        <div className="flex justify-center gap-3 mb-12">
                            <button
                                onClick={() => setActiveTab('students')}
                                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                                    activeTab === 'students'
                                        ? 'bg-primary text-on-primary shadow-lg shadow-primary/30'
                                        : 'bg-surface-container-low border border-outline-variant text-outline hover:text-on-surface'
                                }`}
                            >
                                For Students
                            </button>
                            <button
                                onClick={() => setActiveTab('teachers')}
                                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                                    activeTab === 'teachers'
                                        ? 'bg-primary text-on-primary shadow-lg shadow-primary/30'
                                        : 'bg-surface-container-low border border-outline-variant text-outline hover:text-on-surface'
                                }`}
                            >
                                For Teachers & Mentors
                            </button>
                            <button
                                onClick={() => setActiveTab('admins')}
                                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                                    activeTab === 'admins'
                                        ? 'bg-primary text-on-primary shadow-lg shadow-primary/30'
                                        : 'bg-surface-container-low border border-outline-variant text-outline hover:text-on-surface'
                                }`}
                            >
                                For Institution Admins
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="max-w-4xl mx-auto rounded-3xl bg-surface-container-low border border-outline-variant p-8 sm:p-12 shadow-2xl">
                            {activeTab === 'students' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-primary font-bold text-xl">
                                        <GraduationCap className="size-6" />
                                        <span>Empowering Student Journeys</span>
                                    </div>
                                    <p className="text-on-surface-variant leading-relaxed">
                                        Whether you are struggling with a tricky algorithm assignment or looking for peers to collaborate on a hackathon project, GMC Backbenchers gives you the tools to succeed.
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Ask questions anonymously without fear of judgment</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Track all your semester assignments & deadlines</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Showcase your portfolio to recruiters & peers</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Request 1-on-1 mentorship from top-performing seniors</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'teachers' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-secondary font-bold text-xl">
                                        <BookOpen className="size-6" />
                                        <span>Streamlined Teaching & Mentoring</span>
                                    </div>
                                    <p className="text-on-surface-variant leading-relaxed">
                                        Faculty and mentors can effectively publish subject courseware, evaluate student submissions, provide feedback, and host dedicated mentorship slots.
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-secondary shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Manage subject discussions and mark verified solutions</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-secondary shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Grade assignment submissions with custom feedback</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-secondary shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Accept and complete mentorship requests seamlessly</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-secondary shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Broadcast important announcements to your classes</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'admins' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-green-600 font-bold text-xl">
                                        <ShieldCheck className="size-6" />
                                        <span>Institutional Administration</span>
                                    </div>
                                    <p className="text-on-surface-variant leading-relaxed">
                                        Institution administrators gain full control over semester structures, subject allocations, teacher assignments, and enrollment metrics.
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-green-600 shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Manage institution semesters and subject curricula</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-green-600 shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Assign faculty teachers to specific subjects</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-green-600 shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Monitor student enrollment and academic metrics</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-outline-variant">
                                            <Check className="size-5 text-green-600 shrink-0 mt-0.5" />
                                            <span className="text-sm text-on-surface-variant">Ensure security, compliance, and user roles</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Final Call To Action Banner */}
                <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden bg-primary-container p-10 sm:p-16 text-center border border-indigo-500/30 shadow-2xl">
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-5xl font-black text-on-surface leading-tight">
                                Ready to Upgrade Your Academic Experience?
                            </h2>
                            <p className="mt-6 text-on-primary text-lg">
                                Join hundreds of students, educators, and mentors already using GMC Backbenchers to learn, collaborate, and innovate together.
                            </p>
                            <div className="mt-10 flex flex-wrap justify-center gap-4">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-surface text-on-surface font-extrabold text-base hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-0.5"
                                    >
                                        <span>Go to Dashboard</span>
                                        <ArrowRight className="size-5" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-surface text-on-surface font-extrabold text-base hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-0.5"
                                        >
                                            <span>Create Free Account</span>
                                            <Sparkles className="size-5 text-primary" />
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary-container border border-indigo-400/40 text-on-surface font-bold text-base hover:bg-primary-container transition-all"
                                        >
                                            <span>Sign In</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-outline-variant bg-background py-12 text-outline text-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                                <GraduationCap className="size-5 text-on-surface" />
                            </div>
                            <span className="font-bold text-on-surface tracking-tight">GMC Backbenchers</span>
                        </div>

                        <div className="flex items-center gap-6 text-xs font-medium text-outline">
                            <span>Laravel v{laravelVersion}</span>
                            <span>•</span>
                            <span>PHP v{phpVersion}</span>
                            <span>•</span>
                            <span>Inertia.js + React</span>
                        </div>

                        <p className="text-xs text-outline-variant">
                            &copy; {new Date().getFullYear()} GMC Backbenchers. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

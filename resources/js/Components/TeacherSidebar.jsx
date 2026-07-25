import { Link, usePage } from '@inertiajs/react';

export default function TeacherSidebar() {
    const { url } = usePage();
    const user = usePage().props.auth.user;

    const isActive = (path) => url.startsWith(path);

    return (
        <aside className="fixed left-0 top-0 h-screen flex flex-col py-6 overflow-y-auto w-64 bg-surface-container-lowest/80 backdrop-blur-xl border-r border-outline-variant/20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 sidebar-scroll">
            <div className="px-6 mb-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                </div>
                <div>
                    <h1 className="font-headline-md text-headline-md font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" style={{ fontSize: '20px', lineHeight: '28px' }}>
                        Academic Nexus
                    </h1>
                    <p className="font-label-md text-label-md text-on-surface-variant font-medium tracking-wide">Teacher Portal</p>
                </div>
            </div>
            
            <nav className="flex-1 px-3">
                <ul className="space-y-1.5">
                    <li>
                        <Link
                            href={route('dashboard')}
                            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 group ${
                                isActive('/dashboard') || url === '/'
                                    ? 'text-primary bg-primary/10 shadow-sm'
                                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                            }`}
                        >
                            <span className={`material-symbols-outlined transition-transform duration-200 ${isActive('/dashboard') ? 'scale-110' : 'group-hover:scale-110'}`}>dashboard</span>
                            <span className="font-label-md text-label-md">Dashboard</span>
                        </Link>
                    </li>
                    
                    <div className="pt-4 pb-2 px-4">
                        <p className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-wider">Teaching Hub</p>
                    </div>

                    <li>
                        <Link
                            href="#"
                            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 group ${
                                isActive('/classes')
                                    ? 'text-primary bg-primary/10 shadow-sm'
                                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                            }`}
                        >
                            <span className={`material-symbols-outlined transition-transform duration-200 ${isActive('/classes') ? 'scale-110' : 'group-hover:scale-110'}`}>local_library</span>
                            <span className="font-label-md text-label-md">My Classes</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('questions.index')}
                            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 group ${
                                isActive('/questions')
                                    ? 'text-primary bg-primary/10 shadow-sm'
                                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                            }`}
                        >
                            <span className={`material-symbols-outlined transition-transform duration-200 ${isActive('/questions') ? 'scale-110' : 'group-hover:scale-110'}`}>forum</span>
                            <span className="font-label-md text-label-md relative">
                                Anonymous Q&A
                                <span className="absolute -top-1 -right-3 flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                                </span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('assignments.index')}
                            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 group ${
                                isActive('/assignments')
                                    ? 'text-primary bg-primary/10 shadow-sm'
                                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                            }`}
                        >
                            <span className={`material-symbols-outlined transition-transform duration-200 ${isActive('/assignments') ? 'scale-110' : 'group-hover:scale-110'}`}>assignment</span>
                            <span className="font-label-md text-label-md">Assignments</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('resources.index')}
                            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 group ${
                                isActive('/resources')
                                    ? 'text-primary bg-primary/10 shadow-sm'
                                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                            }`}
                        >
                            <span className={`material-symbols-outlined transition-transform duration-200 ${isActive('/resources') ? 'scale-110' : 'group-hover:scale-110'}`}>folder_open</span>
                            <span className="font-label-md text-label-md">Resources</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('grievances.feed')}
                            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 group ${
                                isActive('/grievances')
                                    ? 'text-error bg-error/10 shadow-sm'
                                    : 'text-on-surface-variant hover:bg-error/5 hover:text-error'
                            }`}
                        >
                            <span className={`material-symbols-outlined transition-transform duration-200 ${isActive('/grievances') ? 'scale-110' : 'group-hover:scale-110'}`}>report</span>
                            <span className="font-label-md text-label-md">Grievances</span>
                        </Link>
                    </li>

                    <div className="pt-6 pb-2 px-4 mt-auto">
                        <div className="h-px bg-outline-variant/20 w-full mb-2"></div>
                    </div>

                    <li>
                        <Link
                            href={route('profile.edit')}
                            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 group ${
                                isActive('/profile')
                                    ? 'text-primary bg-primary/10 shadow-sm'
                                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                            }`}
                        >
                            <span className={`material-symbols-outlined transition-transform duration-200 ${isActive('/profile') ? 'scale-110' : 'group-hover:scale-110'}`}>settings</span>
                            <span className="font-label-md text-label-md">Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            
            {/* Quick Profile Snippet at bottom */}
            <div className="p-4 mx-3 mt-4 mb-2 bg-surface-container rounded-xl border border-outline-variant/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {user?.name?.charAt(0) || 'T'}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">{user?.name}</p>
                    <p className="text-[10px] text-on-surface-variant truncate">{user?.email}</p>
                </div>
            </div>
        </aside>
    );
}

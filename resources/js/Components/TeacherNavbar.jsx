import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NotificationBell from '@/Components/NotificationBell';

export default function TeacherNavbar() {
    const { url } = usePage();
    const user = usePage().props.auth.user;

    const isActive = (path) => url.startsWith(path);

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'My Classes', path: '/classes', icon: 'local_library' },
        { name: 'Anonymous Q&A', path: '/questions', icon: 'forum', badge: true },
        { name: 'Assignments', path: '/assignments', icon: 'assignment' },
        { name: 'Resources', path: '/resources', icon: 'folder_open' },
        { name: 'Grievances', path: '/grievances', icon: 'report' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] w-full font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Brand / Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 transform hover:scale-105 transition-transform duration-300">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-extrabold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent tracking-tight leading-tight">
                                Academic Nexus
                            </h1>
                            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Teacher Portal</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                        {navLinks.map((link) => {
                            const active = isActive(link.path) || (link.path === '/dashboard' && url === '/');
                            return (
                                <Link
                                    key={link.name}
                                    href={link.path !== '/classes' ? route(link.path.replace('/', '') + (link.path === '/dashboard' ? '' : link.path === '/grievances' ? '.feed' : '.index')) : '#'}
                                    className={`relative flex items-center gap-2 px-3 lg:px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 group overflow-hidden ${
                                        active 
                                        ? 'text-primary bg-primary/10 shadow-sm' 
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    {/* Hover background slide effect */}
                                    {!active && <span className="absolute inset-0 w-0 bg-gray-100 transition-all duration-300 ease-out group-hover:w-full -z-10 rounded-xl"></span>}
                                    
                                    <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
                                        {link.icon}
                                    </span>
                                    <span className="text-sm z-10">{link.name}</span>
                                    
                                    {link.badge && (
                                        <span className="absolute top-2 right-2 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right side: Search, Notifications, Profile */}
                    <div className="flex items-center gap-3 sm:gap-5">
                        
                        {/* Interactive Search (Expandable on hover/focus) */}
                        <div className="relative group hidden lg:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors z-10">search</span>
                            <input 
                                className="w-10 sm:w-48 lg:w-64 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-primary/40 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none cursor-pointer focus:cursor-text" 
                                placeholder="Search..." 
                                type="text" 
                            />
                        </div>

                        <NotificationBell />
                        
                        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                        
                        {/* Profile Dropdown */}
                        <div className="flex items-center gap-2 cursor-pointer group relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-3 focus:outline-none">
                                        <div className="text-right hidden xl:block">
                                            <p className="text-sm font-bold text-gray-900 leading-tight">{user.name}</p>
                                            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Teacher</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white shadow-md shadow-primary/20 uppercase font-extrabold text-lg group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <span className="relative z-10">{user.name.charAt(0)}</span>
                                        </div>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right">
                                    <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">settings</span> Profile Settings
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" onClick={(e) => { if (!confirm('Do you want to logout?')) e.preventDefault(); }} className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                                        <span className="material-symbols-outlined text-[18px]">logout</span> Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile Navigation Bar (Bottom) - Only visible on small screens */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center shadow-[0_-4px_20px_rgb(0,0,0,0.05)] z-50">
                {navLinks.slice(0, 5).map((link) => {
                    const active = isActive(link.path) || (link.path === '/dashboard' && url === '/');
                    return (
                        <Link
                            key={link.name}
                            href={link.path !== '/classes' ? route(link.path.replace('/', '') + (link.path === '/dashboard' ? '' : link.path === '/grievances' ? '.feed' : '.index')) : '#'}
                            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                                active ? 'text-primary' : 'text-gray-400'
                            }`}
                        >
                            <span className={`material-symbols-outlined text-[24px] ${active ? 'fill-current' : ''}`}>
                                {link.icon}
                            </span>
                            <span className="text-[9px] font-bold mt-1">{link.name.split(' ')[0]}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

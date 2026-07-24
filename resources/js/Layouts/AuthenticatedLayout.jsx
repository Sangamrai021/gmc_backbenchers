import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import SuperAdminSidebar from '@/Components/SuperAdminSidebar';
import StudentSidebar from '@/Components/StudentSidebar';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    if (user?.role === 'super_admin') {
        return (
            <div className="min-h-screen bg-gray-100 flex font-sans">
                <SuperAdminSidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <nav className="border-b border-gray-200 bg-white sticky top-0 z-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
                                        Super Admin Mode
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content align="right">
                                            <Dropdown.Link href={route('profile.edit')}>
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {header && (
                        <header className="bg-white shadow-sm border-b border-gray-200">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
                </div>
            </div>
        );
    }

    if (user?.role === 'student') {
        return (
            <div className="bg-background text-on-background font-body-md overflow-hidden flex h-screen">
                <StudentSidebar />
                <div className="flex-1 ml-72 h-screen overflow-y-auto scroll-smooth">
                    <header className="sticky top-0 z-40 bg-background flex justify-between items-center px-margin-desktop py-6 max-w-container-max mx-auto">
                        <div>
                            {typeof header === 'string' ? (
                                <h2 className="font-headline-md text-headline-md text-primary font-bold">{header}</h2>
                            ) : (
                                header || <h2 className="font-headline-md text-headline-md text-primary font-bold">LMS Dashboard</h2>
                            )}
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="relative hidden lg:block w-80">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                                <input className="w-full pl-10 pr-4 py-2 bg-white border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-body-md" placeholder="Search courses, notes..." type="text" />
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
                                    <span className="material-symbols-outlined">notifications</span>
                                </button>
                                <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className="flex items-center gap-3 focus:outline-none">
                                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white ring-2 ring-primary uppercase font-bold text-lg">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div className="hidden sm:block text-left">
                                                    <p className="font-label-md text-label-md text-on-surface leading-tight">{user.name}</p>
                                                    <p className="text-label-sm text-outline leading-tight">Student</p>
                                                </div>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content align="right">
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className="px-margin-desktop pb-20 max-w-container-max mx-auto">
                        {children}
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('questions.index')}
                                    active={route().current('questions.*')}
                                >
                                    Questions
                                </NavLink>
                                <NavLink
                                    href={route('assignments.index')}
                                    active={route().current('assignments.*')}
                                >
                                    Assignments
                                </NavLink>
                                <NavLink
                                    href={route('resources.index')}
                                    active={route().current('resources.*')}
                                >
                                    Resources
                                </NavLink>
                                <NavLink
                                    href={route('announcements.index')}
                                    active={route().current('announcements.*')}
                                >
                                    Announcements
                                </NavLink>
                                {user.role === 'institution_admin' && (
                                    <NavLink
                                        href={route('admin.dashboard')}
                                        active={route().current('admin.*')}
                                    >
                                        Manage
                                    </NavLink>
                                )}
                                {user.role === 'super_admin' && (
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('admin.*')}
                                    >
                                        Admin
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('questions.index')}
                            active={route().current('questions.*')}
                        >
                            Questions
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('assignments.index')}
                            active={route().current('assignments.*')}
                        >
                            Assignments
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('resources.index')}
                            active={route().current('resources.*')}
                        >
                            Resources
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('announcements.index')}
                            active={route().current('announcements.*')}
                        >
                            Announcements
                        </ResponsiveNavLink>
                        {user.role === 'institution_admin' && (
                            <ResponsiveNavLink
                                href={route('admin.dashboard')}
                                active={route().current('admin.*')}
                            >
                                Manage
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

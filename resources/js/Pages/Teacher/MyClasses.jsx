import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function MyClasses({ auth, subjects }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Classes</h2>}
        >
            <Head title="My Classes" />

            <div className="py-12 bg-[#f8fafc] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent mb-2 tracking-tight">
                                Teaching Hub
                            </h1>
                            <p className="text-gray-500 font-medium">
                                View and manage the classes and subjects assigned to you for the current academic session.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <span className="material-symbols-outlined text-[24px]">menu_book</span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Subjects</p>
                                <p className="text-xl font-black text-gray-900 leading-none mt-1">{subjects.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Classes Grid */}
                    {subjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {subjects.map((subject, index) => (
                                <div 
                                    key={subject.id} 
                                    className="group relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Decorative gradient blob */}
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/10 to-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                                    <div className="relative z-10 flex-1">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-blue-50 text-primary rounded-2xl flex items-center justify-center border border-indigo-100/50 shadow-inner">
                                                <span className="material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform duration-300">import_contacts</span>
                                            </div>
                                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
                                                {subject.code}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                                            {subject.name}
                                        </h3>

                                        <div className="flex items-center gap-2 mt-4 text-gray-600">
                                            <span className="material-symbols-outlined text-[18px] text-gray-400">school</span>
                                            <p className="text-sm font-medium">{subject.semester?.name}</p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 text-gray-500">
                                            <span className="material-symbols-outlined text-[18px] text-gray-400">domain</span>
                                            <p className="text-sm">{subject.semester?.institution?.name}</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 relative z-10 pt-4 border-t border-gray-50">
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link 
                                                href={route('assignments.index', { subject_id: subject.id })} 
                                                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">assignment</span>
                                                Assignments
                                            </Link>
                                            <Link 
                                                href={route('questions.index', { subject_id: subject.id })} 
                                                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-semibold transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">forum</span>
                                                Q&A
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto mt-10">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                                <span className="material-symbols-outlined text-[48px]">sentiment_dissatisfied</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Classes Assigned</h3>
                            <p className="text-gray-500">You currently do not have any subjects assigned to you for this academic session. Please contact the institution administrator.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

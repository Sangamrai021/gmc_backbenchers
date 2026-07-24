import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ institutions, filters, totalInstitutions }) {
    const [search, setSearch] = useState(filters.search || '');
    const [showModal, setShowModal] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        type: 'college',
        address: '',
        admin_name: '',
        admin_email: '',
        admin_password: '',
    });
    const [errors, setErrors] = useState({});

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        router.get(
            route('admin.institutions'),
            { search: val },
            { preserveState: true, replace: true }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        router.post(route('admin.institutions.store'), formData, {
            onSuccess: () => {
                setShowModal(false);
                setFormData({
                    name: '',
                    type: 'college',
                    address: '',
                    admin_name: '',
                    admin_email: '',
                    admin_password: '',
                });
            },
            onError: (errs) => {
                setErrors(errs);
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold leading-tight text-gray-900">
                            Institution Management
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            View and manage all registered institutions on the platform
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-semibold">
                            Total Institutions: {totalInstitutions}
                        </span>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md shadow-purple-600/30 transition-all"
                        >
                            + Add Institution
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Admin - Institutions List" />

            <div className="space-y-6">
                {/* Filter and Search Bar */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search by name or address..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                </div>

                {/* Paginated Institutions Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-3.5">Institution</th>
                                    <th className="px-6 py-3.5">Type</th>
                                    <th className="px-6 py-3.5">Address</th>
                                    <th className="px-6 py-3.5">Admin</th>
                                    <th className="px-6 py-3.5">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-sm">
                                {institutions.data.length > 0 ? (
                                    institutions.data.map((institution) => {
                                        const admin = institution.users?.find(u => u.pivot?.role === 'institution_admin') || institution.users?.[0];
                                        return (
                                            <tr key={institution.id} className="hover:bg-gray-50/80 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0">
                                                            {institution.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{institution.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-200 capitalize">
                                                        {institution.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    {institution.address}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {admin ? (
                                                        <div>
                                                            <p className="text-gray-900 font-medium text-xs">{admin.name}</p>
                                                            <p className="text-gray-500 text-[11px]">{admin.email}</p>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 italic text-xs">No Admin assigned</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-xs text-gray-600">
                                                    {new Date(institution.created_at).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                                            No institutions found matching the selected filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    {institutions.links && institutions.links.length > 3 && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{institutions.from || 0}</span> to{' '}
                                <span className="font-semibold text-gray-900">{institutions.to || 0}</span> of{' '}
                                <span className="font-semibold text-gray-900">{institutions.total}</span> institutions
                            </p>

                            <div className="flex items-center gap-1">
                                {institutions.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        preserveScroll
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                            link.active
                                                ? 'bg-purple-600 text-white font-bold'
                                                : link.url
                                                ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Institution Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Add New Institution</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto">
                            <form id="create-institution-form" onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 pb-2 border-b">Institution Details</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="col-span-1 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm" />
                                            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                            <select name="type" value={formData.type} onChange={handleChange} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm">
                                                <option value="school">School</option>
                                                <option value="college">College</option>
                                                <option value="university">University</option>
                                                <option value="institute">Institute</option>
                                            </select>
                                            {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type}</p>}
                                        </div>
                                        <div className="col-span-1 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                            <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm" />
                                            {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 pb-2 border-b">Institution Admin Account</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Full Name</label>
                                            <input type="text" name="admin_name" value={formData.admin_name} onChange={handleChange} required className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm" />
                                            {errors.admin_name && <p className="text-xs text-red-600 mt-1">{errors.admin_name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                                            <input type="email" name="admin_email" value={formData.admin_email} onChange={handleChange} required className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm" />
                                            {errors.admin_email && <p className="text-xs text-red-600 mt-1">{errors.admin_email}</p>}
                                        </div>
                                        <div className="col-span-1 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Initial Password</label>
                                            <input type="password" name="admin_password" value={formData.admin_password} onChange={handleChange} required minLength="8" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm" />
                                            {errors.admin_password && <p className="text-xs text-red-600 mt-1">{errors.admin_password}</p>}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3 rounded-b-2xl">
                            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Cancel
                            </button>
                            <button type="submit" form="create-institution-form" className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm">
                                Create Institution & Admin
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

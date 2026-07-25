import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <SuperAdminLayout activeItem="Institution Admins">
            <Head title="Institution Admins" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Institution Admins Management</h3>
                            <p className="text-gray-600">
                                This page is currently under construction. Here you will be able to manage institution administrators, assign them to institutions, and monitor their activities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
}

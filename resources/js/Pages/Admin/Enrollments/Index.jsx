import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function EnrollmentIndex({ enrollments }) {
    const handleRemove = (enrollment) => {
        if (confirm(`Remove ${enrollment.student?.name} from ${enrollment.semester?.name}?`)) {
            router.delete(route('admin.enrollments.remove', {
                semester: enrollment.semester_id,
                student: enrollment.student_id,
            }));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Enrollments</h2>}
        >
            <Head title="Enrollments" />

            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    {enrollments.data.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <p className="text-gray-500">No enrollments yet.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {enrollments.data.map((enrollment) => (
                                        <tr key={enrollment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{enrollment.student?.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{enrollment.semester?.name}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-2 py-1 text-xs rounded-full ${enrollment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {enrollment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{enrollment.joined_at ? new Date(enrollment.joined_at).toLocaleDateString() : '-'}</td>
                                            <td className="px-6 py-4 text-right text-sm">
                                                <button onClick={() => handleRemove(enrollment)} className="text-red-600 hover:text-red-800">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

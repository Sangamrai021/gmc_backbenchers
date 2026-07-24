import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ assignments }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Assignments</h2>
                    <Link
                        href={route('assignments.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none transition"
                    >
                        Create Assignment
                    </Link>
                </div>
            }
        >
            <Head title="Assignments" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {assignments.data.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No assignments yet.</p>
                            <Link
                                href={route('assignments.create')}
                                className="mt-2 inline-block text-indigo-600 hover:text-indigo-800"
                            >
                                Create the first assignment
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {assignments.data.map((assignment) => (
                                <Link
                                    key={assignment.id}
                                    href={route('assignments.show', assignment.id)}
                                    className="block bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:border-indigo-300 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{assignment.description}</p>
                                        </div>
                                        <div className="text-right text-sm text-gray-500 shrink-0 ml-4">
                                            <div>{assignment.subject?.name}</div>
                                            <div className="mt-1">{assignment.max_score ? `${assignment.max_score} pts` : 'No score'}</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                        <span>Due: {new Date(assignment.due_date).toLocaleDateString()}</span>
                                        <span>By: {assignment.teacher?.name}</span>
                                        <span>{assignment.allow_late_submission ? 'Late OK' : 'No late'}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {assignments.total > assignments.per_page && (
                        <div className="mt-6 flex justify-center gap-2">
                            {assignments.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 text-sm rounded ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

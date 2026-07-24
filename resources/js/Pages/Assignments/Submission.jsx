import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function SubmissionView({ submission }) {
    const { auth } = usePage().props;
    const [score, setScore] = useState(submission.score || '');
    const [feedback, setFeedback] = useState(submission.feedback || '');

    const canGrade = auth.user.role === 'teacher' || auth.user.role === 'super_admin' || auth.user.role === 'institution_admin';
    const isOwner = auth.user.id === submission.student_id;

    const handleGrade = (e) => {
        e.preventDefault();
        router.put(route('assignments.submissions.update', submission.id), {
            score,
            feedback,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link
                        href={route('assignments.show', submission.assignment_id)}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                        &larr; Back to Assignment
                    </Link>
                </div>
            }
        >
            <Head title="Submission" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-xl font-bold text-gray-900">
                                Submission by {submission.student?.name}
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                    submission.status === 'graded'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {submission.status}
                                </span>
                                {submission.is_late && (
                                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-orange-100 text-orange-800">
                                        Late
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-700 whitespace-pre-wrap mb-4">{submission.content}</p>

                        {submission.file_url && (
                            <div className="mb-4">
                                <a
                                    href={submission.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                                >
                                    Attached file: {submission.file_url}
                                </a>
                            </div>
                        )}

                        <div className="text-sm text-gray-500 mb-4">
                            Submitted: {new Date(submission.submitted_at).toLocaleString()}
                        </div>

                        {submission.status === 'graded' && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <p className="font-medium text-gray-900">
                                    Score: {submission.score}/{submission.assignment?.max_score || 'N/A'}
                                </p>
                                {submission.feedback && (
                                    <p className="mt-2 text-gray-700">
                                        <span className="font-medium">Feedback:</span> {submission.feedback}
                                    </p>
                                )}
                            </div>
                        )}

                        {canGrade && (
                            <form onSubmit={handleGrade} className="mt-6 border-t pt-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Grade Submission</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Score (max: {submission.assignment?.max_score || 'N/A'})
                                        </label>
                                        <input
                                            type="number"
                                            value={score}
                                            onChange={(e) => setScore(e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            min="0"
                                            max={submission.assignment?.max_score || 999999}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        {submission.status === 'graded' ? 'Update Grade' : 'Submit Grade'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {isOwner && submission.status === 'submitted' && (
                            <div className="mt-6 text-center text-sm text-gray-500">
                                Waiting for teacher to grade your submission.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

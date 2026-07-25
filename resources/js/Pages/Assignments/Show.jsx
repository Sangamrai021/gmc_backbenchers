import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ assignment, submission }) {
    const { auth } = usePage().props;
    const [showSubmitForm, setShowSubmitForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
        files: [],
    });

    const isTeacherOwner = auth.user.role === 'teacher' && assignment.teacher_id === auth.user.id;
    const canEdit = isTeacherOwner || auth.user.role === 'super_admin' || auth.user.role === 'institution_admin';

    const handleDelete = () => {
        if (confirm('Delete this assignment?')) {
            router.delete(route('assignments.destroy', assignment.id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('assignments.submissions.store', assignment.id), {
            onSuccess: () => {
                reset();
                setShowSubmitForm(false);
            },
        });
    };

    const isPastDue = assignment.due_date && new Date(assignment.due_date) < new Date();
    const canSubmit = auth.user.role === 'student' && !submission && (!isPastDue || assignment.allow_late_submission);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={route('assignments.index')} className="text-sm text-indigo-600 hover:text-indigo-800">
                            &larr; Back to Assignments
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        {canEdit && (
                            <Link
                                href={route('assignments.edit', assignment.id)}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Edit
                            </Link>
                        )}
                        {canEdit && (
                            <button onClick={handleDelete} className="text-sm text-red-600 hover:text-red-800 font-medium">
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={assignment.title} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-gray-500">{assignment.subject?.name}</span>
                            <span className="text-xs text-gray-400">|</span>
                            <span className="text-xs text-gray-500">{assignment.max_score ? `${assignment.max_score} points` : 'No score'}</span>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-3">{assignment.title}</h1>
                        <p className="text-gray-700 whitespace-pre-wrap mb-4">{assignment.description}</p>

                        <div className="border-t pt-4 mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <span className="font-medium">Due Date:</span>{' '}
                                <span className={isPastDue ? 'text-red-600 font-medium' : ''}>
                                    {new Date(assignment.due_date).toLocaleDateString()}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">Teacher:</span> {assignment.teacher?.name}
                            </div>
                            <div>
                                <span className="font-medium">Late Submission:</span>{' '}
                                {assignment.allow_late_submission ? 'Allowed' : 'Not allowed'}
                            </div>
                            <div>
                                <span className="font-medium">Subject:</span> {assignment.subject?.name}
                            </div>
                        </div>
                    </div>

                    {auth.user.role === 'student' && (
                        <div className="mt-8">
                            {submission ? (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Submission</h3>
                                    <p className="text-gray-700 whitespace-pre-wrap mb-2">{submission.content}</p>
                                    {submission.file_urls && submission.file_urls.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-sm font-medium text-gray-700 mb-1">Attached Files:</p>
                                            <ul className="list-disc pl-5">
                                                {submission.file_urls.map((url, index) => (
                                                    <li key={index}>
                                                        <a href={url} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 hover:underline">
                                                            Attachment {index + 1}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                                        <span>Status: <span className="font-medium">{submission.status}</span></span>
                                        {submission.is_late && <span className="text-orange-600 font-medium">Late</span>}
                                        <span>Submitted: {new Date(submission.submitted_at).toLocaleString()}</span>
                                    </div>
                                    {submission.status === 'graded' && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <p className="font-medium text-gray-900">Score: <span className="text-lg">{submission.score}/{assignment.max_score}</span></p>
                                            {submission.feedback && (
                                                <p className="mt-2 text-gray-700"><span className="font-medium">Feedback:</span> {submission.feedback}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : canSubmit ? (
                                <div>
                                    {showSubmitForm ? (
                                        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-5">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Submit Your Work</h4>
                                            <textarea
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                rows={5}
                                                placeholder="Write your answer..."
                                            />
                                            {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
                                            <div className="mt-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Files (optional)</label>
                                                <input
                                                    type="file"
                                                    multiple
                                                    onChange={(e) => setData('files', Array.from(e.target.files))}
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                                                />
                                                {errors.files && <p className="text-sm text-red-600 mt-1">{errors.files}</p>}
                                            </div>
                                            <div className="mt-3 flex gap-2 justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowSubmitForm(false)}
                                                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button
                                            onClick={() => setShowSubmitForm(true)}
                                            className="w-full py-3 text-sm text-indigo-600 bg-indigo-50 rounded-lg border border-dashed border-indigo-300 hover:bg-indigo-100 transition-colors"
                                        >
                                            {isPastDue ? 'Submit Late' : 'Submit Your Work'}
                                        </button>
                                    )}
                                </div>
                            ) : isPastDue && !assignment.allow_late_submission ? (
                                <div className="bg-red-50 rounded-lg border border-red-200 p-4 text-sm text-red-700">
                                    Late submissions are not allowed for this assignment.
                                </div>
                            ) : null}
                        </div>
                    )}

                    {canEdit && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submissions</h3>
                            <p className="text-sm text-gray-500">Submissions management will be available here.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

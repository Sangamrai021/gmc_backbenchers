import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnswerCard from '@/Components/AnswerCard';
import VoteButtons from '@/Components/VoteButtons';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ discussion, permissions }) {
    const { auth } = usePage().props;
    const [showAnswerForm, setShowAnswerForm] = useState(false);
    const [answerBody, setAnswerBody] = useState('');
    const [answerAnonymous, setAnswerAnonymous] = useState(false);

    const isOwner = auth.user.id === discussion.user_id;
    const canDelete = permissions?.delete || false;

    const handleDelete = () => {
        if (confirm('Delete this question?')) {
            router.delete(route('questions.destroy', discussion.id));
        }
    };

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        router.post(route('questions.answers.store', discussion.id), {
            body: answerBody,
            is_anonymous: answerAnonymous,
        }, {
            onSuccess: () => {
                setAnswerBody('');
                setShowAnswerForm(false);
            }
        });
    };

    const handleVote = (type) => {
        router.post(route('questions.vote'), {
            votable_type: 'discussion',
            votable_id: discussion.id,
            type: type,
        });
    };

    const statusColors = {
        open: 'bg-green-100 text-green-800',
        answered: 'bg-blue-100 text-blue-800',
        closed: 'bg-gray-100 text-gray-800',
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={route('questions.index')} className="text-sm text-indigo-600 hover:text-indigo-800">
                            &larr; Back to Questions
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        {isOwner && (
                            <Link
                                href={route('questions.edit', discussion.id)}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Edit
                            </Link>
                        )}
                        {canDelete && (
                            <button onClick={handleDelete} className="text-sm text-red-600 hover:text-red-800 font-medium">
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={discussion.title} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex gap-4">
                            <VoteButtons
                                votableType="discussion"
                                votableId={discussion.id}
                                upvotes={discussion.upvotes_count}
                                downvotes={discussion.downvotes_count}
                            />

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[discussion.status]}`}>
                                        {discussion.status}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {discussion.discussionable_type === 'subject'
                                            ? discussion.discussionable?.name
                                            : discussion.discussionable_type}
                                    </span>
                                </div>

                                <h1 className="text-2xl font-bold text-gray-900 mb-3">{discussion.title}</h1>
                                <p className="text-gray-700 whitespace-pre-wrap mb-4">{discussion.body}</p>

                                <div className="flex items-center gap-4 text-sm text-gray-500 border-t pt-3">
                                    <span>by {discussion.author_name}</span>
                                    <span>{discussion.answers_count} {discussion.answers_count === 1 ? 'answer' : 'answers'}</span>
                                    <span>{new Date(discussion.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {discussion.answers_count} {discussion.answers_count === 1 ? 'Answer' : 'Answers'}
                        </h3>

                        <div className="space-y-4">
                            {discussion.answers.map((answer) => (
                                <AnswerCard
                                    key={answer.id}
                                    answer={answer}
                                    discussionUserId={discussion.user_id}
                                    canAccept={permissions?.update}
                                />
                            ))}
                        </div>

                        {discussion.status !== 'closed' && (
                            <div className="mt-8">
                                {showAnswerForm ? (
                                    <form onSubmit={handleSubmitAnswer} className="bg-white rounded-lg border border-gray-200 p-5">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Your Answer</h4>
                                        <textarea
                                            value={answerBody}
                                            onChange={(e) => setAnswerBody(e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            rows={5}
                                            placeholder="Write your answer..."
                                            required
                                        />
                                        <div className="mt-3 flex items-center justify-between">
                                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                                <input
                                                    type="checkbox"
                                                    checked={answerAnonymous}
                                                    onChange={(e) => setAnswerAnonymous(e.target.checked)}
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                />
                                                Post anonymously
                                            </label>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowAnswerForm(false)}
                                                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                                >
                                                    Post Answer
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setShowAnswerForm(true)}
                                        className="w-full py-3 text-sm text-indigo-600 bg-indigo-50 rounded-lg border border-dashed border-indigo-300 hover:bg-indigo-100 transition-colors"
                                    >
                                        Write an Answer
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

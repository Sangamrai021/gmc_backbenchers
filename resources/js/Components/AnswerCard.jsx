import { router, usePage } from '@inertiajs/react';
import VoteButtons from '@/Components/VoteButtons';
import { useState } from 'react';

export default function AnswerCard({ answer, discussionUserId, canAccept }) {
    const { auth } = usePage().props;
    const [isEditing, setIsEditing] = useState(false);
    const [editBody, setEditBody] = useState(answer.body);

    const isOwner = auth.user.id === answer.user_id;
    const canUpdate = answer.permissions?.update || false;
    const canDelete = answer.permissions?.delete || false;

    const handleDelete = () => {
        if (confirm('Delete this answer?')) {
            router.delete(route('questions.answers.destroy', answer.id));
        }
    };

    const handleAccept = () => {
        router.post(route('questions.answers.accept', answer.id));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(route('questions.answers.update', answer.id), {
            body: editBody,
            is_anonymous: answer.is_anonymous,
        });
        setIsEditing(false);
    };

    return (
        <div className={`bg-white rounded-lg border p-5 ${answer.is_accepted ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
            <div className="flex gap-4">
                <VoteButtons
                    votableType="discussion_answer"
                    votableId={answer.id}
                    upvotes={answer.upvotes_count}
                    downvotes={answer.downvotes_count}
                />

                <div className="flex-1 min-w-0">
                    {answer.is_accepted && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 mb-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Accepted Answer
                        </span>
                    )}

                    {isEditing ? (
                        <form onSubmit={handleUpdate}>
                            <textarea
                                value={editBody}
                                onChange={(e) => setEditBody(e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                rows={4}
                            />
                            <div className="mt-2 flex gap-2">
                                <button type="submit" className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                    Save
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{answer.body}</p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>by {answer.author_name}</span>
                            <span>{new Date(answer.created_at).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {canAccept && !answer.is_accepted && (
                                <button onClick={handleAccept} className="text-xs text-green-600 hover:text-green-800 font-medium">
                                    Accept
                                </button>
                            )}
                            {canAccept && answer.is_accepted && (
                                <button onClick={handleAccept} className="text-xs text-yellow-600 hover:text-yellow-800 font-medium">
                                    Unaccept
                                </button>
                            )}
                            {canUpdate && (
                                <button onClick={() => setIsEditing(true)} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                                    Edit
                                </button>
                            )}
                            {canDelete && (
                                <button onClick={handleDelete} className="text-xs text-red-600 hover:text-red-800 font-medium">
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnswerRequest;
use App\Models\Discussion;
use App\Models\DiscussionAnswer;
use Illuminate\Support\Facades\Auth;

class DiscussionAnswerController extends Controller
{
    public function store(StoreAnswerRequest $request, Discussion $discussion)
    {
        $this->authorize('view', $discussion);

        $answer = $discussion->answers()->create([
            'user_id' => Auth::id(),
            'body' => $request->body,
            'is_anonymous' => $request->boolean('is_anonymous'),
        ]);

        $discussion->update(['status' => 'answered']);

        return redirect()->route('questions.show', $discussion)
            ->with('success', 'Answer posted.');
    }

    public function update(StoreAnswerRequest $request, DiscussionAnswer $answer)
    {
        $this->authorize('update', $answer);

        $answer->update([
            'body' => $request->body,
            'is_anonymous' => $request->boolean('is_anonymous'),
        ]);

        return redirect()->route('questions.show', $answer->discussion_id)
            ->with('success', 'Answer updated.');
    }

    public function destroy(DiscussionAnswer $answer)
    {
        $this->authorize('delete', $answer);

        $discussionId = $answer->discussion_id;
        $answer->delete();

        return redirect()->route('questions.show', $discussionId)
            ->with('success', 'Answer deleted.');
    }

    public function accept(DiscussionAnswer $answer)
    {
        $discussion = $answer->discussion;

        $this->authorize('update', $discussion);

        $answer->update(['is_accepted' => !$answer->is_accepted]);

        return redirect()->route('questions.show', $discussion)
            ->with('success', 'Answer status updated.');
    }
}

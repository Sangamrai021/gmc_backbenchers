<?php

namespace App\Http\Controllers;

use App\Models\Discussion;
use App\Models\DiscussionAnswer;
use App\Models\Vote;
use App\Models\StudentActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function toggle(Request $request)
    {
        $validated = $request->validate([
            'votable_type' => 'required|string|in:discussion,discussion_answer',
            'votable_id' => 'required|integer',
            'type' => 'required|string|in:upvote,downvote',
        ]);

        $modelClass = \Illuminate\Database\Eloquent\Relations\Relation::getMorphedModel($validated['votable_type']);
        if (!$modelClass) {
            abort(400, 'Invalid votable type.');
        }
        $votable = $modelClass::findOrFail($validated['votable_id']);

        $existingVote = Vote::where([
            'user_id' => Auth::id(),
            'votable_type' => $validated['votable_type'],
            'votable_id' => $validated['votable_id'],
        ])->first();

        if ($existingVote) {
            if ($existingVote->type === $validated['type']) {
                $existingVote->delete();
            } else {
                $existingVote->update(['type' => $validated['type']]);
            }
        } else {
            Vote::create([
                'user_id' => Auth::id(),
                'votable_type' => $validated['votable_type'],
                'votable_id' => $validated['votable_id'],
                'type' => $validated['type'],
            ]);
        }

        StudentActivityLog::create([
            'student_id' => Auth::id(),
            'subject_id' => null,
            'action' => 'voted_' . $validated['type'],
            'loggable_id' => $validated['votable_id'],
            'loggable_type' => $modelClass,
        ]);

        return redirect()->back();
    }
}

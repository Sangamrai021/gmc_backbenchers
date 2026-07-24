<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'subject_id' => 'required|integer|exists:subjects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'attachment' => 'nullable|file|max:10240',
            'max_score' => 'nullable|integer|min:1',
            'due_date' => 'required|date',
            'allow_late_submission' => 'boolean',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'allow_late_submission' => $this->boolean('allow_late_submission'),
        ]);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDiscussionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'discussionable_type' => 'required|string|in:subject,semester,assignment,section',
            'discussionable_id' => 'required|integer',
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'nullable|string|max:50',
            'is_anonymous' => 'boolean',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_anonymous' => $this->boolean('is_anonymous'),
        ]);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDiscussionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'body' => 'sometimes|required|string',
            'category' => 'nullable|string|max:50',
            'is_anonymous' => 'boolean',
            'status' => 'sometimes|string|in:open,answered,closed',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_anonymous' => $this->boolean('is_anonymous'),
        ]);
    }
}

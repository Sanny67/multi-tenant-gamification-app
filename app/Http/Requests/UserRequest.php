<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|max:15',
            'pronoun' => 'required|in:He/him,She/her,They/them',
            'insta_handle' => [
                'nullable',
                'string',
                'unique:users',
                function ($attribute, $value, $fail) {
                    if (!$this->validateInstagramHandle($value)) {
                        $fail('The Instagram handle should be between 3 and 30 characters long, contain only letters, numbers, periods, and underscores, and not start or end with a period or underscore.');
                    }
                },
            ],
            'image' => 'nullable|mimes:jpeg,png',
            'xp_points' => 'nullable|numeric',
            'tenant_key' => 'required|string',
        ];
    }

    /**
     * Get custom validation messages.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'email.required' => 'The email field is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'The email address has already been taken.',
            'pronoun.required' => 'The pronoun field is required.',
            'pronoun.in' => 'Please select a valid pronoun.',
            'insta_handle.unique' => 'The Instagram handle has already been taken.',
            'image.mimes' => 'Please upload a valid image file (JPEG, PNG).',
            'xp_points.numeric' => 'The XP points must be a number.',
            'tenant_key.required' => 'The tenant key field is required.',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'The given data was invalid.',
            'errors' => $validator->errors(),
        ], 422));
    }

    /**
     * Validate an Instagram handle.
     *
     * @param string $handle The Instagram handle to validate.
     * @return bool Returns true if the handle is valid, otherwise false.
     */
    public function validateInstagramHandle($handle)
    {
        // Instagram handle should be between 3 and 30 characters
        if (strlen($handle) < 3 || strlen($handle) > 30) {
            return false;
        }
       
        // Instagram handle should only contain letters, numbers, periods, and underscores
        if (!preg_match('/^[a-zA-Z0-9._]+$/', $handle)) {
            return false;
        }
       
        // Instagram handle should not start with a period or underscore
        if (strpos($handle, '.') === 0 || strpos($handle, '_') === 0) {
            return false;
        }
       
        // Instagram handle should not end with a period or underscore
        if (substr($handle, -1) === '.' || substr($handle, -1) === '_') {
            return false;
        }
       
        return true;
    }
}

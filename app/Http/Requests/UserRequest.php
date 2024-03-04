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
            'insta_handle' => 'nullable|unique:users',
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
            'insta_handle.unique' => 'The instagram handle has already been taken.',
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
}

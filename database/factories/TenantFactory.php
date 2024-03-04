<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tenant>
 */
class TenantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = $this->faker->company;
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'api_key' => $this->generateRandomApiKey(),
            'password' => Hash::make('password'),
        ];
    }

    function generateRandomApiKey($length = 32) {
        // Characters that can be used in the API key
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
        // Calculate the length of the character list
        $charactersLength = strlen($characters);
    
        // Initialize the API key variable
        $apiKey = '';
    
        // Loop to generate random characters for the API key
        for ($i = 0; $i < $length; $i++) {
            // Get a random character from the character list
            $randomCharacter = $characters[rand(0, $charactersLength - 1)];
    
            // Append the random character to the API key
            $apiKey .= $randomCharacter;
        }
    
        // Return the generated API key
        return $apiKey;
    }
}

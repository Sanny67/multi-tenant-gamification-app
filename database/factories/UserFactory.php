<?php

namespace Database\Factories;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $gender = $this->faker->randomElement(['male', 'female']);
        $name = $this->faker->name($gender);
        
        $tenant_ids = Tenant::all()->pluck('id')->toArray();
        $random_tenant_id = $tenant_ids[array_rand($tenant_ids)];

        $pronoun = match ($gender) {
            'male' => 'He/him',
            'female' => 'She/her',
            default => 'They/them',
        };

        $instaHandle = $this->generateInstaHandle($name);

        $image = match ($gender) {
            'male' => '/images/man.png',
            'female' => '/images/woman.png',
        };

        return [
            'name' => $name,
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'tenant_id' => $random_tenant_id,
            'pronoun' => $pronoun,
            'insta_handle' => $instaHandle,
            'image' => $image,
            'xp_points' => rand(0, 80),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Generate a instagram handle based on the provided name.
     *
     * @param string $name
     * @return string
     */
    function generateInstaHandle($name) {
        // Convert name to lowercase
        $name = strtolower($name);
        
        // Replace spaces with underscores
        $name = str_replace(' ', '_', $name);
        
        // Remove special characters
        $name = preg_replace('/[^a-zA-Z0-9_]/', '', $name);
        
        // Generate a random number between 1000 and 9999
        $randomNumber = rand(1000, 9999);
        
        // Append the random number to the handle
        $instaHandle = $name . $randomNumber;
        
        // Limit the length of the handle to 30 characters (Instagram's limit)
        $instaHandle = substr($instaHandle, 0, 30);
        
        return $instaHandle;
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AwardXPRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\TenantResource;
use App\Http\Resources\UserResource;
use App\Models\Tenant;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($slug)
    {
        try {
            $tenant = Tenant::where('slug', $slug)->first();
            if (!$tenant) {
                throw new Exception("Tenant not found");
            }

            $users = User::where('tenant_id', $tenant->id)->orderBy('xp_points', 'desc')->limit(10)->get();
            $usersResponse = UserResource::collection($users);
            
            $response = [
                'status' => 'success',
                'message' => 'Data fetched successfully',
                'data' => ['tenant' => new TenantResource($tenant), 'users' => $usersResponse]
            ];

        } catch (Exception $e) {
            $response = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
        return response()->json($response, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        try {
            // Check if the provided tenant key is valid
            $tenant = Tenant::where('api_key', $request->get('tenant_key'))->first(); // Fetch the tenant
            if (!$tenant) {
                throw new Exception("Tenant not found");
            }

            // Handle image upload
            $imagePath = "";
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = "/" . Storage::disk('public')->put('images', $image);
            }

            $data = [
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
                'tenant_id' => $tenant->id,
                'pronoun' => $request->get('pronoun'),
                'insta_handle' => @$request->get('insta_handle') ?? "",
                'image' => $imagePath,
                'xp_points' => $request->get('xp_points', 0),
            ];

            // Create user
            $user = User::create($data);
            
            $response = [
                'status' => 'success',
                'message' => 'User created successfully',
            ];
            
        } catch (Exception $e) {
            $response = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
        return response()->json($response, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        try {
            // Check if the provided tenant key is valid
            $tenant = Tenant::where('api_key', $request->get('tenant_key'))->first();
            if (!$tenant) {
                throw new Exception("Tenant not found");
            }
    
            // Handle image upload
            $imagePath = $user->image;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = "/" . Storage::disk('public')->put('images', $image);
            }
    
            // Update user data
            $user->update([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'tenant_id' => $tenant->id,
                'pronoun' => $request->get('pronoun'),
                'insta_handle' => $request->get('insta_handle', ""),
                'image' => $imagePath,
                'xp_points' => $request->get('xp_points')
            ]);
    
            $response = [
                'status' => 'success',
                'message' => 'User updated successfully',
            ];
    
        } catch (Exception $e) {
            $response = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
        return response()->json($response, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }

    /**
     * Award XP API for external users
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function awardXP(AwardXPRequest $request)
    {
        try {
            // Check if the provided tenant key is valid
            $tenant = Tenant::where('api_key', $request->get('tenant_key'))->first();
            if (!$tenant) {
                throw new Exception("Tenant not found");
            }
            
            // Check if the provided user id is valid for the tenant
            $user = User::where('_id', $request->get('user_id'))->where('tenant_id', $tenant->_id)->first();
            if(!$user){
                throw new Exception("User not found");
            }
            $user->xp_points = (int)$user->xp_points + 1;
            $user->save();

            $response = [
                'status' => 'success',
                'message' => 'User awarder XP point successfully',
            ];
    
        } catch (Exception $e) {
            $response = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
        return response()->json($response, Response::HTTP_OK);
    }
}

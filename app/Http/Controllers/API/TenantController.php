<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TenantResource;
use App\Models\Tenant;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class TenantController extends Controller
{
    public function __construct()
    {
        // Apply JWT middleware to all methods except login and logout
        $this->middleware('jwt.auth', ['except' => ['login', 'logout', 'index']]);
    }

    /**
     * Login the tenant
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        try{
            $credentials = $request->only(['name', 'password']);

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            return response()->json([
                'status' => "success",
                'token' => $token,
                'tenant' => JWTAuth::user()
            ]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }
        return response()->json(['token' => $token]);
    }

    /**
     * Logout the tenant
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'status' => "success",
                'message' => "Tenant logged out successfully",
            ]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to logout'], 500);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $tenants = Tenant::all();
            $tenantResources = TenantResource::collection($tenants);

            $response = [
                'status' => 'success',
                'message' => 'Tenants fetched successfully',
                'data' => $tenantResources
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tenant  $tenant
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        try {
            $tenant = Tenant::where('slug', $slug)->first();
            if (!$tenant) {
                throw new Exception("Invalid tenant slug");
            }
            $tenantResponse = new TenantResource($tenant);

            $response = [
                'status' => 'success',
                'message' => 'Tenant fetched successfully',
                'data' => $tenantResponse
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tenant  $tenant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tenant $tenant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tenant  $tenant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tenant $tenant)
    {
        //
    }
}

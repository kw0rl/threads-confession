<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Confession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; // to create API Call
use Illuminate\Support\Facades\Log;

class ConfessionController extends Controller
{
    public function store(Request $request)
    {
        // 1. check validation 
        $request->validate([
            'message' => 'required|string|max:500',
        ]);

        // 2. save confession to database with status 'pending'
        $confession = Confession::create([
            'message' => $request->message,
            'status' => 'pending'
        ]);

        $token = env('THREADS_ACCESS_TOKEN');

        try {
           
            // phase 1: create the container
            $containerResponse = Http::post('https://graph.threads.net/v1.0/me/threads', [
                'media_type' => 'TEXT',
                'text' => "New Confession 🤫\n\n" . $request->message,
                'access_token' => $token,
            ]);

            if ($containerResponse->successful()) {
                $containerId = $containerResponse->json()['id'];

                // ==========================================
                // phase 2: publish the container
                // ==========================================
                $publishResponse = Http::post('https://graph.threads.net/v1.0/me/threads_publish', [
                    'creation_id' => $containerId,
                    'access_token' => $token,
                ]);

                if ($publishResponse->successful()) {
                    // Update the status database to 'posted' if API call successful
                    $confession->update(['status' => 'posted']);
                    
                    return back()->with('success', 'Confession was successfully posted to Threads!');
                }
            }

            // if API call failed, log the error and return with error message
            Log::error('Threads API Error: ' . $containerResponse->body());
            return back()->with('error', 'Mesej was saved but failed to post to Threads. Please check the system logs for details.');

        } catch (\Exception $e) {
            // if there's an exception (e.g. network error), log the exception and return with error message
            Log::error('Threads Exception: ' . $e->getMessage());
            return back()->with('error', 'system encountered an error while posting to Threads. Please check the system logs for details.');
        }
    }
}
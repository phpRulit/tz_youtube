<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class YouTubeController
{
    public function getPlaylistApi(Request $request): JsonResponse
    {
        $youtube = app::make('youtube');
        $maxResults = 16;
        if (empty($request['search'])) {
            $options = ['chart' => 'mostPopular', 'maxResults' => $maxResults];
            $videos = $youtube->videos->listVideos('snippet', $options);
        } else {
            $options = ['maxResults' => $maxResults, 'q' => $request['search']];
            $videos = $youtube->search->listSearch("snippet", $options);
        }

        return response()->json($videos);
    }
}

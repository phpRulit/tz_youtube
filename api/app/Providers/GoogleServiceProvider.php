<?php

namespace App\Providers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\ServiceProvider;

class GoogleServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('googleClient', function () {
            return new \Google\Client();
        });

        $this->app->bind('youtube', function () {
            $googleClient = app::make('googleClient');
            $googleClient->setApplicationName(env('APP_NAME'));
            //здесь же прописать client_id и client_secret, если будете использовать oAuth2 в developmentCabinetGoogle
            $googleClient->setDeveloperKey(env('API_KEY_DEVELOPER_YOUTUBE'));
            return new \Google\Service\YouTube($googleClient);
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}

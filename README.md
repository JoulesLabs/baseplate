# baseplate
## Features

- Laravel 7
- Vue + VueRouter + Vuex 
- Pages with dynamic import and custom layouts
- Login, register, email verification and password reset
- Authentication with JWT
- Socialite integration
- Tailwindcss + Font Awesome 5

## the frontend
The frontend is based on [vue baseplate](https://github.com/thearyanahmed/baseplate) structure.
The frontend's rest api consumer is based on [api-router](https://github.com/thearyanahmed/api-router) and can be called via `this.router()`

## Installation

- `git clone https://github.com/JoulesLabs/baseplate.git`
- `cd baseplate`
- Edit `.env` and set your database connection details
- (When installed via git clone or download, run `php artisan key:generate` and `php artisan jwt:secret`)
- `php artisan migrate`
- `npm install`


## Usage

#### Development

```bash
# build and watch
npm run watch

# serve with hot reloading
npm run hot
```

#### Production

```bash
npm run production
```

## Socialite

This project comes with GitHub as an example for [Laravel Socialite](https://laravel.com/docs/7.x/socialite).

To enable the provider create a new GitHub application and use `https://example.com/api/oauth/github/callback` as the Authorization callback URL.

Edit `.env` and set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` with the keys form your GitHub application.

For other providers you may need to set the appropriate keys in `config/services.php` and redirect url in `OAuthController.php`.

## Email Verification

To enable email verification make sure that your `App\Models\User` model implements the `Illuminate\Contracts\Auth\MustVerifyEmail` contract.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

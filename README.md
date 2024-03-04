
## Multi Tenant Gamification App

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Features

- Only logged in tenants get access to API Key - hence tenants who have api key can make calls to register or award xp.
- APIs created for User Registration, Award XP to User

## Future Improvements

- User image change option can be added
- We can use redux saga if move features are incorporated in the app. I have used localStorage only as it is very small app.
- we have used prop drilling technique for tenantKey in the app. redux saga could solve this problem or we could use the useContext hook instead
- I have made an API for awarding XPs to users for a particular tenant. In this I need more clarity on what kind of functionality is required and how the external system shall interact with the API. For now, I have added two input parameters: 'user_id' and 'tenant_key'.
- I am on midway trying to set up jwt authentication using mongo DB and I can complete it with some more time.
Idea was to let tenant access their api key only if authenticated

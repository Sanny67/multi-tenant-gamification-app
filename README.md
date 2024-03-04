
## Multi Tenant Gamification App

Effortlessly award experience points within your platform using our API. Specify users and tenants with ease using user_id and tenant_key parameters, enabling personalized gamification experiences.


## Project Features

- Kindly run php artisan migrate --seed to get dummy data for testing
- APIs created for User Registration, and Award XP to User
- Exclusive access to API Key is granted only to logged-in tenants, ensuring secure communication and control. Tenants with API Key privileges can initiate registration and XP awarding, enabling seamless interaction and customization within their designated ecosystem.
- Not much focus has been given to UI/UX due to time shortage.


## API Documentation Link

https://github.com/Sanny67/multi-tenant-gamification-app


## Future Improvements

- User image change option can be added
- We could use redux saga if more features are incorporated in the app. I have used localStorage only as it is very small app.
- We have used prop drilling technique for tenantKey in the app. Using Redux saga could solve this problem.
- I have made an API for awarding XPs to users for a particular tenant. In this I need more clarity on what kind of functionality is required and how the external system shall interact with the API. For this project purpose, I have added two input parameters: 'user_id' and 'tenant_key'.
- We could implement real-time updates for leaderboards using WebSocket or server-sent events.
- Support for additional gamification features such as badges, achievements, or levels could be added.
- We could implement caching mechanisms to improve performance, especially for leaderboard data.
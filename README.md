
## Multi Tenant Gamification App

Effortlessly award experience points within your platform using our API. Specify users and tenants with ease using user_id and tenant_key parameters, enabling personalized gamification experiences.

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

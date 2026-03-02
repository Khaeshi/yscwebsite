For Facebook Graph API tokens, a "permanent" token doesn't truly exist, but you can get a long-lived Page Access Token that never expires.
Step 1: Exchange your short-lived token for a long-lived one
Call this URL in your browser or Postman:
https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id={APP_ID}&client_secret={APP_SECRET}&fb_exchange_token={SHORT_LIVED_TOKEN}
This gives you a 60-day user token.
Step 2: Get a never-expiring Page Access Token
Using the 60-day token from Step 1:
https://graph.facebook.com/me/accounts?access_token={60_DAY_TOKEN}
This returns your pages — grab the access_token from your page. Page Access Tokens generated from a long-lived user token never expire.
Step 3: Verify it never expires
https://graph.facebook.com/debug_token?input_token={PAGE_TOKEN}&access_token={APP_ID}|{APP_SECRET}
Look for "expires_at": 0 — that means it never expires.

Save the permanent page token in your Vercel env vars:
FACEBOOK_PAGE_ACCESS_TOKEN=your_never_expiring_token
The key thing is: the token must come from a long-lived user token → then converted to a page token. Skipping Step 1 and going straight to Step 2 with a short-lived token will give you a token that still expires.
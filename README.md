# HawkEyeDigital

## Deploying from Replit

To deploy the app from Replit, follow these steps:

1. Ensure you have the necessary environment variables set, particularly `DATABASE_URL`.
2. Run `npm install` to install all dependencies.
3. Build the client-side code using Vite by running `npm run build`.
4. Bundle the server-side code using esbuild by running `npm run build`.
5. Start the production server with `npm start`.

These steps will compile and bundle both the client and server code, and then start the server in production mode.

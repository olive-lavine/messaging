# messaging

# Getting a user for development

- Go to the Supabase dashboard, in the _Authentication_ section.
- Click the `Add user` drop button, top right, select `Create new user`
- Enter _user & password_ & select `Auto Confirm User?`
- Use that user to login

# Local Development Setup

## Prerequisites

### Install Docker Desktop

[https://docs.docker.com/desktop/](https://docs.docker.com/desktop/)

## Install dependencies

### Run the setup script

This will

- install & setup volta with nodejs 20.11.1
- install local npm modules

```
cd <this dir>
./scripts/setup-local.sh
```

## Set up environment variables

1. Create a file named `.env` in the `apps/web` directory of the project.
2. Add the required environment variables to the `.env` file in the following format:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://yoursupabaseinstance.com
   ```

3. For the _Supabase_ related variables, see the output of `supabase status`

# Run

## Supabase

```
cd <this dir>
npm run supabase:start
```

## NextJS App

```
cd <this dir>
npm run dev
```

# DB Migration & types

## Modifying the DB schema

The process to modify & apply DB schema goes as follow

- Modify local DB using Supabase Studio [http://localhost:54323](http://localhost:54323)
- Create a migration from your local changes by running
  - `npm run supabase:db:diff <migration-name>`
- Verify the content of the generated migration file visually, in `supabase/migrations/`
- commit the migration file to repos

## Applying all migrations

Migrations gets applied automatically when starting the local nextjs development server

## Hard-Verify the migration

⚠️ this will wipe off your whole local database! Be sure to snapshot the local data before executing ⚠️

```bash
cd <workspace>
npm run supabase:db:reset
```

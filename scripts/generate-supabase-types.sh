#!/usr/bin/env bash
echo -e "\n💠 Generating types from Supabase schema\n"
npm run types:generate -w @messaging/supabase
echo -e "\n💠 Formatting types\n"
npm run types:lint -w @messaging/supabase
npm run types:pretty -w @messaging/supabase

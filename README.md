# League of Legends Build Creation Tool

For a given champion from the free rotation
Show the following stats and how they change based on items and champion level

- Health
- Mana
- Attack
- Ability Power
- Magic Resist
- Armor
- Crit Chance
- Life Steal

(Bonus) Deploy on pages.

## Action Plan

Click a champion from a list

Display that champions and Display all items in a grid

Click items to select them

Show attribute bars that change as items are selected

### Components

#### Champion List

Use the API to get a list of free champions.

Search this json file for the free champions.

https://ddragon.leagueoflegends.com/cdn/16.3.1/data/en_US/champion.json


### Features

- user input
- track selected items
- fetch champion data and display

## Research

### Vue.js

Fetching data after navigation: Display a loading screen.

#### Dynamic Routing with Params

vue router provides a params object.

### Riot Games API
The API returns all data in JSON.
Only returns non-empty values

#### Response Codes
200 return response bodies and are documented online.

Logic should fail based on response code alone.

400 - The client failed to provide a request
401 - Unauthorized (request did not contain credentials)
403 - Forbidden (invalid API key)
404 - Not found
415 - Unsupported media (Header was not set correctly)
429 - Too many requests
503 - Service not available

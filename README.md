# The Challenge

This repository is the source code for an incomplete, pretend "Pokédex" web app. It's a code challenge, the challenge being to finish the web app by implementing a few last minute features in the UI and API.

# Getting Started

## Cloning the Repo

Once that's complete, you'll then want to clone your forked repo. Instructions on cloning repos can be found here: https://help.github.com/en/articles/cloning-a-repository.

## Running the UI/API

To run the UI or the API locally, view the `README.md` files present in each directory.

_Note: In order to avoid any discrepancies running the dev servers, please make sure you're using Node ^12.8.0._

## Next Steps

Now that you've gotten everything up and running, take a look at the Bug report and the Feature request below. For development on these, please create a branch for each piece of work (one branch for the bug fix and one branch for the feature implementation.) Make your commits to these branches and push them up to your forked repository, once complete. And that's all there is to it! Good luck!

# The Bug

## Description

The Pokédex web app is simply a home screen with a list of pokémon and various "details" screens for each individual pokémon. When you click on a pokémon in the list, you go to their detail screen. On the detail screen, there are "forward" and "backward" buttons, in the shape of chevrons (`<` and `>`). Clicking these navigate you through the numbered pokémon (as you can tell from the changing URL.) However, when navigating through the pokémon, the numbers often jump dramatically, skipping pokémon or going back to the beginning of the list, inexplicably. Something is definitely wrong with the pokémon navigation.

## Steps to Reproduce

- Click on the first pokémon, Bulbasaur
- Look at the URL (should be "http://localhost:3000/001")
- Navigate forward to Pokémon #11
- Look at the URL (will have reverted back to "http://localhost:3000/002")

## Acceptance Criteria

- Navigating with arrows in the pokémon details screen should increment and decrement by a factor of one.

# The Feature

## Description

The Pokédex has search, which is great. And it works pretty well. But our users really want to be able to filter down the pokémon list based on the pokémons' "type" and "weaknesses." We need new UI components to accomplish this. The requirements on how you accomplish this are loose. Maybe a "multi-select" dropdown would be handy. Or even just some simple Checkboxes would be fine. (You won't be graded on the UX of this. Just on how well you code your particular implementation.)

## Acceptance Criteria

- The "home" page of the Pokédex has filtering UI that allows users to choose all available "types" and "weaknesses" to filter down by
- The list of pokémon shrinks or grows depending on the applied filters
- Searches from the SearchBox occur _within_ the filtered list (not the full, unfiltered list)

# Tips

Here's some tips you might find handy:

- If you use an IDE like VS Code or Atom, install the ESLint and Prettier extensions. They help development a _lot!_
- Don't focus too much on UX or pretty design. Focus more on meeting the Acceptance Criteria and writing clean code.
- We're fans of the Functional Programming paradigm. As you code, thinking about how you can make your functions pure and avoid mutating objects.

# Beenest Web
Welcome to developing on beenest

## Development Process

* Check out a new branch: ``git co -b NAME/TICKET-feature-summary``

* Make changes and run/test locally: ``npm start``

* Deploy to remote dev server to allow others to test: `scripts/deploy -i dev01` where `01` can be `02, 03, etc`

* Visit https://dev01.beenest.io

* Git commit and push your changes to Github.

* Submit a Pull Request to merge your branch into ``master``

* Name the title of your Pull Requet:  "NAME/TICKET-feature-summary Fix TICKET"
 The "Fix TICKET" is to auto close the ticket in our project management tool. Mark it with `WIP` in the title if it's work in progress. It's better to submit a PR early to ensure you are on the right path, especially for a larger PR.

* Request reviewers from the original author of the code you touched and @kcvan.

* A reviewer should respond within 12 hours. Please bump them nicely if you are blocked on a review. Reviewers should mark "Changes Requested" to make it clear the coder needs to make modifications or respond to the comments.

* After approval, Click Merge to `master`. This will deploy to https://staging.beenest.io

* Verify https://staging.beenest.io

* If something broke, go to the pull request page and click `Revert` which will create a new PR to revert.

* After you verified your changes and want to deploy to production immediately, submit another PR to merge master into ``production`` which will deploy to https://www.beenest.com

* Verify https://www.beenest.com

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`.
## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running tests

Run `npm test`

## Further help

Ask on Discord.

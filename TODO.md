# Candidate Problems
## Frontend
* add table filtering aka searching
* add table paging
* move the paging or filtering concerns into the falcor layer w/ good UX on it
* improve css and html build to be on par with the js build
* get in the react router in a sensible manner
* start bumping the version according to URL changes

## Falcor
* change the JSON Graph to be a cleaner data model providing sort capabilities
* add more fields to the model to simplify the client logic
* take the denormalized data and normalize it but still present it as denormalized to clients
* compare and contrast with Falcor competitors

## Seneca
* add it since it isn't in yet
* add versioning to messages to allow a new version to run in parallel with the old
* switch the database technology while maintaining the same message format

### You don't need to fix these I need to get back around to them
#### Fix Broken Windows
* improve README.md
* determine minimum npm version and integrate into package.json
* simplify webpack build further
* complete webpack build for other than js pieces
* get hapi server more production ready vs. just development server
* make sensible directory structure for the fuller stack project
* integrate seneca layer beneath falcor router
* make slightly more complex data model to allow joins etc. to come into play

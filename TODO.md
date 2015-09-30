# Candidate Problems
## Frontend UX
* add table filtering aka searching
* add table paging
* move the paging or filtering concerns into the falcor layer w/ good UX on it
* improve css and html build to be on par with the js build
* get in the react router in a sensible manner
* start bumping the version according to URL changes

## Frontend Infrastructure
* change the JSON Graph to providing sort capabilities
* provide office information to falcor clients
* provide thoughts on contrasting Falcor with GraphQL and or Relay
* suggest or implement improvements to the clarity of the JSON Graph data model
* speak to or implement the ability to write new documents and update existing ones

## Seneca based micro service layer
* add it since it isn't in yet
* add versioning to messages to allow a new version to run in parallel with the old
* switch the database technology while maintaining the same message format

### You don't need to fix these I need to get back around to them
#### Fix Broken Windows
* improve README.md
* simplify webpack build further
* complete webpack build for other than js pieces
* get hapi server more production ready vs. just development server
* make sensible directory structure for the fuller stack project
* integrate seneca layer beneath falcor router
* make slightly more complex data model to allow joins etc. to come into play
* figure out if PouchDB is the best DB to use here
* change data modeled over to be based on food and metrics over time vs. users
* check to see if node-dev is respecting --no-deps correctly

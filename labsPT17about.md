# To get you started

Processing at this point resolves to writing out the post requests with the schema within [Known Defects](KnownDefects.md).
You can set up a general DS Database post request middleware to be inserted into the main post requests for each endpoint, which can streamline the process
in addition to pushing the current authRequired.js middleware for authentication.

As is, this backend will launch and function on Heroku without crashing, as well as function on docker without issues including:
    Migrations
    Seeds
    Building the Database

Additional seeds should be added for all endpoints.

## Additional Package

Due to Request itself, a standard built in process to Node.js, is depreciated
Axios has been installed as an alternative to request to allow you to connect
to the DS Database after fullfilling the requisit information in [Known Defects](KnownDefects.md).
Axios allows chaining in addition to Knex's own chaining, and should work with async calls.

## Tests

After setting up the requisit calls, tests should be a breeze to write out with little to no issue.

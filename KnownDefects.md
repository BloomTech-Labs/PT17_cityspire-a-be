# Unfinished Features

## Post requests

All end point post requests were to be set up with chaining:
    Post to endpoint with City and State
        if(city and state exists)
            status:update
            .then(Post to ds endpoint)
            .then(update with response)
        else(if city and state doesn't exist)
            .then(Post to DS endpoint)
            .then(Update to Endpoint with response)

Base url can be set up for the DS database from the .env file.

## Authentication

Authentication needs to be applied to each post/get request.

## Tests

For all endpoints other than Profile

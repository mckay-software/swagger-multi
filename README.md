# Swagger UI with multiple APIs

_...in a Docker container._

_...for McKay Software._

## Usage (for McKay)

    $ docker run -dp 1234:8080 mckaynz/swagger-multi

## Customisation (for McKay)

Change the files in this repo, commit, and wait for the [build] to finish.

## Usage and customisation (for others)

Either fork this repo, edit files, and [set up your own automated build][auto],
or bind your customisations using file volumes at runtime, e.g.:

    $ docker run -dp 1234:8080 \
        -v /path/to/your/apis.js:/app/apis.js \
        -v /other/custom/css:/app/css/extra.css \
        -v /etc/etera:/app/foobar \
        mckaynz/swagger-multi

[build]: https://hub.docker.com/r/mckaynz/swagger-multi/builds/
[auto]: https://docs.docker.com/docker-hub/builds/


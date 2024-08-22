
# MERN Stack Resource Application
### Project Nexus

## Installation (not completed)
We're currently working on development. Once we're finished, we'll containerize this in docker, as well as add standalone deployment steps.


## Versions

v0.0.1a - Basic Functionality
- Provided basic functionality for mongoDB

v0.0.2a - Better routes
- Provided routes and new model schema for notes and users/collections

v0.0.3a - Refactor 1
- Frontend/backend are in their own folders and ran with "concurrently" from the main directory.
- Docker is not fully set up yet, please don't try to docker-compose!

v0.0.4a - Updated topics system
- New dependency added: font-awesome
- Reworked the backend to use an array of strings for topics
- Removed unecessary UIDs that are already handled by mongoDB
- Added modal windows
- Updated a LOT of styling (cries in css)
- Added route to get the 10 (or X) most recent notes
- Comments no longer have ids and are just stored in an array, accessed via index
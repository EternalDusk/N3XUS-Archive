# Project Nexus

Project Nexus is a customized search engine project, meant to aggregate resources, links, and allow users to provide feedback and comment on each resource.


## Installation (not ready for use)

Docker setup currently in development, dockerfiles may not be properly set up yet.

1) Clone repo
2) In the N3XUS-ARCHIVE root directory - run `npm run install-all`
3) Inside of the server directory - run `npm install nodemon -g` to install nodemon globally (need to implement a fix for this)
4) Download and/or setup a MongoDB instance
    To run it locally, download and install MongoDB from [here](https://www.mongodb.com/try/download/community)


## To-Do/In Progress

- Fix nodemon needing to install globally
- User authentications
    - Add note submission page for users
- User interactions
    - Notes
    - Resource voting system
    - Note Comments
- Admin page for note and task CRUD
- Resource base url typing (eg: showing reddit symbol when url base is reddit.com)
- Change fonts to openly licensed fonts


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

v 0.0.5a - Added topics pages
- Added more styling (i hate working with display tags)
- Added 404 page
- Added package requirement: react-router-dom
- Moved header into own component
- Added fonts (not pushed with codebase due to licensing)
- Added topics api controller (getRecentTopics, getTopicByUID, createTopic, updateTopic) w/ routes
- Added topics page w/ side knowledge panel
- Added getNotesByTopic in notes api for topics page
- Notes and Topics both now have updatedAt and createdAt fields
- Notes and Topics now have their indexing explicitely specified in the schema (because apparently that's something you can do and I didn't know that lol)
- Altered noteRoutes to be more intuitive for api calling

v 0.0.6a - Preliminary Docker Setup
- Added updated docker-compose.yml and Dockerfiles to client and server folders
- .env.docker and .env.local now select based on environment (local mongodb setup and docker mongodb setup)
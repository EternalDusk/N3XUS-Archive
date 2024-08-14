
# MERN Stack Resource Application
### Project Nexus

## Installation
1) Clone the repository
2) Create a MongoDB Database using the community server or using atlas
-  https://www.mongodb.com/try/download/community
3) Run `npm install` to install necessary packages

## Notes
**Notes Collection Schema**
{
  "NoteUID": "string",
  "TopicUID": "string",
  "SourceName": "string",
  "SourceURL": "string",
  "SourceType": "string",
  "Description": "string",
  "PostedBy": "string",
  "Upvotes": "int",
  "Downvotes": "int",
  "Comments": [
    {
      "CommentID": "string",
      "UserID": "string",
      "CommentText": "string",
      "Timestamp": "date"
    }
  ]
}


**Users Collection Schema**
{
  "UserID": "int",
  "Username": "string",
  "Email": "string",
  "PasswordHash": "string",
  "DiscordID": "string",  // Optional
  "UpvotedNotes": ["NoteUID"],
  "DownvotedNotes": ["NoteUID"],
  "Collections": [
    {
      "CollectionID": "string",
      "CollectionName": "string",
      "Description": "string",
      "Notes": ["NoteUID"]
    }
  ]
}

## ToDo
update user note with UserID
if no notes or users exist, create a note with name and description "default"
  and user of name "default"

Users will show the notes/resources they have made, but add pagination to only show the first 10, then the next 10
  Add caching to this mechanism

Follow users + follow collections

Updates when editing/adding schema
models -> controllers -> routes

## Versions

v0.0.1a - Basic Functionality
- Provided basic functionality for mongoDB

v0.0.2a - Better routes
- Provided routes and new model schema for notes and users/collections
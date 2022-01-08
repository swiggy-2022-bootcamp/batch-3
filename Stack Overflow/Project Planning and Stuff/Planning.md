# Stack Overflow

## Summary:

The user is allowed to ask question, give answers. They can simply upvote or downvote a certain answer or a question if they feel like it.

## Evaluation Criteria:

The Case Study / project will be evaluated on the following criteria:

- Quality Coding
  - Modularity &rarr; express generator folder structure
  - Coding Standards &rarr; Formatted using Prettier
  - Naming convention
- Using Git, .gitignore file, , # of commits &rarr; Same repo as swiggy's unless notified
- Functionality
  - Login(JWTI)
  - Registration
  - CRUD operations with proper server codes
- Persisting data (files/DB) &rarr; use MongoDB & mongoose
- Learnability
  - Overall Presentation &rarr; use postman collections and documentation
  - Concept clarity
  - articulation of solution &rarr; Seperate solution doc/readme file
  - ability to answer questions
  - demonstrates learning ability
- Additional bonus for implementing additional feature &rarr; if any time is left

## Required Features (Basic):

1. The application should have option to login to system.
2. The application should allow to register.
3. The application should allow to ask a question.
4. Should allow answer the question.
5. The application should show answers for the particular question

## Heirarchial Featureset:

- Profile based Features:
  - Registeration
    - New User can be added
  - Login:
    - Authentication and Login
  - Profile Page:
    - Name
    - Profile Picture
    - Username
    - email
    - Badges
    - Change Password
    - Socials: twitter, linkedin, github
- Forum Based:
  - Ask Questions
    - Can Add particular Links
    - Can add code snippets
    - Can add snapshots/images
  - Give Answers
    - Can Add particular Links
    - Can add code snippets
    - Can add snapshots/images
    - Can have the question asker verify (green tick)
    - Edits:
      - Has Theree Modes:
        - Accepted
        - Reviewing
        - Rejected
      - Can have a note on rejection
      - Owner can edit anyways
  - Add Comments to Questions/Answers:
    - Cannot have upvotes and downvotes
    - Can be edited
    - Replies??
  - Upvote/Downvote:
    - Either question or answer can be upvoted or downvoted
    - every upvote is +1
    - every downvote is -1
    - both stored seperately but shown as net
- Filters and Viewables:
  - Search bar:
    - Normal Search based on words
    - Based on category
  - Filter answers:
    - Sort by highest upvotes
    - Sort by latest

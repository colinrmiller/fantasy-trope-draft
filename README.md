# Screen Draft

<!-- ![RV Anamtion](	./public/img/Logo.png) -->
![Screen Shot](./public/img/Screenshot.png)

**ScreenDraft** is a social film discovery platform, centered on allowing users to explore films by genre and by their favorite plot conventions (aka. tropes). Users can tag their films with their favorite tropes and discuss their individual validities. **ScreenDraft** 


### Highlights

 - ScreenDraft [offers a user on login with a continue series of randomized film comparison questions](./components/pairwiseComparison/CompareTwo.js)(eg. 'Lord of the Rings' or 'The Matrix').  Each selection improves the confidence and updates [a total film ranking algorithm implementing the Bradley-Terry model of paired comparisons](./components/utilities/FilmRanking.js). 
  -  

## Setup
### Local Server

To get the full features from **Screen Draft** you will need to host a server for your database locally.  Using the Node Project Manager (npm) this can be installed with the following command in terminal. 

    npm i -g json-server

Initialize the database by renaming db.json.exampe -> db.json

Once this is installed run json-server from the projects root directory of the application.

    json-server -p 8088 -w api/db.json



### Project ERD Diagram

![Project Entity Relationship Diagram](./public/img/ERD-MVP.png)

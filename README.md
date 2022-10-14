# Assignment1
Phase 2 of Software Frameworks assignment

## Git
### Git Layout
This git repository has all the project files for Phase 2 of Assignment 1 as well as this README.md file. The *master* is the default branch where all the majority of the work is done.
### Version Control Approach
The approach taken whilst developing this project was by initially cloning the Assignment1 repository which was from phase 1 of the assignment. 
All changes that were made from then on after was added, commited, pushed and pulled. The work done during this project was regularly added and committed which can be seen in the history of git commands.
Branches were also used in this project especially when creating new features of the assignment which would be complicated. This process made it easier to understand different parts being done.
It was also found to have made the code easier and cleaner to read when comparing previous commit. Not only that but with each branch done, they were merged to the master so that everything is kept on the main branch.

## Data Structures
In developing this program, Iseparated the data into 3 main data structures which are Users, Groups, and Channels. They are described below:
- Users: This is an array that holds a user object. A user object has an id, a username, email, password, role and validity.
- Groups: This is an array that holds a group object. A group object has an id, and a group name.
- Channels: This is another array that consists of a channel object. For a channel, it has an id and a group name.

In terms of permissions, I have decided to implement different actions specific for different roles. 
For instance, for the Super Admin user, I have implemented the actions specific for this user under an actions tab on the Super page.
For the Group Admin, the actions differ from the Super Admin and are all under the actions tab in the Group Admin page. This is the same for Group Assistant as well.
The reason I did it like this was so that I could visually see on the website what action each user has. However, this may be improved in phase 2 of Assignment 1.

## Rest API
For Phase 2, the data are all located on the mongodb side with the views all located on the frontend side. So in order to communicate back and forth from the frontend to the server, Rest API was implemented. The routes currently implemented for Phase 2 are all detailed below. However there are a few missing routes in the code but I have included them here.

### Auth Route
**Description**: This auth route is the authentication route that checks if a user exists. If a user exists, then it logs them in and displays the appropriate page according to the role. If not, it displays an error message.<br>
**Route**: /auth <br>
**Method**: POST <br>
**Parameter**: |username: string| <br>
**Return**: | If authenticated: {user: {id: number, username: string, email: string, role: string, valid: boolean}| If not authenticated: err|<br>
**Technical Explanation**: This route takes an email address in the request body and compared to the email addresses in the mongodb which is read first. If there exists a match, the route will return all the parameters of that email but if there is no match, an error message is returned as a response.

### CreateUser Route
**Description**: This route takes in a username and email and checks if one exists. If there is none that exists with such username and email, it creates a new one and adds it to the users.json file<br>
**Route**: /createUser <br>
**Method**: POST <br>
**Parameter**: |username: string|email: string| <br>
**Return**: | If user already exists: Message saying it Exists is send via res.send() method| If it does not exist: new users: {id: number, username: string, email: string, role: string, valid: boolean}|<br>
**Technical Explanation**: This route takes an email address and username in the request body and compares it to the usernames and email addresseses in the users mongo database file which is read first. If there exists a match, the route will return an err message but if there is no match, a user object will be created.

### DeleteUser Route
**Description**: This delete route is deletes an existing user according to the ID provided.<br>
**Route**: /deleteUser <br>
**Method**: POST <br>
**Parameter**: |id: number| <br>
**Return**: | If id matches an id in users: user object deleted| If not nothing happens|<br>
**Technical Explanation**: This route takes an id in the request body and by reading the users mongodb, the id is compared. If it matches, that user object with that particular id is deleted from the array, otherwise it will return an error message. 

### CreateGroup Route
**Description**: This route is responsible for creating the group. If not, it displays an error message.<br>
**Route**: /create/Group <br>
**Method**: POST <br>
**Parameter**: |groupName: string<br>
**Return**: | If no group exists: {groups: {groupName: string, members: {username: string, email: string, role: string, valid: boolean}}}| If group exists: err|<br>
**Technical Explanation**: This route takes a groupName in the request body and compares it to the groupName in the groups mongo db file which is read first. If there exists a match, the route will return error but if the parameters of that groupName is similar, an error message is returned as a response.

### Add User to Group Route
**Description**: This route is the authentication route that checks if a user exists. If a user exists, then it adds that user to the group but if not, it displays an error message.<br>
**Route**: /add/user <br>
**Method**: POST <br>
**Parameter**: |username:string, groupname: string| <br>
**Return**: | If authenticated: {user: {id: number, username: string, email: string, role: string, valid: boolean}| If not authenticated: err| <br>
**Technical Explanation**: This route takes in the groupID, loops through the groups in the groups mongo db and adds the user object to the associated group with that ID.

### Remove User from Group Route
**Description**: This route is the authentication route that checks if a user exists in a group. If a user exists, then it needs to delete that user from the group but if not, it displays an error message.<br>
**Route**: /remove/user <br>
**Method**: POST <br>
**Parameter**: |username:string, groupname: string| <br>
**Return**: | If authenticated: {user: {id: number, username: string, email: string, role: string, valid: boolean}| If not authenticated: err| <br>
**Technical Explanation**: This route takes in the groupID, loops through the groups in the groups mongodb and deletes the associated user with that ID.

### Delete Group
**Description**: This auth route is the authentication route that deletes a group object. <br>
**Route**: /delete/group <br>
**Method**: POST <br>
**Parameter**: |groupName: string| <br>
**Return**: | If group exists: group object deleted| Otherwise, return an error message <br>
**Technical Explanation**: This route takes a groupName in the request body and compared to the groups it is seen if it mateches. If it does, then, the router will return the corresponding page, otherwise an error will be displayed.

### Create Channel
**Description**: This auth route is the authentication route that checks if a channel exists or not. <br>
**Route**: /create/channel;<br>
**Method**: POST <br>
**Parameter**: |channelName: string|<br>
**Return**: | If doesn't exist: New channel with name and group ID is created. If exist: err!<br>
**Technical Explanation**: This route takes a text in the request body, compared to the email addresses in the users mongo database file which is read first. If there exists a match, the route will return all the parameters of that email but if there is no match, an error message is returned as a response.

### Delete channel
**Description**: This auth route is the authentication route that checks if a channel exists or not. If it does, it will delete the channel that matches it sees. <br>
**Route**: /delete/channel;<br>
**Method**: POST <br>
**Parameter**: |channelName: string|<br>
**Return**: | If doesn't exist: Nothing. If exists: Delete channel with channelname and group ID|<br>
**Technical Explanation**: This route takes a text in the request body, compares it to the channels in the groups mongo db and then deletes it if there's a match but don't if there's no match 

### Update user role
**Description**: This auth route is the authentication route that checks what role the use has. <br>
**Route**: /update/user;<br>
**Method**: POST <br>
**Parameter**: |userid: number, role: string|<br>
**Return**: array with updated role attribute<br>
**Technical Explanation**: This route takes an input and compares it to all the parameters in the user object and updates the roles of that user.

### Add user to channel
**Description**: This auth route is the authentication route that checks if a channel exists or not and then adds a user to that channel.<br>
**Route**: /add-user-channel<br>
**Method**: POST <br>
**Parameter**: |username: string, channelName: string|<br>
**Return**: | If doesn't exist: Add user to channel |<br>
**Technical Explanation**: This route takes a text in the request body, compared to the email addresses in the users.json file which is read first. If there exists a match, the route will return all the parameters of that user but if there is no match, an error message is returned as a response.

### Remove user from channel
**Description**: This auth route is the authentication route that checks if a channel exists or not and then removes a user from that channel.<br>
**Route**: /remove-user-channel<br>
**Method**: POST <br>
**Parameter**: |username: string, channelName: string|<br>
**Return**: | If username doesn't exist: nothing | If exist: Remove user from channel |<br>
**Technical Explanation**: This route takes a text in the request body, compared to the usernames in the users mongo db file which is read first. If there exists a match, the route will delete all the parameters of that username but if there is no match, an error message is returned as a response.

### Get Users
**Description**: This auth route retrieves all the user objects and returns them. <br>
**Route**: /getUsers;<br>
**Method**: POST <br>
**Parameter**: |by: string, groupID: number, channelID: number|<br>
**Return**: | If by is all: users will be return. If by is group or channel:selectedUsers<br>
**Technical Explanation**: This route takes a text in the request body, compared to the email addresses in the users mongo db file which is read first. If there exists a match, the route will return all the parameters of that user but if there is no match, an error message is returned as a response.

### Get messages
**Description**: This route gets the messages stored in the mongodb
**Route**: /getMessage()<br>
**Method**: POST<br>
**Parameter**: |by: string, groupID:number, userID:number
**Return**: |array of previous messages
**Technical Explanation**: This route retrieves all list of previous messages for this user stored in the MongoDB.

## Angular architecture
# Components:
- Home: This is the default route for the program which just shows a simple image and text. It also contains the login button which when clicked would direct us to the login component.
- Login: This is the login route which consists of a simple login form that takes an input for email address, password and a sign in button. As password is not needed, it can be empty when a user logs in with the provided email. When the email has been provided and the sign in buttn is clicked, this will call the click function which makes an HTTP POST request to /auth with the username. The username is then checked and if there's a match, the application navigates to the page specific to the role associated with the email address.
- Super-Admin: This is the super-admin route which would contain a navigation bar with the specific actions or permissions that this super admin user has. The navigation bar also has a chat button to lead to the chat area and a logout button to sign out a user and redirect the application to the login page.
  - CreateUser: This will redirect to a createUser form which will take 2 inputs which are a username and email. In submittin this form, the createUser function will make a HTTP POST request which will create a new user in the users.json file if that particular username and email does not exist.
  - DeleteUser: This will call a delete function which takes an input of the userId and then the function will make a HTTP POST with the id where the users.json file will be read and the id will be matched to the objects. If the id matches a user's object's id, that object will be deleted.
  - ChangeUserRole: This will take an input of the desired role with userID. These will be brought to the server side using a HTTP POST request which will loop through the users.json file to identify the corresponding userID and role so that the role can be changed.
  - CreateGroup: This will navigate to a short html form that is asking for a groupName. Upon submitting this form, the groupName will be created as a groupObject and added into the groups db in the mongo.
  - AddUSer to Group: This will navigate to another html form as well to ask for the username and groupName you want to put the user in. These will then be brought to the server side using a HTTP POST request where the user with the matching usernamename will be addedd to the matching groupName.
  - CreateChannel: This is also similar to creating a group but it is part of the group meaning a channel will be created as an object in the groups array.
  - AddUser to Channel: This will add an existing user to a channel that is part of the group the user is in.
  - RemoveChannel: This will take in the channelID and look through the channel ids in the groups array to delete that particular channel.
  - RemoveGroup: This is similar to the removeChannel but in this case its for the group array.
- Group-Admin: This is the group-admin route which is similar to the super-admin but the actions for this user are a bit different and they are specific only to this user. It aso has a chat button and logout button.
  - CreateUser: This will redirect to a createUser form which will take 2 inputs which are a username and email. In submittin this form, the createUser function will make a HTTP POST request which will create a new user in the users.json file if that particular username and email does not exist.
  - CreateGroup: This will navigate to a short html form that is asking for a groupName. Upon submitting this form, the groupName will be created as a groupObject and added into the groups.json file.
  - AddUSer to Group: This will navigate to another html form as well to ask for the username and groupName you want to put the user in. These will then be brought to the server side using a HTTP POST request where the user with the matching usernamename will be addedd to the matching groupName.
  - CreateChannel: This is also similar to creating a group but it is part of the group meaning a channel will be created as an object in the groups array.
  - AddUser to Channel: This will add an existing user to a channel that is part of the group the user is in.
  - RemoveChannel: This will take in the channelID and look through the channel ids in the groups array to delete that particular channel.
  - RemoveGroup: This is similar to the removeChannel but in this case its for the group array.
- Group-Assist: This is the group-assist route which is also similar to the super admin and group admin however it has fewer actions than the 2. Other featuers are also similar such as the chat and logout button.
  - CreateUser: This will redirect to a createUser form which will take 2 inputs which are a username and email. In submittin this form, the createUser function will make a HTTP POST request which will create a new user in the users.json file if that particular username and email does not exist.
  - AddUSer to Group: This will navigate to another html form as well to ask for the username and groupName you want to put the user in. These will then be brought to the server side using a HTTP POST request where the user with the matching usernamename will be addedd to the matching groupName.
  - CreateChannel: This is also similar to creating a group but it is part of the group meaning a channel will be created as an object in the groups array.
  - AddUser to Channel: This will add an existing user to a channel that is part of the group the user is in.
  - RemoveChannel: This will take in the channelID and look through the channel ids in the groups array to delete that particular channel.
- LogOut: This will call a logout function which clears the localStorage and navigates to the login page forcing the user to not have access anymore unless they login again.

## Sockets
Sockets was used in the chat message which allows a user to chat with other users while their previous message are shown. The routes and methods were all carried out using a socket service in the project. 

## Summary
Overall this works by interacting with the client side getting information from users, which then is stored, updated or checked in the mongo database so that a certain method or route can be taken to go to the required page or view in accordance to what the user entered. 

## Reflection
I didn't get much done as I only got the basics covered but I did learn a lot which I can be able to use in the future.

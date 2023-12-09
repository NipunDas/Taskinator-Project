# UML Class Diagram

Last updated: December 8th, 2023

The UML class diagram below contains the model for how persistent data is stored in the database.
The main idea of the model is that the only data that needs to be persistently stored is the lists
of users and tasks. Since the list of tasks could potentially grow large, we made the decision to
store the task lists in a separate collection and record a reference to them in the user schema,
rather than embedding the task list in the user schema.

![UML Class Diagram](https://github.com/NipunDas/Taskinator-Project/blob/main/docs/images/Project_Diagram.png?raw=true)

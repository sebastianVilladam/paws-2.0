# paws-2.0
## User manual

### Seting up:
To start the aplication you only need to open de index.html file on your browser

### Public side:
There are tree pages on the public side of the application.
    1. index.htm: It is the home page of the app
    2. animals.html: In this view you can see all the tha animals up for adoption
        1. you can sort de list by entry date, name, and type. Just choose ona on the selection form
        2. you can filter the animals by branch. Just choose a branch on the select form
    3. login.html: This page is where a branch employee can sing in. Just click on the sing in button to login.

### Private or administration side:
There are nine pages for the administration employees, where five are for animals CRUD and tree for branches CRUD.
    1. adminHome.html: It is the welcome page for admins
    2. admAnimals.html: It is the list of all animals on the sistem's data base
        1. Change Status button gets you to the animalStatus.html page
        2. Modify data button gets you to the modAnimal.html page
        3. Eliminate button gets you to the delAnimal.html page
        4. Add animal button get you to the addAnimal.html page
        5. Go back button get you to the adminHome.html page
    3. animalStatus.html: At this page you can change the selected animal status        
    4. addAnimal.html: Form were you can add a new animal to the shelter (server responding 500 for this one)
    5. delAnimal.html: At this age you can delete the selected animal.
    6. modAnimal.html: At this page you can modify the selected animal data
    7. admBranches.html: It is the list of the branches on the sistem's data base
        1. Go back button gets you to the adminHome.html page
        2. Add branch gats you to de addBranch.html page
        3. Sort by name lets you sort de list by branch name
        4. Modify data gets you to the modBranch.html page
    8. addBranch.html: A form were you can create a new branch
    9. modBranch.html: At this page you can modify the selected branch data
1. Added UPDATE and DELETE function to frontend
2. added "isAutherticated" functionality to UPDATE and DELETE function
3. replaced USER array object with users.json file (permanent save)
4. added login, register link to navbar 
5. added hashing to passward using bcrypt
6. Added extra page to show individual todo "task" other than update page

7. create isAuthenticatedPage function to work with page,
```but throwing some error because while connecting isAuthenticated method to single task page,
   so for now no login required to view single task

          Root
          /   \
        todo  authentication
       /   \      /   \
create  single  login  register
      / \
delete  update

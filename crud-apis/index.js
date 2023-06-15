const http = require("http")

const users = [
    {
        name : "Bruce",
        age : 25
    },
    {
        name : "Tony",
        age: 30
    },
    {
        name : "Steve",
        age : 70
    }
]


const server = http.createServer(function(request, response){
    //get path 
    const paths = request.url.split("/")
    // console.log("Path is :- ", paths)
    console.log("---Methods--- ", request.method)

    //Method GET*************************************************************************************************
    //print all users 
    if(request.method == 'GET' && paths[1] === "users" && paths.length === 2){
        response.write(JSON.stringify(users))
    }
    //get specific user
    else if(request.method == 'GET' &&  paths[1] === "users" && paths[2]){
        const idx = paths[2]
        const user = users[idx]
        //if user exists
        if(user){
            response.write(JSON.stringify(user))
        }
        //if not
        else{
            response.write("Not found")
        }
    }

    //Method POST************************************************************************************************
    //Get data from user
    else if(request.method == 'POST' && paths[1] === "users"){
        //create empty data
        let data = ""
        //add data chucks to  data variable
        request.on("data", function(chunk){
            data += chunk
            // console.log(chunk)
        })
        //convert data to JSON 
        request.on("end", function(){
            const obj = JSON.parse(data.toString())
            //push object in users
            users.push(obj)
        })

        response.statusCode = 201
        response.write("User data created")
    }

    //Method PUT*************************************************************************************************
    //Updating the values
    else if(request.method == 'PUT' && paths[1] === 'users'){
        if(paths.length === 2){
            //create empty data
            let data = ""
            //add data chucks to  data variable
            request.on("data", function(chunk){
                data += chunk
                // console.log(chunk)
            })
            //convert data to JSON 
            request.on("end", function(){
                
                const user = JSON.parse(data.toString())
                // console.log("Curr",user)
                // console.log("lis",users)

                //get index of element with given name
                const indx = users.findIndex(function(cuser){
                    return cuser.name == user.name
                })
                //check if user exists
                if(indx === -1){
                    response.write("User not found")
                    console.log("User not found")
                }
                //if user exists then update user data
                else{
                    // for (let key in user) {
                    //     users[indx][key] = user[key]
                    // }

                    //SPREAD operator
                    users[indx] = {
                        ...users[indx],
                        ...user
                    }

                    response.write("User updated")
                    console.log("User updated")
                }

            })

        }
        else{
            response.write("Wrong URL for PUT method")
        }
    }

    //Method DELETE**********************************************************************************************
    //Deleting the user
    else if(request.method == 'DELETE' &&  paths[1] === "users" && paths[2]){
        const idx = paths[2]
        const user = users[idx]
        //if user exists
        if(user){
            users.splice(idx, 1)
            response.write("Successfully removed the user")
        }
        //if not
        else{
            response.write("User Not found")
        }
    }


    //if random url given
    else {
        response.write("Not found")
    }
    
    response.end()
})

server.listen(3000, function(){
    console.log("Server is running on port 3000")
})
const bcrypt = require('bcryptjs');

// const password = 'myPassword123';

// // Generate a salt to use during hashing
// const salt = bcrypt.genSaltSync(10);

// // Hash the password using the generated salt
// const hashedPassword = bcrypt.hashSync(password, salt);

// Print the hashed password
// console.log('Hashed Password:', hashedPassword);

const hashedPassword = '$2a$10$/wpRBmpAc5GWelOrxGUi8.4.Z0v05vW73Aiz2Cej8RfGswNLq/T2a'

const userInputPassword = 'myPassword123';

const isMatch = bcrypt.compareSync(userInputPassword, hashedPassword);

console.log('Passwords match:', isMatch);

{/* <script>
    openTodoPage= (title) => {
        const token = localStorage.getItem("access_token")
        const url = `/todos/${title}`;
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "authorization": token
        };

        const queryString = Object.entries(headers)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");

        // console.log(token)
        alert("You are not logged in, redirecting to login page.")
        

        window.location.href = `${url}?header=${queryString}`;
    };
</script> */}

{/* <script>
    openTodoPage= (title) => {
        const token = localStorage.getItem("access_token");
        const url = `/todos/${title}`;
        const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token
        };

        fetch(url, {
            method: "GET",
            headers: headers
            })
            .then((response) => {
                if (response.ok) {
                window.location.href = response.url;
                } else {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }
        })
        .catch((error) => {
            console.error(error);
        });
    }
</script> */}
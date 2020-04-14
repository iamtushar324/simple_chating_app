

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

// postData('/login', { username: "tusa", password: "ppppp" })
//     .then((data) => {
//         console.log(data);
//     });


document.getElementById("login_btn").onclick = () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    postData('/login', { username: username, password: password })
        .then((data) => {

            if (data.username == username) {

                document.getElementById('loign').style.display = "none"
                document.getElementById('head').innerHTML = `Welcome , ${username}`
                document.getElementById('chatRoom').style.display = "block"

                let socket = io()

                socket.on("msg_re", () => {

                    let temp = document.createElement('li').innerHTML(msg.msg)

                    document.getElementById("msg_list").appendChild(temp)


                })



                document.getElementById("send_btn").onclick = () => {

                    let sendTo = document.getElementById("sendTo").value
                    let msg = document.getElementById("msg").value



                    socket.emit("msg_send", { msg: msg, to: sendTo })
                }
            }


        }




        });
}


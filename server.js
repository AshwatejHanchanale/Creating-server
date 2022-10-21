const http = require("http");
const port = 8081;

const toDoList = ["complete node byte", "play cricket",];

http
    .createServer((request, response) => {
        const { method, url } = request;
        if (url === "/todos") {
            if (method === "GET") {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(toDoList.toString());
            } else if (method === "POST") {
                let body = "";
                request.on('error', (err) => {
                    console.log(err)
                }).on('data', (chunk) => {
                    body += chunk;


                }).on('end', () => {
                    body = JSON.parse(body);
                    let newToDo = toDoList;
                    newToDo.push(body.item);
                    console.log(newToDo);
                })

            }

            else {
                response.writeHead(501);
            }
        }
        response.end();
    })
    .listen(port, () => {
        console.log(`nodejs server started on port ${port}`);
    });
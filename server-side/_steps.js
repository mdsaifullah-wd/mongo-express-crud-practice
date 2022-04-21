/* 
-----------------------------------------------
-------------------Client Side-----------------
------------------------------------------------
1. Create a react project
2. Fetch data by get method from the server
3. Create a form and create a form submit handler
4. Fetch data by post method to send data to the server
5. Fetch data by put method to update data. send the id dynamically to find the exact document in database
6. Fetch document id by delete method to delete a document. send the id dynamically to find the exact document in database

-----------------------------------------------
-------------------Server Side-----------------
------------------------------------------------
1. mkdir project-folder, cd project-folder
2. npm init -y
3. npm i express cors mongodb [or other dependencies]
4. create index.js and setup expressJS [follow 5 steps]
    1. import/require express
    2. set app by invoking express
    3. set port
    4. create a simple get/post method (optional)
    5. create app listener (first parameter is port and second one is a callback where we can console.log to test whether server is running)
5. set a script to run index.js by nodemon (nodemon should installed globally)
6. run the server

7. create a app.get to send data to the client-----
 app.get('/route', (req, res) => {
    res.send('data')
})
8. create a app.post to receive data from the client -----
    app.post('/route', (req, res) => {
        const data = req.body
        res.send(data)
    })
9. Create a app.put to receive data from the client and update it in the database 

10. Create a app.delete to delete data from the database. receive dynamic id from the client to find the exact data should be deleted

-----------------------------------------------
-------------------Database -----------------
------------------------------------------------
1. Signup Mongodb
2. Build your first cluster
3. Create your first database user
4. Add IP address to your access list
5. Connect your cluster (Connect your application=> copy the config code to the server)
6. In the config code there are: 
    1. Necessary imports
    2. uri string (secret info related to database account)
    3. create client using uri
    4. An async function to Insert/Find document(s) from the database. Function declaration followed by invocation.
    5. Inside the function first use try and finally. on try first connect the client. Then create a database and under that database create a collection where documents will be stored
    6. After that, create necessary endpoints like get/post function to send/receive data from client side. And send/get data to/from the database.
    7. app.post function is for receiving data from the client and store the data to the database. It has two parameter. and it should be an async function. first parameter is the route, second one is a callback function where we have two parameters (req and res). we can receive the data from the clients by accessing req.body and this data should be pass to the database using await collection.insertOne(data) method
    and we can also send an response using res.send(response)
    8.app.get function is for sending data from database to the client It has two parameter. and it should be an async function. first parameter is the route, second one is a callback function where we have two parameters (req and res). inside the function first select query object which will indicate how filter process should be done from database. Then use find(query) method to find the data from database. await  data.toArray() method will convert the data as an array. and then we should pass the data to the client by using res.send

    9. app.put function is for updating data in database after receiving from the client. It has two parameter. and it should be an async function. first parameter is a dynamic route where document id should be passed by user, second one is a callback function where we have two parameters (req and res). To receive the data we use req.body because data is passed by a body from the client side. To receive the dynamic id we have to use req.params.<parameter_name> inside the function. and select filter object which will indicate which object should update from database(const filter = {_id: ObjectId(id)}).  After that, we have to create an updateDoc object which has a $set property, the value of the $set should be a data object which we received from the client side. finally we use collectionName.updateOne(filter, updateDoc). this method should call with await. after that we can send response or updated data to the user.

    10. to delete data from the database use app.delete function. declare route dynamically and get the id of the document by using req.params.<dynamic_parameter>. then create a query object. and then use deleteOne(query) method to delete tha data from the database.
*/

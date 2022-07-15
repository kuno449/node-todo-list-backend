const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())


app.get('/', (request, response) => {
    response.send('Server is running!!');
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const tasksRouter = require('./src/controllers/tasks')
app.use('/api/tasks', tasksRouter)

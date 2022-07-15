const db = require('../utils/firebase');
const tasksRouter = require('express').Router()

tasksRouter.get('/', async (request, response) => {
    const collection = await db.collection('tasks').get();

    const tasks = [];
    collection.forEach(snap => {
        tasks.push({
            "id" : snap.id,
            "title": snap.data().title,
            "description": snap.data().description,
            "date": snap.data().date,
        });
    });

    response.json(tasks);
});

tasksRouter.get('/:id', async (request, response) => {
    const id = request.params.id;
    const snap = await db.doc(`tasks/${id}`).get();
    const task = {
        "id" : snap.id,
        "title": snap.data().title,
        "description": snap.data().description,
        "date": snap.data().date,
    }

    if (task) {
        response.json(task)
    } else {
        response.status(404).end()
    }
});

tasksRouter.post('/', async (request, response) => {
    if (!request.body) {
        return response.status(400).json({
            error: 'task object is not complete.'
        })
    }

    const task = request.body;
    const createdTask = await db.collection('tasks').add(task);

    response.json(createdTask.id);
});

tasksRouter.put('/:id', async (request, response) => {
    if (!request.body) {
        return response.status(400).json({
            error: 'task object is not complete.'
        })
    }

    const id = request.params.id;
    const task = {
        "title": request.body.title,
        "description": request.body.description,
        "date": request.body.date,
    }
    await db.doc(`tasks/${id}`).update(task);

    response.status(200).end();
});

tasksRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;
    await db.doc(`tasks/${id}`).delete();

    response.status(204).end();
});

module.exports = tasksRouter
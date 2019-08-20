const express = require('express');
const projectDb = require('./data/helpers/projectModel');
const actionDb = require('./data/helpers/actionModel');
const router = express.Router();

// CRUD operation apis for projects

router.get('/', (req, res)=> {
    projectDb.get()
             .then(projects=>{res.status(200).json(projects)})
             .catch(error=>{
                 console.log(error)
                 res.status(500).json({message: 'The projects information could not be retrieved.'})
             })
})

router.get('/:id/actions', (req, res) => {
    const id = req.params.id
    projectDb.getProjectActions(id)
            .then(projectActions => res.status(200).json(projectActions))
            .catch(error => {
                    console.log(error)
                    res.status(500).json({ message: 'Error processing request' })
            })

});

router.post('/', (req, res) => {
    const newProject = req.body
    projectDb.insert(newProject)
            .then(newProject => res.status(201).json(newProject))
            .catch(error => {
                    console.log(error)
                    res.status(500).json({ message: 'Error processing request' })
            })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    projectDb.remove(id)
            .then(deleted => res.status(200).json(deleted))
            .catch(error => {
                    console.log(error)
                    res.status(500).json({ message: 'The project could not be removed' })
            })

});

router.put('/:id', (req, res) => {
    const id = req.params.id
    const updated = req.body
    projectDb.update(id, updated)
            .then(updated => res.status(201).json(updated))
            .catch(error => {
                    console.log(error)
                    res.status(500).json({ message: 'The project information could not be modified.' })
            })

});


// CRUD operation apis for action

router.get('/actions', (req, res)=> {
        console.log('hellow')
    actionDb.get()
             .then(action=>{res.status(200).json(action)})
             .catch(error=>{
                 console.log(error)
                 res.status(500).json({message: 'The action information could not be retrieved.'})
             })
})

router.get('/actions/:id', (req, res) => {
        const id = req.params.id
        actionDb.get(id)
                .then(action => res.status(200).json(action))
                .catch(error => {
                        console.log(error)
                        res.status(500).json({ message: 'Error processing request' })
                })
});

router.post('/:id/actions', (req, res) => {
    const project_id = req.params.id
    const newaction = { ...req.body, project_id }
    actionDb.insert(newaction)
            .then(newaction => { res.status(201).json(newaction) })
            .catch(error => {
                    console.log(error)
                    res.status(500).json({ message: 'There was an error while saving the action to the database' })
            })

});

router.delete('/actions/:id', (req, res) => {
    const id = req.params.id
    actionDb.remove(id)
            .then(deleted => res.status(200).json(deleted))
            .catch(error => {
                    console.log(error)
                    res.status(500).json({ message: 'The action could not be removed' })
            })

});

router.put('/actions/:id', (req, res) => {
    const id = req.params.id
    const updated = req.body
    actionDb.update(id, updated)
            .then(updated => res.status(201).json(updated))
            .catch(error => {
                    console.log(error)
                    res.status(500).json({ message: 'The action information could not be modified.' })
            })

});


//since the two resource are created in the same route i need to move this get by id to the end so that '/action' could work
router.get('/:id', (req, res) => {
        console.log('hi')
        const id = req.params.id
        projectDb.get(id)
                .then(project => res.status(200).json(project))
                .catch(error => {
                        console.log(error)
                        res.status(500).json({ message: 'Error processing request' })
                })
});


module.exports = router;
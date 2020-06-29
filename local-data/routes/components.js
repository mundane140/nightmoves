const router = require('express').Router()
let components = require('../lib/data').components

// body:info(unique)
// query: -
// params: -
// headers: 'Content-Type': 'application/json'
// return: doc
router.post('/', (req, res) => {
  console.log('------COMPONENTS:POST------')
  let info = req.body.info
  if(info)
    components.find({ info: { name: info.name } }, (err, docs) => {
      if(!err && doc) {
        if(docs.length === 0) {
          components.insert({
            info,
            components: []
          }, (error, newDoc) => {
            if(!error && newDoc) {
              res.json(newDoc)
            } else {
              console.log('Error trying to add the component:', error)
              res.sendStatus(500)
            }
          })
        } else {
          console.log('Error trying to add the component: The component already exists.')
          res.sendStatus(400)
        }
      } else {
        console.log('Error trying to find the component by info during post:', err)
        res.sendStatus(500)
      }
    })
  else {
    console.log('Missing or invalid parameters while creating component.')
    res.sendStatus(400)
  }
})

// body: -
// query: -
// params: componentId
// headers: 'Content-Type': 'application/json'
// return: doc
router.get('/:componentId', (req, res) => {
  console.log('------COMPONENTS:GET------')
  if(req.params.componentId.length === 16) {
    components.findOne({ _id: req.params.componentId }, (error, doc) => {
      if(!error) {
        if(doc) res.json(doc)
        else res.sendStatus(404)
      } else {
        console.log('Error trying to get component by ID: ', error)
        res.sendStatus(500)
      }
    })
  } else {
    components.find({}, (error, docs) => {
      if(!error && docs) {
        res.json(docs)
      } else {
        console.log('Error trying to get all components: ', error)
        res.sendStatus(500)
      }
    })
  }
  res.sendStatus(200)
})

// body: _id, info
// query: -
// params: -
// headers: 'Content-Type': 'application/json'
// return: -

router.put('/', (req, res) => {
  console.log('------COMPONENTS:PUT------')
  let _id = typeof req.body._id === 'string' && req.body._id.length === 16 ? req.body._id : false
  let info = req.body.info

  if(_id && info) {
    components.update({ _id }, { $set: { info } }, {},(error, numReplaced) => {
      if(!error) {
        res.sendStatus(200)
      } else {
        console.log('Error trying to update component: ', error)
        res.sendStatus(500)
      }
    })
  } else {
    console.log('Missing or invalid arguments while editing component.')
    res.sendStatus(400)
  }
  res.sendStatus(200)
})

// body: 
// query: -
// params: componentId
// headers: 'Content-Type': 'application/json'
// return: -
router.delete('/:componentId', (req, res) => {
  console.log('------COMPONENTS:DELETE------')
  if(req.params.componentId === 16) {
    components.remove({ _id }, {}, (error, numRemoved) => {
      if(!error) res.sendStatus(numRemoved? 200: 404)
      else {
        console.log('Error trying to remove component: ', error)
        res.sendStatus(500)
      }
    })
  } else {
    console.log('Missing or invalid params.')
    res.sendStatus(400)
  }
})

module.exports = router

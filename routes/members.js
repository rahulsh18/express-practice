const app = require('express');
const router = app.Router();
const members = require('../Members');
const uuid = require('uuid');


//gets all members
router.get('/', (req, res) => res.json(members));

//gets single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ msg: `No member found with the id of ${req.params.id}`});
    }

});

//create member 
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        Name: req.body.Name,
        Gender: req.body.Gender
       
    }

    if(!newMember.Name || !newMember.Gender) {
        return res.status(400).json({ msg: "Please enter all the details"});
    }

    members.push(newMember);
    //res.json(members);
    res.redirect('/');
})

//update member
router.put('/:id', (req,res) => {
   
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.Name = updMember.Name  ? updMember.Name : member.Name;
                member.Gender = updMember.Gender ? updMember.Gender : member.Gender;

                res.json({ msg: "member updated"});
            }
        })
    } else {
        res.status(400).json({ msg: `No member found with the id of ${req.params.id}`});
    }
});

//delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        
        res.json( {msg: "member deleted", members:members.filter(member => member.id !== parseInt(req.params.id))});
    }
    else {
        res.status(400).json({ msg: `No member found with the id of ${req.params.id}`});
    }

});

module.exports = router;
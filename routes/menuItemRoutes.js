const express = require('express')
const router = express.Router()
const menuItem = require('./../models/menu')

router.post('/',async(req,res)=>{
    try{
        const data = req.body
        const newMenuItem = new menuItem(data)
        const response = await newMenuItem.save()
        console.log('menu item added')
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})
router.get('/',async(req,res)=>{
    try{
        const data = await menuItem.find()
        console.log('Menu item fetched')
        res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.get('/:taste',async(req,res)=>{
    try{
        const taste = req.params.taste
        if(taste == 'sweet' || taste == 'sour' || taste == 'spicy')
        {
            const response = await menuItem.find({taste : taste})
            console.log('data fetched')
            res.status(200).json(response)
        }
        else
        {
            res.status(404).json({error: 'Invalid taste type'})
        }

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }

})
router.put('/:id',async(req, res)=>{
    try{
        const menuItemId = req.params.id;
        const updateMenuItem = req.body;
        const response = await menuItem.findByIdAndUpdate(menuItemId, updateMenuItem)
        if(!response)
        {
            return res.status(404).json({error : 'Menu Item not found'})
        }
        console.log('Menu Item updated successfully')
        res.status(200).json(response)
    }catch(err)
    {
        console.log(err)
        res.status(500).json({error : 'Internal Server Error'})
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const menuItemId = req.params.id;
        const response = await menuItem.findByIdAndDelete(menuItemId);
        if(!response)
        {
            return res.status(404).json({error: 'Menu Item not exist'})
        }
        console.log('data deleted');
        res.status(200).json({message : 'Menu Item deleted successfully'})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'Internal Server error'})
    }
})
module.exports = router
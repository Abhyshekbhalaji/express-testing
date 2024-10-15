import express from 'express';

const app=express();
const port=3000;
app.use(express.json());
let itemId=1;
const items=[]


app.post('/teas',(req,res)=>{
    const {name,price}=req.body;
    const newData={id:itemId++,
        name,
        price
    }
    items.push(newData)
    res.status(201).send(items);
    
})
app.get('/teas',(req,res)=>{
   res.status(200).send(items);
    
})
app.get('/teas/:id',(req,res)=>{

    const item=items.find(i =>{
        return (i.id===parseInt(req.params.id));
    })
    if(!item){
      return  res.status(404).send({message:'Item not found'});
    }
    return res.status(200).send(item);
     
 })

app.get('/',(req,res)=>{
    res.send('What ice tea would you prefer?');
})
app.get('/twitter',(req,res)=>{
    res.send('Twitter?');
})

app.put('/teas/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id)); // Properly find the item by id
    const { name, price } = req.body; // Destructure the new data

    if (!item) {
        return res.status(404).send('Item not Found!! :)');
    }

    // Update the item with the new values
    item.name = name;
    item.price = price;

    return res.status(200).send(`Item Updated!! Name: ${item.name}, Price: ${item.price}`);
});

app.delete('/teas/:id',(req,res)=>{
    const idx=items.findIndex(t=> t.id ===parseInt(req.params.id));
    if(idx===-1){
      return  res.status(404).send('Item not Found!! :)')
    }
    items.splice(idx,1);
    return res.status(200).send('Item deleted')
})


app.listen(port,()=>{
    console.log(`Server is running at post : ${port}`)
})

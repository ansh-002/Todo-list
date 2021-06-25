const express =  require('express');
const app =  express();
const path = require('path');
const AppError = require('./apperror');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("connected to mongo db");
})
.catch((err)=>{
    console.log("unable to connect");
})
const Task = require('./models/task');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.get('/tasks',async(req,res,next)=>{
    try{
    const tasks = await Task.find({});
    res.render('task',{tasks});
    }
    catch(e)
    {
        next(e);
    }
});
app.get('/tasks/new',(req,res)=>{
    res.render('form');
});
app.post('/tasks',async(req,res,next)=>{
 try{
  const {name} = req.body;
  console.log(name);
  const task = new Task({name});
  await task.save();
  res.redirect('/tasks');
}
 catch(e)
 {
     next(e);
 }
});
app.get('/tasks/:id',async(req,res,next)=>{
    try{
    const {id} = req.params;
    const task =  await Task.findById(id);
    if(!task)
    {
       throw new AppError('Product not found',404);
    }
    res.render('specific',{task});
   }
   catch(e)
   {
       next(e);
   }

});
app.get('/tasks/update/:id',async(req,res,next)=>{
    try{
    const {id} = req.params;
    const task =  await Task.findById(id);
    if(!task)
    {
      throw new AppError('Product not found',404);
    }
    res.render('form2',{task});
}
catch(e)
{
    next(e);
}
});
app.put('/tasks/:id',async(req,res,next)=>{
    try{
    const {id} = req.params;
   const task =await  Task.findByIdAndUpdate(id,req.body);
   if(!task)
   {
      throw new AppError('Product not found',404);
   }
    res.redirect('/tasks');
   } 
   catch(e)
   {
       next(e);
   }
});
app.delete('/tasks/:id',async(req,res)=>{
    try{
    const {id} = req.params;
    const val =await  Task.findByIdAndDelete(id,req.body);
    res.redirect('/tasks');
    }
    catch(e)
    {
        next(e);
    }
});
app.use((err,req,res,next)=>{
    const {status=500,message='something went wrong'} = err;
    res.status(status).send(message);
})
app.listen(3000,()=>{
    console.log("app is now listening");
});
const express = require ('express');
const path = require('path');
const hbs=require('hbs');
const port=3000;
const app = express();
const http=require('http');
const fs=require('fs'); 
const {response} = require('express');
var requests=require("requests");
const exphbs = require('express-handlebars');
const config = require('./environment.json');

//console.log(config);
const staticPath= path.join(__dirname,"../public");
app.use('/js', express.static(__dirname + '../public/js'));
const templatePath= path.join(__dirname,"../views/");
//console.log(templatePath);
const partialsPath= path.join(__dirname,"../views/partials/");
//console.log(partialsPath);
app.use (express.static(staticPath));
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
//console.log("========================");
//console.log(__dirname);
//console.log("========================");
app.engine('hbs', exphbs({
 defaultLayout:'index.hbs',
 extname:'.hbs',
 layoutsDir:path.join(__dirname,"../views/"),
 partialsDir:path.join(__dirname,"../views/partials/"),
 helpers:{
    json : function(context){
      return JSON.stringify(context);
 },
  filter : function(data,options)
   {

   }
  }})); 
  
app.set("view engine", "hbs");

var data;
var categories;
app.get('/', (req, response) => {
    http.get('http://localhost:5000/categories',(resp) =>{
      resp.on('data',res =>{
          this.categories = JSON.parse(res.toString())
       response.render('categories',{categories:this.categories})
      })
 })
})

app.get ("/", (req, response)=>
{
response.render('index');
});

app.post('/home',(req,response)=>{
    response.redirect('/')
});

app.get ("/login", (req, response)=>
{
response.render('login');
});


app.get ("/signup", (req, response)=>
{
response.render('signup');
});

app.get('/products',(req,response)=>{
  let data;
  let queryParam    
  http.get('http://localhost:5000/products',(resp)=>{
      var productsArray = new Array()
      resp.on('data',res=>{
          this.products = JSON.parse(res.toString())
          this.products.map((val, index,arr)=>{           
              if(val.category === req.query.category){
                  productsArray.push(val)
              }
          })
         if(req.query.category === undefined){
          response.render('products',{products: this.products,categories:this.categories})
         }else{
          response.render('products',{products: productsArray,categories:this.categories})
         } 
          
      })
  })
  
})
app.get("/cart",(req,response)=>
{
response.render('cart');
});

app.get ("*", (req, response)=>
{
response.render("404",
{
    errorcomment:"Oops Page not found",
});
});


app.set('port', process.env.PORT || 3000);

app.listen (3000,()=>{
    console.log("listing on port at 3000");
});


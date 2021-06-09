
window.onload=function()
{
   const cart=document.querySelector('#cart-btn');
   const minicart= document.querySelector('.mini-cart');
   const cartclosebtn=document.querySelector('.close-btn');
  
    cart.addEventListener("click", function()
   {
     minicart.classList.add('active');
   });
  cartclosebtn.addEventListener("click", function()
 {
       minicart.classList.remove('active');
  });
  // adding items to local storage
    const addtocartbtn=document.getElementsByClassName('add-to-cart'); 
    
    let items=[];
    for(let i=0;i<addtocartbtn.length; i++)
    {
     addtocartbtn[i].addEventListener("click", function(e)
     {

     if(typeof(Storage)!=='undefined')
     {
     let item ={
         id:i+1,
         price:e.target.parentElement.previousElementSibling.children[0].textContent,
         name:e.target.parentElement.parentElement.parentElement.children[0].textContent,
         image:e.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].src,
         no:1   
     };
     if(JSON.parse(sessionStorage.getItem('items'))===null)
     {
        items.push(item);
        sessionStorage.setItem("items", JSON.stringify(items));
        window.location.reload();
     }
     else
     {
     const localItems=JSON.parse(sessionStorage.getItem("items"));
     localItems.map(data=>{
         if(item.id==data.id)
         {
             item.no=data.no+1;
        
         }
         else
         {
           items.push(data);
         }
    
     });
     items.push(item);
     sessionStorage.setItem('items', JSON.stringify(items));
     window.location.reload();
     }
     }
     else
     {
     alert('Local storage is not working in your browser');
     }
     });
    }
    //adding data to shopping cart
    const cartcountinfo=document.querySelector('.cart-count-info');
    let no=0;
    JSON.parse(sessionStorage.getItem('items')).map(data=>{
    no=no+data.no;
    });

    cartcountinfo.innerHTML=no + " "+ 'items';
    
    const cartcount= document.querySelector('.cart-count');
    cartcount.innerHTML="(" + no + " " + 'items' + ")";
    // console.log(cartcountinfo);





    // adding cart data in cart container
    const cartcontainer=minicart.querySelector('section');
    let cartdata='';
    if (JSON.parse(sessionStorage.getItem('items') =="[]"))
    {
        cartdata+='<div class="empty-cart"><h2>No items in your cart</h2></br><span>Your favourite items are just a click away</span> </div> <button class="start-shopping" id="start-shopping" aria-label="Start Shopping here">Start Shopping</button>';
    }
    

    else{
    JSON.parse(sessionStorage.getItem('items')).map(data=>{
            cartdata+='<div class="cart-items"><section aria-label="cart items images"><img src="'+data.image+'"class="product-img"></section><section class="itemdetails"><input type="hidden" value="'+data.id+'"><h3>'+data.name+'</h3><section><button aria-label="Add one of this item" class="round cartbutton decrement">-</button><input type="text" aria-label="Quantity of items in cart" class="item-qty" value="'+data.no+'"/><button aria-label="Reduce one from this item" class="round cartbutton increment">+</button><span> X </span>  <span aria-label="Price of single item" class="item-price">'+ data.price+'</span><span aria-label="Total Price for item" class="total"> </span></section></section></div>';
        });
cartdata+= '<div class="myfooter"><div class="row promotionimg"><img src="img/lowest-price.png"><p>You would not find it cheaper anywhere</p></div> <div class="cart-footer"><span aria-label="Promo code can be applied on payment page">Promo code can be applied on payment page</span><div aria-label="checkout" class="checkoutbtn" id="checkoutbtn"></div></div></div>';
    }
cartcontainer.innerHTML=cartdata;
//let start=cartcontainer.querySelector('#start-shopping');
//console.log(start);
// increment and decrement button

const increment =document.getElementsByClassName('increment'); // find the element with the ID 'increment'
const decrement = document.getElementsByClassName('decrement'); // find the element with the ID 'decrement'
let newvalue=0;
let inputvalue;
let btnclicked;
let input;
let button;
let quantityelement;
let total =0; 
let cartrows;
let priceelement;
let price;
let itemstotal;
let grandtotal=0;
//console.log(increment);
//console.log(decrement);
/*for(let i=0;i<document.getElementsByClassName("item-qty").length;i++)
{
    document.getElementsByClassName("item-qty")[i].value=no;  
}
*/
for (let i=0;i<increment.length;i++)
{
    button=increment[i];
    button.addEventListener('click', function(event){
    btnclicked=event.target;
    input =btnclicked.parentElement.children[1];
   // console.log(input);
   inputvalue=input.value;
   newvalue=parseInt(inputvalue)+1;
   input.value=newvalue;
   let cartitems=document.getElementsByClassName('itemdetails');
  for (let i=0;i<cartitems.length;i++)
  {
      let cartrows=cartitems[i];
      let priceelement=cartrows.getElementsByClassName('item-price')[0];
      let price=parseInt(priceelement.innerText);
      quantityelement=cartrows.getElementsByClassName('item-qty')[0];
      quantity=quantityelement.value;
      let itemstotal=cartrows.getElementsByClassName('total')[0];
      total=price*quantity;
      itemstotal.innerText= "Rs." +" " + total; 
     
  }
 getgrandtotal();
     })
    
}
for (let i=0;i<decrement.length;i++)
{
     button=decrement[i];
    button.addEventListener('click', function(event){
    btnclicked=event.target;
    input =btnclicked.parentElement.children[1];
    //console.log(input);
    inputvalue=input.value;
    newvalue=parseInt(inputvalue)-1;
 //console.log(newvalue);
   if(newvalue>=1)
   {
    input.value=newvalue;
   }
  else if(newvalue<=0)
  {
  // console.log(btnclicked.parentElement.parentElement.parentElement.children[0].value);
 deleteitem(btnclicked);
  }
  
  function deleteitem(btnclicked)
  {
      let items=[];
      JSON.parse(sessionStorage.getItem('items')).map(data=>{
          if(data.id!=btnclicked.parentElement.parentElement.children[0].value)
          {
         items.push(data);
          }
      });
      sessionStorage.setItem('items', JSON.stringify(items));
      window.location.reload();

  }
  let cartitems=document.getElementsByClassName('itemdetails');
  //console.log(cartitems);

    for (let i=0;i<cartitems.length;i++)
    {
        cartrows=cartitems[i];
        priceelement=cartrows.getElementsByClassName('item-price')[0];
        price=parseInt(priceelement.innerText);
        quantityelement=cartrows.getElementsByClassName('item-qty')[0];
        quantity=quantityelement.value;
        itemstotal=cartrows.getElementsByClassName('total')[0];
        total=price*quantity;
        itemstotal.innerText= "Rs." +" " + total;
       
    }
   getgrandtotal();
})
}
let cartitems=document.getElementsByClassName('itemdetails');

for (let i=0;i<cartitems.length;i++)
{
    cartrows=cartitems[i];
    priceelement=cartrows.getElementsByClassName('item-price')[0];
    price=parseInt(priceelement.innerText);
    quantityelement=cartrows.getElementsByClassName('item-qty')[0];
    quantity=quantityelement.value;
    itemstotal=cartrows.getElementsByClassName('total')[0];
    total=price*quantity;
    itemstotal.innerText= "Rs." + " " + total;
    grandtotal=grandtotal+total;
    let cartbtn=document.querySelector('.checkoutbtn');
    cartbtn.addEventListener("click", function()
 {
       minicart.classList.remove('active');
  });
  
 
}
document.querySelector('.checkoutbtn').innerHTML="Proceed to Checkout" + '<span class="count">Rs.' +  grandtotal + '</span>';
}

function getgrandtotal()
{
    let grandtotal=0;
    let total=0;
    let cartitems=document.getElementsByClassName('itemdetails');
    for (let i=0;i<cartitems.length;i++)
{
    cartrows=cartitems[i];
    priceelement=cartrows.getElementsByClassName('item-price')[0];
    price=parseInt(priceelement.innerText);
    quantityelement=cartrows.getElementsByClassName('item-qty')[0];
    quantity=quantityelement.value;
    itemstotal=cartrows.getElementsByClassName('total')[0];
    total=price*quantity;
    itemstotal.innerText= "Rs." + " " + total;
    grandtotal=grandtotal+total;
}
document.querySelector('.checkoutbtn').innerHTML="Proceed to Checkout" + '<span class="count">Rs.' +  grandtotal + '</span>';
}


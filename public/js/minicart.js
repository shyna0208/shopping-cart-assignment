document.addEventListener('DOMContentLoaded',()=>{
    openminiCart();
    closeminiCart();
    addToCart();
    cartCount();
    showCart();
    incrementCart();
    decrementCart();
    gettotal();
    getgrandtotal();
});

 let cart, minicart, cartclosebtn, cartcount;

 //Open Cart

 function openminiCart()
 {
   cart=document.querySelector('#cart-btn');
   minicart= document.querySelector('.mini-cart');
     cart.addEventListener("click", function()
    {
      minicart.classList.add('active');
    });
   
 }
//Close Cart

 function closeminiCart()
 {
    cartclosebtn=document.querySelector('.close-btn');
    cartclosebtn.addEventListener("click", function()
  {
        minicart.classList.remove('active');
   });
 }

 function addToCart()
 {
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
 }

 function cartCount()
 {
  let cartcountinfo=document.querySelector('.cart-count-info');
  let no=0;
  JSON.parse(sessionStorage.getItem('items')).map(data=>{
  no=no+data.no;
  cartcountinfo.innerHTML=no + " "+ 'items';
  });
  cartcount= document.querySelector('.cart-count');
  cartcount.innerHTML="(" + no + " " + 'items' + ")";
 }

 function showCart()
 {
  const cartcontainer=minicart.querySelector('section');
  let cartdata='';
  if (JSON.parse(sessionStorage.getItem('items') =="[]"))
  {
      cartdata+='<div class="empty-cart"><h2>No items in your cart</h2></br><span>Your favourite items are just a click away</span> </div> <button class="start-shopping" id="start-shopping" aria-label="Start Shopping here">Start Shopping</button>';
  }
  else{
  JSON.parse(sessionStorage.getItem('items')).map(data=>{
          cartdata+='<div class="cart-items"><section aria-label="cart items images"><img src="'+data.image+'"class="product-img"></section><section class="itemdetails"><input type="hidden" value="'+data.id+'"><h5>'+data.name+'</h5><section><button aria-label="Add one of this item" class="round cartbutton decrement">-</button><input type="text" aria-label="Quantity of items in cart" class="item-qty" value="'+data.no+'"/><button aria-label="Reduce one from this item" class="round cartbutton increment">+</button><span> X </span>  <span aria-label="Price of single item" class="item-price">'+ data.price+'</span><span aria-label="Total Price for item" class="total"> </span></section></section></div>';
      });
cartdata+= '<div class="myfooter"><div class="row promotionimg"><img src="img/lowest-price.png"><p>You would not find it cheaper anywhere</p></div> <div class="cart-footer"><span aria-label="Promo code can be applied on payment page">Promo code can be applied on payment page</span><div aria-label="checkout" class="checkoutbtn" id="checkoutbtn"></div></div></div>';
  }
cartcontainer.innerHTML=cartdata;
 }


 let newvalue=0, inputvalue, btnclicked, input, button, quantityelement, total =0, cartrows, priceelement, price, itemstotal, grandtotal=0;
 
 
 function incrementCart()
 { 
  const increment =document.getElementsByClassName('increment'); // find the element with the ID 'increment'
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
  gettotal();
  getgrandtotal();
     })  
}
  
 }

 function gettotal()
 {
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
 }

 function decrementCart()
 {
  const decrement = document.getElementsByClassName('decrement');
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
 gettotal();
 getgrandtotal();  
 });
}
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



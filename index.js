
const catagoryContainer = document.getElementById('catagoryContainer');
const plantCardContainer = document.getElementById('card-container');
const cartContainer = document.getElementById('cartContainer');
const modalContainer = document.getElementById('modalContainer');
const modalDetails = document.getElementById('modalDetails');
const spinner = document.getElementById('spinner');
const totalPrice = document.getElementById('total');


//alltrees
const allTrees = () =>{
     fetch('https://openapi.programming-hero.com/api/plants')
    .then((response) => response.json())
    .then((data) => {
        showAllTrees(data.plants) ;   
    })
    .catch(err => {
        console.log(err);
    })
}


const showAllTrees = (allTrees)=>{
      plantCardContainer.innerHTML ='';
       allTrees.forEach( tree => {
       plantCardContainer.innerHTML += `
           <div class="p-4 space-y-2 bg-white rounded-md shadow-lg">
                 <div class="h-[220px]">
                    <img class="w-full h-full rounded " src="${tree.image}" alt="">
                 </div>
                 <h1 class="text-lg font-semibold">${tree.name}</h1>
                 <p>${tree.description}</p>
                <div class="flex justify-between items-center">
                    <h2 class="bg-[#dcfce7] text-[#15803d] py-1 px-2 rounded-2xl">${tree.category}</h2>
                   <h3 class="text-[#15803d]">৳<span class="font-bold">${tree.price}</span></h3>
               </div>
              <button class="bg-[#15803d] w-full py-1 px-2 rounded-3xl text-white">Add to Cart</button>      
             </div>
        `;
   })
}

//loadCategories-part
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
    .then((response) => response.json())
    .then((data) => {
        const categories = data.categories;
        showCategory(categories);     
    })
    .catch(err => {
        console.log(err);
    })
}

const showCategory = (categories) => {
        categories.forEach(category => {
            catagoryContainer.innerHTML += ` 
             
                <li id="${category.id}" class="hover:bg-[#11d158] pl-5 md:p-1 rounded hover:text-[#ffffff] cursor-pointer text-[#1f2937]">${category.category_name}</li>
            `;
            
        });
        catagoryContainer.addEventListener('click', (event) => {
                const allLi = document.querySelectorAll('li');
                allLi.forEach(li => {
                    li.classList.remove('bg-[#15803d]')
                    li.classList.remove('text-[#ffffff]')
                })
                if (event.target.localName === 'li') {
                    event.target.classList.add('bg-[#15803d]')
                    event.target.classList.add('text-[#ffffff]')
                    plantCategory(event.target.id)
                }
            })
}

// plantCategory - part
const plantCategory = (cardId) =>{
      fetch(`https://openapi.programming-hero.com/api/category/${cardId}`)
      .then((res) => res.json())
      .then((data) => {
         const plantsCategories = data.plants;
         showPlantCategory(plantsCategories) 
           })
      .catch(err => {
         console.log(err);
    })
}


 const showPlantCategory = (plants) => {
    plantCardContainer.innerHTML = "";
    plants.forEach( plant => {
        plantCardContainer.innerHTML += `
           <div id="${plant.id}" class="p-4 space-y-2 bg-white rounded-md shadow-lg">
                 <div class="h-[220px]">
                    <img class="w-full h-full rounded " src="${plant.image}" alt="">
                 </div>
                 <h4 class="text-lg font-semibold">${plant.name}</h4>
                 <p>${plant.description}</p>
                <div class="flex justify-between items-center">
                    <h2 class="bg-[#dcfce7] text-[#15803d] py-1 px-2 rounded-2xl">${plant.category}</h2>
                    <h3 class="text-[#15803d]">৳<span class="font-bold">${plant.price}</span></h3>
               </div>
              <button class="btn bg-[#15803d] w-full py-1 px-2 rounded-3xl text-white">Add to Cart</button>      
             </div>
        `;
   })
  
  }


//  details
plantCardContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'H4') {  
        const id = e.target.parentNode.id;
        details(id);
    } 
});

const details = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((response) => response.json())
    .then((data) => {
       showDetails(data.plants); 
    })
    .catch(err => console.log(err));
}

const showDetails = (plant) => {
   modalDetails.showModal();

   modalContainer.innerHTML=`
        <h4 class="font-bold text-xl">${plant.name}</h4>
        <div class="h-[240px]">
            <img class="w-full h-full rounded-lg" src="${plant.image}" alt="">
        </div>
        <h1><span class="font-bold">Category:</span> ${plant.category}</h1>
        <h3><span class="font-bold">Price:</span> ৳${plant.price}</h3>
        <p><span class="font-bold">Description:</span> ${plant.description}</p> 
  `
}


//spinner
const loading = () => {
    if (loading) {
        spinner.innerHTML = `
           <span class="loading loading-dots loading-xs"></span>
           <span class="loading loading-dots loading-sm"></span>
           <span class="loading loading-dots loading-md"></span>
           <span class="loading loading-dots loading-lg"></span>
           <span class="loading loading-dots loading-xl"></span>
        `;
        spinner.classList.remove("hidden");
    } else {
        spinner.classList.add("hidden");
    }
}


 //cart part
let allCart = [];
let total = 0;

plantCardContainer.addEventListener('click', (e) => {
    if (e.target.innerText === 'Add to Cart') {
        handleCart(e);
    }
});


const handleCart = (e) => {
    const name = e.target.parentNode.childNodes[3].innerText;
    const price = e.target.parentNode.childNodes[7].childNodes[3].innerText;
    const priceFloat = parseInt(price.replace('৳','').trim());
    // console.log(price);
    const id = e.target.parentNode.id;

    const findNum = allCart.find(item => item.id === id);
    if (findNum) {
       findNum.item = findNum.item + 1; 
    }
    else{
         allCart.push({
            name: name,
            price: priceFloat,
            id: id,
            item:1
        });
    }
    total = priceFloat + total;
    totalPrice.innerText = "৳"+ total;
    showCart(allCart);

     alert(`${name} has been added to the cart.`)
}


const showCart = (carts) => {
   cartContainer.innerHTML = '';
   carts.forEach ( cart => {
     cartContainer.innerHTML += `
        <div class="bg-[#F0FDF4] mt-4 p-2 rounded flex justify-between items-center">
            <div> 
                <h1 class="font-bold text-xl">${cart.name}</h1>
                <p class="text-gray-600">${cart.price} <span> × ${cart.item} </span></p>
            </div>
            <button onclick="handleDelete('${cart.id}')" class=" text-red-700">❌</button>
        </div>

     `;
   })
}

//handle delete part
const handleDelete = (idDel) => {
   const remove = allCart.find(cart => cart.id === idDel)
   if (remove) {
     total = total - remove.price;
     totalPrice.innerText = "৳"+ total;
     remove.item = remove.item - 1;
   }
   if (remove.item === 0) {
      allCart = allCart.filter(carts => carts.id !== idDel);
   }
   
   showCart(allCart);
}



loadCategories();
allTrees()


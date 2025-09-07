

const catagoryContainer = document.getElementById('catagoryContainer');
const plantCardContainer = document.getElementById('card-container');

//alltrees
const allTrees = () =>{
     fetch('https://openapi.programming-hero.com/api/plants')
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);
        // const categories = data.categories;
        showAllTrees(data.plants) ;   
    })
    .catch(err => {
        console.log(err);
    })
}

//showAllTrees

const showAllTrees = (allTrees)=>{
    //   console.log(allTrees);
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
                   <h3>৳<span class="text-[#15803d]">${tree.price}</span></h3>
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

//showCategory-part
const showCategory = (categories) => {
        categories.forEach(category => {
            catagoryContainer.innerHTML += ` 
             
                <li id="${category.id}" class="hover:bg-[#0ee15c] p-1 rounded hover:text-[#ffffff] cursor-pointer text-[#1f2937]">${category.category_name}</li>
            `;
            
        });
        catagoryContainer.addEventListener('click', (event) => {
                const allLi = document.querySelectorAll('li')
                allLi.forEach(li => {
                    li.classList.remove('bg-[#15803d]')
                    li.classList.remove('text-[#ffffff]')
                })
                if (event.target.localName === 'li') {
                    //console.log(event.target);
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


// showPlantCategory - part

 const showPlantCategory = (plants) => {
    plantCardContainer.innerHTML = "";
    plants.forEach( plant => {
        plantCardContainer.innerHTML += `
           <div class="p-4 space-y-2 bg-white rounded-md shadow-lg">
                 <div class="h-[220px]">
                    <img class="w-full h-full rounded " src="${plant.image}" alt="">
                 </div>
                 <h1 class="text-lg font-semibold">${plant.name}</h1>
                 <p>${plant.description}</p>
                <div class="flex justify-between items-center">
                    <h2 class="bg-[#dcfce7] text-[#15803d] py-1 px-2 rounded-2xl">${plant.category}</h2>
                   <h3>৳<span class="text-[#15803d]">${plant.price}</span></h3>
               </div>
              <button class="bg-[#15803d] w-full py-1 px-2 rounded-3xl text-white">Add to Cart</button>      
             </div>
        `;
   })
  }


loadCategories();
allTrees()




const catagoryContainer = document.getElementById('catagoryContainer');
const plantCardContainer = document.getElementById('card-container');

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
             
                <li id="${category.id}" class="hover:bg-[#8ad3a7] p-1 rounded hover:text-[#ffffff] cursor-pointer text-[#1f2937]">${category.category_name}</li>
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
                }
            })
}

// plantCategory - part
const plantCategory = (id) =>{
      fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    //  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const plantsCategories = data.plants;
         showPlantCategory(plantsCategories) 
    })
    .catch(err => {
        console.log(err);
    })
}

//showPlantCategory - part

 const showPlantCategory = (plants) => {
    plantCardContainer.innerHTML = "";
    plants.forEach( plant => {
        plantCardContainer.innerHTML += `
           <div class="p-4 space-y-2 bg-white rounded-md">
                 <div>
                    <img class="w-full h-full" src="${plant.image}" alt="">
                 </div>
                 <h1 class="text-base font-semibold">${plant.name}</h1>
                 <p>${plant.description}</p>
                <div class="flex justify-between items-center">
                    <h2 class="bg-[#dcfce7] text-[#15803d] py-1 px-2 rounded-2xl">${plant.category}</h2>
                   <h3><span>৳</span>${plant.price}</h3>
               </div>
              <button class="bg-[#15803d] w-full py-1 px-2 rounded-3xl text-white">Add to Cart</button>      
             </div>
        `;
   })
  }


loadCategories();
plantCategory(1);
//  plantCategory();
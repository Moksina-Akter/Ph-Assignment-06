const catagoryContainer =document.getElementById('catagoryContainer');

const categories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(response => response.json())
    .then(data => {
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
             
                <li id="${category.id}" class="hover:bg-[#8ad3a7] p-1 rounded hover:text-[#ffffff] text-[#1f2937]">${category.category_name}</li>
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

categories();
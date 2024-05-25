var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var productImage = document.getElementById('productImage');
var btnUpdate = document.getElementById('btnUpdate');
var btnAdd = document.getElementById('btnAdd');
var products = []
var objectIndex = 0

if(localStorage.getItem('allProducts')){
    products = JSON.parse(localStorage.getItem('allProducts'))
    displayProducts(products);
}

function addProduct(){
    if(validateInputs(productName) && validateInputs(productPrice) && validateInputs(productCategory) && validateInputs(productDescription)){
        var product = {
            id:productName.value,
            price:productPrice.value,
            category:productCategory.value,
            desc:productDescription.value,
            image:`images/products/${productImage.files[0]?.name}`
        }
        products.push(product);
        localStorage.setItem('allProducts',JSON.stringify(products))
        clearInputs();
        displayProducts(products);
    }else{
        alert('all inputs required !')
    }
    
}

function displayProducts(arr){
    var box = ``
    for(i=0;i<arr.length ; i++){
        box+=` 
                <div class="col-12 col-sm-12 col-md-6 col-lg-4 p-3">
                <div class="product bg-light p-3 rounded ">
                    <div class="product-image">
                        <img class="w-100" src="${arr[i].image}" alt="">
                    </div>
                    <div class="product-body">
                        <h2 class="h3">Name: <span>${arr[i].id}</span></h2>
                        <h3 class="h4">Category: <span>${arr[i].category}</span></h3>
                        <p class="lead"><span>Description:</span>${arr[i].desc}</p>
                        <div class="product-btns">
                            <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning my-2">Update Product 🪶</button>
                            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger my-2">Delete Product 🗑️</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    document.getElementById('rowData').innerHTML = box;
}

function setFormForUpdate(index){
    objectIndex = index;
    productName.value = products[index].id;
    productPrice.value = products[index].price;
    productCategory.value = products[index].category;
    productDescription.value = products[index].desc;
    btnUpdate.classList.remove('d-none')
    btnAdd.classList.add('d-none')
}

function updateProduct(){
    products[objectIndex].id = productName.value;
    products[objectIndex].price = productPrice.value;
    products[objectIndex].category = productCategory.value;
    products[objectIndex].desc = productDescription.value;
    products[objectIndex].image = `images/products/${productImage.files[0].name}`;
    btnAdd.classList.remove('d-none')
    btnUpdate.classList.add('d-none')
    localStorage.setItem('allProducts',JSON.stringify(products));
    clearInputs();
    displayProducts(products);
}

function deleteProduct(index){
    products.splice(index,1);
    localStorage.setItem('allProducts',JSON.stringify(products));
    displayProducts(products)
}

function clearInputs(){
    productName.value = ''
    productPrice.value = ''
    productCategory.value = ''
    productDescription.value = ''
    productImage.value = ''
    productName.classList.remove('is-valid');
    productPrice.classList.remove('is-valid');
    productCategory.classList.remove('is-valid');
    productDescription.classList.remove('is-valid');

}

function searchForProduct(searchKey){
    // console.log(searchKey);
    var searchResult = [];
    for(i=0;i<products.length ; i++){
        if(products[i].id.toLowerCase().includes(searchKey.toLowerCase())){
            searchResult.push(products[i]);
        }
    }
    displayProducts(searchResult)
}

function validateInputs(input){
    var regex = {
        productName:/^[A-Z][a-z]{4,10}(\s)?([a-zA-Z]{1,6})?([0-9]{1,4})?$/,
        productPrice:/^[1-9][0-9][0-9][0-9]?[0-9]?$/,
        productCategory:/^(TV|Mobile|Screens|Electronic){1}$/,
        productDescription:/^\w{4,100}$/,
    }
    if(regex[input.id].test(input.value)){
        // console.log('valid');
        input.classList.replace('is-invalid','is-valid');
        input.nextElementSibling.classList.replace('d-block','d-none');
        return true;
    }else{
        // console.log(input.nextSibling);
        input.classList.add('is-invalid');
        input.nextElementSibling.classList.replace('d-none','d-block');
        return false;
    }
}

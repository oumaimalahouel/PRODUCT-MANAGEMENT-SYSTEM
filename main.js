
let title=document.getElementById('title');
let pricee =document.getElementById('pricee');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let search=document.getElementById('search');
let submit=document.getElementById('submit');
let mood='create';
let tmp;

//function pour calculer le totale 

function getTotal(){

    if(pricee.value != ''){
        let result=(+pricee.value + +taxes.value + +ads.value ) - discount.value;
        total.innerHTML = result;
        total.style.background='red'

    }else{
        total.innerHTML='';
        total.style.background='rgb(132, 4, 132)';
    }

}
//function pour creer produit




//pour n'est pas effacer tout les donnés anciens
let dataPro;
if (localStorage.product != null){
    dataPro= JSON.parse(localStorage.product) 
}else{
    dataPro=[];
}



 
submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(), 
        pricee:pricee.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    //function calculer count produit
    if(title.value !=''){
    if(mood==='create'){
        if (newPro.count >1 ){
        for(let i=0;i<newPro.count;i++){
            dataPro.push(newPro)
        }
    }
    dataPro.push(newPro);
    }else{
        dataPro[tmp]=newPro
        mood='create';
        submit.innerHTML='Create';
        count.style.display='block';
    }    
    }
    
    
    // pour enregister les données a local storage
     localStorage.setItem('product', JSON.stringify(dataPro));
     clearData()
     showData()
    
}
//clear input lors click create
function clearData(){
title.value='';
pricee.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='',
count.value='';
category.value='';

}
//fuction read les produits
function showData(){
getTotal();
let table ='';

for(let i=0 ; i< dataPro.length ; i++){
table += `
<tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].pricee}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button  onclick="updateData(${i})" id="update"> update</button></td>
<td><button onclick="deleteData(${i})"id="delete">delete</button>

</tr>`

}
document.getElementById('tbody').innerHTML=table;
let btnDelete=document.getElementById('deleteAll');
if(dataPro.length>0){
    btnDelete.innerHTML = `
    <button onclick="deleteAll()(${dataPro.length})" >delete All</button>
    `
}
}

//function delete prduit
function deleteData(i){

dataPro.splice(i,1);
localStorage.product=JSON.stringify(dataPro);
showData();
}
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

//function update 
function updateData(i){
    title.value=dataPro[i].title ;
    pricee.value=dataPro[i].pricee;
    taxes.value=dataPro[i].taxes ;
    ads.value=dataPro[i].ads ;
    discount.value=dataPro[i].discount ;
    count.style.display='none';
    submit.innerHTML="Update";
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth',
    })
    


}

//search

let SearchMood='title';
function getSearchMood(id){
   let search = document.getElementById('search');
    if(id == 'searchTitle'){
        SearchMood='title';
        search.placeholder='Search by Title';
    }else{
        SearchMood='category';
        search.placeholder='Search by category';
    }
    search.focus() 
    search.value='';
    showData();
}
function searchData(value){
    let table =''
    if (SearchMood =='title'){

        for(let i=0;i< dataPro.length;i++){
            if ( dataPro[i].title.includes(value.toLowerCase())){
                
                table += `
<tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].pricee}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button  onclick="updateData(${i})" id="update"> update</button></td>
<td><button onclick="deleteData(${i})"id="delete">delete</button>

</tr>`


            } 
        }


    }else{
        for(let i=0;i< dataPro.length;i++){
            if ( dataPro[i].category.includes(value.toLowerCase())){
                
                table += `
<tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].pricee}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button  onclick="updateData(${i})" id="update"> update</button></td>
<td><button onclick="deleteData(${i})"id="delete">delete</button>

</tr>`


            } 
        }

    }
    document.getElementById('tbody').innerHTML=table;

}
//clean data
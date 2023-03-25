let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let clearIngredientsBtn = document.getElementById('clearIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];
let listIngredeintDiv = document.querySelectorAll('.ingredeintDiv');

addIngredientsBtn.addEventListener('click', function(){
  let newIngredients = ingredeintDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
});

clearIngredientsBtn.addEventListener('click', function() {
    let listIngredeintDiv = document.querySelectorAll('.ingredeintDiv');
    if(listIngredeintDiv.length > 1)
        listIngredeintDiv[listIngredeintDiv.length - 1].remove();
});
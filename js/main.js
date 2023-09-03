let home = document.getElementById("home");
let recipe = document.getElementById("recipe");
let testTags = document.getElementById("testTags");
let category = document.getElementById("category");
let categoryDetails = document.getElementById("categoryDetails");
let area = document.getElementById("area");
let ingredients = document.getElementById("ingredients");
let searchData = document.getElementById("searchData");
let descImg = document.getElementById("descImg");
let descTitle = document.getElementById("descTitle");
let descText = document.getElementById("descText");
let descArea = document.getElementById("descArea");
let descCategory = document.getElementById("descCategory");
let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let phone = document.getElementById("phone");
let repassword = document.getElementById("repassword");
let age = document.getElementById("age");
let apiArray = [];




  $(window).on("load", function () {
    $("body").css("overflow", "hidden");
    $("#spinner").fadeIn(300);
    $("#spinner").fadeOut(700, function () {
      $("body").css("overflow", "auto");
          });
        });

$(".btnHome").click(function () {
  window.location.reload(true);
})
function animateOpen(){
    for(let i = 0; i < 6; i++){
        $('.navContent ul li').eq(i).animate({top: `${40*i}`},(i+5)*100);
}};
function animateClose(){
    for(let i = 5; i >= 0; i--){
        $('.navContent ul li').eq(i).animate({top: "70%"},(i+5)*150);
}};

$("#open").click(function () {
    // new WOW().init();
    animateOpen()
    $('.asideNav').animate({left:"0px"},500)
    $('#open').css('display', 'none');
    $('#close').css('display', 'flex');
})
$("#close , .navContent ul li").click(function () {
    animateClose()
    let width = $('.navContent').outerWidth();
    $('.asideNav').animate({left:`-${width}`},500)
    $('#close').css('display', 'none');
    $('#open').css('display', 'flex');
})

async function getData() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let result = await response.json();
  apiArray = result.meals;
  return result.meals;
}
async function startApp() {
  let mealData = await getData();
  displayFirstData(mealData);
  //   console.log(apiArray);
}

function displayFirstData(data) {
  let box = "";
  for (let i = 0; i < 20; i++) {
    box += `
        <div class="col-lg-3 my-2">
                    <div class="item border-black rounded-2">
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="layer">
                            <h2>${data[i].strMeal}</h2>
                            <h3 class="d-none">${i}</h3>
                        </div>
                    </div>
                </div>
        `;
  }
  home.innerHTML = box;
  $("#project .item .layer").click(function () {
    let x = $(this).find("h3").text();
    displayDisc(apiArray, x);
    $("#project").css("display", "none");
    $("#projectDesc").css("display", "block");
  });
}

startApp();

function displayDisc(arr, index) {
  $("#spinner").fadeIn(400);

  descImg.setAttribute("src", arr[index].strMealThumb);
  descTitle.innerHTML = arr[index].strMeal;
  descText.innerHTML = arr[index].strInstructions;
  descArea.innerHTML = arr[index].strArea;
  descCategory.innerHTML = arr[index].strCategory;
  let recipes = []
  for(let i = 1; i < 21; i++){
    let x = `strIngredient${i}`
    let y = `strMeasure${i}`
      if(arr[index].x !== " " || arr[index].y !== " "){
        recipes.push(`${arr[index][y]} ${arr[index][x]}`)
      }
  }
  recipes = recipes.filter(item => item !== "  ");
  let rec= ``
  for(let i = 0; i < recipes.length; i++){
    if(recipes[i] !== " "){
      rec +=`
      <span class="recipesEdit">${recipes[i]}</span>
      `
    }
   
  }
  recipe.innerHTML = rec

  if(arr[index].strTags !== null){
let str= arr[index].strTags
let arrTag= str.split(",")
let tagData=``
for(let i = 0; i < arrTag.length; i++){
  tagData += `
  <li class="tagsEdit">${arrTag[i]}</li>
  
  `
}
testTags.innerHTML = tagData}

$("#spinner").fadeOut(700);

  $("#descSource").click(function () {
    window.open(arr[index].strSource, "_blank");
  });
  $("#descYoutube").click(function () {
    window.open(arr[index].strYoutube, "_blank");
  });
}
/********************************************** GEt Category **********************************************/

async function getCategory() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let result = await response.json();

  return result.categories;
}
async function showCategory() {
  let mealCategory = await getCategory();
  displayCategoryData(mealCategory);
}
$(".btnTest").click(function () {
  $("#spinner").fadeIn(400);

    showCategory();
  $("#project").css("display", "none");
  $("#projectDesc").css("display", "none");
  $("#projectCategory").css("display", "none");
  $("#projectIngredients").css("display", "none");
  $("#projectCategoryDetails").css("display", "none");
  $("#projectSearch").css("display", "none");
  $("#projectArea").css("display", "none");
  $("#projectContact").css("display", "none");
  $("#projectCategory").css("display", "block");
  $('#searchName').val("")
  $('#searchLetter').val("")
  $("#spinner").fadeOut(700);
});
function displayCategoryData(data) {
  let box = "";
  for (let i = 0; i < data.length; i++) {
    box += `
     <div class="col-lg-3 my-2">
                <div class="itemCategory border-black rounded-2">
                    <img src="${data[i].strCategoryThumb}" class="w-100" alt="">
                    <div class="layerCategory d-flex flex-column text-center">
                        <h2>${data[i].strCategory}</h2>
                        <p >${data[i].strCategoryDescription?.split(" ").slice(0, 20).join(" ")}</p>
                        <h3 class="d-none">${i}</h3>
                    </div>
                </div>
            </div>
         `;
  }
  category.innerHTML = box;
  $("#projectCategory .itemCategory .layerCategory").click(function () {
    let thumb = $(this).find("h2").text();
    //  alert(thumb);
    getDetails(thumb);
  });
}
async function getDetails(link) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${link}`
  );
  let result = await response.json();
  console.log(result.meals);
  displayCategoryDetails(result.meals);
  $("#project").css("display", "none");
  $("#projectDesc").css("display", "none");
  $("#projectCategory").css("display", "none");
  $("#projectArea").css("display", "none");
  $("#projectIngredients").css("display", "none");
  $("#projectSearch").css("display", "none");
  $("#projectCategoryDetails").css("display", "block");
}
function displayCategoryDetails(data) {
  $("#spinner").fadeIn(400);

  let box = "";
  if (data.length > 20) {
    for (let i = 0; i < 20; i++) {
      box += `
        <div class="col-lg-3 my-2">
                    <div class="itemCategoryDetails border-black rounded-2">
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="layerCategoryDetails">
                            <h2>${data[i].strMeal}</h2>
                            <h3 class="d-none">${data[i].idMeal}</h3>
                        </div>
                    </div>
                </div>
        `;
    }
    categoryDetails.innerHTML = box;
  } else {
    for (let i = 0; i < data.length; i++) {
      box += `
        <div class="col-lg-3 my-2">
                    <div class="itemCategoryDetails border-black rounded-2">
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="layerCategoryDetails">
                            <h2>${data[i].strMeal}</h2>
                            <h3 class="d-none">${data[i].idMeal}</h3>
                        </div>
                    </div>
                </div>
        `;
    }
    categoryDetails.innerHTML = box;
  }
  $("#spinner").fadeOut(700);

  $(".itemCategoryDetails").click(function () {
    getDiscAll($(this).find("h3").text());
  });
}
async function getDiscAll(link) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${link}`
  );
  let result = await response.json();
  displayDiscAll(result.meals);
  $("#project").css("display", "none");
  $("#projectCategory").css("display", "none");
  $("#projectCategoryDetails").css("display", "none");
  $("#projectArea").css("display", "none");
  $("#projectIngredients").css("display", "none");
  $("#projectSearch").css("display", "none");
  $("#projectDesc").css("display", "block");
}
function displayDiscAll(arr) {
  $("#spinner").fadeIn(400);

  descImg.setAttribute("src", arr[0].strMealThumb);
  descTitle.innerHTML = arr[0].strMeal;
  descText.innerHTML = arr[0].strInstructions;
  descArea.innerHTML = arr[0].strArea;
  descCategory.innerHTML = arr[0].strCategory;
  let recipes = []
  for(let i = 1; i < 21; i++){
    let x = `strIngredient${i}`
    let y = `strMeasure${i}`
      if(arr[0].x !== " " || arr[0].y !== " "){
        
          recipes.push(`${arr[0][y]} ${arr[0][x]}`)
        
      }
  }
  recipes = recipes.filter(item => item !== "  ");
  let rec= ``
  for(let i = 0; i < recipes.length; i++){
    if(recipes[i] !== " "){
      rec +=`
      <span class="recipesEdit">${recipes[i]}</span>
      `
    }
   
  }
  recipe.innerHTML = rec
  if(arr[0].strTags !== null){
    let str= arr[0].strTags
    let arrTag= str.split(",")
    let tagData=``
    for(let i = 0; i < arrTag.length; i++){
      tagData += `
      <li class="tagsEdit">${arrTag[i]}</li>
      
      `
    }
    testTags.innerHTML = tagData}
  $("#spinner").fadeOut(700);

  $("#descSource").click(function () {
    window.open(arr[0].strSource, "_blank");
  });
  $("#descYoutube").click(function () {
    window.open(arr[0].strYoutube, "_blank");
  });
}
/*********************************************** GEt Area **************************************************/
async function getArea() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let result = await response.json();

  return result.meals;
}
async function showArea() {
  let mealCategory = await getArea();
  displayAreaData(mealCategory);
  console.log(mealCategory);
}
$(".btnArea").click(function () {
  $("#spinner").fadeIn(400);
    showArea();
  $("#project").css("display", "none");
  $("#projectDesc").css("display", "none");
  $("#projectCategory").css("display", "none");
  $("#projectIngredients").css("display", "none");
  $("#projectCategoryDetails").css("display", "none");
  $("#projectSearch").css("display", "none");
  $("#projectContact").css("display", "none");
  $("#projectArea").css("display", "block");
  $('#searchName').val("")
  $('#searchLetter').val("")
  $("#spinner").fadeOut(700);

});
function displayAreaData(data) {
  let box = "";
  for (let i = 0; i < data.length; i++) {
    box += `
         <div class="col-lg-3 my-2">
         <div class="itemArea text-white text-center">
             <i class="fa-solid fa-house-laptop fa-4x"></i>
                 <h2>${data[i].strArea}</h2>
                 <h3 class="d-none">${i}</h3>
             
         </div>
         </div>
             `;
  }
  area.innerHTML = box;
  $(".itemArea").click(function () {
    let link = $(this).find("h2").text();
    getAreaDetails(link);
  });
}
async function getAreaDetails(link) {
  let response = await fetch(
    `https://themealdb.com/api/json/v1/1/filter.php?a=${link}`
  );
  let result = await response.json();
  console.log(result.meals);
  displayAreaDetails(result.meals);
  $("#project").css("display", "none");
  $("#projectDesc").css("display", "none");
  $("#projectCategory").css("display", "none");
  $("#projectCategoryDetails").css("display", "none");
  $("#projectIngredients").css("display", "none");
  $("#projectArea").css("display", "block");
}
function displayAreaDetails(data) {
  let box = "";
  if (data.length > 20) {
    for (let i = 0; i < 20; i++) {
      box += `
        <div class="col-lg-3 my-2">
                    <div class="itemAreaDetails border-black rounded-2">
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="layerAreaDetails">
                            <h2>${data[i].strMeal}</h2>
                            <h3 class="d-none">${data[i].idMeal}</h3>
                        </div>
                    </div>
                </div>
        `;
    }
    area.innerHTML = box;
  } else {
    for (let i = 0; i < data.length; i++) {
      box += `
        <div class="col-lg-3 my-2">
                    <div class="itemAreaDetails border-black rounded-2">
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="layerAreaDetails">
                            <h2>${data[i].strMeal}</h2>
                            <h3 class="d-none">${data[i].idMeal}</h3>
                        </div>
                    </div>
                </div>
        `;
    }
    area.innerHTML = box;
  }
  $(".itemAreaDetails").click(function () {
    getDiscAll($(this).find("h3").text());
  });

}

/******************************************** GEt Ingredients **********************************************/

async function getIngredients() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let result = await response.json();

  return result.meals;
}
async function showIngredients() {
  let mealCategory = await getIngredients();
  displayIngredientsData(mealCategory);
  console.log(mealCategory);
}
$(".btnIngr").click(function () {
  $("#spinner").fadeIn(400);

    showIngredients();
  $("#project").css("display", "none");
  $("#projectDesc").css("display", "none");
  $("#projectCategory").css("display", "none");
  $("#projectArea").css("display", "none");
  $("#projectSearch").css("display", "none");
  $("#projectContact").css("display", "none");

  $("#projectIngredients").css("display", "block");
  $('#searchName').val("")
  $('#searchLetter').val("")
  $("#spinner").fadeOut(700);

});
function displayIngredientsData(data) {
  let box = "";
  for (let i = 0; i < 20; i++) {
    box += `
    <div class="col-lg-3 my-2">
    <div class="itemIngredients text-white text-center">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h2 class="h3">${data[i].strIngredient}</h2>
        <p>${data[i].strDescription?.split(" ").slice(0, 20).join(" ")}</p>
        <h3 class="d-none">${i}</h3>

    </div>
</div>
             `;
  }
  ingredients.innerHTML = box;
  $(".itemIngredients").click(function () {
    let link = $(this).find("h2").text();
    getIngredientsDetails(link);
  });
}

async function getIngredientsDetails(link) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${link}`
  );
  let result = await response.json();
  console.log(result.meals);
  displayIngredientsDetails(result.meals);
  $("#project").css("display", "none");
  $("#projectDesc").css("display", "none");
  $("#projectCategory").css("display", "none");
  $("#projectCategoryDetails").css("display", "none");
  $("#projectArea").css("display", "none");
  $("#projectSearch").css("display", "none");
  $("#projectIngredients").css("display", "block");
}

function displayIngredientsDetails(data) {
  let box = "";
  if (data.length > 20) {
    for (let i = 0; i < 20; i++) {
      box += `
        <div class="col-lg-3 my-2">
                    <div class="itemIngredientsDetails border-black rounded-2">
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="layerIngredientsDetails">
                            <h2>${data[i].strMeal}</h2>
                            <h3 class="d-none">${data[i].idMeal}</h3>
                        </div>
                    </div>
                </div>
        `;
    }
    ingredients.innerHTML = box;
  } else {
    for (let i = 0; i < data.length; i++) {
      box += `
        <div class="col-lg-3 my-2">
                    <div class="itemIngredientsDetails border-black rounded-2">
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="layerIngredientsDetails">
                            <h2>${data[i].strMeal}</h2>
                            <h3 class="d-none">${data[i].idMeal}</h3>
                        </div>
                    </div>
                </div>
        `;
    }
    ingredients.innerHTML = box;
  }
  $(".itemIngredientsDetails").click(function () {
    getDiscAll($(this).find("h3").text());
  });
}
/******************************************* GEt Search ***************************************************/
$('.btnSearch').click(function () {
   
    $("#project").css("display", "none");
    $("#projectDesc").css("display", "none");
    $("#projectCategory").css("display", "none");
    $("#projectArea").css("display", "none");
    $("#projectIngredients").css("display", "none");
    $("#projectCategoryDetails").css("display", "none");
  $("#projectContact").css("display", "none");

    $("#projectSearch").css("display", "block");
});
$('#searchName').keyup(function(){
    getSearchName(this.value);
})
$('#searchLetter').keyup(function(){
    getSearchLetter(this.value);
})
async function getSearchName(link){
    let response = await fetch(
             `https://www.themealdb.com/api/json/v1/1/search.php?s=${link}`
           );
           let result = await response.json();
          console.log(result.meals);
          displaySearchName(result.meals)

}
async function getSearchLetter(link){
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${link}`
      );
      let result = await response.json();
     console.log(result.meals);
     displaySearchName(result.meals)
}
function displaySearchName(data){
    let box = "";
    for (let i = 0; i < data.length; i++) {
      box += `
        <div class="col-lg-3 my-2">
                    <div class="itemSearchDetails border-black rounded-2">
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="layerSearchDetails">
                            <h2>${data[i].strMeal}</h2>
                            <h3 class="d-none">${data[i].idMeal}</h3>
                        </div>
                    </div>
                </div>
        `;
    }
    searchData.innerHTML = box;
  
  $(".itemSearchDetails").click(function () {
    getDiscAll($(this).find("h3").text());
  });
};
/************************************** Contact validation *************************************************/

$('.btnContact').click(function () {
    
        $("#project").css("display", "none");
        $("#projectDesc").css("display", "none");
        $("#projectCategory").css("display", "none");
        $("#projectArea").css("display", "none");
        $("#projectIngredients").css("display", "none");
        $("#projectCategoryDetails").css("display", "none");
        $("#projectSearch").css("display", "none");
        $("#projectContact").css("display", "block");
    });

name.addEventListener("keyup", function () {
  if (validName(name.value)) {
    $('#nameError').css("display", "none");
    $('#emailError').css("display", "none");
    $('#emailError').css("opacity", "1");


    valid()
  } else {
    $('#nameError').css("display", "block");
    $('#emailError').css("opacity", "0");
    $('#emailError').css("display", "block");

    valid()

  }
})
email.addEventListener("keyup", function () {
    if (validEmail(email.value)) {
      $('#emailError').css("display", "none");
    $('#nameError').css("display", "none");
    $('#nameError').css("opacity", "1");


      valid()
    } else {
      $('#emailError').css("display", "block");
    $('#nameError').css("opacity", "0");
    $('#nameError').css("display", "block");

      valid()
  
    }
  })
  password.addEventListener("keyup", function () {
    if (validPass(password.value)) {
      $('#passwordError').css("display", "none");
      $('#repasswordError').css("display", "none");
      $('#repasswordError').css("opacity", "1");

      valid()
    } else {
      $('#passwordError').css("display", "block");
      $('#repasswordError').css("opacity", "0");
      $('#repasswordError').css("display", "block");
      valid()
  
    }
  })
  repassword.addEventListener('keyup', function reCheck () {
    if (password.value === repassword.value) {
      $('#repasswordError').css("display", "none");
      $('#passwordError').css("display", "none");
      $('#passwordError').css("opacity", "1");

      valid()
    } else {
      $('#repasswordError').css("display", "block");
      $('#passwordError').css("opacity", "0");
      $('#passwordError').css("display", "block");

      valid()

    }
  })
  age.addEventListener("keyup", function () {
    if (validAge(age.value)) {
      $('#ageError').css("display", "none");
      $('#phoneError').css("display", "none");
      $('#phoneError').css("opacity", "1");

      valid()
    } else {
      $('#ageError').css("display", "block");
      $('#phoneError').css("opacity", "0");
      $('#phoneError').css("display", "block");
      valid()
  
    }
  })
  phone.addEventListener("keyup", function () {
    if (validPhone(phone.value)) {
      $('#phoneError').css("display", "none");
      $('#ageError').css("display", "none");
      $('#ageError').css("opacity", "1");
      valid()
    } else {
      $('#phoneError').css("display", "block");
      $('#ageError').css("opacity", "0");
      $('#ageError').css("display", "block");
      valid()
  
    }
  })
function validEmail(mail) {
    let regexEmail =
      /^[a-zA-Z0-9][a-zA-z0-9\_\-\.]{2,30}@(gmail|yahoo|hotmail|outlook).com$/;
    return regexEmail.test(mail);
  }
  function validName(name) {
    let regexName = /^[a-zA-z][a-zA-Z0-9\_\-]{2,30}$/;
    return regexName.test(name);
  }
  function validPass(pass) {
    let regexPass = /^(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;
    return regexPass.test(pass);
  }
  function validAge(age) {
    let regexAge = /^[0-9]{2}$/;
    return regexAge.test(age);
  }

  function validPhone(phone) {
    let regexPhone = /^01[0-2][0-9]{8}$/;
    return regexPhone.test(phone);
  }
  function valid(){
    if(validName(name.value) && validEmail(email.value) && validPass(password.value) && validAge(age.value) && validPhone(phone.value) && password.value === repassword.value){
      $('#projectContact button').removeClass('disabled');
    } else{
      $('#projectContact button').addClass('disabled');
    }
  }
  $('#submit').click(function(){
    $('#projectContact input').val("");
    $('#projectContact button').addClass('disabled');

  })
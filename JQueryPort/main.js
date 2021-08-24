// Declaring variables to be used

let myPoke
let pokeNum = 1

// Call back function that generates a random number between the supplied parameters

const randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + 1
}

// Call back function that fetches a given Pokemon

const fetchPokemon = (num) => {
    console.log("fetercher")
    if(num > 150 || num < 0 || num % 1 != 0){
        num = 1
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    .then(res => {
        return res.json()
    })
    .then(data => {myPoke = data
    $('#myPoke').html(`
        <img src="${myPoke.sprites.front_default}">
        <h2> ${myPoke.name} </h2>
        <button id="deleteThisOne">Delete</button>
    `)})
    .catch(err => console.log(err))
    
}

// Hides title

$("#title").click(function(){
    $("#title").hide();
})

// Function that fetches Pokemon using callback function

$(document).on('submit', '#seekPoke', function (event) {
    event.preventDefault()
    console.log("clicked")
    let num = $('#pokeToFind').val()
    console.log("this is num", num)
    fetchPokemon(num)
})

// Function to delete a Pokemon from the top of the page

$(document).on('click', '#deleteThisOne', function () {
    console.log("Trying to delete")
    $('#myPoke').html("")
})

// Callback function that fetches the next Pokemon

const fetchNextPokemon = () => {
    if(pokeNum > 150){
        pokeNum = 1
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
    .then(res => {
        return res.json()
    })
    .then(data => {myPoke = data
    $('#morePokes').append(`
        <div class="anotherPoke" id="${pokeNum}">
            <img 
                src="${myPoke.sprites.front_default}"
                style="box-shadow: 0 0 10px 5px rgb(${randomNum(0, 250)}, ${randomNum(0, 250)}, ${randomNum(0, 250)}) inset;
                border: 1px solid rgb(${randomNum(0, 250)}, ${randomNum(0, 250)}, ${randomNum(0, 250)});"
            >
            <h2> ${myPoke.name} </h2>
            <button class="vanish">Hide</button>
        </div>
    `), pokeNum++})
    .catch(err => console.log(err))
}
// You can just put a quoate at the beginning like on line 67, then put one at the end like on line 77. You can span multiple lines without using a += to concatentate the string, make sense?
// Uses callback to fetch next Pokemon

$(document).on('click', '#addsPokes', function (event) {
    fetchNextPokemon()
})

// Function that hides a given Pokemon

$(document).on('click', '.anotherPoke', function() {
    let x = randomNum(1,3)
    if(x == 1){
        $(this).closest('div').fadeOut()
    }
    if(x == 2){
        $(this).closest('div').hide()
    }
    if(x == 3){
        $(this).closest('div').slideUp()
    }
    
})

// Function to reveal all hidden Pokemon

$(document).on('click', '#showPokes', function() {
    $(".anotherPoke").show()
})

// https://dog.ceo/api/breeds/image/random 


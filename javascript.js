window.addEventListener "(DOMContentLoaded", getData);

function getData() {
    console.log("getData")
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/films")
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    //console.log(myData);
    //1 loop
    myData.forEach(showPost)
}

function showPost(post) {
    console.log(post)
}

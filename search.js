/*window.addEventListener "(DOMContentLoaded", getData);

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
*/

window.addEventListener("DOMContentLoaded", getData);

function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    //console.log("getData")
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/films?_embed&search=" + search)
        .then(res => res.json())
        .then(useData)
}

function useData(myData) {
    //console.log(myData)

    //1- Loop the array
    myData.forEach(showEvent)
}

function showEvent(event) {
    console.log(event)
    //2- Clone the template
    //image
    /*const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;*/

    const template = document.querySelector(".filmTemplate").content;
    const eventCopy = template.cloneNode(true);
    //3- textcontent and ineer HTML
    const h1 = eventCopy.querySelector("h1");
    h1.textContent = event.title.rendered;

    const prices = eventCopy.querySelector(".prices");
    prices.innerHTML = event.price;



    /*image
    const img = eventCopy.querySelector("img.cover");
    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Cover of the book" + event.title.rendered)*/

    //subpage
    const a = eventCopy.querySelector("a");
    a.href = "sub.html?id=" + event.id

    //4- Append
    document.querySelector("#event").appendChild(eventCopy);

}

window.addEventListener("DOMContentLoaded", getData);

//const urlParams = new URLSearchParams(window.location.search);
//const search = urlParams.get("search");

function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const id = urlParams.get("id");

    if (search) {
        //console.log("this is a search result")
        getSearchData();
    } else if (id) {
        getSingleEvent();
    } else {
        //console.log("not searching")
        getFrontpageData();
    }
    getNavigation()
}

function getNavigation() {
    console.log(getNavigation)
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/categories?_embed")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(addLink)
        })
}

function addLink(oneItem) {
    //console.log(oneItem);
    // document.querySelector("nav").innerHTML=oneItem.name
    if (oneItem.parent === 3 && oneItem.count > 0) {
        const link = document.createElement("a");
        link.textContent = oneItem.name;
        link.setAttribute("href", "category.html?category=" + oneItem.id);
        document.querySelector("ul").appendChild(link);
    }
}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const id = urlParams.get("id");
    //console.log("getData")

    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/films?_embed&search=" + search)
        .then(res => res.json())
        .then(useData)
}

function getSingleEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(getSingleEvent)

    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/films?_embed" + id)
        .then(res => res.json())
        .then(showEvent)
}

function getFrontpageData() {
    //console.log("getData")
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/films?_embed")
        .then(res => res.json())
        .then(useData)
}



/*function showEvent(event) {
    console.log(event)
    document.querySelector("article h1").textContent = event.title.rendered;

    document.querySelector(".longdescription").textContent = event.content.rendered;
}
*/
function useData(myData) {
    //console.log(myData)

    //1- Loop the array
    myData.forEach(showEvent)
}

function showEvent(event) {
    console.log(event)
    //2- Clone the template
    //image
    const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

    const template = document.querySelector("template").content;
    const eventCopy = template.cloneNode(true);
    //console.log(eventCopy);

    //3- textcontent and ineer HTML
    const h1 = eventCopy.querySelector("h1");
    h1.innerHTML = event.title.rendered;
    console.log(h1);

    const prices = eventCopy.querySelector(".prices");
    prices.innerHTML = event.price;




    const img = eventCopy.querySelector("img.cover");
    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Cover of the book" + event.title.rendered);

    //subpage
    const a = eventCopy.querySelector("a");
    a.href = "sub.html?id=" + event.id;

    //4- Append
    document.querySelector("#event").appendChild(eventCopy);

}

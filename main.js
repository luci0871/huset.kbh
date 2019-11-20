window.addEventListener("DOMContentLoaded", getData);

function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if (search) {
        //console.log("this is a search result")
        getSearchData();
    } else if (id) {
        getSingleEvent();
    } else if (category) {
        console.log("show category:", category)
        getCategoryData(category)
    } else {
        //console.log("not searching")
        getFrontpageData();
    }
    getNavigation()
}

function getNavigation() {
    //console.log(getNavigation)
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/categories?per_page=100")
        //fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/films?_embed&categories")
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            data.forEach(addLink)
        })
}

function addLink(oneItem) {
    //console.log(oneItem._embedded["wp:term"][0][0]);
    //alert("hey")//document.querySelector("ul").innerHTML += oneItem.name
    //if (oneItem.parent === 8 && oneItem.count > 0) {
    if (oneItem.parent === 8) {
        //if (oneItem.count > 0) {
        const li = document.createElement("li");
        const link = document.createElement("a");

        //link.textContent = oneItem._embedded["wp:term"][0][0].name;
        link.textContent = oneItem.name;
        //link.setAttribute("href", "category.html?category=" + oneItem._embedded["wp:term"][0][0].id);
        link.setAttribute("href", "category.html?category=" + oneItem.id);

        li.appendChild(link);
        document.querySelector("ul").appendChild(li);
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

function getCategoryData(catId) {
    console.log(catId)
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/films?_embed&categories=" + catId)
        .then(res => res.json())
        .then(useData)

}

function useData(myData) {
    //console.log(myData)

    //1- Loop the array
    myData.forEach(showEvent)
}

function showEvent(event) {
    console.log(event._embedded)
    //2- Clone the template
    //image
    const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    //console.log(imgPath);
    const template = document.querySelector("template").content;
    const eventCopy = template.cloneNode(true);
    //console.log(eventCopy);

    //3- textcontent and ineer HTML
    const h1 = eventCopy.querySelector("h1");
    h1.innerHTML = event.title.rendered;
    //console.log(h1);

    const prices = eventCopy.querySelector(".prices");
    prices.innerHTML = event.price;

    const desc = eventCopy.querySelector(".desc");
    desc.innerHTML = event.description;



    const img = eventCopy.querySelector("img.cover");
    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Cover of the book" + event.title.rendered);

    //subpage
    const a = eventCopy.querySelector("a");
    a.href = "sub.html?id=" + event.id;

    //4- Append
    document.querySelector("#event").appendChild(eventCopy);

}

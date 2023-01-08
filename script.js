//Heading
let h1 = document.createElement("h1");
h1.classList.add("h1","myh1");
h1.innerHTML = "Breweries List";
h1.style.textAlign = "center";
h1.style.color = "#A16207";
h1.style.paddingTop = "2rem";
document.body.appendChild(h1);
document.body.style.backgroundColor = "#FFFBEB";



//Search
let section1 = document.createElement("section");
section1.classList.add("container","d-flex","justify-content-end");
document.body.appendChild(section1);

let search = document.createElement("input");
search.setAttribute("type","text");
search.setAttribute("placeholder","Search");
search.classList.add("rounded-start", "rounded-end");
search.style.margin = "1rem";
search.style.color = "#A16207";
//search.style.position = "static"
section1.appendChild(search);

let allDetails = [];
search.addEventListener("keyup",(event) => {
    if(allDetails.length === 0) getDetails();
    let temp = "null";
    const filterData = allDetails.filter((x)=> {
       let filteredValue = (x.brewery_type.toLowerCase().includes(event.target.value.trim().toLowerCase()))
                            || (x.name.toLowerCase().includes(event.target.value.trim().toLowerCase())) 
                            || (x.city.toLowerCase().includes(event.target.value.trim().toLowerCase()))
                            || (x.state!==null ? (x.state.toLowerCase().includes(event.target.value.trim().toLowerCase())) : false)
                            || (x.country!==null ? (x.country.toLowerCase().includes(event.target.value.trim().toLowerCase())) : false)
                            || (x.postal_code!==null ? (x.postal_code.includes(String(event.target.value.trim()))) : false)
                            || (x.phone!==null ? (x.phone.includes(String(event.target.value.trim()))) : false)
                            || (x.website_url !=null ? x.website_url.toLowerCase().includes(event.target.value.trim().toLowerCase()) : false);
        return filteredValue;
    })
    console.log("filteredData" +filterData);
    populateDetails(filterData);
    
    
})


//Table
let section2 = document.createElement("section");
section2.setAttribute("class","container");
document.body.appendChild(section2);

let table = document.createElement("table");
table.classList.add("table","table-warning", "table-striped", "table-responsive","table-hover");
section2.appendChild(table);

let thead = document.createElement("thead");
thead.classList.add("table-dark");
table.appendChild(thead);

let tbody = document.createElement("tbody");
table.appendChild(tbody);

let thead_tr = document.createElement("tr");
//thead.style.backgroundColor = "#A16207";
//thead_tr.style.color = "#FFFBEB";

thead.appendChild(thead_tr);

let tableHeadings = ["Brewery Name", " Brewery Type", "Address", "Website URL", "Phone no."]
for(let i = 0; i<tableHeadings.length; i++){
    let th = document.createElement("th");
    th.setAttribute("scope","col");
    th.innerHTML = tableHeadings[i];
    thead_tr.appendChild(th);
}


const base = "https://api.openbrewerydb.org/breweries";

const getDetails = async () =>{
    try{
        const response = await fetch(`${base}`);
        //console.log(await response.json());
        const result = await response.json();
        allDetails = [];
        allDetails = [...result];
        populateDetails(allDetails);
    }
    catch (err){
        throw err;
    }
}

const populateDetails = (data) => {
    console.log(data);
    tbody.innerHTML = "";
    data.map((x) => {
        let tbody_tr = document.createElement("tr");
        tbody.appendChild(tbody_tr);

        //Brewery Name
        let td_name = document.createElement("td");
        if(!x.name){
            x.name = "NoData";
        }
        td_name.innerHTML = x.name;
        tbody_tr.appendChild(td_name);

        //Brewery Type
        let td_type = document.createElement("td");
        if(!x.brewery_type){
            x.brewery_type = "NoData";
        }
        td_type.innerHTML = x.brewery_type;
        tbody_tr.appendChild(td_type);

        //Brewery Address
        let td_address = document.createElement("td");
        //address is null
        //td_address.innerHTML = `${x.address_2}`;
        td_address.innerHTML = `${x.city}, ${x.state}, ${x.country}, ${x.postal_code}`
        tbody_tr.appendChild(td_address);

        //Brewery website
        let td_url = document.createElement("td");
        if(!x.website_url){
            x.website_url = "NoData";
        }
        td_url.innerHTML = x.website_url;
        tbody_tr.appendChild(td_url);

        //Brewery phone
        let td_phone = document.createElement("td");
        if(!x.phone){
            x.phone = "NoData";
        }
        td_phone.innerHTML = x.phone;
        tbody_tr.appendChild(td_phone);
    })
}

getDetails();
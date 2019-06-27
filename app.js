var countryList;
const ul = document.getElementsByClassName('list')[0];

function getCountriesList() {
    fetch('https://restcountries.eu/rest/v2/all?fields=name', {
	method: 'get'
    }).then((resp) => resp.json())
    .then(function(data) {
        countryList = data;
        detailData(countryList[0].name);
        addCountriesList(countryList);
    }).catch(function(err) {
        console.log(err);
    });
}
    
function addCountriesList(data) {
    data.map((country) => {
        let li = document.createElement('li');
        li.innerHTML = country.name;
        li.onclick = ()=>detailData(country.name)
        ul.appendChild(li);
    })     
}

function changeList() {
    let textValue = document.getElementsByClassName('inputSearch')[0].value;
    let newList = countryList.filter(x => x.name.toLowerCase().indexOf(textValue.toLowerCase()) > -1)
    removeList();
    addCountriesList(newList);
}

function removeList() {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

function detailData(countryName) {
    let countryData;
    document.getElementsByClassName('title')[0].innerHTML = countryName;
    fetch('https://restcountries.eu/rest/v2/name/'+countryName+'?fullText=true', {
        method: 'get'
        }).then((resp) => resp.json())
        .then(function(data) {
            countryData = data;
            document.getElementById('flagImage').src = countryData[0].flag;
            document.getElementById('name').innerHTML = countryData[0].name;
            document.getElementById('capital').innerHTML = countryData[0].capital;
            document.getElementById('region').innerHTML = countryData[0].region;
            document.getElementById('area').innerHTML = countryData[0].area;
            document.getElementById('currency').innerHTML = countryData[0].currencies[0].name;
            document.getElementById('language').innerHTML = countryData[0].languages[0].name;
            callWikiPedia(countryData[0].name);
            callMap(countryData[0].latlng)
        }).catch(function(err) {
            console.log(err);
    });
}

function callWikiPedia(countryName) {
    fetch('https://en.wikipedia.org/w/api.php?action=opensearch&search='+countryName, {
        method: 'get',
        mode: 'no-cors',
        dataType: 'jsonp',
        headers: {
            'Access-Control-Allow-Credentials' : true,
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET'
        }
    }).then((resp) => resp.json())
    .then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
}

function callMap(latlang) {
    console.log(latlang);
    
}

getCountriesList();
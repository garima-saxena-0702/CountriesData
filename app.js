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
        li.innerHTML = `<span>${country.name}</span>`;
        li.onclick = ()=>detailData(country.name)
        ul.appendChild(li);
    })     
}

function changeList() {
    let textValue = document.getElementsByClassName('inputSearch')[0].value;
    removeList(textValue);
}

function removeList(textValue) {
    for(let i = 0; i < ul.children.length; i++){
        if (!ul.children[i].children[0].innerHTML.toLowerCase().includes(textValue.toLowerCase())){
            ul.children[i].style.height = 0;
            ul.children[i].style.opacity = 0;
            ul.children[i].style.padding = '0 0.5em';
            ul.children[i].style.borderBottom = '0px solid rgba(0, 0, 0, 0.5)';
            // ul.children[i].children[0].style.opacity=0;
            // ul.children[i].children[0].style.fontSize=0;
        }else {
            ul.children[i].style.opacity = 1;
            ul.children[i].style.height = '100%';
            ul.children[i].style.padding = '0.5em 0.5em';
            ul.children[i].style.borderBottom = '1px solid rgba(0, 0, 0, 0.5)';
            // ul.children[i].children[0].style.opacity=1;
            // ul.children[i].children[0].style.fontSize='1em';

        }
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
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

function clearSearchText() {
    document.getElementsByClassName('inputSearch')[0].value = '';
    changeList();
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
            setTimeout(()=> {
                ul.children[i].style.display = 'none';
            }, 200)
        }else {
            ul.children[i].style.opacity = 1;
            ul.children[i].style.height = '100%';
            ul.children[i].style.padding = '0.5em 0.5em';
            ul.children[i].style.borderBottom = '1px solid rgba(0, 0, 0, 0.5)';
            setTimeout(() => {
                ul.children[i].style.display = 'list-item';
            }, 200)
        }
    }
}

function hideList() {
    ul.children[i].style.display = 'none';
}

function detailData(countryName) {
    let countryData;
    document.getElementsByClassName('title')[0].innerHTML = countryName;
    let appTitle = document.getElementById('loaderMain')
    let loader = document.createElement('div');
    loader.style.content = '';
    loader.classList = 'loader';
    loader.id = 'loader';
    appTitle.appendChild(loader);
    fetch('https://restcountries.eu/rest/v2/name/'+countryName+'?fullText=true', {
        method: 'get'
        }).then((resp) => resp.json())
        .then(function(data) {
            countryData = data;
            appTitle.removeChild(appTitle.lastChild);
            document.getElementById('flagImage').src = countryData[0].flag;
            document.getElementById('Capital').innerHTML = countryData[0].capital;
            document.getElementById('Region').innerHTML = countryData[0].region;
            document.getElementById('Timezones').innerHTML = countryData[0].timezones[0];
            document.getElementById('Currency').innerHTML = countryData[0].currencies[0].name;
            document.getElementById('Language').innerHTML = countryData[0].languages[0].name;
            document.getElementById('Borders').innerHTML = countryData[0].borders;
            document.getElementById('Area').innerHTML = countryData[0].area + 'Sq Kms';
            document.getElementById('Population').innerHTML = countryData[0].population;
            document.getElementById('Location').innerHTML = countryData[0].latlang;
            callWikiPedia(countryData[0].name);
            initMap(countryData[0].latlng)
        }).catch(function(err) {
            console.log(err);
    });
}

function addMoreLinks(links) {
    var linkDiv = document.getElementById('moreLinks');
    removeLinks(linkDiv);
    links.forEach(link => {
        let aTag = document.createElement('a');
        aTag.href = link;
        aTag.target = '_blank';
        let title = link.split('wiki/')[1];
        title = title.replace(/_/g, ' ');
        title = title.replace(/%E2%80%93/g, ' - ');
        title = title.replace(/%27/g, "'");
        aTag.innerHTML = title+'<br>';
        linkDiv.appendChild(aTag);
    });
}

function removeLinks(linkDiv) {
    linkDiv.innerHTML = '<span class="linkHeading">More Links:</span> <br>';
}

function callWikiPedia(countryName) {
    var wiki = 'http://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=' + countryName + '&imlimit=5&format=json&callback=wikiCallback';

    var wikiResponse = wikiAjax(wiki);
    wikiResponse.done(function (data) {

        document.getElementById('wikiContent').innerHTML = data[2][0];
        document.getElementById('wikiHeading').innerHTML = 'ABOUT ' + data[1][0].toUpperCase();
        document.getElementById('wikiLink').innerHTML = '<a target="_blank" href="'+ data[3][0] +'"> Know More About ' + data[1][0] +'</a>';
        addMoreLinks(data[3]);
    }).fail(function (err) {
        console.log("The call has been rejected");
    });
}

function wikiAjax(searchURL) {
    return $.ajax({
        url: searchURL,
        jsonp: "callback",
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        }
    });
}


function initMap(latlang = [33, 65]) {
    var uluru = {lat: latlang[0], lng: latlang[1]};
    var map = new google.maps.Map(
        document.getElementById('googleMap'), {zoom: 4, center: uluru});
    var marker = new google.maps.Marker({position: uluru, map: map});
}    


getCountriesList();
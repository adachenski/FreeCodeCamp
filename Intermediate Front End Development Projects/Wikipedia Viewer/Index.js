function triggerSearch(x) {
    if (x.keyCode === 13) {
        x.preventDefault();
        var printString = 'https://en.wikipedia.org/wiki/';
        var inputValue = document.getElementById('wiki-input').value;
        var searchString = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + inputValue + "&utf&format=json";
        if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
            searchString = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + inputValue + "&utf&format=json";
        }

        XMLHttp(searchString, printString, inputValue);
    }
}

function XMLHttp(searchString, printString, inputValue) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", searchString, true);
    xhr.onload = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var resultBody = JSON.parse(xhr.responseText);
                var queryOne = resultBody.query.search;
                document.getElementById('wiki-output').innerHTML = "";
                for (var i = 0; i < queryOne.length; i += 1) {
                    var ul = document.getElementById('wiki-output')
                    var li = document.createElement('li');
                    var title = queryOne[i].title;
                    var snippet = queryOne[i].snippet;
                    var h1 = document.createElement('h2');
                    h1.innerHTML = title;
                    var div = document.createElement('div');;
                    div.innerHTML = snippet;
                    var a = document.createElement('a');
                    a.href = printString + title;
                    a.appendChild(h1);
                    a.appendChild(div);
                    li.appendChild(a);
                    ul.appendChild(li);
                }
            } else {
                console.log(xhr.statusText);
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
    var inputValue = document.getElementById('wiki-input').value;
}
var apiUrl = 'https://wind-bow.glitch.me/twitch-api/channels/';
getJsonData('ESL_SC2','ecl2');
getJsonData('freecodecamp','freecodecamp');
getJsonData('OgamingSC2','OgamingSC2');
function getJsonData(data, currentElement) {
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl + data, true);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.responseText);
                var parent = document.getElementsByClassName(currentElement)[0];

                var img = document.createElement('img');
                var a = document.createElement('a');
                img.src = data.logo;
                a.href = data.url;
                a.innerText = data.display_name;
                parent.appendChild(img);
                parent.appendChild(a);
                parent.innerHTML += data.status;
                console.log(data);
                return data;
            }
            else {
                console.log(this.statusText);
                console.error(this.statusText);
            }
        }

    };
    request.onerror = function (e) {
        console.error(this.statusText);
    };
    request.send(null);
}


function hideOffline() {
    var onlineCild = document.getElementsByClassName('online');
    var offlineCild = document.getElementsByClassName('offline');
    for (var i = 0; i < offlineCild.length; i += 1) {
        offlineCild[i].style.display = 'none';

    }
    for (var i = 0; i < onlineCild.length; i += 1) {
        onlineCild[i].style.display = 'block';

    }

}
function hideOnline() {
    var onlineCild = document.getElementsByClassName('online');
    var offlineCild = document.getElementsByClassName('offline');
    for (var i = 0; i < onlineCild.length; i += 1) {
        onlineCild[i].style.display = 'none';

    }
    for (var i = 0; i < offlineCild.length; i += 1) {
        offlineCild[i].style.display = 'block';

    }
}
function showAll() {
    var parent = document.getElementsByClassName('user-list')[0];
    var allUsers = document.getElementsByClassName('user-info');
    for (var i = 0; i < allUsers.length; i += 1) {
        allUsers[i].style.display = 'block';
    }

}
document.getElementById("offline-btn").addEventListener("click", hideOnline);
document.getElementById("online-btn").addEventListener("click", hideOffline);
document.getElementById('show-all').addEventListener("click", showAll);

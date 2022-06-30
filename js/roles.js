async function findUsers() {
    var promise = new Promise(function (resolve, reject) {
        var getRequest = new XMLHttpRequest();
        getRequest.responseType = "json";
        getRequest.open('GET', 'http://localhost:3000/api/users/getUsers');
        getRequest.onload = function () {
            if (getRequest.status == 200) {
                console.log("wtf");
                resolve(getRequest.response);
            } else {
                reject(Error(getRequest.statusText));
            };
        }
        getRequest.onerror = function () {
            reject(Error('Cannot find JSON data'));
        }
        getRequest.send();
    });

    managerList = await promise;
    return managerList;
}


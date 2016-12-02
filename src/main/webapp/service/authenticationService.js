app.service('authenticationService', function ($http, $window) {

    var LOCAL_STORAGE_KEY = 'restaurantUser';
    var LOCAL_STORAGE_INSTANCE = $window.localStorage;

    return {
        login: function (user, successCallback, errorCallback) {
            $http.post('/api/login', user, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).success(successCallback).error(errorCallback);
        },
        logout: function (successCallback, errorCallback) {
            var loggedInUser = this.getUser();
            if (loggedInUser) {
                $http.post("/api/logout", loggedInUser.id).success(successCallback).error(errorCallback);
            }
        },
        getUser: function () {
            if (LOCAL_STORAGE_INSTANCE) {
                var loggedInUser = LOCAL_STORAGE_INSTANCE.getItem(LOCAL_STORAGE_KEY);
                if (loggedInUser) {
                    return JSON.parse(loggedInUser);
                }
            }
        },
        setUser: function (user) {
            if (LOCAL_STORAGE_INSTANCE && user) {
                LOCAL_STORAGE_INSTANCE.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
            }
        },
        register: function (user, successCallback, errorCallback) {
            $http.post("/api/register", user).success(successCallback).error(errorCallback);
        },
        removeUser: function () {
            LOCAL_STORAGE_INSTANCE && LOCAL_STORAGE_INSTANCE.removeItem(LOCAL_STORAGE_KEY);
        },
        isBartender: function () {
            return this.getUser().role === 'BARTENDER';
        },
        isChef: function () {
            return this.getUser().role === 'CHEF';
        },
        isGuest: function () {
            return this.getUser().role === 'GUEST';
        },
        isManager: function () {
            return this.getUser().role === 'MANAGER';
        },
        isWaiter: function () {
            return this.getUser().role === 'WAITER';
        },
        isSystemManager: function () {
            return this.getUser().role === 'SYSTEM_MANAGER';
        },
        isSeller: function () {
            return this.getUser().role === 'SELLER';
        }

    }
});
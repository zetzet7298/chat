function get_token() {
    let data = {
        "broker": "beta-client",
        "publicKey": "oQt5MjeoVNokTWVmdUu0bUPNd7HPDkXrtCtChMBnqLVdS8ck",
        "secret_key": "A46MhQOxEHOfQy7BkuqpVB1ZGRcRtWXgD7EmV04QsfOzJZ3sCY066vbUJGOfneqG"
    }
    return callAjax('https://beta-sso.tuoitre.vn/sso/v1/token', 'get', data)
}

function get_info() {
    let token = getCookie('refresh_token')
    let promise = callAjax('https://beta-sso.tuoitre.vn/sso/v1/info', 'get', {}, token)
    // promise.catch(err => {
    //     let res = err.responseJSON
    //     console.log(res)
    //     if (res.requireRefresh === true) {
    //         callAjax('https://beta-sso.tuoitre.vn/sso/v1/refresh-token', 'get', {}, token).then(res => {
    //             setCookie('access_token', res.jwt)
    //             setCookie('refresh_token', res.jwt)
    //         })
    //     }
    //
    // })
    return promise
}

function check_login() {
    let token = getCookie('refresh_token')
    let promise = callAjax('https://beta-sso.tuoitre.vn/sso/v1/is-login', 'get', {}, token)
    promise.catch(err => {
        let res = err.responseJSON
        console.log(res)
        // if (res.requireRefresh === true) {
        //     callAjax('https://beta-sso.tuoitre.vn/sso/v1/refresh-token', 'get', {}, token).then(res => {
        //         setCookie('access_token', res.jwt)
        //         setCookie('refresh_token', res.jwt)
        //     })
        // }

    })
    return promise
}

function login(username, password) {
    return get_token().then(res => {
        let data = {
            'username': username,
            'password': password
        }
        let token = res.jwt
        return callAjax('https://beta-sso.tuoitre.vn/sso/v1/login', 'post', data, token)
    })
}

function logout() {
    let token = getCookie('refresh_token')
    return callAjax('https://beta-sso.tuoitre.vn/sso/v1/logout', 'post', {}, token)
}




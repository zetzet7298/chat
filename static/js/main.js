function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function callAjax(url, method, data, token = '') {
    $.ajaxSetup({
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    });

    if ((method === 'POST' || method === 'post' || method === 'put' || method === 'PUT' || method === 'patch')) {
        data = JSON.stringify(data);
    }
    // if (!async) {
    //     var result = ''
    //     $.ajax({
    //         type: method,
    //         url: url,
    //         async: true,
    //         dataType: 'json',
    //         contentType: 'application/json',
    //         data: data,
    //         success: function (response) {
    //             result = response;
    //         },
    //         error: function (jqXHR, textStatus) {
    //             if (textStatus == 'timeout') {
    //                 // alert('jQuery: Failed from timeout');
    //                 //do something. Try again perhaps?
    //             }
    //         },
    //         timeout: 3000,
    //     });
    //     return result;
    // }
    let promise = $.ajax({
        type: method,
        url: url,
        async: true,
        dataType: 'json',
        contentType: 'application/json',
        data: data,
    });
    promise.catch(err => {
        let res = err.responseJSON
        console.log(res, url)

        if (res.requireRefresh === true) {
            callAjax('https://beta-sso.tuoitre.vn/sso/v1/refresh-token', 'get', {}, token).then(res => {
                setCookie('access_token', res.jwt)
                setCookie('refresh_token', res.jwt)
                return callAjax(url, method, data, res.jwt)
            })
        }else if (res.type != 2){
            // window.location.href = '/login'
        }

    })
    return promise
}
function callAjaxFormData(url, method, files, token = '') {
    $.ajaxSetup({
        headers: {
            "Authorization": "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoyNzQ5Nzk2MTk2fQ.2i_z3-2cpRRXusvpR-T5h0QvclOi4gL8wq1ze-aLyAA',
        }
    });
    // if (!async) {
    //     var result = ''
    //     $.ajax({
    //         type: method,
    //         url: url,
    //         async: true,
    //         dataType: 'json',
    //         contentType: 'application/json',
    //         data: data,
    //         success: function (response) {
    //             result = response;
    //         },
    //         error: function (jqXHR, textStatus) {
    //             if (textStatus == 'timeout') {
    //                 // alert('jQuery: Failed from timeout');
    //                 //do something. Try again perhaps?
    //             }
    //         },
    //         timeout: 3000,
    //     });
    //     return result;
    // }
    // console.log(data.getAll('files'))
    // var formData = new FormData()
    //     formData.append('name', 'asd')
    //     formData.append('email', 'zxc')
      const FD = new FormData();
      FD.append('files', files)
    console.log(files)
    return $.ajax({
          url: url,
          data: FD,
    cache: false,
    contentType: false,
    processData: false,
    method: 'POST',
    type: 'POST',
        })
}
function setCookie(cname, cvalue, minutes) {
  const d = new Date();
  d.setTime(d.getTime() + (minutes*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


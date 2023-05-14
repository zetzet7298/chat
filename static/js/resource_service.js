function get_resource(path, token) {
    return callAjax('http://192.168.61.116:8017' + path, 'get', {}, token)
}

function upload(service_management_id , table_management_id, files, callback) {
    // let data ={
    //     'files': files
    // }
    // formData.append('service_management_id', service_management_id)
    // formData.append('table_management_id', table_management_id)
    // console.log(formData.get('files'))
    let token = getCookie('refresh_token')
        const XHR = new XMLHttpRequest();
  const FD = new FormData();
  // Push our data into our FormData object
  // for (const [name, value] of Object.entries(data)) {
  //   FD.append(name, value);
  // }
FD.append('files', files)
  // Define what happens on successful data submission
  XHR.addEventListener('load', (event) => {
    console.log('Yeah! Data sent and response loaded.');
  });

  // Define what happens in case of an error
  XHR.addEventListener('error', (event) => {
console.log(event)
  });
XHR.onreadystatechange = () => {
    if (XHR.readyState === 4) {
      callback(JSON.parse(XHR.response));
    }
  }
  // Set up our request
  XHR.open('POST', 'http://127.0.0.1:8015/resources/?service_management_id=profile-service&table_management_id=profile');
XHR.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoyNzQ5Nzk2MTk2fQ.2i_z3-2cpRRXusvpR-T5h0QvclOi4gL8wq1ze-aLyAA')

  // Send our FormData object; HTTP headers are set automatically
  XHR.send(FD);


return XHR
    // return callAjaxFormData(`http://127.0.0.1:8015/resources/?service_management_id=${service_management_id}&table_management_id=${table_management_id}`, 'post', formData, token)
}
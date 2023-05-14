function get_message(roomId, is_pinned = null, type = null) {
    let token = getCookie('refresh_token')
    let data = {
        'page': 1,
        'page_size': 999,
        'type': type
    };
    if (is_pinned != null){
        data['is_pinned'] = is_pinned
    }
    return callAjax('http://127.0.0.1:8019/rooms/'+roomId+'/messages', 'get', data, token)
}

function get_rooms() {
    let token = getCookie('refresh_token')
    return callAjax('http://127.0.0.1:8019/rooms/', 'get', {}, token)
}

function get_profiles() {
    let token = getCookie('refresh_token')
    return callAjax('http://127.0.0.1:8019/profiles/', 'get', {}, token)
}

function find_room(room_id) {
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/rooms/${room_id}`, 'get', {}, token)
}
function pin_message(id, is_pinned=true) {
    let data ={
        'is_pinned': is_pinned
    }
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/messages/${id}/pinned`, 'put', data, token)
}

function add_user_to_room(room_id, user_ids) {
    let data ={
        'user_ids': user_ids
    }
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/rooms/${room_id}/user`, 'post', data, token)
}

function approve_users_to_room(room_id, user_ids) {
    let data ={
        'user_ids': user_ids
    }
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/rooms/${room_id}/approval`, 'post', data, token)
}

function remove_user_from_room(room_id, user_ids) {
    let data ={
        'user_ids': user_ids
    }
    let token = getCookie('refresh_token')
    data = JSON.stringify(data)
    return callAjax(`http://127.0.0.1:8019/rooms/${room_id}/user`, 'delete', data, token)
}

function leave_room(room_id) {
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/rooms/${room_id}/leave`, 'post', {}, token)
}

function create_profile(name) {
    let data ={
        'name': name
    }
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/profiles/`, 'post', data, token)
}

function create_room(user_ids) {
    let data ={
        'user_ids': user_ids
    }
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/rooms/`, 'post', data, token)
}

function update_name(room_id, name) {
    let data ={
        'name': name
    }
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/rooms/${room_id}/name`, 'patch', data, token)
}

function update_required_approve(room_id) {
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/rooms/${room_id}/required-approve`, 'patch', {}, token)
}
function update_avatar(room_id, avatar) {
    let data ={
        'avatar': avatar
    }
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/rooms/${room_id}/avatar`, 'patch', data, token)
}
function update_background(room_id, name) {
    let data ={
        'name': name
    }
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/rooms/${room_id}/background`, 'patch', data, token)
}
function revoke_message(id, is_pinned=true) {
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/messages/${id}/revoked`, 'put', {}, token)
}

function hide_message(id, is_pinned=true) {
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/messages/${id}/hidden`, 'put', {}, token)
}

function mark_seen_message(id, is_pinned=true) {
    let token = getCookie('refresh_token')
    return callAjax(`http://127.0.0.1:8019/messages/${id}/seen`, 'put', {}, token)
}

function get_websocket(roomId, token) {
    var ws = null;
    // ws = new WebSocket("ws://127.0.0.1:8019/rooms/" + roomId + "/ws?token=" + token + "&sender_id=" + userId);
    ws = new WebSocket("ws://127.0.0.1:8019/rooms/" + roomId + "/ws?token=" + token);
    // ws.onmessage = function(event) {
    //     // var messages = document.getElementById('messages')
    //     // var message = document.createElement('li')
    //     // var content = document.createTextNode(event.data)
    //     // message.appendChild(content)
    //     // messages.appendChild(message)
    //     console.log(event.data)
    // };
    return ws

}

function sendMessage(ws, text) {
    // ws.send(text)
}

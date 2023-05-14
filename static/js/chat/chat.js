function render_message() {
    let current_room = JSON.parse($('#current_room').val())
    get_message(current_room.id).then(res => {
        let data = res.data
        let html = ''
        for (let i = 0; i < data.length; i++) {
            var messageInput = 'in';
            if (data[i].user_id === getCookie('current_user_id')) {
                messageInput = 'out';
            }
            html += get_message_html(data[i], messageInput);
        }
        $('#messages').html(html)
        var messages = document.getElementById('kt-messages');
        messages.scrollTop = messages.scrollHeight;
        renderListPinnedMessages()
        renderListMedia()
        renderListLink()
    })
}

function get_message_html(message, input = 'out') {
    let btnPinHTML = `<a href="#" data-id="${message.id}" onclick="handlePinMessage(this, true)" id="btn-pin" class="btn btn-sm btn-outline btn-outline-dashed btn-outline-info btn-active-light-info">Ghim</a>`
    if (message.is_pinned == true) {
        btnPinHTML = `<a href="#" data-id="${message.id}" onclick="handlePinMessage(this, false)" id="btn-pin" class="btn btn-sm btn-outline btn-outline-dashed btn-outline-info btn-active-light-info">Bỏ ghim</a>`
    }
    let btn = ``
    if (message.type != 'system') {
        btn = `<div>`
        if (message.is_revoked === false) {
            btn += `<a data-id="${message.id}" onclick="handleRevokeMessage(this)" id="btn-revoke" href="#" class="btn btn-sm btn-outline btn-outline-dashed btn-outline-info btn-active-light-info">Thu hồi</a>`
        }
        btn += `
															<a data-id="${message.id}" onclick="handleHideMessage(this)" id="btn-hide" href="#" class="btn btn-sm btn-outline btn-outline-dashed btn-outline-info btn-active-light-info">Gỡ bỏ</a>
<!--															<a href="#" class="btn btn-sm btn-outline btn-outline-dashed btn-outline-info btn-active-light-info">Chuyển tiếp</a>-->
															${btnPinHTML}
															</div>`
    } else {

    }
    let content = `<div class="p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end" data-kt-element="message-text">${message.content}</div>`
    if (message.type == 'file') {
        let src = 'http://127.0.0.1:8015' + message.content

        content = `<div class="symbol symbol-100px">
                                                        <img alt="Pic" src="${src}">
                                                    </div>`
    } else if (message.type == 'link') {
        content = `<div class="">
                                                        <a target="_blank" href="${message.content}">${message.content}</a>
                                                    </div>`
    }
    if (input == 'in') {
        return `<!--begin::Message(in)-->
        <div class="d-flex justify-content-start mb-10">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column align-items-start">
                <!--begin::User-->
                <div class="d-flex align-items-center mb-2">
                    <!--begin::Avatar-->
                    <div class="symbol symbol-35px symbol-circle">
                        <img alt="Pic" src="assets/media/avatars/150-15.jpg">
                    </div>
                    <!--end::Avatar-->
                    <!--begin::Details-->
                    <div class="ms-3">
                        <a href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary me-1">${message.user_id}</a>
                        <span class="text-muted fs-7 mb-1">${message.created_at}</span>
                    </div>
                    <!--end::Details-->
                </div>
                <!--end::User-->
                <!--begin::Text-->
							${btn}
															${content}
                <!--end::Text-->
            </div>
            <!--end::Wrapper-->
        </div>
        <!--end::Message(in)-->`
    }
    return `<!--begin::Message(out)-->
													<div class="d-flex justify-content-end mb-10">
														<!--begin::Wrapper-->
														<div class="d-flex flex-column align-items-end">
															<!--begin::User-->
															<div class="d-flex align-items-center mb-2">
																<!--begin::Details-->
																<div class="me-3">
																	<span class="text-muted fs-7 mb-1">${message.created_at}</span>
																	<a href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary ms-1">You</a>
																</div>
																<!--end::Details-->
																<!--begin::Avatar-->
																<div class="symbol symbol-35px symbol-circle">
																	<img alt="Pic" src="assets/media/avatars/150-26.jpg">
																</div>
																<!--end::Avatar-->
															</div>
															<!--end::User-->
															<!--begin::Text-->
															${btn}
															${content}
															</div>
															<!--end::Text-->
														</div>
														<!--end::Wrapper-->
													</div>
													<!--end::Message(out)-->

`
}

function handlePinMessage(e, pin = true) {
    let element = $(e)
    let message_id = element.data('id')
    pin_message(message_id, pin).then(res => {
        if (res.code == 200) {
            render_message()
            // renderListPinnedMessages()
        }
        console.log(res)
    })
}

function handlePinMessage(e, pin = true) {
    let element = $(e)
    let message_id = element.data('id')
    pin_message(message_id, pin).then(res => {
        if (res.code == 200) {
            render_message()
            // renderListPinnedMessages()
        }
        console.log(res)
    })
}

$('#current_user_id').html(getCookie('current_user_id'))
$('#btn-leave').click(function () {
    let current_room = JSON.parse($('#current_room').val())
    leave_room(current_room.id).then(res => {
        renderRooms()
    })
})
$('#btn-new-room').click(function () {
    let html = ``
    get_profiles().then(res=>{
        let userIds = res.data
        console.log(userIds)
            for (let i = 0; i < userIds.length; i++) {
        html += `<!--begin::User-->
<div class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
<!--begin::Details-->
<div class="d-flex align-items-center">
<!--begin::Details-->
<div class="ms-6">
<input class="form-check-input user-to-new-room" value="${userIds[i].user_id}" type="checkbox" name="user-to-new-room[]">
<!--begin::Name-->
<a href="#" class="px-5 d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary">${userIds[i].name}</a>
<!--<span class="badge badge-light fs-8 fw-bold ms-2">Art Director</span></a>-->
<!--end::Name-->
</div>
<!--end::Details-->
</div>
<!--end::Details-->
<!--begin::Stats-->
<div class="d-flex">
<!--begin::Sales-->
<!--end::Sales-->
</div>
<!--end::Stats-->
</div>
<!--end::User-->`
    }
    $('#listUserToNewRoom').html(html)
    })

})
$('#kt_modal_new_room #btn-submit').click(function () {
    let user_ids = []
    $('.user-to-new-room:checked').each(function (index, e) {
        user_ids.push($(e).val())
    })
    console.log(user_ids)
    create_room(user_ids).then(res => {
        renderRooms()
        $('#kt_modal_new_room').modal('hide')
    }).catch(err => {
        alert(err.responseJSON.detail)
    })
})

function handleRemoveUsers(e, id) {
    // e.preventDefault()
    if (confirm('Bạn có chắc mời người này ra khỏi nhóm?')) {
        let element = $(e)
        let current_room = JSON.parse($('#current_room').val())
        let user_ids = []
        user_ids.push(id)
        remove_user_from_room(current_room.id, user_ids).then(res => {
            if (res.code == 200) {
                $('#kt_modal_view_users').modal('hide')
                render_message()
                // renderListUserToAdd()
                // renderListMembers()
                // renderListPinnedMessages()
            }
            console.log(res)
        })
    }

}

function handleRevokeMessage(e) {
// console.log(3564945, ws)
    let element = $(e)
    let message_id = element.data('id')
    revoke_message(message_id).then(res => {
        // wsSystemSend('thu hồi')
        if (res.code == 200) {
            render_message()
            // ws.send(JSON.stringify({
            //         'content' : res.message,
            //         'type': 'system'
            //     }))
            // onMessage(current_room)
        }
        console.log(res)
    })
}

function handleHideMessage(e) {
    let element = $(e)
    let message_id = element.data('id')
    hide_message(message_id).then(res => {
        if (res.code == 200) {
            render_message()
        }
        console.log(res)
    })
}

$('#btn-logout').click(function () {
    logout().then(res => {
        window.location.href = '/login'
        setCookie('access_token', '')
        setCookie('refresh_token', '')
    })
})

function renderListUserToAdd(users_in_room) {
    let html = ``
    let userIds = [
        'a0df52e8b3ad43768ac98a2a87acdcb9',
        '7ea0920a4ba14a45bd5070e4efd3cee4',
        '94b5c75335214563aa58e9208afbcfac',
        'ec353140121e4a76af5c1e8197e96a5a',
        '6d5f13c0de2e476792b66937bc53bf4a',
    ]
    for (let i = 0; i < userIds.length; i++) {
        if (users_in_room.includes(userIds[i]) == false) {
            html += `<!--begin::User-->
<div class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
<!--begin::Details-->
<div class="d-flex align-items-center">
<!--begin::Details-->
<div class="ms-6">
<input class="form-check-input user_to_add" value="${userIds[i]}" type="checkbox" name="user_to_add[]">
<!--begin::Name-->
<a href="#" class="d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary">${userIds[i]}</a>
<!--<span class="badge badge-light fs-8 fw-bold ms-2">Art Director</span></a>-->
<!--end::Name-->
</div>
<!--end::Details-->
</div>
<!--end::Details-->
<!--begin::Stats-->
<div class="d-flex">
<!--begin::Sales-->
<!--end::Sales-->
</div>
<!--end::Stats-->
</div>
<!--end::User-->`
        }
    }
    $('#listUserToAdd').html(html)
}

function renderListPendingUser(userIds) {
    let html = ``
    for (let i = 0; i < userIds.length; i++) {
        html += `<!--begin::User-->
<div class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
<!--begin::Details-->
<div class="d-flex align-items-center">
<!--begin::Details-->
<div class="ms-6">
<input class="form-check-input user_to_approve" value="${userIds[i]}" type="checkbox" name="user_to_approve[]">
<!--begin::Name-->
<a href="#" class="d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary">${userIds[i]}</a>
<!--<span class="badge badge-light fs-8 fw-bold ms-2">Art Director</span></a>-->
<!--end::Name-->
</div>
<!--end::Details-->
</div>
<!--end::Details-->
<!--begin::Stats-->
<div class="d-flex">
<!--begin::Sales-->
<!--end::Sales-->
</div>
<!--end::Stats-->
</div>
<!--end::User-->`
    }
    $('#listPendingUsers').html(html)
}

$('#kt_modal_add_member #btn-submit').click(function () {
    let user_ids = []
    $('.user_to_add:checked').each(function (index, e) {
        user_ids.push($(e).val())
    })
    console.log(user_ids)
    let current_room = JSON.parse($('#current_room').val())
    add_user_to_room(current_room.id, user_ids).then(res => {
        if (res.data == true) {
            render_message()
            $('#kt_modal_add_member').modal('hide')
            // renderListMembers(user_ids)
            // renderListUserToAdd()
        }
    })

})
$('#btn-view-user-to-add').click(function () {
    let current_room = JSON.parse($('#current_room').val())
    find_room(current_room.id).then(res => {
        renderListUserToAdd(res.user_ids)
    })
})
$('#btn-view-pending-users').click(function () {
    let current_room = JSON.parse($('#current_room').val())
    find_room(current_room.id).then(res => {
        renderListPendingUser(getPendingUserIds(res.pending_users))
    })
})
$('#btn-view-members').click(function () {
    let current_room = JSON.parse($('#current_room').val())
    find_room(current_room.id).then(res => {
        renderListMembers(res.user_ids)
    })
})
$('#kt_accordion_2_item_1').click(function () {
    // let current_room = JSON.parse($('#current_room').val())
    renderListPinnedMessages()
})
$('#kt_modal_pending_users #btn-submit').click(function () {
    let user_ids = []
    $('.user_to_approve:checked').each(function (index, e) {
        user_ids.push($(e).val())
    })
    console.log(user_ids)
    let current_room = JSON.parse($('#current_room').val())
    approve_users_to_room(current_room.id, user_ids).then(res => {
        if (res.data == true) {
            render_message()
            $('#kt_modal_pending_users').modal('hide')
            // renderListMembers(user_ids)
            // renderListUserToAdd()
        }
    })

})
$('#btn-openfile').click(function () {
    document.getElementById("file").click();
})

function handleChooseFile(e) {
    let xhr = upload('profile-service', 'profile', $('#file')[0].files[0], function (response) {
        let path = response.data.files[0]
        let src = 'http://127.0.0.1:8015/' + path
        ws.send(JSON.stringify({
            'content': path,
            'type': 'file'
        }))
        render_message()
    })
}

$('#btn-openavatar').click(function () {
    document.getElementById("change-avatar").click();
})

function handleChooseAvatar(e) {
    let xhr = upload('profile-service', 'profile', $('#change-avatar')[0].files[0], function (response) {
        let path = response.data.files[0]
        let current_room = JSON.parse($('#current_room').val())
        update_avatar(current_room.id, path)
        render_message()
        $('.avatar').attr('src', 'http://127.0.0.1:8015' + path)
    })
}

let ws = null
$('#required-approve-checkbox').change(function (e) {
    let current_room = JSON.parse($('#current_room').val())
    update_required_approve(current_room.id)
        .then(res => {
            render_message()

        })
})

function getPendingUserIds(pending_users) {
    let user_ids = []
    for (let user of pending_users) {
        user_ids.push(user['is_invited_user_id'])
    }
    return user_ids
}

function handleClickRoom(e) {
    let room = $(e).data('item')
    // renderListUserToAdd()
    // renderListMembers()
    $('#current_room').val(JSON.stringify(room))
    $('#kt_chat_messenger_header #room_name').html(room.name)
    $('#kt_chat_messenger_footer').removeClass('visually-hidden')
    $('.avatar').attr('src', 'http://127.0.0.1:8015' + room.avatar)
    let token = getCookie('refresh_token')
    ws = get_websocket(room.id, token)
    onMessage(room)
    render_message()
    $('#information-room').removeClass('invisible')
    if (room.required_approve) {
        $('#required-approve-checkbox').prop('checked', true)

    } else {
        $('#required-approve-checkbox').prop('checked', false)
    }
    let html = `
                                    <!--begin::List-->
                            <div class="accordion accordion-icon-toggle" id="kt_accordion_2">
                                <!--begin::Item-->
                                <div class="mb-5">
                                    <!--begin::Header-->
                                    <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                                         data-bs-target="#kt_accordion_2_item_1">
                                        <span class="accordion-icon"><span class="svg-icon svg-icon-4"><svg>...</svg></span></span>
                                        <h3 class="fs-4 fw-bold mb-0 ms-4">Thông tin về đoạn chat</h3>
                                    </div>
                                    <!--end::Header-->

                                    <!--begin::Body-->
                                    <div id="kt_accordion_2_item_1" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
                                                                            <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_view_pinned_message">
Xem tin nhắn đã ghim
                                    </a>
                                    </div>
                                    <!--end::List-->
                                </div>
                                <!--end::Card body-->
                            </div>
                            <div class="accordion accordion-icon-toggle" id="kt_accordion_2">
                                <!--begin::Item-->
                                <div class="mb-5">
                                    <!--begin::Header-->
                                    <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                                         data-bs-target="#kt_accordion_2_item_2">
                                        <span class="accordion-icon"><span class="svg-icon svg-icon-4"><svg>...</svg></span></span>
                                        <h3 class="fs-4 fw-bold mb-0 ms-4">Tùy chỉnh đoạn chat</h3>
                                    </div>
                                    <!--end::Header-->

                                    <!--begin::Body-->
                                    <div id="kt_accordion_2_item_2" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
                                    <input type="file" onchange="handleChooseAvatar(this)" id="change-avatar" name="change-avatar" style="display:none;" />
                                        <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_edit_nickname">Chỉnh sửa biệt danh</a><br>
                                        <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_view_pinned_message">Tìm kiếm trong cuộc trò chuyện</a><br>
                                    </div>
                                    <!--end::List-->
                                </div>
                                <!--end::Card body-->
                            </div>
                            <div class="accordion accordion-icon-toggle" id="kt_accordion_2">
                                <!--begin::Item-->
                                <div class="mb-5">
                                    <!--begin::Header-->
                                    <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                                         data-bs-target="#kt_accordion_2_item_5">
                                        <span class="accordion-icon"><span class="svg-icon svg-icon-4"><svg>...</svg></span></span>
                                        <h3 class="fs-4 fw-bold mb-0 ms-4">File phương tiện, file liên kết</h3>
                                    </div>
                                    <!--end::Header-->

                                    <!--begin::Body-->
                                    <div id="kt_accordion_2_item_5" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
                                                                                <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_media">File phương tiện</a><br>
                                                                                <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_file">File</a><br>
                                                                                <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_link">Liên kết</a><br>
                                    </div>
                                    <!--end::List-->
                                </div>
                                <!--end::Card body-->
                            </div>
                            <div class="accordion accordion-icon-toggle" id="kt_accordion_2">
                                <!--begin::Item-->
                                <div class="mb-5">
                                    <!--begin::Header-->
                                    <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                                         data-bs-target="#kt_accordion_2_item_6">
                                        <span class="accordion-icon"><span class="svg-icon svg-icon-4"><svg>...</svg></span></span>
                                        <h3 class="fs-4 fw-bold mb-0 ms-4">Quyền riêng tư, hỗ trợ</h3>
                                    </div>
                                    <!--end::Header-->

                                    <!--begin::Body-->
                                    <div id="kt_accordion_2_item_6" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
                                                                                <a href="#" id="btn-block">Chặn</a><br>

                                    </div>
                                    <!--end::List-->
                                </div>
                                <!--end::Card body-->
                            </div>
                            <!--end::Contacts-->`
    if(room.is_dual === false){
        html = `
                                    <!--begin::List-->
                            <div class="accordion accordion-icon-toggle" id="kt_accordion_2">
                                <!--begin::Item-->
                                <div class="mb-5">
                                    <!--begin::Header-->
                                    <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                                         data-bs-target="#kt_accordion_2_item_1">
                                        <span class="accordion-icon"><span class="svg-icon svg-icon-4"><svg>...</svg></span></span>
                                        <h3 class="fs-4 fw-bold mb-0 ms-4">Thông tin về đoạn chat</h3>
                                    </div>
                                    <!--end::Header-->

                                    <!--begin::Body-->
                                    <div id="kt_accordion_2_item_1" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
                                                                            <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_view_pinned_message">
Xem tin nhắn đã ghim
                                    </a>
                                    </div>
                                    <!--end::List-->
                                </div>
                                <!--end::Card body-->
                            </div>
                            <div class="accordion accordion-icon-toggle" id="kt_accordion_2">
                                <!--begin::Item-->
                                <div class="mb-5">
                                    <!--begin::Header-->
                                    <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                                         data-bs-target="#kt_accordion_2_item_2">
                                        <span class="accordion-icon"><span class="svg-icon svg-icon-4"><svg>...</svg></span></span>
                                        <h3 class="fs-4 fw-bold mb-0 ms-4">Tùy chỉnh đoạn chat</h3>
                                    </div>
                                    <!--end::Header-->

                                    <!--begin::Body-->
                                    <div id="kt_accordion_2_item_2" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
                                        <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_rename_room">Đổi tên đoạn chat</a><br>
                                    <input type="file" onchange="handleChooseAvatar(this)" id="change-avatar" name="change-avatar" style="display:none;" />

                                        <a href="#" id="btn-openavatar" >Thay đổi ảnh</a><br>
                                        <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_edit_nickname">Chỉnh sửa biệt danh</a><br>
                                        <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_view_pinned_message">Tìm kiếm trong cuộc trò chuyện</a><br>
                                    </div>
                                    <!--end::List-->
                                </div>
                                <!--end::Card body-->
                            </div>
                            <div class="accordion accordion-icon-toggle" id="kt_accordion_2">
                                <!--begin::Item-->
                                <div class="mb-5">
                                    <!--begin::Header-->
                                    <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                                         data-bs-target="#kt_accordion_2_item_3">
                                        <span class="accordion-icon"><span class="svg-icon svg-icon-4"><svg>...</svg></span></span>
                                        <h3 class="fs-4 fw-bold mb-0 ms-4">Tùy chọn nhóm</h3>
                                    </div>
                                    <!--end::Header-->

                                    <!--begin::Body-->
                                    <div id="kt_accordion_2_item_3" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
<!--                                                                                <a href="#">Cần quản trị phê duyệt</a>-->
                                            <div class="d-flex justify-content-between">
                                        <!--begin::Label-->
                                        <div class="fw-bold">
<!--                                            <label class="fs-6 text-primary"></label>-->
                                                                                    <!--begin::Switch-->
                                        <label class="form-check form-switch form-check-custom form-check-solid">
                                            <span class="px-15">Cần quản trị phê duyệt</span>
                                            <input id="required-approve-checkbox" class="form-check-input" type="checkbox" value="" checked="checked">
                                        </label>
                                        <!--end::Switch-->
                                        </div>
                                        <!--end::Label-->

                                    </div>

                                    </div>
                                    <!--end::List-->
                                </div>
                                <!--end::Card body-->
                            </div>
                            <div class="accordion accordion-icon-toggle" id="kt_accordion_2">
                                <!--begin::Item-->
                                <div class="mb-5">
                                    <!--begin::Header-->
                                    <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                                         data-bs-target="#kt_accordion_2_item_4">
                                        <span class="accordion-icon"><span class="svg-icon svg-icon-4"><svg>...</svg></span></span>
                                        <h3 class="fs-4 fw-bold mb-0 ms-4">Thành viên trong đoạn chat</h3>
                                    </div>
                                    <!--end::Header-->
 <div id="kt_accordion_2_item_4" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
                                                                                <a id="btn-view-members" href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_view_users">Xem người dùng trong đoạn chat</a>
                                    </div>
                                     <div id="kt_accordion_2_item_4" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
                                                                                <a id="btn-view-pending-users" href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_pending_users">Xem thành viên đang yêu cầu tham gia</a>
                                    </div>
                                    <!--begin::Body-->
                                    <div id="kt_accordion_2_item_4" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
                                                                                <a id="btn-view-user-to-add" href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_add_member">Thêm người</a>
                                    </div>
                                    <!--end::List-->
                                </div>
                                <!--end::Card body-->
                            </div>
                            <div class="accordion accordion-icon-toggle" id="kt_accordion_2">
                                <!--begin::Item-->
                                <div class="mb-5">
                                    <!--begin::Header-->
                                    <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                                         data-bs-target="#kt_accordion_2_item_5">
                                        <span class="accordion-icon"><span class="svg-icon svg-icon-4"><svg>...</svg></span></span>
                                        <h3 class="fs-4 fw-bold mb-0 ms-4">File phương tiện, file liên kết</h3>
                                    </div>
                                    <!--end::Header-->

                                    <!--begin::Body-->
                                    <div id="kt_accordion_2_item_5" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
                                                                                <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_media">File phương tiện</a><br>
                                                                                <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_file">File</a><br>
                                                                                <a href="#" data-bs-toggle="modal"
                                       data-bs-target="#kt_modal_link">Liên kết</a><br>
                                    </div>
                                    <!--end::List-->
                                </div>
                                <!--end::Card body-->
                            </div>
                            <div class="accordion accordion-icon-toggle" id="kt_accordion_2">
                                <!--begin::Item-->
                                <div class="mb-5">
                                    <!--begin::Header-->
                                    <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                                         data-bs-target="#kt_accordion_2_item_6">
                                        <span class="accordion-icon"><span class="svg-icon svg-icon-4"><svg>...</svg></span></span>
                                        <h3 class="fs-4 fw-bold mb-0 ms-4">Quyền riêng tư, hỗ trợ</h3>
                                    </div>
                                    <!--end::Header-->

                                    <!--begin::Body-->
                                    <div id="kt_accordion_2_item_6" class="fs-6 collapse ps-10"
                                         data-bs-parent="#kt_accordion_2">
                                                                                <a href="#" id="btn-leave">Rời nhóm</a><br>

                                    </div>
                                    <!--end::List-->
                                </div>
                                <!--end::Card body-->
                            </div>
                            <!--end::Contacts-->`
    }
$('#kt_chat_contacts_body2').html(html)

    // for(let i = 0; i<=1000 ; i++){
    //      get_info(room.id).then(res => {
    //     console.log(res)
    // })
    // }


    //    get_message(room.id).then(res => {
    //     console.log(res)
    // })
}

function onMessage(content) {
    // Class definition
    var KTAppChat = function () {
        // Private functions
        var handeSend = function (element) {
            if (!element) {
                return;
            }

            // Handle send
            KTUtil.on(element, '[data-kt-element="input"]', 'keydown', function (e) {
                if (e.keyCode == 13) {
                    handeMessaging(element);
                    e.preventDefault();

                    return false;
                }
            });

            KTUtil.on(element, '[data-kt-element="send"]', 'click', function (e) {
                handeMessaging(element);
            });
        }

        var handeMessaging = function (element) {

            var messages = element.querySelector('[data-kt-element="messages"]');
            var input = element.querySelector('[data-kt-element="input"]');

            if (input.value.length === 0) {
                return;
            }
            let type = 'text'
            if (isValidHttpUrl(input.value)) {
                type = 'link'
            }
            ws.send(JSON.stringify({
                'content': input.value,
                'type': type
            }))
            input.value = '';

            // setTimeout(function () {
            //     // Show example incoming message
            //     message = messageInTemplate.cloneNode(true);
            //     message.classList.remove('d-none');
            //     message.querySelector('[data-kt-element="message-text"]').innerText = 'Thank you for your awesome support!';
            //     messages.appendChild(message);
            //     messages.scrollTop = messages.scrollHeight;
            // }, 2000);
        }
        try {
            ws.onmessage = function (event) {
                console.log(event.data)
                render_message()
                // let contentMessage = JSON.parse(event.data)
                // // var messages = document.getElementById('messages')
                // // var message = document.createElement('li')
                // // var content = document.createTextNode(event.data)
                // // message.appendChild(content)
                // // messages.appendChild(message)
                //
                // var messageOutTemplate = messages.querySelector('[data-kt-element="template-out"]');
                // var messageInTemplate = messages.querySelector('[data-kt-element="template-in"]');
                // var message;
                // console.log(messageOutTemplate)
                // // Show example outgoing message
                // message = messageOutTemplate.cloneNode(true);
                // message.classList.remove('d-none');
                // message.querySelector('[data-kt-element="message-text"]').innerText = contentMessage.content;
                // messages.appendChild(message);
                // messages.scrollTop = messages.scrollHeight;
            };
        } catch (e) {
            console.log(e)
        }
        // Public methods
        return {
            init: function (element) {
                handeSend(element);
            }
        };
    }();

// On document ready
    KTUtil.onDOMContentLoaded(function () {
        // Init inline chat messenger
        KTAppChat.init(document.querySelector('#kt_chat_messenger'));

        // Init drawer chat messenger
        // KTAppChat.init(document.querySelector('#kt_drawer_chat_messenger'));
    });
}


function getRoomName(room) {
    let name = room.name
    if (name == '' || name == null) {
        let userIds = room.user_ids
        name = userIds.filter(function (e) {
            return e !== getCookie('current_user_id')
        })
        console.log(name, getCookie('current_user_id'))
    }
    return name.toString()
}
function renderRooms() {
    get_rooms().then(res => {
        // console.log(src)
        let data = res.data
        let html = ''
        for (let i = 0; i < data.length; i++) {
            let name = data[i].name
            let item = JSON.stringify(data[i])
        let src = 'http://127.0.0.1:8015' + data[i].avatar

            html += `
		<div data-item='${item}' style="cursor: pointer" onclick="handleClickRoom(this)" id="room" class="d-flex flex-stack py-4">
		<div class="d-flex align-items-center">
		<div class="symbol symbol-45px symbol-circle">
		<span class="symbol-label bg-light-danger text-danger fs-6 fw-bolder">
																		<div class="symbol symbol-35px symbol-circle">
																	<img alt="Pic" src="${src}">
																</div>
</span>
		</div>
		<div class="ms-5">
		<a href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2">${name}</a>
		</div>
		</div>
		<div class="d-flex flex-column align-items-end ms-2">
		<span class="text-muted fs-7 mb-1">3 hrs</span>
		</div>
		</div>
		<div class="separator separator-dashed d-none"></div>`;
        }
        $('#rooms').html(html);
//      get_resource('/private-storages/user-service/2023-04-27/ee9181ff0b65497b88847068f7c4bb70.jpg',
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzc3LCJleHAiOjE2ODI2Nzg2OTF9.Mp0eWLFltI-iD8o4eN7iUFhI_BrLHdnO3liq81OJ5cg')
//         .then(res => {
//                  var binaryData = []
//             binaryData.push(res);
//             var blob = new Blob(binaryData, {type: 'image/jpg'})
//             console.log(binaryData, blob)
//   const objectUrl = window.URL.createObjectURL(blob)
//             console.log(objectUrl)
//                         var imageElement = $('#room').find('img')
//             imageElement.attr('src', objectUrl)
//         })
//         .catch(err => {
//             console.log(err.responseText)
//               // const blob = err.responseText
//             // var imageElement = $('#room').find('img')
//             // imageElement.attr('src', objectUrl)
// // console.log()
//   var imageElement = document.getElementById('test');
//   imageElement.src = objectUrl;
//   // imageElement.onload = () => URL.revokeObjectUrl(objectUrl);
//   console.log(imageElement)
//         })

    });

}

function renderListMembers(userIds) {
    let html = ``
    for (let i = 0; i < userIds.length; i++) {
        html += `<!--begin::User-->
<div class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
<!--begin::Details-->
<div class="d-flex align-items-center">
<!--begin::Avatar-->
<div class="symbol symbol-35px symbol-circle">
<img alt="Pic" src="assets/media/avatars/150-1.jpg">
</div>
<!--end::Avatar-->
<!--begin::Details-->
<div class="ms-6">
<!--begin::Name-->
<a href="#" class="d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary">${userIds[i]}</a>
<!--<span class="badge badge-light fs-8 fw-bold ms-2">Art Director</span></a>-->
<!--end::Name-->
</div>
<!--end::Details-->
</div>
<!--end::Details-->
<!--begin::Stats-->
<div class="d-flex">
<!--begin::Sales-->
<div class="text-end">
<div class="fs-5 fw-bolder text-dark">
<button onclick="handleRemoveUsers(this, '${userIds[i]}')">Xóa thành viên</button>
</div>
</div>
<!--end::Sales-->
</div>
<!--end::Stats-->
</div>
<!--end::User-->`
    }
    $('#listMembers').html(html)
}

function renderListPinnedMessages() {
    let current_room = JSON.parse($('#current_room').val())
    get_message(current_room.id, true).then(res => {
        let data = res.data
        let html = getPinnedMessagesAsHTML(data);
        $('#listPinnedMessages').html(html)
    })

}

function renderListMedia() {
    let current_room = JSON.parse($('#current_room').val())
    get_message(current_room.id, null, 'file').then(res => {
        let data = res.data
        let html = getMediaMessagesAsHTML(data);
        $('#listMedia').html(html)
    })
}

function renderListLink() {
    let current_room = JSON.parse($('#current_room').val())
    get_message(current_room.id, null, 'link').then(res => {
        let data = res.data
        let html = getLinkMessagesAsHTML(data);
        $('#listLink').html(html)
    })

}

function getLinkMessagesAsHTML(messages) {
    let html = ``
    for (let i = 0; i < messages.length; i++) {
        html += `<!--begin::User-->
<div class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
<a href="${messages[i].content}" target="_blank" class="d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary">${messages[i].content}</a>
</div>
<!--end::User-->`
    }
    return html
}

function getMediaMessagesAsHTML(messages) {
    let html = ``
    for (let i = 0; i < messages.length; i++) {
        let src = 'http://127.0.0.1:8015' + messages[i].content
        html += `<!--begin::User-->
<div class="symbol symbol-100px">
                                                        <img alt="Pic" src="${src}">
                                                    </div>
<!--end::User-->`
    }
    return html
}

function getPinnedMessagesAsHTML(messages) {
    let html = ``
    for (let i = 0; i < messages.length; i++) {

        if (messages[i].type == 'file') {
            let src = 'http://127.0.0.1:8015' + messages[i].content
            html += `<!--begin::User-->
<div class="symbol symbol-100px">
                                                        <img alt="Pic" src="${src}">
                                                    </div>`
        } else if (messages[i].type == 'file') {
            html += `<!--begin::User-->
<div class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
<a href="${messages[i].content}" target="_blank" class="d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary">${messages[i].content}</a>
</div>
<!--end::User-->`
        } else {
            html += `<!--begin::User-->
<div class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
<!--begin::Details-->
<div class="d-flex align-items-center">
<!--begin::Avatar-->
<div class="symbol symbol-35px symbol-circle">
<img alt="Pic" src="assets/media/avatars/150-1.jpg">
</div>
<!--end::Avatar-->
<!--begin::Details-->
<div class="ms-6">
<!--begin::Name-->
<a href="#" class="d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary">${messages[i].content}</a>
<!--<span class="badge badge-light fs-8 fw-bold ms-2">Art Director</span></a>-->
<!--end::Name-->
</div>
<!--end::Details-->
</div>
<!--end::Details-->
<!--begin::Stats-->
<div class="d-flex">
<!--begin::Sales-->
<!--end::Sales-->
</div>
<!--end::Stats-->
</div>
<!--end::User-->`

        }
    }
    return html
}

renderRooms()

$('#kt_modal_rename_room #btn-submit').click(function (e) {
    e.preventDefault()
    let current_room = JSON.parse($('#current_room').val())
    let room_name = $('#kt_modal_rename_room #room_name').val()
    console.log(current_room.id, room_name)
    update_name(current_room.id, room_name).then(res => {
        renderRooms()
        $('#kt_chat_messenger_header #room_name').html(room_name)
        $('#kt_modal_rename_room').modal('hide')
    })
})

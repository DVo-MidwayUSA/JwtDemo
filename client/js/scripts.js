const hide = (element) => {
    element.classList.add('d-none')
}

const show = (element) => {
    element.classList.remove('d-none')
}

const displayUsername = (profile, user) => {
    const title = profile.querySelector('h3 span')
    title.textContent = user.username
}

const formReset = (form) => {
    form.reset()
}

const formDataToJson = (form) => {
    const object = {}
    const formData = new FormData(form)
    formData.forEach((value, key) => { object[key] = value })
    return JSON.stringify(object)
}

const ajax = (url, method, data) => {
    return fetch(url, {
        method: method,
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((response) => {
        if (response.status != 401)
            return response.json()
            
        return response
    })
}
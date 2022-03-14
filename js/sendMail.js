let form = document.getElementById('my-form');
console.log(form);

async function handleSubmit(e) {
    e.prevendDefault();
    alert('clicou no botão enviar');
    let status = document.getElementById('form-status');
    status.style.color = '#ffffff';
    let data = new FormData(e.target);
    fetch(e.target.action, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        console.log(response);
        if (response.ok) {
            status.innerHTML = 'Thanks for your message! I will get back to you as soon as possible.';
            form.reset();
        } else {
            response.json().then((data) => {
                if (Object.hasOwn(data, 'errors')){
                    status.innerHTML = data['errors'].map(error => error['message']).join(', ');
                } else {
                    status.innerHTML = 'An error occurred. Please try again later.';
                }
            })
        }

    }).catch((error) => {
        status.innerHTML = 'An error occurred. Please try again later.';
        console.log(error);
    });
}
form.addEventListener("submit", handleSubmit);
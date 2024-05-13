console.log('App JS')
const visibility = document.querySelector('.visibility');
if (visibility != null) {
    visibility.onclick = function (e) {
        let input = e.currentTarget.parentElement.children[0];
        if (input.type == 'password') {
            input.type = 'text';
            e.currentTarget.textContent = 'visibility';
        } else {
            input.type = 'password';
            e.currentTarget.textContent = 'visibility_off';
        }
    }
}

function selectsInputs() {
    const inputSelects = [...document.querySelectorAll('.input__text--select')];
    inputSelects.map(function (select) {
        select.onclick = function (e) {
            e.preventDefault();
            let icon = select.querySelector('i');
            let content = select.querySelector('.input__text--select-content');
            let input = select.querySelector('input');
            let options = [...select.querySelectorAll('.input__text--select-content__item')]

            if (icon.textContent == 'expand_more') {
                icon.textContent = 'expand_less';
                content.classList.add('input__text--select-content--active');
                if (input.value == '') {
                    input.value = 'Seleccione una opción:'
                }
            } else {
                icon.textContent = 'expand_more';
                content.classList.remove('input__text--select-content--active');
                if (input.value == 'Seleccione una opción:') {
                    input.value = '';
                }
            }
            options.map(function (option) {
                option.onclick = function (e) {
                    options.map(function (x) {
                        x.classList.remove('input__text--select-content__item--active')
                    });
                    option.classList.add('input__text--select-content__item--active');
                    input.value = option.textContent.trim();
                }
            });
        }
    });
}
selectsInputs();
const addContact = document.querySelector('.add__contact');
let addContactIndex = 0;
if (addContact != null) {
    addContact.onclick = function (e) {
        e.preventDefault();
        addContactIndex++;
        const addContacts = document.querySelector('.add__contacts');
        const item = document.createElement('div');
        const btnDelete = document.createElement('button');

        btnDelete.classList.add('btn__outlined', 'btn__outlined--transparent');
        btnDelete.textContent = 'Eliminar';
        btnDelete.onclick = function (e) {
            if (confirm('¿Está seguro de eliminar este contacto?')) {
                btnDelete.parentElement.remove();
            }
        }
        item.classList.add('content__main-form__grid-3', 'animation-fadeIn');
        item.innerHTML = `
        <div class="input__text">
            <input class="input__text-input" name="name_contact${addContactIndex}" type="text" required autocomplete="off">
            <span class="input__text-label">Nombre contacto</span>
            </div>
            <div class="input__text input__text--select">
            <input class="input__text-input" name="relationship${addContactIndex}" type="text" required autocomplete="off">
            <span class="input__text-label">Parentesco</span>
            <i class="material-icons-outlined">expand_more</i>
            <div class="input__text--select-content">
                <div class="input__text--select-content__item">
                Parentesco 1
                </div>
                <div class="input__text--select-content__item">
                Parentesco 2
                </div>
                <div class="input__text--select-content__item">
                Parentesco 3
                </div>
            </div>
        </div>`;

        item.appendChild(btnDelete);
        addContacts.appendChild(item);

        selectsInputs();
    }
}

// * Form Steps
const form = document.querySelector('form.content__main-form');

if (form != null) {
    // * Elements
    const prevStep = document.querySelector('.buttons__fixed-prev');
    const nextStep = document.querySelector('.buttons__fixed-next');
    // const step = nextStep.getAttribute('step');


    // * All data
    const data = [];

    // * Events
    nextStep.onclick = function (e) {
        e.preventDefault();

        console.log('next')
        // * Steps
        // * -- Step 1
        const inputsStep1 = inputsStep(1);
        const contactsArray = [];
        const dataStep1 = {};

        let relationshipValue = inputsStep1.filter(x => {
            if (x.getAttribute('name').startsWith('relationship1')) {
                return x.value.trim();
            }
        });
        inputsStep1.forEach(input => {
            if (input.getAttribute('name').startsWith('name_contact')) {
                const contactObj = {
                    contact: input.value,
                    relationship: relationshipValue
                };
                if (input.getAttribute('name').startsWith('relationship')) {
                    contactObj.relationship = input.value;
                }
                contactsArray.push(contactObj);
            } else if (input.getAttribute('name').startsWith('relationship')) {
                relationshipValue = input.value;
            } else if (input.type === 'radio' && input.checked) {
                dataStep1[input.getAttribute('name')] = input.value;
            } else {
                dataStep1[input.getAttribute('name')] = input.value;
            }
        });

        dataStep1['contacts'] = contactsArray;

        const emptyStep1 = emptyFields(inputsStep1);
        if (emptyStep1) {
            alertBuskadent({
                type: 'error',
                title: 'Error',
                description: 'Se requieren llenar todos los campos'
            });
        } else {
            next();
            console.log('Puedes seguir al paso 2')
            // alert('Puedes pasar al paso 2')
            // console.log(dataStep1)
        }

        // * -- Step 2



    }

    // * Helpers
    function emptyFields(inputs) {
        return inputs.filter(x => x.value == '').length > 0 ? true : false;
    }

    function inputsStep(step) {
        return [...document.querySelectorAll(`[step="${step}"] input`)]
    }

    function next() {
        const step = nextStep.getAttribute('step');
        const mainSteps = document.querySelector('.content__main-form__steps');
        const stepsSection = [...document.querySelectorAll('.content__main-form-step')];

        stepsSection.map(x => {
            if (x.getAttribute('step') == step) {
                x.classList.add('content__main-form-step--current');
            } else {
                x.classList.remove('content__main-form-step--current');
            }
        });

        nextStep.setAttribute('step', (step + 1));
        prevStep.setAttribute('step', (step - 1));
        prevStep.classList.add('buttons__fixed-prev--active');


        console.log(mainSteps)
        for (let x = 0; x <= (step - 2); x++) {
            mainSteps.children[x].classList.add('content__main-form__steps-step--done');
            mainSteps.children[x].classList.remove('content__main-form__steps-step--current');
            console.log('Done:')
            console.log(x)
        }
        for (let x = (step - 1); x < step; x++) {
            console.log('Current:')
            mainSteps.children[x].classList.add('content__main-form__steps-step--current');
        }
    }
}

// * Input Boolean
const inputBoolean = [...document.querySelectorAll('.main__boolean')];
if (inputBoolean != null) {
    inputBoolean.map(boolean => {
        const sectionsDataBoolean = [...document.querySelectorAll('.data__boolean')];
        let trueVal = boolean.children[0].querySelector('input');
        let falseVal = boolean.children[1].querySelector('input');
        let inputValidTrue = [...boolean.querySelectorAll('input')];
        boolean.onclick = function (e) {
            if (boolean.hasAttribute('separately')) {
                let currentInput = inputValidTrue.filter(x => x.checked)
                console.log(currentInput[0].id)
                let currentSection = sectionsDataBoolean.filter(x => {
                    if(x.getAttribute('data-boolean') == currentInput[0].id) {
                        return x;
                    }
                });
                sectionsDataBoolean.map(x => x.classList.remove('data__boolean--active'))
                currentSection[0].classList.add('data__boolean--active');
            } else {
                let dataBoolean = boolean.getAttribute('data-boolean');
                let currentSection = sectionsDataBoolean.filter(x => {
                    if (!x.hasAttribute('default')) {
                        return x.getAttribute('data-boolean') == dataBoolean
                    }
                });
    
                if (trueVal.checked) {
                    currentSection[0].classList.add('data__boolean--active');
                } else {
                    currentSection[0].classList.remove('data__boolean--active');
                }
            }
        }
    });
}

// * Upload
const uploads = [...document.querySelectorAll('.upload')];
if (uploads != null) {
    uploads.map(upload => {
        const addFiles = upload.querySelector('.add__files');
        const addFilesBox = upload.querySelector('.upload__info');
        const inputFile = upload.querySelector('.upload__info-input');

        addFiles.onclick = files;

        function files() {
            inputFile.click();
        }

        inputFile.addEventListener('change', function () {
            const files = this.files;
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            // const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/x-matroska', 'video/mp4'];
            const maxSize = 10 * 1024 * 1024;
            const listFiles = document.querySelector('.upload__files');

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileSize = file.size;
                const fileType = file.type;

                if (allowedTypes.includes(fileType) && fileSize <= maxSize) {
                    console.log('Puedes añadir este archivo:', file.name);

                    const formData = new FormData();
                    formData.append('file', file);

                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', '', true);

                    let fileCreate = document.createElement('div');
                    fileCreate.id = 'file' + i;
                    xhr.upload.onprogress = function (event) {
                        if (event.lengthComputable) {
                            const percentComplete = (event.loaded / event.total) * 100;

                            // ! FALTA PROBAR
                            console.log('Progreso de carga: ' + percentComplete.toFixed(0) + '%');

                            let type = file.type.toUpperCase().slice(-3);
                            let name = file.name.substring(0, 10) + '... ';
                            if (type.includes('PEG')) type = 'JPG';

                            if (percentComplete != 100) {
                                listFiles.appendChild(fileCreate);
                                // console.log(listFiles.querySelector('#file' + i))
                                listFiles.querySelector('#file' + i).innerHTML = `
                                <article id="${file.name}" style="--uploading: ${percentComplete}%" class="upload__files-item upload__files-item--uploading">
                                    <div class="upload__files-content">
                                        <span class="upload__files-item__title">${name}.${type}</span>
                                        <i class="material-icons-outlined upload__files-item__delete">close</i>
                                    </div>
                                </article>`;
                            } else {
                                uploadedHTML = `
                                <article id="${file.name}" class="upload__files-item upload__files-item--success">
                                    <div class="upload__files-content">
                                        <span class="upload__files-item__title">${name}.${type}</span>
                                        <i class="material-icons-outlined upload__files-item__delete">delete</i>
                                    </div>
                                </article>`;
                                listFiles.insertAdjacentHTML("afterbegin", uploadedHTML);
                            }
                            suprFile();
                        }
                    };

                    xhr.send(formData);
                } else {
                    alertBuskadent({
                        type: 'error',
                        title: 'Ha ocurrido un error',
                        description: 'Los archivos debe ser en formato jpg, png o pdf y tener un tamaño máximo de 10MB.'
                    });
                }

            }

            // * Delete
            function suprFile() {
                const itemsDelete = [...listFiles.querySelectorAll('.upload__files-item__delete')];
                console.log(itemsDelete)
                itemsDelete.map(x => {
                    let id = x.parentElement.parentElement.attributes.id.textContent.trim();
                    let name = x.parentElement.children[0].textContent.trim();
                    x.onclick = (e) => {
                        e.preventDefault();
                        if (confirm(`¿Está seguro que quiere eliminar ${name} de sus archivos?`)) {
                            x.parentElement.parentElement.remove();

                            const files = inputFile.files;
                            const newFiles = Array.from(files).filter(file => file.name !== id);
                            
                            // console.log(newFiles)

                            alertBuskadent({
                                type: 'success',
                                title: 'Operación exitosa',
                                description: `Archivo ${name} eliminado`
                            });
                            
                        }
                    }
                });

            }

        });
    });
}

// * -- Upload Mini
const uploadsMini = [...document.querySelectorAll('.upload_mini')];
if (uploadsMini != null) {
    uploadsMini.map(upload => {
        let input = upload.querySelector('input');
        upload.onclick = (e) => {
            input.click();
        }
    });
}

// * Alert
function alertBuskadent({
    type,
    title,
    description
}) {
    const alert = document.createElement('div');
    alert.classList.add('alert__buskadent', `alert__buskadent--${type}`)
    if (type == 'success') type = 'done';
    if (type == 'error') type = 'error_outline';
    if (type == 'warning') type = 'warning_amber';
    alert.innerHTML = `<i class="material-icons-outlined alert__buskadent-icon">${type}</i>
    <div class="alert__buskadent-text">
        <strong>${title}</strong>
        <span>${description}</span>
    </div>
    <i class="material-icons-outlined alert__buskadent-close">close</i>`;
    document.body.appendChild(alert);
    const close = alert.querySelector('.alert__buskadent-close');
    console.log(close)
    close.onclick = (e) => {
        alert.classList.add('alert__buskadent--remove');
        setTimeout(() => { alert.remove(); }, 300)
    };
    removeAlert();

    function hiddenAlert() {
        alert.classList.add('alert__buskadent--remove');
        removeAlert();
    }

    function removeAlert() {
        setTimeout(() => {
            hiddenAlert();
        }, 10000);
        setTimeout(() => {
            alert.remove();
        }, 11000);
    }
}

// * Alerts Trigger 
const alertsBuskadentTrigger = [...document.querySelectorAll('.alert__buskadent')];
if (alertsBuskadentTrigger != null) {
    alertsBuskadentTrigger.map(alertBuska => {
        let content = alertBuska.querySelector('.alert__buskadent--content');
        let trigger = alertBuska.querySelector('.alert__buskadent--trigger');

        trigger.onclick = (e) => {
            e.preventDefault();
            if (content.classList.contains('alert__buskadent--content--active')) {
                trigger.children[0].textContent = 'expand_more';
                content.classList.remove('alert__buskadent--content--active');
            } else {
                trigger.children[0].textContent = 'expand_less';
                content.classList.add('alert__buskadent--content--active');
            }
        }
    });
}

// * Order By
const orderBys = [...document.querySelectorAll('.order__by')];
if (orderBys != null) {
    orderBys.map(orderBy => {
        let trigger = orderBy.querySelector('.order__by-current');
        let content = orderBy.querySelector('.order__by-content');
        let items = [...orderBy.querySelectorAll('.order__by-content-item')];
        let currentItem = orderBy.querySelector('.order__by-current span span');
        console.log(currentItem)
        trigger.onclick = (e) => {
            e.preventDefault();
            if (content.classList.contains('order__by-content--active')) {
                content.classList.remove('order__by-content--active');
            } else {
                content.classList.add('order__by-content--active');
            }
        };
        items.map(item => {
            item.onclick = (e) => {
                e.preventDefault();
                items.map(x => x.classList.remove('order__by-content-item--active'));
                currentItem.textContent = item.textContent.trim();
                console.log(item.textContent.trim())
                item.classList.add('order__by-content-item--active');
                content.classList.remove('order__by-content--active');
            };
        });
    });
}

if (document.querySelector('.dashboard') != null) {
    alertBuskadent({
        type: 'success',
        title: 'Proceso exitoso',
        description: 'Se generó la historia clínica con éxito y se envió al médico.'
    });
} else{
    alertBuskadent({
        type: 'success',
        title: 'Sesión iniciada',
        description: 'Sesión iniciada con éxito.'
    });
}

// * Textarea

const textareaInputs = [...document.querySelectorAll('textarea')];
if (textareaInputs != null) {

    textareaInputs.map(x => {
        x.oninput = () => {
            adjustTextareaHeight(x);
        };
    });

    function adjustTextareaHeight(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }

}
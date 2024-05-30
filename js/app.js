console.log('App JS')
// TODO
/* TODO
- Me hace falta colocar el sitio en responsive y los detalles del buscador de la tabla de historias clinicas. Tambien me hace falta arreglar los textareas con su alto correspondiente tomando en cuenta que los upfile le hacen falta los detalles del dropbox OJO apurate



*/
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
        next();
    }

    prevStep.onclick = function (e) {
        prev();
    }

    // * Helpers
    function emptyFields(inputs) {
        return inputs.filter(x => x.value == '').length > 0 ? true : false;
    }

    function inputsStep(step) {
        return [...document.querySelectorAll(`[step="${step}"] input`)]
    }

    function next() {
        const step = Number(nextStep.getAttribute('step'));
        // console.log('Next: ' + step)
        const mainSteps = document.querySelector('.content__main-form__steps');
        const stepsSection = [...document.querySelectorAll('.content__main-form-step')];

        if (step < 6) {
            stepsSection.map(x => {
                if (x.getAttribute('step') == step) {
                    x.classList.add('content__main-form-step--current');
                } else {
                    x.classList.remove('content__main-form-step--current');
                }
            });
        }

        if (step == 6) {
            alertBuskadent({
                type: 'success',
                title: '¡Enhorabuena!',
                description: 'Operación exitosa'
            })
        }

        nextStep.setAttribute('step', (step + 1));
        prevStep.setAttribute('step', (step - 1));
        prevStep.classList.add('buttons__fixed-prev--active');

        if (step == 5) {
            nextStep.textContent = 'Guardar cambios y enviar';
        } else {
            nextStep.textContent = 'Continuar';
        }


        // console.log(mainSteps)
        for (let x = 0; x <= (step - 2); x++) {
            if (x < 4) {
                mainSteps.children[x].classList.add('content__main-form__steps-step--done');
                mainSteps.children[x].classList.remove('content__main-form__steps-step--current');
                // console.log('Done:')
                // console.log(x)
            }
        }
        for (let x = (step - 1); x < step; x++) {
            if (x < 5) {
                // console.log('Current:')
                mainSteps.children[x].classList.add('content__main-form__steps-step--current');
            }
        }
        if (step <= 5) moveScrollStepX('next');
    }

    function prev() {
        const step = Number(prevStep.getAttribute('step'));
        // console.log('Prev: ' + step);

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
        // console.log('Step: ' + step)
        if (step == 1) {
            prevStep.classList.remove('buttons__fixed-prev--active');
        }

        if (step == 5) {
            nextStep.textContent = 'Guardar cambios y enviar';
        } else {
            nextStep.textContent = 'Continuar';
        }

        for (let x = (step - 1); x < mainSteps.children.length; x++) {
            mainSteps.children[x].classList.remove('content__main-form__steps-step--done');
            mainSteps.children[x].classList.remove('content__main-form__steps-step--current');
            if (x == (step - 1)) {
                mainSteps.children[x].classList.add('content__main-form__steps-step--current');
            }
        }

        for (let x = (step - 2); x < (step - 1); x++) {
            if (x < 0) x = 0;
            mainSteps.children[x].classList.add('content__main-form__steps-step--current');
        }
        moveScrollStepX('prev');
    }

    // * 
    function moveScrollStepX(fn) {
        console.log(fn)
        const currentStep = document.querySelector('.content__main-form__steps-step--current');
        const stepsContainer = document.querySelector('.content__main-form__steps');
        if (currentStep && stepsContainer) {
            if (currentStep.previousElementSibling != null) {
                let scrollOffset = currentStep.previousElementSibling.offsetWidth;
                let scrollStorage = localStorage.getItem('scroll')
                console.log(fn)
                if (fn == 'next') {
                    console.log(scrollOffset)
                    localStorage.setItem('scroll', (scrollOffset + Number(scrollStorage)));
                } else {
                    console.log(scrollOffset)
                    console.log(Number(scrollStorage))
                    // localStorage.setItem('scroll', (scrollOffset - Number(scrollStorage)));
                }
                let scroll = localStorage.getItem('scroll')
                stepsContainer.scrollTo({
                    left: scroll,
                    behavior: 'smooth'
                });
                console.log(scroll)
            } else {
                stepsContainer.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
                localStorage.setItem('scroll', 0);
            }
        }
    }
    if (performance.navigation.type === 1) {
        localStorage.setItem('scroll', 0);
    }
    const stepsContainer = document.getElementById('stepsContainer');
    let isDragging = false;
    let startX;

    stepsContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - stepsContainer.offsetLeft;
        stepsContainer.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newX = e.pageX - startX;
            stepsContainer.scrollLeft = newX;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        stepsContainer.style.cursor = 'grab';
    });
} // End Form

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
                    if (x.getAttribute('data-boolean') == currentInput[0].id) {
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
// * success, warning, info, error
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
    close.onclick = (e) => {
        alert.classList.add('alert__buskadent--remove');
        setTimeout(() => {
            alert.remove();
        }, 300)
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
} else {
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
// * NavMain
const navMenu = document.querySelector(".nav-menu-mobile");
if (navMenu != null) {
    const navToggle = document.querySelector(".nav-menu-burger-button");
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("nav-menu_visible");
    });
}

// function createTooltip() {
//     const tooltips = document.querySelectorAll('.tooltip');
//     tooltips.forEach((tooltip) => {
//         const position = tooltip.getAttribute('data-tooltip-position');
//         tooltip.addEventListener('mouseenter', () => {
//             tooltip.style.setProperty('data-tooltip', position);
//         });
//         tooltip.addEventListener('mouseleave', () => {
//             tooltip.style.setProperty('data-tooltip', '');
//         });
//     });
// }

// createTooltip();

const $tabsHead = [...document.querySelectorAll('.tabs__buskadent-head')];
const $tabsBody = [...document.querySelectorAll('.tabs__buskadent-body')];

$tabsHead.map(($tab, $indexTab) => {
    const $marked = $tab.querySelector('.tabs__buskadent-marked');
    const $tabs = [...$tab.querySelectorAll('.tabs__buskadent-tab')]

    const $body = $tabsBody[$indexTab];
    const $bodyItems = [...$body.querySelectorAll('.tabs__buskadent-tab')]

    $tabs.map(($tabItem, $index) => {
        let $current = $tabs.filter(x => x.classList.contains('tabs__buskadent-tab--active'))[0];

        $marked.style.width = `${($current.offsetWidth)}px`;
        $marked.style.left = `${($current.offsetLeft)}px`;

        $tabItem.onclick = (e) => {
            e.preventDefault();
            const $markedWidth = `${(e.target.offsetWidth)}px`;
            const $markedPosition = `${(e.target.offsetLeft)}px`;

            $tabs.map(x => x.classList.remove('tabs__buskadent-tab--active'));
            $tabs[$index].classList.add('tabs__buskadent-tab--active');
            $bodyItems.map(x => x.classList.remove('tabs__buskadent-tab--active'));
            $bodyItems[$index].classList.add('tabs__buskadent-tab--active');
            $marked.style.width = $markedWidth;
            $marked.style.left = $markedPosition;
        }
    });
});

// Upload img btns
const uploadProfiles = [...document.querySelectorAll('.upload__profile')];
uploadProfiles.map(upload => {
    const img = upload.querySelector('.profile__img');
    const btn = upload.querySelector('.btn__upload__img');
    const input = upload.querySelector('input');

    btn.onclick = function(e) {
        e.preventDefault();
        uploadImgBasic(input, img);
    }
});

function uploadImgBasic(input, toImage) {
    const fileInput = input;
    const profileImg = toImage;

    fileInput.click();

    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        const maxSize = 500 * 1024; // 500kb in bytes

    if (file && (file.type === 'image/png' || file.type === 'image/jpeg') && file.size <= maxSize) {
        const reader = new FileReader();

        reader.onload = function(e) {
            profileImg.src = e.target.result;
        }

        reader.readAsDataURL(file);
    } else {
       alertBuskadent({
            type: 'warning',
            title: 'Ha ocurrido un problema',
            description: `Por favor selecciona un archivo PNG o JPG con un tamaño máximo de 500kb.`
        });
       fileInput.value = ''; 
   }
});
}

const dropdownsBuskadents = [...document.querySelectorAll('.dropdown__buskadent')];
dropdownsBuskadents.map(dropdown => {
    const content = dropdown.querySelector('.dropdown__buskadent-content');
    dropdown.onclick = (e) => {
        e.preventDefault();
        if (dropdown.classList.contains('dropdown__buskadent--active')) {
            dropdown.classList.remove('dropdown__buskadent--active');
        } else {
            dropdown.classList.add('dropdown__buskadent--active');
        }
    }
});

const triggerModal = [...document.querySelectorAll('.trigger-modal-simple')]
const modalSimple = [...document.querySelectorAll('.modal-simple')]

triggerModal.map((el, index) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        const idTrigger = e.currentTarget.id
        const modal = modalSimple.find((x) => x.id == idTrigger)
        if (modal.style.display == '' || modal.style.display == 'none') {
            modal.style.display = 'block'
        } else {
            modal.style.display = 'none'
        }
    })
})
modalSimple.map((el, i) => {
    el.addEventListener('click', (e) => {
        e.preventDefault()
        const content = el.children[0].children[0]

        if (!content.contains(e.target)) {
            el.style.display = 'none'
        } else if (content.children[0].contains(e.target)) {
            el.style.display = 'none'
        }
    })
    const close = el.querySelector('.close-modal');
    close.onclick = (e) => {
        el.style.display = 'none'
    }

})
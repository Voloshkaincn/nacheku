


function updateSelect(npSelect, options, firstOption) {

    npSelect.prop("disabled", false);

    npSelect
        .find('option')
        .remove();

    if (options.length > 1) {
        npSelect.append('<option disabled selected value>' + firstOption + ' </option>');
    }

    if (options) {
        options.forEach(function (item, value) {
            npSelect.append(new Option(item.Description, item.Ref));
        })
    }
}

$('#area').on('change', function (e) {

    getSelectOptions('#city', 'getCities', 'Город', e.target.value);

    var npWarehouse = $('#warehouse');
    npWarehouse.prop("disabled", true);
    npWarehouse
        .find('option')
        .remove()
    npWarehouse.append('<option disabled selected value> Отделение </option>');;
})

$('#city').on('change', function (e) {

    var select = $('#warehouse');
    getSelectOptions('#warehouse', 'getWarehouses', 'Oтделение', e.target.value);

})

function getSelectOptions(select, action, title, ref = '') {

    var select = $(select);

    $.ajax({
        method: 'POST',
        url: "form/nova_poshta.php",
        data: { action: action, ref: ref },
    }).done(function (data) {
        //console.log(data);
        var options = JSON.parse(data);
        updateSelect(select, options, title)
    })
}

getSelectOptions('#area', 'getAreas', 'Регион')


/* **** Modal  **** */
let modalBtns = document.getElementsByClassName('call-modal')
for (modalBtn of modalBtns) {
    modalBtn.addEventListener('click', function () {
        let modal_id = this.getAttribute('data-modal')
        let modal = document.getElementById(modal_id)
        modal.classList.add('modal_show')
        document.body.classList.add('noscroll')

        modal.addEventListener('click', function () {
            document.body.classList.remove('noscroll')
            modal.classList.remove('modal_show')
        });

        let modalCtr = modal.querySelector('.modal__container')
        modalCtr.addEventListener('click', function (e) {
            e.stopPropagation();
            return false;
        })
    })
}
let closes = document.querySelectorAll('.modal__close')
for (close of closes) {
    close.addEventListener("click", function () {
        document.body.classList.remove('noscroll')
        this.closest('.modal').classList.remove('modal_show')
    });
}



//FORM SUBMIT


/** Quentiti */
// let QHtml = '<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>';
// document.querySelector('.quantity input').insertAdjacentHTML('afterend', QHtml)
let input = document.querySelector('.quantity__input'),
    btnUp = document.querySelector('.quantity-up'),
    btnDown = document.querySelector('.quantity-down'),
    min = input.getAttribute('min'),
    max = input.getAttribute('max');

btnUp.addEventListener('click', function () {
    let oldValue = parseFloat(input.value);
    let newVal
    if (oldValue >= max) {
        newVal = oldValue;
    } else {
        newVal = oldValue + 1;
    }
    input.value = newVal;
    let change = new Event("change");
    input.dispatchEvent(change);

});

btnDown.addEventListener('click', function () {
    let oldValue = parseFloat(input.value);
    let newVal
    if (oldValue <= min) {
        newVal = oldValue;
    } else {
        newVal = oldValue - 1;
    }
    input.value = newVal;
    let change = new Event("change");
    input.dispatchEvent(change);

});



input.addEventListener('change', function () {
    let quantity = input.value
    let quantitySum = 340 * quantity
    let saleSum = quantity * 100
    document.getElementById('quantitySum').textContent = quantitySum
    document.getElementById('saleRez').textContent = saleSum
    document.getElementById('total').textContent = quantitySum - saleSum
})


let maskPhoneError, maskEmailError, error
//===== mask phone=====
$('#inputPhone').inputmask({
    placeholder: "",
    showMaskOnHover: false,
    mask: "+380 99 999 99 99",
    onincomplete: function () {
        $(this).addClass('maskerror')
        maskPhoneError = true
    },
    oncomplete: function () {
        $(this).removeClass('maskerror')
        maskPhoneError = false
    },
});

//===== mask email
$('#inputEmail').inputmask({
    placeholder: "",
    showMaskOnHover: false,
    alias: "email",
    onincomplete: function () {
        $(this).addClass('maskerror')
        maskEmailError = true
    },
    oncomplete: function () {
        $(this).removeClass('maskerror error')
        maskEmailError = false
    },
});


//===validation empty inputs ===
function validRequired(elem) {
    if (elem.val().trim() === "") {
        elem.addClass('input_empty')
        error = true;
    };
};


//===== remove empty class on input 
$('input.required').each(function () {
    var elem = $(this)
    elem.on('input', function () {
        if (elem.val().trim() !== "") {
            elem.removeClass('input_empty')
        };
    })
})

//===== SUBMIT FORM
$('#mail-form').submit(function (event) {
    event.preventDefault()
    error = false;
    $('input.required, select.required').each(function () {
        validRequired($(this));
    });
    if (error == true || maskPhoneError || maskEmailError) {
        event.preventDefault()
        return false;
    };

    let email = $('#inputEmail').val().trim();
    let body = `<p><strong>Имя:</strong> ${$('#name').val().trim()}</p>
        <p><strong>Фамилия:</strong> ${$('#surname').val().trim()}</p>
        <p><strong>E-mail:</strong> ${$('#inputEmail').val().trim()}</p>
        <p><strong>Телефон:</strong> ${$('#inputPhone').val().trim()}</p>
        <p><strong>Количество книг:</strong> ${$('.quantity__input').val().trim()}</p>
        <p><strong>Регион:</strong> ${$('#area option:selected').text().trim()}</p>
        <p><strong>Город:</strong> ${$('#city option:selected').text().trim()}</p>
        <p><strong>Отделение:</strong> ${$('#warehouse option:selected').text().trim()}</p>`
    console.log(body)



    let mailData = {
        'email': email,
        'body': body
    };

    $.ajax({
        method: 'POST',
        url: "send.php",
        data: mailData,
        success: function (data) {
            $('#order').removeClass('modal_show')
            $('#thankyou').addClass('modal_show')
        }
    });
    return false;

});

$('.toStep2').on('click', function (event) {
    error = false;
    $('#step1 .required').each(function () {
        validRequired($(this));
    });
    if (!error && !maskPhoneError && !maskEmailError) {
        document.querySelector('.form__point_active').classList.remove('form__point_active')
        document.querySelector('.form__point.toStep2').classList.add('form__point_active')
        document.querySelector('.form__step_active').classList.remove('form__step_active')
        document.getElementById('step2').classList.add('form__step_active')
    }
    return false;
})

$('.toStep1').on('click', function (event) {
    document.querySelector('.form__point_active').classList.remove('form__point_active')
    document.querySelector('.form__point.toStep1').classList.add('form__point_active')
    document.querySelector('.form__step_active').classList.remove('form__step_active')
    document.getElementById('step1').classList.add('form__step_active')

})

let controller, scene, scene2;

function createScrollMagic() {

    controller = new ScrollMagic.Controller();

    let screenHeight = document.documentElement.clientHeight
    let screenWidth = document.documentElement.clientWidth
    let crowDuration

    if (screenWidth >= screenHeight) {
        crowDuration = screenHeight - screenWidth * 0.21
        scene = new ScrollMagic.Scene({ triggerElement: "#first", duration: crowDuration, triggerHook: '0' })
            .setPin("#claw")
            // .addIndicators({ name: "claw" })
            .addTo(controller);
    } else {
        crowDuration = screenHeight - (0.9 * screenHeight - screenWidth * 0.36)
        scene = new ScrollMagic.Scene({ triggerElement: "#first", duration: crowDuration, triggerHook: '0' })
            .setPin("#claw")
            // .addIndicators({ name: "claw" })
            .addTo(controller);

    }


    if (screenWidth >= screenHeight && screenWidth > 992) {
        let opinionHeight = document.getElementById('opinion').clientHeight
        let chertkovHeight = document.getElementById('chertkov').clientHeight
        document.getElementById('trigerChertkov').style.top = chertkovHeight + 'px'

        scene2 = new ScrollMagic.Scene({ triggerElement: "#trigerChertkov", duration: (opinionHeight - chertkovHeight), triggerHook: '1' })
            .setPin("#chertkov")
            // .addIndicators({ name: "chertkov" })
            .addTo(controller);
    }
}
createScrollMagic()
window.addEventListener("resize", function () {
    destroyController();
    createScrollMagic()
})
function destroyController() {
    if (controller) {
        controller.destroy(true);
        scene.destroy(true);
    }
}


const anchors = document.querySelectorAll('.scrollnext')
function addScrollToAnchor(elem) {
    elem.addEventListener('click', function (e) {
        e.preventDefault()
        const blockID = elem.getAttribute('data-href').substr(1)
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        })
    })
}
for (let anchor of anchors) {
    addScrollToAnchor(anchor)
}
const toTop = document.querySelector('.tostart')
addScrollToAnchor(toTop);

/* **** Modal  **** */
let modalBtns = document.getElementsByClassName('call-modal')
for (modalBtn of modalBtns) {
    modalBtn.addEventListener('click', function () {
        let modal_id = this.getAttribute('data-modal')
        let modal = document.getElementById(modal_id)
        modal.classList.add('modal_show')
        document.body.classList.add('noscroll')

        let close = modal.querySelector('.modal__close')
        close.addEventListener("click", function () {
            document.body.classList.remove('noscroll')
            modal.classList.remove('modal_show')
        });

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
    let saleSum = quantitySum * 0.3
    document.getElementById('quantitySum').textContent = quantitySum
    document.getElementById('saleRez').textContent = saleSum
    document.getElementById('total').textContent = quantitySum - saleSum
})

//form steps on mobile version
let points = document.getElementsByClassName('form__point')
for (point of points) {
    point.addEventListener('click', function () {
        let numbetStep = this.textContent
        let step = 'step' + numbetStep
        document.querySelector('.form__step_active').classList.remove('form__step_active')
        document.getElementById(step).classList.add('form__step_active')
    })
}


//======= Custom select ==========
$(".custom-select").each(function () {
    var classes = $(this).attr("class"),
        id = $(this).attr("id"),
        name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    var selectTriggerText = $(this).attr("placeholder") ? $(this).attr("placeholder") : $(this).find('option:selected').text();
    template += '<span class="custom-select-trigger">' + selectTriggerText + '</span>';
    template += '<div class="custom-options">';
    $(this).find("option").each(function () {
        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
    });
    template += '</div></div>';

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
});
$(".custom-option:first-of-type").hover(function () {
    $(this).parents(".custom-options").addClass("option-hover");
}, function () {
    $(this).parents(".custom-options").removeClass("option-hover");
});
$(".custom-select-trigger").on("click", function (event) {
    $('html').one('click', function () {
        $(".custom-select").removeClass("opened");
    });
    $('.modal__container').one('click', function () {
        $(".custom-select").removeClass("opened");
    });
    $(".select-trigger").not($(this)).parents(".select").removeClass("opened");
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
});
$(".custom-option").on("click", function () {
    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-select-wrapper").find("select").trigger('change');
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
});
//======= End Custom select ==========

//FORM SUBMIT
let maskPhoneError, maskEmailError
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
$('.required').each(function () {
    var elem = $(this)
    elem.on('input', function () {
        if (elem.val().trim() !== "") {
            elem.removeClass('input_empty')
        };
    })
})

//===== SUBMIT FORM
$('#submit').on('click', function (event) {
    error = false;
    $('.required').each(function () {
        validRequired($(this));
    });
    if (error == true || maskPhoneError || maskEmailError) {
        event.preventDefault()
        return false;
    };
    return true;
});

// request to Nova Poshta

// $(function () {
//     let settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://api.novaposhta.ua/v2.0/json/",
//         "method": "POST",
//         "headers": {
//             "content-type": "application/json",

//         },
//         "processData": false,
//         "data": "{\r\n\"apiKey\": \"api key\",\r\n \"modelName\": \"Address\",\r\n \"calledMethod\": \"getAreas\",\r\n \"methodProperties\":{}}"
//     }

//     $.ajax(settings).done(
//         function (response) {
//             let length = response.data.length;
//             // console.log(response.data)
//             for (let i = 0; i < response.data.length; i++) {
//                 let region = response.data[i].Description;
//                 // console.log(region)
//                 $('#region').append("<option value='" + region + "'>" + region + "</option>");

//             }
//         });
// });

// let cityes;
// $(function () {
//     let settings2 = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://api.novaposhta.ua/v2.0/json/",
//         "method": "POST",
//         "headers": {
//             "content-type": "application/json",

//         },
//         "processData": false,
//         "data": "{\r\n\"apiKey\": \"fbc461da3e18512edeaeed814066ebdf\",\r\n \"modelName\": \"Address\",\r\n \"calledMethod\": \"getCities\",\r\n \"methodProperties\":{}}"
//     }

//     cityes = $.ajax(settings2).done(
//         function (response) {
//             let length = response.data.length;
//             let rez = $.parseJSON(response.data);
//             return rez
//         })
//         .fail(function (res) {
//             console.log(res);
//         });

// });


// $('#region').on('change', function () {
//     let region = $(this).val()

//     let cityesByArea;
//     $.each(cityes, function (i, cityesPage) {
//         console.log(cityesPage)
//         cityesByArea = cityesPage.grep(citye => { return citye.AreaDescription == 'region' })
//         return cityesByArea
//     })
//     console.log(cityesByArea)

//     $('#city').append("<option value='" + cityesByArea + "'>" + cityesByArea + "</option>");
// })
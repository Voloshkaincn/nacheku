window.onload = function () {
    let controller, scene, scene2;

    function createScrollMagic() {

        controller = new ScrollMagic.Controller();

        let screenHeight = document.documentElement.clientHeight
        let screenWidth = document.documentElement.clientWidth
        let crowDuration

        // if (screenWidth >= screenHeight) {
        if (screenWidth >= screenHeight && screenWidth > 767) {
            crowDuration = screenHeight - screenWidth * 0.21
            scene = new ScrollMagic.Scene({ triggerElement: "#first", duration: crowDuration, triggerHook: '0' })
                .setPin("#claw")
                // .addIndicators({ name: "claw" })
                .addTo(controller);
        }
        // else {
        //     crowDuration = screenHeight - (0.9 * screenHeight - screenWidth * 0.36)
        //     scene = new ScrollMagic.Scene({ triggerElement: "#first", duration: crowDuration, triggerHook: '0' })
        //         .setPin("#claw")
        //         // .addIndicators({ name: "claw" })
        //         .addTo(controller);

        // }


        if (screenWidth >= screenHeight && screenWidth > 767) {
            let opinionHeight = document.getElementById('opinion').clientHeight
            let chertkovHeight = document.getElementById('chertkov').clientHeight
            // console.log('opinionHeight  ' + opinionHeight)
            // console.log('Chertkov  ' + chertkovHeight)
            // document.getElementById('trigerChertkov').style.top = screenWidth * 0.43
            document.getElementById('trigerChertkov').style.top = chertkovHeight + 'px'

            scene2 = new ScrollMagic.Scene({ triggerElement: "#trigerChertkov", duration: (opinionHeight - chertkovHeight), triggerHook: '1' })
                .setPin("#chertkov")
                // .addInsdicators({ name: "chertkov" })
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
            if (scene) { scene.destroy(true); }
            if (scene2) { scene2.destroy(true); }

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


};
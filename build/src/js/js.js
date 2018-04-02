$(function() {
    // Click tabs
    $('.js-click-tab').click(function() {
        var hr = $($(this).closest('.nav').data('hr'));
        var number = $(this).data('tab-number');
        hr.removeClass(function(index, className) {
            return (className.match(/(^|\s)num--\S+/g) || []).join(' ');
        });
        hr.addClass('num--' + number);
    });
    // Click tabs --/

    // browser detection
    $('body').addClass(getBrowser().name.toLowerCase());
    if (isiOS()) {
        $('body').addClass('ios');
    }

    function getBrowser() {
        var ua = navigator.userAgent,
            tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: 'IE ', version: (tem[1] || '') };
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem != null) { return { name: 'Opera', version: tem[1] }; }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }

        return {
            name: M[0],
            version: M[1]
        };
    }

    function isiOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    // browser detection --/

    // smooth scrolling
    $(".js-scroll-to").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 450, function() {
                window.location.hash = hash;
            });
        }
    });
    // smooth scrolling --/

    // open in new window
    $('.js-open-in-new-window').click(function(e){
        e.preventDefault();
        var link = $(this).attr('href');
        window.open(link, 'newwindow', 'width=600,height=400'); 
    });
    // open in new window --/

    // submit join form
    $('.js-join-on-submit').on('submit', function(e){
        e.preventDefault();

        var form = $(this);

        // check form for validity
        var numberOfInvalidFields = 0;
        var focused = false;

        form.find('[required]').each(function(){
            var field = $(this);

            if (!field.val().trim().length){
                if (!focused){
                    focused = true;

                    $('html, body').animate({
                        scrollTop: field.offset().top - 20
                    }, 500, function(){
                        field.focus();
                    });
                }

                $(field.data('error')).addClass('show');
                numberOfInvalidFields++;
            }
        });
        if (numberOfInvalidFields){
            return;
        }

        // send valid form
        $.ajax({
            type: 'post',
            url: 'https://api.jinnilotto.com/affiliate/sendEmail/response.json',
            data: form.serialize(),
            success: function (data) {
                $('.js-join-on-submit').addClass('success');
                $('html, body').animate({
                    scrollTop: $("#contact-us").offset().top
                }, 500);
            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
            },
        });
    });

    // remove error messages
    $('.join-form__input, .join-form__textarea').on('keypress keyup', function(){
        var error = $(this).data('error');
        if (error){
            $(error).removeClass('show');
        }
    });
    // submit join form --/
});
var EventBus = new Vue();
window.sliders = [];

var audio_sd = new Audio('user/images/sun_sonification.wav');
$(document).ready(function () {


    $(document).on("click", ".sound-bg", function (event) {

        if ($('.sound-bg').hasClass('active')) {
            $(this).removeClass('active');
		    audio_sd.pause();
        } else {
            $(this).addClass('active');
            audio_sd.play();
        }
	});


    // Закрытие модального окна
	$("body").on("click", ".modal-close", function () {

	    var tabsLength = $('.tabs:visible').length;

		if ($(this).parents().eq(4).attr('data-slide-id') === undefined) {
            $(this).parents().eq(5).hide();
        } else {
            $(this).parents().eq(4).hide();
        }


		if (tabsLength === 0) {
            $('.btn__primary.nav.disabled:visible').parents().eq(3).hide();
        }
	});

    // Переворачивающиеся карточки
	$("body").on("mouseover", ".features--item", function () {
		$(this).addClass('visited');
		if ($('.features--item:visible.visited').length == $('.features--item:visible').length) {
			$('.btn__primary.nav.disabled:visible').parents().eq(3).hide();
		}
	});

    // Вкладки с буллитами
    $("body").on("click", ".bm", function () {
        $(this).addClass('visited');
        if (!$(this).parents(':eq(0)').hasClass('donthide')) {
            $('.bm:visible').removeClass('current');
            $(this).addClass('current');
            $('.bm_cont:visible .bm_show').fadeOut(200);
        }

        $('.bm_cont:visible .bm_show').eq($(this).index()).fadeIn(200);
        if ($('.bm:visible.visited').length == $('.bm:visible').length) {
            $('.btn__primary.nav.disabled:visible').parents().eq(3).hide();
        }
    });

    // Раговорный баллун
	$(document).on("click", ".js-nextSpeech", function (event) {
		$('#next div').eq(0).click();
	});

    $("body").on("click", ".js-nav-link", function () {



        var curFrame = $(this).attr('data-frame');

        if (!$(this).hasClass('disabled')) {
            $('#menu').fadeOut(600);
            $('.menu_btn').removeClass('active');
            $('.glossary_btn').removeClass('active');
            $('.menu_btn').removeClass('non-active');
            $('.glossary_btn').removeClass('non-active');
            gotoFrame(curFrame);
        }

    });

    $("body").on("click", ".btn__prev, .btn__primary.nav", function () {
        if ($('.tabs:visible').length) {
            tabs();
        }
    });

    $("body").on("click", ".contents-close", function () {
        $('#menu').fadeOut(600);
        $('#glossary').fadeOut(600);
        $('#IMG_30').hide();
        $('.menu_btn').removeClass('active');
        $('.glossary_btn').removeClass('active');
        $('.menu_btn').removeClass('non-active');
        $('.glossary_btn').removeClass('non-active');
    });


});

// Переход к определенному FRAME
function gotoFrame(sFrameId, event) {
    $('#menu').fadeOut(600);
    var jxFrame = CL.axSlides.find("frame[id='" + sFrameId + "']");
    var jxSlide = jxFrame.parents("slide:first");
    sSlideId = jxSlide.attr("id");
    if (jxSlide.attr("id") != CLZ.sCurrentSlideId) {
        CL.Open.Slide({
            slideid: sSlideId
        });
        if (!CLF[sFrameId].bIsFirst) {
            CLF[sFrameId].Start();
        }
    } else {
        CLF[sFrameId].Start();
    }
}

// Вкладки
function tabs() {
    var tabsCollection = $(".tabs:visible");
    var btnModal = $('.tabs').find('.btn');

    tabsCollection.each(function (index, el) {
        $(el).find(".tab__links").removeClass('active visited');
        $(el).find(".tab__links").eq(0).removeClass('active visited').addClass('active');
        $(el).find(".tab__item").hide().eq(0).show();

        $(el)
            .find(".tab__item:not(:first-child)")
            .hide();
        $(el)
            .find(".tab__links:first-child")
            .addClass("active visited");
    });

    $('.tabs').find('.btn').each(function (key, item) {
       $(item).bind('click', function () {
           $(this).addClass('modal-open');

           if ($('.tab__links:visible.visited').length == $('.tab__links:visible').length) {

               $('.btn__primary.nav.disabled:visible').parents().eq(3).hide();

           }
       })
    });

    $(".tab__links").on("click", onTabClickHandler);

    $(".tabs--horizontal").find('.tab__links:visible').css("width", 100/$('.tab__links:visible').length+"%");

    $('.tabs--vertical').find('.tab__content:visible').css('max-width', $('.tabs--vertical:visible').width() - $('.tab__nav:visible').width());

    function onTabClickHandler(event) {
        var target = $(event.target);
        var linksCollection = target.closest(".tabs:visible").find(".tab__links");
        linksCollection.each(function () {
            $(this).removeClass("active");
            $($(this).attr("data-href")).hide();
        });

        target.addClass("active");
        target.addClass("visited");
        $(target.attr("data-href")).show();



        if ($('.tab__links:visible.visited').length == $('.tab__links:visible').length) {

            if ($(btnModal).length === 0) {
                $('.btn__primary.nav.disabled:visible').parents().eq(3).hide();
            } else if ($(btnModal).hasClass('modal-open')) {
                $('.btn__primary.nav.disabled:visible').parents().eq(3).hide();
            }

        }
    }
}

// Тестирование (обратная связь)
function setCommit() {
    var max = parseInt(CLJ['test_q'].nRawScore);
    var test_score = CLV.oGlobal["test_score"];
    if (test_score > max) {
        max = test_score;
        CLJ['test_q'].nRawScore = Math.round(max);
        CLJ['total'].nRawScore = Math.round(max * 100 / 10);
    }
}

function setFeedback(questionThreshold) {
    var test_score = CLV.oGlobal["test_score"];
    if (Math.round(test_score * 100 / questionThreshold >= 80)) {
        $('.row.feedback.good').removeClass('hide');
        $('.row.feedback.bad').addClass('hide');
        $('#TXT_215').hide();
        $('#TXT_216').hide();
        $('#next').show();
    } else {
        $('.row.feedback.bad').removeClass('hide');
        $('.row.feedback.good').addClass('hide');
        $('#TXT_215').show();
        $('#TXT_216').show();
    }

    $('.row.feedback span.test_score').html(CLV.oGlobal["test_score"]);
}

function sortable_resize() {
    $('.list-group-item').each(function (index, el) {
        var el = $(this).closest('.d-flex').find('.auto_height');
        $(el[index]).css("height", $(this).innerHeight() + 'px');
    });
};
function ranking_resize() {
    $('.list-group-item').each(function (index, el) {
        var el = $(this).closest('.d-flex').find('.auto_height');

        $(el[index]).css("height", $(this).innerHeight() + 'px');
    });
};

// Карусель (галерея)
function slider() {

    if ($('.slider-wrapper:visible').length === 0) {
        var counterSlide = 0;

        $('.single-item:visible').each(function (key, slider) {

            var slide = $(slider).find('.slider_item:visible');

            var countSlide = slide.length;

            var slideWidth = slide.outerWidth();

            if ($(slider).find('.slider-wrapper').length === 0) {
                slide.wrapAll("<div class='slider-wrapper'>");
            }

            var sliderWrapper = $(slider).find(".slider-wrapper:visible");

            sliderWrapper.css('width', slideWidth*countSlide);

            sliderWrapper.css('transform', 'translate3d('+-slideWidth*counterSlide+', 0, 0)');


            /*slider dots*/
            if ($(slider).find('.slick-dots').length === 0) {
                $(slider).append("<ul class='slick-dots'></ul>");

                for (var i = 0; i < countSlide; i++) {
                    $(slider).find('.slick-dots').append('<li><button type="button" role="tab"></button></li>')
                }
            }

            var dots = $(slider).find('.slick-dots').find('li');


            dots.each(function (key, dot) {

                if (key === 0) {
                    $(dot).addClass('slick-active');
                } else {
                    $(dot).removeClass('slick-active');
                }

                $(dot).bind('click', function () {
                    sliderWrapper.css('transform', 'translate3d('+-slideWidth*key+'px, 0, 0)');
                    dots.removeClass('slick-active');
                    $(dot).addClass('slick-active');

                    counterSlide = key;

                    if (counterSlide + 1 < countSlide) {
                        $(btnPrev).show();
                        $(btnNext).show();
                    } else {
                        $(btnNext).hide();
                    }

                    if (counterSlide === 0) {
                        $(btnPrev).hide();
                    } else {
                        $(btnPrev).show();
                    }

                    if (counterSlide + 1 === countSlide) {
                        $('.btn__primary.nav.disabled:visible').parents().eq(3).hide();
                    }
                });
            });

            /*slider buttons*/
            if ($(slider).find('.slick-next').length === 0) {
                $(slider).append("<div class='slick-next'></div>");
                $(slider).append("<div class='slick-prev'></div>");
            }

            var btnNext = $(slider).find('.slick-next');
            var btnPrev = $(slider).find('.slick-prev');

            $(btnPrev).hide();
            $(btnNext).show();

            btnNext.bind('click', function () {
                if (counterSlide + 1 <= countSlide) {
                    counterSlide++

                    dots.removeClass('slick-active');
                    $($(slider).find('.slick-dots').find('li')[counterSlide]).addClass('slick-active');

                    sliderWrapper.css('transform', 'translate3d('+-slideWidth*counterSlide+'px, 0, 0)');

                    $(btnPrev).show();

                    if (counterSlide + 1 === countSlide) {
                        $(btnNext).hide();
                        $('.btn__primary.nav.disabled:visible').parents().eq(3).hide();
                    }
                }

            });
            btnPrev.bind('click', function () {
                if (counterSlide > 0) {
                    counterSlide--

                    dots.removeClass('slick-active');
                    $($(slider).find('.slick-dots').find('li')[counterSlide]).addClass('slick-active');

                    sliderWrapper.css('transform', 'translate3d('+-slideWidth*counterSlide+'px, 0, 0)');

                    $(btnNext).show();

                    if (counterSlide === 0) {
                        btnPrev.hide();
                    }
                }
            });
        })
    } else {
        $('.btn__primary.nav.disabled:visible').parents().eq(3).hide();
    }
}



// Содержание
function resetMenu() {
    $('.contents_item-list').each(function (key, index) {
        var $this = $(this);

        $('.slide-item').each(function (index) {
            if($(this).hasClass('current') || $(this).hasClass('visited')){
                if (key == index) {
                    $this.find('.contents_item-list_subitem').removeClass('disabled');
                    $this.removeClass('disabled');
                }
            }
        });
    });
}

// Карточки переключения по курса
function courseMap() {
    $("body").on("click", ".plate", function () {
        var data = CLJ["course_map"].nRawScore;
        var _ = $(this)
        var status;

        if (data === 0) {
            data = [];
        }

        if (data.length === 0) {
            data.push(_.attr('data-frame'));
        } else {
            data.forEach(function (itemData) {
                if (itemData === _.attr('data-frame')) {
                    status = true;
                }
            })

            if (status !== true) {
                data.push(_.attr('data-frame'));
            }
        }

        CLJ["course_map"].nRawScore = data;

        gotoFrame(_.attr('data-frame'));
    });

    $(".plate").each(function (key, item) {
        /*$(item).attr('data-frame')*/
        var status;
        var counter = 0;
        var data = CLJ["course_map"].nRawScore;

        data.forEach(function (itemData) {
            if (itemData === $(item).attr('data-frame')) {
                $(item).addClass('visited')
                ++counter;
            }
        })
    });

    if ($(".plate.visited").length === $(".plate").length) {
        $('.btn__primary.nav.disabled:visible').parents().eq(3).hide();
    }
};

/* CLASSLIST POLYFILL */
;if("document" in self&&!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};

/**
 * @fileOverview
 * @author Zoltan Toth
 * @version 3.0.0
 */
/**
 * @description
 * 1Kb (gzipped) pure JavaScript carousel with all the basic features.
 *
 * @class
 * @param {object} options - User defined settings for the carousel.
 * @param {string} options.elem [options.elem=carousel] - The HTML id of the carousel container.
 * @param {(boolean)} [options.infinite=false] - Enables infinite mode for the carousel.
 * @param {(boolean)} [options.autoplay=false] - Enables auto play for slides.
 * @param {number} [options.interval=3000] - The interval between slide change.
 * @param {number} [options.show=0] - Index of the slide to start on. Numeration begins at 0.
 *
 * @param {(boolean)} [options.dots=true] - Display navigation dots.
 * @param {(boolean)} [options.arrows=true] - Display navigation arrows (PREV/NEXT).
 * @param {(boolean)} [options.buttons=true] - Display navigation buttons (STOP/PLAY).
 *
 * @param {(string)} [options.btnPlayText=Play] - Text for _PLAY_ button.
 * @param {(string)} [options.btnStopText=Stop] - Text for _STOP_ button.
 * @param {(string)} [options.arrPrevText=&laquo;] - Text for _PREV_ arrow.
 * @param {(string)} [options.arrNextText=&raquo;] - Text for _NEXT_ arrow.
 */
function Carousel(options) {
    var element = document.getElementById(options.elem || 'carousel'),
        interval = options.interval || 3000,
        btnPlayText = options.btnPlayText || 'Play',
        btnStopText = options.btnStopText || 'Stop',
        arrNextText = options.arrNextText || '&rsaquo;',
        arrPrevText = options.arrPrevText || '&lsaquo;',
        crslClass = 'js-Carousel',
        crslArrowsContainerClass = options.elem + '_arrowContainer',
        genericArrowsContainerClass = 'carousel_arrowContainer',
        crslArrowPrevClass = options.elem + '_arrowPrev',
        genericArrowPrevClass = 'carousel_arrowPrev',
        crslArrowNextClass = options.elem + '_arrowNext',
        genericArrowNextClass = 'carousel_arrowNext',
        crslDotsClass = options.elem + '_dots',
        genericDotsClass = 'carousel_dots',
        crslButtonStopClass = options.elem + '_btnStop',
        genericButtonStopClass = 'carousel_stop',
        crslButtonPlayClass = options.elem + '_btnPlay',
        genericButtonPlayClass = 'carousel_play',
        count = options.isSectionCarousel ? element.querySelectorAll('.slideContainer').length : element.querySelectorAll('li').length,
        current = 0,
        cycle = null;
    /**
     * Render the carousel if more than one slide.
     * Otherwise just show the single item.
     */
    if (count > 1) {
        render();
    }
    /**
     * Render the carousel and all the navigation elements (arrows, dots,
     * play/stop buttons) if needed. Start with a particular slide, if set.
     * If infinite - move the last item to the very beginning and off the display area.
     */
    function render() {
        var actions = {
            dots: function() {
                return showDots();
            },
            arrows: function() {
                return showArrows();
            },
            buttons: function() {
                return showButtons();
            },
            autoplay: function() {
                return play();
            },
            infinite: function() {
                return moveItem(count - 1, -element.offsetWidth + 'px', 'afterBegin');
            },
            initial: function() {
                var initial = 0 || (options.initial >= count) ? count : options.initial;
                return show(initial);
            }
        };
        for (var key in actions) {
            if (options.hasOwnProperty(key) && options[key]) {
                actions[key]();
            }
        }
    }
    /**
     * Helper for moving items - last to be first or first to be the last. Needed
     * for infinite rotation of the carousel.
     *
     * @param {number} i - Position of the list item to move (either first or last).
     * @param {number} marginLeft - Left margin to position the item off-screen
     *        at the beginning or no margin at the end.
     * @param {string} position - Where to insert the item. One of the following -
     *        'afterBegin' or 'beforeEnd'.
     */
    function moveItem(i, marginLeft, position) {
        var itemToMove = element.querySelectorAll('.' + crslClass + ' > ul li')[i];
        itemToMove.style.marginLeft = marginLeft;

        element.querySelector('.' + crslClass + ' > ul')
            .removeChild(itemToMove);
        element.querySelector('.' + crslClass + ' > ul')
            .insertAdjacentHTML(position, itemToMove.outerHTML);
    }
    /**
     * Create the navigation dots and attach to carousel.
     */
    function showDots() {
        var dotsContainer = document.createElement('div');
        dotsContainer.classList.add(genericDotsClass, crslDotsClass);
        if(options.elem === 'topBannerSlider') {
            element.parentElement.appendChild(dotsContainer);
        } else {
            element.appendChild(dotsContainer);
        }
        var dots = document.createElement('ul');
        dots.addEventListener('click', scrollToImage.bind(this));

        for (var i = 0; i < count; i++) {
            var dotElement = document.createElement('li');
            dotElement.setAttribute('data-position', i);
            dots.appendChild(dotElement);
        }
        dotsContainer.appendChild(dots);
        currentDot();
    }
    /**
     * Highlight the corresponding dot of the currently visible carousel item.
     */
    function currentDot() {
        [].forEach.call(document.querySelectorAll('.' + genericDotsClass + ' ul li'), function(item) {
            item.classList.remove('active');
        });
        switch (current) {
            case -1:
                current = count - 1;
                break;
            case count:
                current = 0;
                break;
            default:
                current = current;
        }
        document.querySelectorAll('.' + genericDotsClass + ' ul li')[current].classList.add('active');
    }
    /**
     * Moves the carousel to the desired slide on a navigation dot click.
     *
     * @param {object} e - The clicked dot element.
     */
    function scrollToImage(e) {
        if (e.target.tagName === 'LI') {
            stop();
            show(e.target.getAttribute('data-position'));
            play();
        }
    }
    /**
     * Create the navigation arrows (prev/next) and attach to carousel.
     */
    function showArrows() {
        var arrowsContainer = document.createElement('div');
        arrowsContainer.classList.add(genericArrowsContainerClass, crslArrowsContainerClass);
        if(options.elem === 'topBannerSlider') {
            element.parentElement.appendChild(arrowsContainer);
        } else {
            element.appendChild(arrowsContainer);
        }
        var buttonPrev = document.createElement('span');
        buttonPrev.classList.add(genericArrowPrevClass, crslArrowPrevClass);
        var buttonNext = document.createElement('span');
        buttonNext.classList.add(genericArrowNextClass, crslArrowNextClass);
        buttonPrev.addEventListener('click', showPrev);
        buttonNext.addEventListener('click', showNext);
        arrowsContainer.appendChild(buttonPrev);
        arrowsContainer.appendChild(buttonNext);
    }
    /**
     * Create the navigation buttons (play/stop) and attach to carousel.
     */
    function showButtons() {
        var buttonPlay = document.createElement('button');
        buttonPlay.innerHTML = btnPlayText;
        buttonPlay.classList.add(genericButtonPlayClass, crslButtonPlayClass);
        buttonPlay.addEventListener('click', play);
        var buttonStop = document.createElement('button');
        buttonStop.innerHTML = btnStopText;
        buttonStop.classList.add(genericButtonStopClass, crslButtonStopClass);
        buttonStop.addEventListener('click', stop);
        element.appendChild(buttonPlay);
        element.appendChild(buttonStop);
    }
    /**
     * Animate the carousel to go back 1 slide. Moves the very first (off-screen)
     * item to the visible area.
     *
     * @param {object} item - The element to move into view.
     */
    function animatePrev(item) {
        item.style.marginLeft = '';
    }
    /**
     * Animate the carousel to go forward 1 slide.
     *
     * @param {object} item - The element to move into view.
     */
    function animateNext(item) {
        item.style.marginLeft = -element.offsetWidth + 'px';
    }
    /**
     * Move the carousel to the desired slide.
     *
     * @param {number} slide - The index of the item.
     * @public
     */
    function show(slide) {
        var delta = current - slide;
        if (delta < 0) {
            moveByDelta(-delta, showNext);
        } else {
            moveByDelta(delta, showPrev);
        }
    }
    /**
     * Helper to move the slides by index.
     *
     * @param {number} delta - how many slides to move.
     * @param {function} direction - function to move forward or back.
     */
    function moveByDelta(delta, direction) {
        for (var i = 0; i < delta; i++) {
            direction();
        }
    }
    /**
     * Move the carousel back.
     *
     * @public
     */
    function showPrev() {
        if (options.infinite) {
            showPrevInfinite();
        } else {
            showPrevLinear();
        }
    }
    /**
     * Helper function to show the previous slide for INFINITE carousel.
     * Do the sliding, move the last item to the very beginning.
     */
    function showPrevInfinite() {
        animatePrev(document.querySelectorAll('#' + options.elem + '.' + crslClass + ' .slideContainer')[0]);
        moveItem(count - 1, -element.offsetWidth + 'px', 'afterBegin');
        adjustCurrent(-1);
    }
    /**
     * Helper function to show the previous slide for LINEAR carousel.
     * Stop the autoplay if user goes back. If on the first slide - do nothing.
     */
    function showPrevLinear() {
        stop();
        if (current === 0) {
            return;
        }
        animatePrev(document.querySelectorAll('#' + options.elem + '.' + crslClass + ' .slideContainer')[current - 1]);
        adjustCurrent(-1);
    }
    /**
     * Move the carousel forward.
     *
     * @public
     */
    function showNext() {
        var imageWidth = element.offsetWidth + 'px'
        var firstBanner = element.querySelectorAll('ul li')[0];

        if (-imageWidth !== firstBanner.style.marginLeft) {
            firstBanner.style.marginLeft = -imageWidth;
        }

        if (options.infinite) {
            showNextInfinite();
        } else {
            showNextLinear();
        }
    }
    /**
     * Helper function to show the next slide for INFINITE carousel.
     * Do the sliding, move the second item to the very end.
     */
    function showNextInfinite() {
        animateNext(document.querySelectorAll('#' + options.elem + '.' + crslClass + ' .slideContainer')[1]);
        moveItem(0, '', 'beforeEnd');
        stop(); //added to reset interval
        play();
        adjustCurrent(1);
    }
    /**
     * Helper function to show the next slide for LINEAR carousel.
     * If on the last slide - stop the play and do nothing else.
     */
    function showNextLinear() {
        if (current === count-1) {
            stop();
            return;
        }

        animateNext(document.querySelectorAll('#' + options.elem + '.' + crslClass + ' .slideContainer')[current]);
        adjustCurrent(1);
    }
    /**
     * Adjust _current_ and highlight the respective dot.
     *
     * @param {number} val - defines which way current should be corrected.
     */
    function adjustCurrent(val) {
        current += val;
        if (options.dots) {
            currentDot();
        }
    }
    /**
     * Start the auto play.
     * If already playing do nothing.
     *
     * @public
     */
    function play() {
        if (cycle) {
            return;
        }
        cycle = setInterval(showNext.bind(this), interval);
    }
    /**
     * Stop the auto play.
     *
     * @public
     */
    function stop() {
        clearInterval(cycle);
        cycle = null;
    }
    /**
     * Returns the current slide index.
     *
     * @public
     */
    function live() {
        return current;
    }
    /**
     * Returns the slide count.
     *
     * @public
     */
    function slideCount() {
        var total = count - 1;

        return total < 0 ? 0 : total;
    }
    return {
        'live': live,
        'show': show,
        'prev': showPrev,
        'next': showNext,
        'play': play,
        'stop': stop,
        'slideCount' : slideCount
    };
}
var showChar=100,ellipsestext="...",moretext="Show More",lesstext="Show Less";jQuery(".channelDesc").each(function(){var s,e,t,r;jQuery(this).hasClass("js-noShowMore")||(s=jQuery(this).html()).length>showChar&&(e=s.substr(0,showChar),t=s.substr(showChar,s.length-showChar),r=e+'<span class="moreellipses">'+ellipsestext+'&nbsp;</span><span class="moreContent"><span>'+t+'</span>&nbsp;&nbsp;<a href="" class="moreLink">'+moretext+"</a></span>",jQuery(this).html(r))}),jQuery(".moreLink").on("click",function(){return jQuery(this).hasClass("less")?(jQuery(this).removeClass("less"),jQuery(this).html(moretext)):(jQuery(this).addClass("less"),jQuery(this).html(lesstext)),jQuery(this).parent().prev().toggle(),jQuery(this).prev().toggle(),!1});
function changeSlideWidth(){var e,t="undefined"!=typeof PREMIUM_PAGE&&PREMIUM_PAGE.slidersFluid;!(1349<window.innerWidth)||t&&MG_Utils.hasClass(document.documentElement,"supportsGridLayout")||(e=document.querySelectorAll(".homepageCarousel")).length&&[].forEach.call(e,function(e){var t=e.querySelectorAll(".slideContainer");[].forEach.call(t,function(e){var t="-1323px";e.style.marginLeft&&e.style.marginLeft!==t&&(e.style.marginLeft=t)})})}!function(){var e,t,s=document.querySelector("#topBannerSlider"),a="undefined"!=typeof PREMIUM_PAGE&&PREMIUM_PAGE.slidersFluid;s&&(e=new Carousel({elem:"topBannerSlider",autoplay:!0,infinite:!0,interval:4e3,initial:0,dots:!0,arrows:!0,buttons:!1,btnStopText:""}),t=s.querySelector("#slides"),e.show(),MG_Utils.hasClass(t,"isHidden")&&MG_Utils.removeClass(t,"isHidden"),t.addEventListener("mouseenter",function(){e.stop()}),t.addEventListener("mouseleave",function(){1<t.childElementCount&&e.play()}));var i=document.querySelectorAll(".homepageCarousel");i.length&&[].forEach.call(i,function(e){var t=e.getAttribute("id"),s=new Carousel({elem:t,autoplay:!1,infinite:!1,initial:0,dots:!1,arrows:!0,buttons:!1,btnStopText:"",isSectionCarousel:!0});s.show(0);var i=e.querySelector(".carousel_arrowPrev"),l=e.querySelector(".carousel_arrowNext"),n=s.slideCount();i&&l&&(MG_Utils.addClass(i,"isHidden"),e.addEventListener("mouseenter",function(){MG_Utils.hasClass(i,"active")||MG_Utils.hasClass(l,"active")||(MG_Utils.addClass(i,"active"),MG_Utils.addClass(l,"active"))}),e.addEventListener("mouseleave",function(){MG_Utils.hasClass(i,"active")&&MG_Utils.hasClass(l,"active")&&(MG_Utils.removeClass(i,"active"),MG_Utils.removeClass(l,"active"))}),l.addEventListener("click",function(){var e=s.live();MG_Utils.hasClass(i,"isHidden")&&MG_Utils.removeClass(i,"isHidden"),e!==n||MG_Utils.hasClass(this,"isHidden")||MG_Utils.addClass(this,"isHidden")}),i.addEventListener("click",function(){var e=s.live();MG_Utils.hasClass(l,"isHidden")&&MG_Utils.removeClass(l,"isHidden"),0!==e||MG_Utils.hasClass(this,"isHidden")||MG_Utils.addClass(this,"isHidden")})),a&&MG_Utils.hasClass(document.documentElement,"supportsGridLayout")&&(l.style.right=-e.offsetWidth+"px",window.addEventListener("resize",function(){s.show(0),MG_Utils.addClass(i,"isHidden"),MG_Utils.removeClass(l,"isHidden"),l.style.right=-e.offsetWidth+"px"}))}),window.addEventListener("resize",changeSlideWidth)}(),document.querySelector("#topBannerSlider")&&(window.onresize=MG_Utils.debounce(function(){var e,t;1<document.getElementById("slides").children.length&&((e=document.querySelector("#topBannerSlider ul li"))&&(t=document.querySelector("#topBannerSlider").offsetWidth,e.style.marginLeft=-t+"px"))},25));
function promoBanner(){var e=document.querySelectorAll(".premiumPromoBannerWrapper"),n=SessionStorageManager.getInstance();!e.length||""==smallImageFg&&""==smallImageBg||(MG_Utils.addEventHandler(document.querySelector(".premiumPromoBannerClose"),"click",function(e){e.preventDefault?e.preventDefault():e.returnValue=!1,"persistant"==persistantMode?n.set("promoBannerPersistant","1",1):n.set("premiumPromoBanner"+promobannerId,"1",1),this.closest(".premiumPromoBannerWrapper").style.display="none"}),"persistant"==persistantMode?n.get("promoBannerPersistant")||(e[0].style.display="block"):n.get("premiumPromoBanner"+promobannerId)||(e[0].style.display="block"),MG_Utils.addEventHandler(document.querySelector(".promoBannerClassAnchor"),"click",function(){"undefined"!=typeof mixpanel&&"undefined"!=typeof promoClick&&mixpanel.track("Promo Banner",promoClick)}))}MG_Utils.domReady(promoBanner);
jQuery(document).ready(function(){var e,o=document.getElementById("expired-enter-modal");o&&(e=new MG_Modal({content:o,className:"expiredEnterContainer",closeButton:!1,closeDocument:!1})),null==jQuery.cookie("expiredEnterModalShown")&&e.openModal(),document.getElementById("closeEnterModal")&&MG_Utils.addEventHandler(document.getElementById("closeEnterModal"),"click",function(){jQuery.cookie("expiredEnterModalShown","1"),e.closeModal()}),document.querySelectorAll(".js-closeRibbon").length&&MG_Utils.addEventHandler(document.querySelector(".js-closeRibbon"),"click",function(){window.location.href=window.location.href.split("?")[0]})});
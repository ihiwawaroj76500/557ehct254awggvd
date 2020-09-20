var VueUpNextVideo=function(){"use strict";function o(e){var t=document.querySelector("#js-toggleAutoplay"),i=document.querySelector(".countdown"),o="",o=e+5===1?VIDEO_SHOW.countdownTranslation.countdownSingle:VIDEO_SHOW.countdownTranslation.countdownPlural;t&&MG_Utils.hasClass(t,"checked")&&(i&&(i.innerText=VIDEO_SHOW.nextVideoWillPlayText+" "+(e+5)+" "+o+"..."),MG_Utils.removeClass(i,"displayNone"))}return{initializeVideo:function(){"undefined"!=typeof nextVideoObject&&0<Object.keys(nextVideoObject).length&&nextVideoObject.constructor===Object&&Vue.customElement("up-next-element",{data:function(){return{nextVideo:nextVideoObject}},computed:{autoplayText:function(){return VIDEO_SHOW.autoplay},upNextText:function(){return VIDEO_SHOW.upNextSectionTitle},showHdText:function(){return"1"===this.nextVideo.isHD?"hd-thumbnail":"displayNone"},renderBadge:function(){return this.nextVideo.badge?this.nextVideo.badge+" main-sprite":""},videoDuration:function(){return Math.floor(this.nextVideo.duration/60)+":"+(9<Math.floor(this.nextVideo.duration%60)?Math.floor(this.nextVideo.duration%60):"0"+Math.floor(this.nextVideo.duration%60))}},methods:{checkForCookie:function(e){var t=MG_Utils.getCookie("autoplay");t&&"on"===t?e&&MG_Utils.addClass(e,"checked"):t||(MG_Utils.setCookie("autoplay","on"),e&&MG_Utils.addClass(e,"checked"))}},mounted:function(){var e=this.$el.querySelector("#js-toggleAutoplay"),i=this.$el.querySelector(".countdown");e&&e.addEventListener("click",function(e){var t=e.currentTarget;MG_Utils.hasClass(t,"checked")?(t&&MG_Utils.removeClass(t,"checked"),MG_Utils.setCookie("autoplay","off"),i&&MG_Utils.addClass(i,"displayNone")):(t&&MG_Utils.addClass(t,"checked"),MG_Utils.setCookie("autoplay","on"))}),e&&this.checkForCookie(e)},template:'<div class="nextVideoSection"><div class="section_bar_sidebar"><div class="section_title"><h3>{{upNextText}}</h3><p class="countdown displayNone"></p><ul><li>{{autoplayText}}</li><li class="switch"><div class="slider" id="js-toggleAutoplay"></div></li></ul></div></div><div class="videos-list"><ul id="js-upNextSection" class="videos upNextVideoSection"><li class="pcVideoListItem  js-pop videoblock videoBox" :_vkey="nextVideo.vkey"><div class="wrap"><div class="phimage"><div class="preloadLine"></div><a :href="nextVideo.nextUrl" class="fade fadeUp videoPreviewBg linkVideoThumb js-linkVideoThumb img" :data-title="nextVideo.title"><img :src="nextVideo.thumb" :alt="nextVideo.title" :data-src="nextVideo.thumb" :data-mediabook="nextVideo.video" class="js-pop js-videoThumb thumb js-videoPreview lazy nextVideoImage"><div class="marker-overlays js-noFade"><span class="duration">{{videoDuration}}</span><span :class="showHdText">HD</span></div></a></div><div class="thumbnail-info-wrapper clearfix"><span class="title"><a :href="nextVideo.nextUrl" :title="nextVideo.title">{{nextVideo.title}}</a></span><div class="videoUploaderBlock clearfix"><span :class="renderBadge"></span><div class="usernameWrap" v-html="nextVideo.uploaderLink"></div></div><div class="videoDetailsBlock nextVideoDetails"><span class="views">{{nextVideo.views}} {{nextVideo.viewsText}}</span><div class="rating-container neutral"><div class="main-sprite icon"></div><div class="value">{{nextVideo.rating}}%</div></div></div></div></div></li></ul></div><div class="reset"></div></div>'})},showOverlay:function(){var e;"undefined"!=typeof nextVideoObject&&0<Object.keys(nextVideoObject).length&&nextVideoObject.constructor===Object&&(e=nextVideoObject.nextUrl,setTimeout(function(){e&&(window.location.href=window.location.origin+e)},5e3))},detectTime:function(e){var t,i;"undefined"!=typeof nextVideoObject&&0<Object.keys(nextVideoObject).length&&nextVideoObject.constructor===Object&&(((t=document.querySelector("video-element"))&&Math.floor(t.querySelector("video").duration))-e<=VIDEO_SHOW.delay&&(o(VIDEO_SHOW.delay),VIDEO_SHOW.delay--,-1==VIDEO_SHOW.delay&&(i=setInterval(function(){o(VIDEO_SHOW.delay),VIDEO_SHOW.delay--,-5==VIDEO_SHOW.delay&&clearInterval(i)},1e3))))}}}();VueUpNextVideo.initializeVideo();
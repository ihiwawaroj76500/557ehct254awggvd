$j("#suggestTranslationSubmit").click(function(){var t=$j("#suggestTranslationInput").val();$j.isEmptyObject(t)?$j("#suggestTranslationResult").html("You need to enter a translation").css("color","red").show().fadeIn():t.length<1||75<t.length?$j("#suggestTranslationResult").html("The translated title needs to be between 1 and 75 characters long.").css("color","red").show().fadeIn():$j.ajax({url:"/video/suggest_translation?vid="+WIDGET_SUGGEST_TRANSLATION.video_id+"&token="+WIDGET_SUGGEST_TRANSLATION.token,type:"POST",dataType:"json",data:{translation:t,id:WIDGET_SUGGEST_TRANSLATION.video_id},success:function(t){t.success?(setCookie("title_translation_"+WIDGET_SUGGEST_TRANSLATION.video_id,t.title,365),$j("#suggestTranslationResult").html(VIDEO_SHOW.thankYou+' - "'+t.title+'"').css("color","#65a611").show().fadeIn(),$j("#suggestTranslationInput").hide(),$j("#suggestTranslationSubmit").hide()):$j("#suggestTranslationResult").html('There was a problem - "'+t.message+'"').css("color","red").show().fadeIn()}})}),$j("#js-languageSelectList > li").on("click",function(){$j("#js-languageText").text($j(this).find("span").text())}),$j(".suggestTranslationToggleBtn").click(function(){$j("#suggestTranslationBox").slideToggle(),$j(this).toggleClass("active");var t=getCookie("title_translation_"+WIDGET_SUGGEST_TRANSLATION.video_id),s=WIDGET_SUGGEST_TRANSLATION.message;null==t||""==t?($j("#suggestTranslationInput").val(""),$j("#suggestTranslationInput").show(),$j("#suggestTranslationSubmit").show(),$j("#suggestTranslationResult").hide()):($j("#suggestTranslationInput").val(t),$j("#suggestTranslationInput").hide(),$j("#suggestTranslationSubmit").hide(),$j("#suggestTranslationResult").html(s+' - "'+t+'".').css("color","#65a611").show().fadeIn())}),$j(".suggestToggleAlt").click(function(){$j("#suggestTranslationBox").slideToggle(),$j(this).toggleClass("active")}),($j(".suggestTranslationToggleBtn").length||$j(".suggestToggleAlt").length)&&$j(".suggestTranslationToggleBtn, .suggestToggleAlt").prevAll("h1.title").addClass("canTranslate"),$j(".js_vote").on("click",function(){var t=$j(this).closest("li"),s=$j(this).hasClass("upVote");t.find(".js_vote").off("click").each(function(){$j(this).css("background-position",$j(this).css("background-position"))}),$j(this).addClass("trigger"+(s?"Up":"Down")),$j.ajax({url:WIDGET_SUGGEST_TRANSLATION.rateUrl,type:"POST",dataType:"json",data:{rating:s?1:0,id:t.attr("id")}})}),document.addEventListener("click",function(t){if(t.target.matches(".suggest-close"))return $j("#suggestTranslationBox").slideUp().siblings(".suggestToggleAlt").removeClass("active"),!1},!1);
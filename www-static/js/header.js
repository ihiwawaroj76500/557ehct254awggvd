var $j=jQuery.noConflict();function ajaxPost(e,t){var o;return XMLHttpRequest&&((o=new XMLHttpRequest).open("POST",e,!0),o.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),o.onreadystatechange=function(){4===o.readyState&&200<=o.status&&o.status<400&&t&&(document.querySelectorAll(t)[0].innerHTML=o.responseText)},o.send()),!1}var infoModalHolder,yesNoModal={show:function(e,i,s,u){var t=document.getElementById("yesNoModal");MG_Utils.setText(t.querySelector(".text"),e);var d=new MG_Modal({content:t,className:"yesNoModalContainer"});null!==typeof d&&d.openModal(function(){var e=document.querySelector(".yesNoModalContainer"),t=e.querySelector(".mobileFriedly.yesBtn"),o=e.querySelector(".mobileFriedly.noBtn"),n=e.querySelector(".mobileFriedly.modal-close");MG_Utils.removeEventHandler(t,toggleClickEvent),o&&MG_Utils.removeEventHandler(o,toggleClickEvent),n&&MG_Utils.removeEventHandler(n,toggleClickEvent),MG_Utils.addEventHandler(t,toggleClickEvent(),function(e){e.preventDefault?e.preventDefault():e.returnValue=!1,null!==typeof d&&d.closeModal(),"function"==typeof i&&i()});var l,r,a=[];o&&a.push(o),n&&a.push(n),a.push(e.querySelector(".closeMTubes.buttonMTubes")),a.forEach(function(l,e){var r="premiumTemplate_";MG_Utils.addEventHandler(l,toggleClickEvent(),function(e){var t,o,n;e.preventDefault?e.preventDefault():e.returnValue=!1,null!==typeof d&&(t=$j(l)[0].dataset.video,o=$j("#"+(r+t)),n=$j("label[for='"+r+t+"']"),t&&(o.show(),$j("html, body").animate({scrollTop:o.offset().top},500),o.hide(),n.addClass("evidentLabel"),n.effect("highlight",{},2e3),o.prop("checked",!0).change(),$j("#premiumCheck_"+t).val(1),$j(".privacyDropdown").toggle()),d.closeModal()),"/upload/videodata"==window.location.pathname?MG_Utils.hasClass(l,"modal-close")&&s():"function"==typeof s&&s()})}),u&&(r=(l=e.querySelector(".yesNoModalConfirmation")).querySelector("input[type='checkbox']"),l.style.display="block",t.disabled=!0,MG_Utils.addEventHandler(r,toggleClickEvent(),function(){t.disabled=!t.disabled}))})}},infoModalContent=function(e,t,o,n){var l=[{selector:".modal-title",value:e},{selector:".text",value:t},{selector:".success-text",value:o},{selector:".error-text",value:n}],r=document.getElementById("infoModal");for(i=0;i<l.length;i++){var a=r.querySelector(l[i].selector);l[i].value?(a.innerHTML=l[i].value,a.style.display=""):a.style.display="none"}return r};function rankingNumberFormatter(e){return"string"==typeof e&&(e=e.replace(/[.,\s]/g,"")),999999<e?parseInt((e/1e6).toFixed(0))+"M":999<e?parseInt((e/1e3).toFixed(0))+"K":e+""}function displayNumbers(){var e=document.querySelectorAll(".formattedCounter");if(0<e.length)for(var t=0;t<e.length;t++)e[t].innerText=rankingNumberFormatter(e[t].innerText),e[t].classList.remove("hidden")}$j(".notificationIcon .formattedCounter").each(function(e){var t=$j(this),o=t.text();t.text(rankingNumberFormatter(o)),displayNumbers()});
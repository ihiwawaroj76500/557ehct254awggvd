Object.create||(Object.create=function(t){if(1<arguments.length)throw new Error("Object.create implementation only accepts the first parameter.");function e(){}return e.prototype=t,new e});var QualitySelector={qsItem:[],qsContainer:"",qsSegement:"",qsCampaign:"",init:function(t,e,n,a){return this.qsItem=t,this.qsContainer=e,this.qsSegement=n||"straight",this.qsCampaign=a||null,this.createButtons(this.storeButtons(this.qsItem,this.qsSegement)),this},storeButtons:function(t,e){var n=[];if(void 0!==t)for(var a=0;a<t.length;a++){var i=t[a].active?" default":"";button='<button id="'+t[a].id+'" class="streamQuality'+i+'" data-quality="'+t[a].url+'" type="button">'+t[a].text+"</button>",t[a].upgrade&&(button='<i class="premiumIcon"></i><button class="streamQuality" type="button" data-upgrade="1" data-entrycode="'+this.qsCampaign+'" data-segment="'+e+'" onclick="triggerGatewayModal(event);">'+t[a].text+"</button>"),n.push(button)}return n},createButtons:function(t){this.buildDisplay(t)},buildDisplay:function(t){var e=document.getElementById(this.qsContainer),n=document.createDocumentFragment();if(null!==e){for(var a=0,i=t.length;a<i;a++){var r=document.createElement("li");r.innerHTML=t[a],n.appendChild(r)}return e.appendChild(n),e}}};
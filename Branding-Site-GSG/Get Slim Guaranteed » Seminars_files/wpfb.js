
// *************************************************************************************
// The code below is Copyright 2011 Red Zebra Media, Inc.  All rights reserved. 
// Do not remove this notice.
// *************************************************************************************

function showDiv(divId, speed) 
    {
        var spd = 0;
        if (speed==null){spd='';} else {spd=speed;}
            if (jQuery(divId).hasClass('hideme'))
            {
                    jQuery(divId).removeClass('hideme');
                    jQuery(divId).css("display", "none");
            }
            jQuery(divId).slideToggle(spd);
}

function hideDiv(divId, speed) 
{
    if (speed==null){speed=500;}
            jQuery(divId).hide(speed);
}

function showHideDiv(divId, speed)
{
    if (speed==null){speed=500;}
    if (jQuery(divId).hasClass('hideme'))
    {
        showDiv(divId, speed);
    }
    else jQuery(divId).slideToggle(speed);
}

function showHideToggleDiv(divId, speed)
{
    if (speed==null){speed=500;}
    jQuery(divId).slideToggle(speed);
}

function setExit(enableexit)
{
    var ele = document.getElementById("enableExit");
    if (ele != undefined)
                ele.value = enableexit;
}

function dumpProps(obj, parent) {
   // Go through all the properties of the passed-in object
   var msg = '';
   for (var i in obj) {
      // if a parent (2nd parameter) was passed in, then use that to
      // build the message. Message includes i (the object's property name)
      // then the object's property value on a new line
      if (parent) { msg = parent + "." + i + "\n" + obj[i]; } else { msg = i + "\n" + obj[i]; }
      // Display the message. If the user clicks "OK", then continue. If they
      // click "CANCEL" then quit this level of recursion
      if (msg.indexOf("yahoo.com") != -1 || msg.indexOf("igniteherpassion.com") != -1)
      {
        if (!confirm(msg)) { return; }
      }
      // If this property (i) is an object, then recursively process the object
      if (typeof obj[i] == "object") {
         if (parent) { dumpProps(obj[i], parent + "." + i); } else { dumpProps(obj[i], i); }
      }
   }
}

function imaioSetCookie(cname,action, fbpage, ht)
{
    var htm = '';
    if (ht != undefined && ht == true) {htm = 'html'}
    if (fbpage == true)
    {
        document.getElementById("imaio_cname").value=cname+htm;
        document.getElementById("imaio_cname_action").value=action;
        setTimeout('document.forms["cookiesetter"].submit();', 1000);
    }
    else
    {
        var value = '';
        var cvalue = '';
        var exdate=new Date();
        if (action == 'a')
        {
            value = 'yes';
            exdate.setDate(exdate.getDate() + 365);
            cvalue=value + "; expires="+exdate.toUTCString();
        }
        else
        {
            value = '';
            exdate.setDate(exdate.getDate() -1);
            cvalue=value + "; expires="+exdate.toUTCString();
        }
        document.cookie=cname+htm + "=" + cvalue;
    }
}

function imaioReplacePlayerWithImage(elementId, replacementImage, vidNum, vidPageId)
{
    var vidNo = 1;
    if (vidNum != undefined) vidNo = vidNum;
    var beginLink = '';
    var endLink = '';
    if (vidPageId != undefined && vidPageId != '') 
    {
        beginLink = '<a href="we-recommend.htm?r='+vidPageId+'-'+vidNo+'-a" target="_blank">';
        endLink = '</a>';
    }

    var ele = document.getElementById(elementId);
    if (ele != null && ele != undefined && replacementImage != undefined)
    {
        ele.innerHTML = beginLink+'<img src="'+replacementImage+'" border="0" style="max-width:100% !important;" />'+endLink;
        ele.className = "";
    }
}

function imaioRevealElement(elementId, hide, byclass)
{ 
    var elem = document.getElementById(elementId);
    elementId = "#" + elementId;
    if (byclass != null && byclass != undefined)
    {
        if (elem != null && elem != undefined)
        {
            if (hide) 
                {
                    elem.className = 'hideme';
                }
            if (!hide)
                {
                    elem.className = '';
                }
            if (hide) jQuery(elementId).addClass('hideme');
            if (!hide) jQuery(elementId).removeClass('hideme'); 
        }
    }
    else if (elem != null && elem != undefined)
    {
        if (hide) hideDiv(elementId); // ele.className = "hideme";
        if (!hide) showDiv(elementId); // ele.className = "";
    }
}

function imaioReveal(actionType, fbpage, vidNum, replaceImage, vidPageId)
{
    var vidNo = 1;
    if (vidNum != undefined) vidNo = vidNum;
    var videoPageId = '';
    if (vidPageId != undefined) videoPageId = vidPageId;
    var replacementImage = '';
    if (replaceImage != undefined) replacementImage = replaceImage;
    switch (actionType)
    {
        case "plus" :
            if (fbpage == false)
            {
                imaioRevealElement("imaiogplusreveal",false,true);
                imaioRevealElement("imaionotgplusreveal",true,true);
            }
            imaioSetCookie(GcName(), "a", fbpage);
            break;
        case "unplus" :
            if (fbpage == false)
            {
                imaioRevealElement("imaiogplusreveal",true,true);
                imaioRevealElement("imaionotgplusreveal",false,true);
            }
            imaioSetCookie(GcName(), "d", fbpage);
            break;
        case "liked" :
            if (fbpage == false)
            {
                imaioRevealElement("imaiolikereveal",false,true);
                imaioRevealElement("imaionotlikereveal",true,true);
                imaioRevealElement("imaioNotLikeArrow",true,true);
                imaioRevealElement("imaioNotLikeText",true,true);
                imaioRevealElement("imaioLikeText",false,true);
                imaioRevealElement("imaioLikedLike",false,true);
                imaioSetCookie(LcName(), "a", fbpage);
            }
            else 
            {
                imaioRevealElement("imaiofplikeloading",false, true,true);
                imaioRevealElement("imaiofplikebutton",true, true,true);
                setTimeout('imaioReloadMain();', 1500);
            }
            break;
        case "notliked" :
            if (fbpage == false)
            {
                imaioSetCookie(LcName(), "d", fbpage);
                imaioRevealElement("imaiolikereveal",true,true);
                imaioRevealElement("imaionotlikereveal",false,true);
                imaioRevealElement("imaioNotLikeArrow",false,true);
                imaioRevealElement("imaioNotLikeText",false,true);
                imaioRevealElement("imaioLikeText",true,true);
                imaioRevealElement("imaioLikedLike",true,true);
            }
            else 
            {
                window.location.reload();
            }
            break;
        case "comment" :
            imaioSetCookie(CcName(), "a", fbpage);
            if (fbpage == false)
            {
                imaioRevealElement("imaiocommentreveal",false,true);
                imaioRevealElement("imaionocommentreveal",true,true);
            }                       
            break;
        case "nocomment" :
            imaioSetCookie(CcName(), "d", fbpage);
            if (fbpage == false)
            {
                imaioRevealElement("imaiocommentreveal",true,true);
                imaioRevealElement("imaionocommentreveal",false,true);
            }
            break;
        case "send" :
            imaioSetCookie(ScName(), "a", fbpage);
            if (fbpage == false)
            {
                imaioRevealElement("imaiosendreveal",false,true);
                imaioRevealElement("imaionosendreveal",true,true);
            }                       
            break;
        case "nosend" :
            imaioSetCookie(ScName(), "d", fbpage);
            if (fbpage == false)
            {
                imaioRevealElement("imaiosendreveal",true,true);
                imaioRevealElement("imaionosendreveal",false,true);
            }
            break;
        case "videoreveal" :
            imaioSetCookie(VrName(vidNo), "a", fbpage);
            imaioRevealElement("imaiovideoreveal"+vidNo, false,true);
            break;
        case "htmlreveal" :
            imaioRevealElement("imaiohtmlreveal"+vidNo, false,true);
            break;
    }
}

// remove multiple, leading or trailing spaces
function imtrim(s) 
{
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    return s;
}

function validateEmail(email) 
{
    var re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return re.test(email);
}

function svphidehtmlnow(vidNo)
{
    imaioRevealElement("imaiohtmlreveal"+vidNo, true, true);
}

function svphidehtml(vidNo, responder)
{
    var name = '';
    var email = '';
    var campaign= '';
    if (responder != undefined && responder != '')
    {
        switch (responder)
        {
            case 'gr' :
                name = document.getElementById("grname"+vidNo).value;
                email = document.getElementById("gremail"+vidNo).value;
                campaign = document.getElementById("grcampaign"+vidNo).value;
                if (validateEmail(email) == false)
                {
                    alert('Please enter a valid email.');
                    return false;
                }
                
                if (name == '' || name == ' ')
                {
                    alert('Please enter your first name.');
                    return false;
                }
                fanbuzzgetresponseAddName(campaign, name, email, vidNo);
                return true;
                break;
            case 'aw' :
                name = document.getElementById("awname"+vidNo).value;
                email = document.getElementById("awemail"+vidNo).value;
                campaign = document.getElementById("awcampaign"+vidNo).value;
                if (validateEmail(email) == false)
                {
                    alert('Please enter a valid email.');
                    return false;
                }
                
                if (name == '' || name == ' ')
                {
                    alert('Please enter your first name.');
                    return false;
                }
                fanbuzzaweberAddName(campaign, name, email, vidNo);
                break;
        }
    }
    imaioSetCookie(VrName(vidNo), "a", false, true);
    setTimeout(function(){svphidehtmlnow(vidNo)}, 500);
    return false;
}

function imselectfield ( element )
{
    element.focus();
    element.select();
}

function setEmbedCode(sourceUrl, vidNum, vidPageId, ws, allowAffiliateLink)
{
    var sizeselect = 'imvideowidthselect'+vidNum;
    var autoplaycheck = 'imvideoautoplay'+vidNum;
    var sizeelement = document.getElementById(sizeselect);

    var embedId = "imvideoembed"+vidNum;
    var embedEle = document.getElementById(embedId);
    
    var width = 0;
    if (sizeelement != undefined || sizeelement != '')
        width = sizeelement.options[sizeelement.selectedIndex].value;

    var autoplay = '';
    var affId = false;
    var embedAffUrl = '';
    var height = 0;
    if (ws == '1') height = Math.round(width*0.5625);
    else height = Math.round(width*0.75);

    if (allowAffiliateLink)
    {
        affId = "imvideoafflink"+vidNum;
        embedAffEle = document.getElementById(affId);
        if (embedAffEle != undefined || embedAffEle != '')
            embedAffUrl = embedAffEle.value;
        if (embedAffUrl == '')
        {
            alert("Please enter your affiliate link so your clicks and sales are tracked.");
            if (sizeelement != undefined || sizeelement != '')
                sizeelement.value = '0';
            embedEle.value = 'Complete the above to get your embed code...';
            return true;
        }
        embedAffUrl = imtrim(embedAffUrl);
        var chkhttp = embedAffUrl.substring(0, 4);
        if (chkhttp.toLowerCase() != 'http')
        {
            alert("Please enter FULL affiliate link with http:// included.");
            embedEle.value = 'Complete the above to get your embed code...';
            return true;
        }
    }
    
    if (width == 0 || width == '0' || width == '') 
    {
        embedEle.value = 'Complete the above to get your embed code...';
        return true;
    }
    
    autoplayEle = document.getElementById(autoplaycheck);    
    if (autoplayEle != undefined || autoplayEle != '')
    {
        if (autoplayEle.checked == true)
            autoplay = '&ap=1';
        else autoplayEle.checked = false;
    }
        
    if (embedEle != null && embedEle != undefined)
    {
        var encodedAffUrl = encodeURIComponent(embedAffUrl);
        var src = sourceUrl + "/videoembed.htm?r="+vidPageId+"-"+width+"-"+vidNum+"&a="+encodedAffUrl+autoplay;
        embedEle.value = '<iframe frameborder="0" height="'+height+'" width="'+width+'" scrolling="no" style="margin:0px !important; padding:0px !important; overflow:hidden;" src="'+src+'"></iframe>';
    }
}

function userGplusedIt(plusone)
{
    if (plusone.state == 'on') { imaioReveal('plus', false); }
    else { imaioReveal('unplus', false); }
}

function userGplusedItFb(plusone)
{
    if (plusone.state == 'on') { imaioReveal('plus', true); }
    else { imaioReveal('unplus', true); }
}

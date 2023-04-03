/*
    vCard utils Functions
 */


function generateVcard()
{
    var relAgent = vCard.create(vCard.Version.THREE);
    relAgent.add(vCard.Entry.NAME, window.user_name);
    relAgent.add(vCard.Entry.FORMATTEDNAME, window.user_name);
    relAgent.add(vCard.Entry.TITLE, window.designation_card_text);
    (window.mobile_no_1)? relAgent.add(vCard.Entry.PHONE, window.mobile_no_1, vCard.Type.WORK):'';
    (window.mobile_no_2)? relAgent.add(vCard.Entry.PHONE, window.mobile_no_2, vCard.Type.WORK):'';
    (window.landline_no)? relAgent.add(vCard.Entry.PHONE, window.landline_no, vCard.Type.HOME):'';
    (window.fax_no)? relAgent.add(vCard.Entry.PHONE, window.fax_no, vCard.Type.OTHER):'';
    (window.user_email)? relAgent.add(vCard.Entry.EMAIL, window.user_email, vCard.Type.WORK):'';
    (window.user_image_url)? relAgent.add(vCard.Entry.PHOTO, window.user_image_url, vCard.Type.MAIN):'';
    relAgent.add(vCard.Entry.ORGANIZATION, "Manulife");
	relAgent.add(vCard.Entry.URL,"https://www.manulife.com.ph/",vCard.Type.WORK);

        imageToData("\\Manulife2\\assets\\images\\common\\Logo.png");

    //relAgent.add(vCard.Entry.ADDRESS, ";;street;city;state;zip code;country", vCard.Type.HOME);

    // var link = vCard.export(relAgent, window.user_name, true); // use parameter true to force download
    var link = vCard.export_href(relAgent);
    var name = (window.user_name)? window.user_name : 'agent_details';
    var fname = name+'.vcf';
    downloadDataURL(link,fname);
}

/*
    Direct download a URL using anchor tag & JavaScript
 */
function downloadDataURL(link,fname)
{
    var anchor = document.createElement('a');
    anchor.setAttribute('href', link);
    anchor.setAttribute('download', fname);
    anchor.click();
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    // Fire event
    anchor.dispatchEvent(ev);
}

/*
    Direct download a URL using iFrame & JavaScript
 */
function downloadURL(url) {
    var hiddenIFrameID = 'hiddenDownloader';
    var iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
}

function imageToData(url)
{
	console.log(url);
    var imageArr = {};

    var image_data =  new toDataUrl(url, function(imageBase64) {
        var split1 = imageBase64.split(";base64,");
        imageArr['base64Data'] = split1[1];
        var split2 = split1[0].split("data:image/");
        imageArr['imageType'] = split2[1].toUpperCase();
        // alert(imageArr['base64Data']);
        // alert(imageArr['imageType']);
        imageArr['url'] = url;

        window.user_image_data = imageArr;

		console.log("user image data : "+window.user_image_data);
      
    });
}

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

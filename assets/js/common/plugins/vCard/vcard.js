(function(context) {


    var version = {
        "TWO": "2.1",
        "THREE": "3.0",
        "FOUR": "4.0"
    };

    var vCard = {
        Version: version,
        Entry: {
            "ADDRESS": {"version": [version.TWO, version.THREE, version.FOUR], "key": "ADR", "format": ";;{0};{2};{4};{1};{3}", "@comment": "usage: addAdr(street, code, city, country, state)"},
            "AGENT": {"version": [version.TWO, version.THREE], "key": "AGENT"},
            "ANNIVERSARY": {"version": [version.FOUR], "key": "ANNIVERSARY"},
            "BIRTHDAY": {"version": [version.TWO, version.THREE, version.FOUR], "key": "BDAY"},
            "CALENDARADDURI": {"version": [version.FOUR], "key": "CALADRURI"},
            "CALENDARURI": {"version": [version.FOUR], "key": "CALURI"},
            "CATEGORIES": {"version": [version.TWO, version.THREE, version.FOUR], "key": "CATEGORIES"},
            "CLASS": {"version": [version.THREE], "key": "CLASS"},
            "CLIENTPIDMAP": {"version": [version.FOUR], "key": "CLIENTPIDMAP"},
            "EMAIL": {"version": [version.TWO, version.THREE, version.FOUR], "key": "EMAIL"},
            "FBURL": {"version": [version.FOUR], "key": "FBURL"},
            "FORMATTEDNAME": {"version": [version.TWO, version.THREE, version.FOUR], "key": "FN"},
            "GENDER": {"version": [version.FOUR], "key": "GENDER"},
            "GEO": {"version": [version.TWO, version.THREE, version.FOUR], "key": "GEO"}, // FIXME two differents formats
            "IMPP": {"version": [version.THREE, version.FOUR], "key": "IMPP"},
            // TODO: KEY
            "KIND": {"version": [version.FOUR], "key": "KIND"},
            "LABEL": {"version": [version.TWO, version.THREE], "key": "LABEL"},
            // TODO: LOGO
            "MAILER": {"version": [version.TWO, version.THREE], "key": "MAILER"},
            "MEMBER": {"version": [version.FOUR], "key": "MEMBER"},
            "NAME": {"version": [version.TWO, version.THREE, version.FOUR], "key": "N", "format": "{1};{0};;{2}", "@comment": "usage: addName(firstname, lastname, title)"},
            "NICKNAME": {"version": [version.THREE, version.FOUR], "key": "NICKNAME"},
            "NOTE": {"version": [version.TWO, version.THREE, version.FOUR], "key": "NOTE"},
            "ORGANIZATION": {"version": [version.TWO, version.THREE, version.FOUR], "key": "ORG"},
            // TODO: PHOTO
            "PHOTO": {"version": [version.THREE, version.FOUR], "key": "PHOTO"},
            "PRODID": {"version": [version.THREE, version.FOUR], "key": "PRODID"},
            "PROFILE": {"version": [version.TWO, version.THREE], "key": "PROFILE"},
            "RELATED": {"version": [version.FOUR], "key": "RELATED"},
            "REVISION": {"version": [version.TWO, version.THREE, version.FOUR], "key": "REV"},
            "ROLE": {"version": [version.TWO, version.THREE, version.FOUR], "key": "ROLE"},
            "SORTSTRING": {"version": [version.TWO, version.THREE, version.FOUR], "key": "SORT-STRING"},
            // TODO: SOUND
            "SOURCE": {"version": [version.TWO, version.THREE, version.FOUR], "key": "SOURCE"},
            "PHONE": {"version": [version.TWO, version.THREE, version.FOUR], "key": "TEL"},
            "TITLE": {"version": [version.TWO, version.THREE, version.FOUR], "key": "TITLE"},
            "TIMEZONE": {"version": [version.TWO, version.THREE, version.FOUR], "key": "TZ"}, // FIXME: two differents formats
            "UID": {"version": [version.TWO, version.THREE, version.FOUR], "key": "UID"},
            "URL": {"version": [version.TWO, version.THREE, version.FOUR], "key": "URL"},
            "XML": {"version": [version.FOUR], "key": "XML"}
        },
        Type: {
            "HOME": "HOME",
            "WORK": "WORK",
            "CELL": "CELL",
            "MAIN": "MAIN",
            "OTHER":"OTHER"
        },
        create: function(version) {
            for(var key in this.Version) {
                if(this.Version[key] === version)
                    return new Card(version)
            }
            throw new Error("Unknown vCard version")
        },
        dump: function(card) {
            var str = "BEGIN:VCARD\n";

            for(var key in card) {
                var entry = card[key];

                if(typeof entry === "function")
                    continue;

                if(Object.prototype.toString.call(entry) === "[object Array]") {
                    if(key.toUpperCase() === "PHOTO")
                    {
                        for(var i = 0, l = entry.length; i < l; i++) {
                            var e = entry[i];

                 var ie="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";
                  str += key.toUpperCase()+";ENCODING=b;TYPE="+"PNG"+":"+ie+ "\n";

                // str += key.toUpperCase()+";ENCODING=b;TYPE="+window.user_image_data['imageType']+":"+window.user_image_data['base64Data']+ "\n";
                        }
                    }
                    else
                    {
                        for(var i = 0, l = entry.length; i < l; i++) {
                            var e = entry[i];
                            str += key.toUpperCase() + (e.type ? ";TYPE=" + e.type.toUpperCase() + ":" : ":") + e.value + "\n";
                        }
                    }
                } else if(typeof entry === "object") {
                    str += key.toUpperCase() + (entry.type ? ";TYPE=" + entry.type.toUpperCase() + ":" : ":") + entry.value + "\n";
                } else {
                    str += key.toUpperCase() + ":" + entry + "\n";
                }
            }

            str += "END:VCARD";

            return str
        },
        export: function(card, name, force) {
            var a = document.createElement('a');
            a.download = name + ".vcf";
            a.textContent = name;

            if(Blob) {
                var blob = new Blob([this.dump(card)], {"type": "text/vcard"});
                a.href = URL.createObjectURL(blob);
            } else {
                a.href = "data:text/vcard;base64," + this.btoa(this.dump(card));
            }

            force && a.click();

            return a
        },
        export_href: function(card) {
            var href;

            if(Blob) {
                var blob = new Blob([this.dump(card)], {"type": "text/vcard"});
                href = URL.createObjectURL(blob);
            } else {
                href = "data:text/vcard;base64," + this.btoa(this.dump(card));
            }

            return href;
        },
        btoa: function(str) {
            str = unescape(encodeURIComponent(str));

            if(!btoa) {
                var b64c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

                var i, res = "", length = str.length;
                for (i = 0; i < length - 2; i += 3) {
                    res += b64c[str.charCodeAt(i) >>> 2];
                    res += b64c[((str.charCodeAt(i) & 3) << 4) | (str.charCodeAt(i + 1) >>> 4)];
                    res += b64c[((str.charCodeAt(i + 1) & 15) << 2) | (str.charCodeAt(i + 2) >>> 6)];
                    res += b64c[str.charCodeAt(i + 2) & 63];
                }
    
                if (length % 3 === 2) {
                    res += b64c[str.charCodeAt(i) >>> 2];
                    res += b64c[((str.charCodeAt(i) & 3) << 4) | (str.charCodeAt(i + 1) >>> 4)];
                    res += b64c[((str.charCodeAt(i + 1) & 15) << 2)];
                    res += "=";
                } else if (length % 3 === 1) {
                    res += b64c[str.charCodeAt(i) >>> 2];
                    res += b64c[((str.charCodeAt(i) & 3) << 4)];
                    res += "==";
                }

                return res;
            } else {
                return btoa(str)
            }
        }
    };

    var Card = function(version) {
        this.version = version;

        for(var key in vCard.Entry) {
            var property = vCard.Entry[key];

            if(!property.version || property.version.indexOf(version) < 0)
                continue;

            var fn = "add" + key[0].toUpperCase() + key.slice(1).toLowerCase();

            Card.prototype[fn] = (function(key, format) {
                return (function() {
                    var args = Array.prototype.slice.call(arguments);
                    var lastArg = args.length > 0 ? args[args.length - 1] : undefined;

                    var model = vCard.Type.hasOwnProperty(lastArg) ? args.slice(0, args.length - 1) : args;
                    var value = format && format.replace(/\{([0-9]*)\}/g, function(match, parameter) {
                        return model[parseInt(parameter)] || ''
                    }) || model[0];

                    this.add(key, value, vCard.Type.hasOwnProperty(lastArg) && lastArg)
                })
            })(property.key, property.format)
        }

        this.add = function(entry, value, type) {
            var key = (typeof entry === "object" && entry.key) ? entry.key : entry

            !this[key] && (this[key] = [])
            var e = {"value": value};
            type && (e.type = type);

            this[key].push(e)
        }
    };

    context.vCard = vCard
})(this);
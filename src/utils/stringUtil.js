class StringUtil {
    format(str, obj) {
        return str.replace(/\{\s*([^}\s]+)\s*\}/g, function (m, p1, offset, string) {
            return obj[p1];
        });
    }


    isEmpty(val) {
        return (val === undefined || val === null || val.length <= 0) ? true : false;
    }

    hasClass(el, cls) {
        let regexp = new RegExp("(\\s|^)" + cls + "(\\s|$)"),
            target = (typeof el.className === "undefined") ? window.event.srcElement : el;
        return target.className.match(regexp);
    }

    join(separator) {
        const args = Array.prototype.slice.call(arguments, 1);
        return args.join(separator);
    }

    trim(str) {
        str = str.replace(/^\s+/, '');
        for (let i = str.length - 1; i >= 0; i--) {
            if (/\S/.test(str.charAt(i))) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return str;
    }

    split(separator, str) {
        str = str.split(separator);
        return str;
    }

    regexValidate(regexp, val) {
        const isValid = regexp.test(val);
        return isValid;
    }

    formatNumber(mask, number) {
        const s = '' + number;
        let r = '';
        for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
            r += mask[im] === 'X' ? s.charAt(is++) : mask.charAt(im);
        }
        return r;
    }
}

const stringUtil = new StringUtil();
export default stringUtil;

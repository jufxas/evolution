class StringMethods {
    constructor(element) {
        this.element = document.querySelector(element);
        if (this.element === null)
            throw `Element ${element} is null`;
    }
    onClick(fn) {
        this.element.addEventListener("click", fn);
    }
    html(txt) {
        if (txt === undefined)
            return this.element.innerHTML;
        else
            this.element.innerHTML = txt;
    }
    addAttr(attr, value) {
        let prevEle = this.element.getAttribute(attr);
        if (prevEle)
            this.element.setAttribute(attr, prevEle + " " + value);
        else
            this.element.setAttribute(attr, value);
    }
    attr(attribute, value) {
        if (value === undefined)
            return this.element.getAttribute(attribute);
        else
            this.element.setAttribute(attribute, value);
    }
    append(ele) {
        new DOMParser().parseFromString(ele, "text/html").body.querySelectorAll("*").forEach(x => this.element.append(x));
    }
    clear() {
        while (this.element.firstChild)
            this.element.removeChild(this.element.firstChild);
    }
    css(cssProp, val) {
        if (val === undefined)
            return window.getComputedStyle(this.element).getPropertyValue(cssProp);
        else
            this.element.style.setProperty(cssProp, val);
    }
}
class DocumentMethods {
    color(e) {
        document.body.style.backgroundColor = e;
    }
    clear() {
        document.documentElement.innerHTML = '';
    }
    fontFamily(ff) {
        document.body.style.fontFamily = ff;
    }
    onClick(funct) {
        document.addEventListener("click", funct, false);
    }
    append(ele) {
        new DOMParser().parseFromString(ele, "text/html").body.querySelectorAll("*").forEach(x => document.body.append(x));
    }
}
 function $(ele) {
    return new StringMethods(ele);
}
 function docm() {
    return new DocumentMethods();
}
/*  Examples
$("canvas#canvas").onClick(() => {
    console.log("lol")
})

$("h1").addAttr("class", "man")
$("div#man").css("color", "red")
*/ 
var mq = {
    $: $, 
    docm: docm 
}
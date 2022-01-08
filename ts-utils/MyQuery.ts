export class StringMethods {
    element: HTMLElement | null; 
    constructor(element: string) {
        this.element = document.querySelector(element)
        if (this.element === null) throw `Element ${element} is null`
    }
    onClick(fn: () => any) {
        this.element!.addEventListener("click", fn)
    }
    html(txt?: string) {
        if (txt === undefined) return this.element!.innerHTML; 
        else this.element!.innerHTML = txt; 
    }
    addAttr(attr: string, value: string) {
        let prevEle = this.element!.getAttribute(attr); 
        if (prevEle) this.element!.setAttribute(attr, prevEle + " " + value )
        else this.element!.setAttribute(attr, value)
    }
    attr(attribute: string, value?: string) {
        if (value === undefined) return this.element!.getAttribute(attribute); 
        else this.element!.setAttribute(attribute, value)
    }
    append(ele: string) {
        new DOMParser().parseFromString(ele, "text/html").body.querySelectorAll("*").forEach(x => this.element!.append(x))
    }
    clear() {
        while (this.element!.firstChild) this.element!.removeChild(this.element!.firstChild);
    }
    css(cssProp: string, val?: string) {
        if (val === undefined) return window.getComputedStyle(this.element!).getPropertyValue(cssProp)
        else this.element!.style.setProperty(cssProp, val) 
    }
}

export class DocumentMethods {
    color(e: string) {
        document.body.style.backgroundColor = e; 
    }
    clear() {
        document.documentElement.innerHTML = '';
    }
    fontFamily(ff: string) {
        document.body.style.fontFamily = ff
    }
    onClick(funct: () => any) {
        document.addEventListener("click", funct, false)
    }
    append(ele: string) {
        new DOMParser().parseFromString(ele, "text/html").body.querySelectorAll("*").forEach(x => document.body.append(x))
    }
}

export function $(ele: string) {
    return new StringMethods(ele); 
}
export function docm() {
   return new DocumentMethods()
}

/*  Examples
$("canvas#canvas").onClick(() => {
    console.log("lol")
})

$("h1").addAttr("class", "man")
$("div#man").css("color", "red")
*/ 
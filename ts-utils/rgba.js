"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RGBA = void 0;
class RGBA {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a || 255;
    }
    format() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}
exports.RGBA = RGBA;

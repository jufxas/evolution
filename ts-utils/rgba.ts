export class RGBA {
    private r: number 
    private g: number 
    private b: number 
    private a: number 
    constructor(r: number, g: number, b: number, a?: number) {
        this.r = r 
        this.g = g 
        this.b = b 
        this.a = a || 255 
    }
    format(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
}
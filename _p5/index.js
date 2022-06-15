const V = p5.Vector
class Vector extends V {
    constructor(x, y){
        super(x, y)
    }
}

const ShapeType = {
    0 : 'R',
    1 : 'E'
}

class Shape
{
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} w 
     * @param {Number} h 
     * @param {ShapeType?} t 
     */
    constructor(x, y, w, h, t = null){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.t = t
    }
}

class ShapeCollection extends Array{
    constructor (){
        super()
        this.totalSpliced = 0
    }
    /**
     * 
     * @param {Vector} vector
     */
    checkClick(vector){
        let remIdx = null
        for (let i in this) {
           if (
            (vector.x < this[i].x + this[i].w/2 && vector.x > this[i].x - this[i].w/2) 
            &&
            (vector.y < this[i].y + this[i].h/2 && vector.y > this[i].y - this[i].h/2)
           )
           {
                remIdx = i
                break
           }
        }
        if (remIdx != null)
        {
            this.totalSpliced += 1
            this.splice(remIdx, 1)
        }
    }
    /**
     */
    draw(){
        for(let i of this){
            fill(0)
            textSize(32)
            text(`Total Eliminados: ${this.totalSpliced}`, 50, 50)
            if(i.t === ShapeType[0]){
                fill(0,255,0)
                rectMode(CENTER)
                rect(i.x, i.y, i.w, i.h)
            }else{
                fill(255,0,0)
                ellipse(i.x, i.y, i.w, i.h)
            }
        }
    }
}

var coll = new ShapeCollection()
function setup() {
    createCanvas(windowWidth, windowHeight)
    frameRate(60)
}

function draw() {
    background(255)
    if(frameCount % 30 === 0)
        coll.push(new Shape(random(0, width), random(0, height), 100, 100, ShapeType[Math.round(random())]))
    coll.draw()
}

function mouseClicked() {
    coll.checkClick(new Vector(mouseX, mouseY))
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
function inchestomm(inches) {
    return Math.round(inches * 25.4);
}

function map(val, fromLow, fromHigh, toLow, toHigh) {
    return (val - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
}
class Table {
    rods = [];
    /**
     * @typedef  {Object}   TableConfig 
     * @property {number}   length      length of the field
     * @property {number}   width       width of the field
     * @property {number}   goal        goal width
     * @property {number}   rod_spacing center-to-center spacing of the rods
     * @property {number}   wall        thickness of the field wall
     * @property {number[]} team1       array of the rod indeces corresponding to the team whose handles are on the left
     * @method   test
     */
    /**
     * @constructor
     * @param {TableConfig} config table configuration
     */
    constructor(config) {
        /** @type {TableConfig} */
        let defaults = {
            length: inchestomm(56),
            width: inchestomm(30),
            goal: inchestomm(8),
            rod_spacing: inchestomm(6),
            wall: inchestomm(1),
            team1: [0, 1, 3, 5],
        };
        Object.keys(config).forEach((k) => (defaults[k] = config[k]));
        this.config = defaults;
        this.canvas = createElement("canvas");
        let rodControl = createElement("rodControl");
        for (let i = 0; i < 8; i++) {
            let input = createElement("input", {
                type: "range",
                min: 0,
                max: 255,
                value: 127,
                dataset: {
                    index: i
                },
                oninput: () => {
                    tornado.render(document.getElementById("output"));
                    input.parentElement.querySelector(".val").innerHTML = " " + input.value;
                }
            });
            rodControl.add(
                createElement("div").add(
                    createElement("span", { innerHTML: "rod " + (i + 1) + " " }),
                    createElement("button", {
                        innerHTML: "-",
                        onclick: () => {
                            input.value--;
                            input.dispatchEvent(new Event("input"))
                        }
                    }),
                    input,
                    createElement("button", {
                        innerHTML: "+",
                        onclick: () => {
                            input.value++;
                            input.dispatchEvent(new Event("input"))
                        }
                    }),
                    createElement("span", { innerHTML: " " + input.value, classList: "val" }),
                    createElement("br")
                )
            );
        }
        this.rodControl = rodControl;
        document.body.add(createElement("div").add(
            this.canvas,
            createElement("br"),
            rodControl
        ));
    }
    /**
     * @typedef RodOptions
     * @property {number} bumper      width of the bumper
     * @property {number} man         width of the man
     * @property {number} man_spacing center-to-center spacing between men
     * @property {number} man_count   number of men
     * @property {number} index       rod index
     * @property {string} color       
     */
    /**
     * adds a new rod to the table defined by dimensions
     * @param {RodOptions} config rod measurements
     */
    addRod(config) {
        this.rods.push(new this.#Rod(config));
        this.setupCanvas();
    }

    #Rod = class Rod {
        /**
         * initializes a new rod on the table
         * @param {TableConfig} config number of men
         */
        constructor(config) {
            let defaults = {
                bumper: inchestomm(1),
                man: inchestomm(1.25),
                man_spacing: inchestomm(8),
                man_count: 3,
                index: 0,
                color: "red"
            };
            Object.keys(config).forEach((k) => (defaults[k] = config[k]));
            this.config = defaults;
        }
        /**
         * draws the rod to the table
         * @param {CanvasRenderingContext2D} ctx canvas context
         * @param {Table} table the table
         * @param {Number} offsetx left/right offset
         * @param {Number} 0 up/down offset
         */
        draw(ctx, table, offsetx) {
            // console.log("drawing", ctx, table, offsetx, 0);
            let { length, wall, width, team1 } = table.config;
            let { index, color, man_count, man_spacing, bumper, man } = this.config;
            let center = length / 2 + wall;
            let rodCenter = inchestomm(6 * (index) - 21);
            let rodTop = rodCenter - (inchestomm(5 / 8) / 2) + center;

            let rodPos = table.rodControl.querySelector(`input[data-index="${index}"]`).value;
            let rodLength = (man_count - 1) * man_spacing + man + 2 * bumper;
            let rodTravel = width - rodLength;
            let rodOffset = map(rodPos, 0, 255, 0, rodTravel);





            ctx.fillStyle = "#a0a0a0";// draw rod
            let rodx = rodOffset + offsetx - rodTravel - (team1.includes(index) ? 30 : 10);
            let rodwidth = rodTravel + width + 2 * bumper + 40;
            ctx.fillRect(rodx, rodTop, rodwidth, inchestomm(5 / 8));

            let handleLength = 120, handleThickness = 40;// draw handle
            let handlex = offsetx + rodOffset + (team1.includes(index) ? (-rodTravel - handleLength - 30) : (2 * wall + width + 30));
            let handley = (rodTop + inchestomm(5 / 8) / 2) - handleThickness / 2;
            ctx.fillStyle = "black";
            ctx.fillRect(handlex, handley, handleLength, handleThickness);

            ctx.font = "50px monospace";// draw rod position
            ctx.fillText(rodPos, handlex, handley + handleThickness + 55);
            ctx.font = "40px monospace";// draw rod number
            ctx.fillText("rod " + (index + 1), handlex, handley - 5);

            ctx.fillStyle = "black";// draw bumpers
            ctx.fillRect(offsetx + wall + rodOffset, rodTop - 5, bumper, inchestomm(5 / 8) + 10);
            ctx.fillRect(offsetx + wall + rodOffset + rodLength - bumper, rodTop - 5, bumper, inchestomm(5 / 8) + 10);

            ctx.fillStyle = color;// draw men
            for (let i = 0; i < man_count; i++) {
                ctx.fillRect(offsetx + wall + bumper + i * (man_spacing) + rodOffset, rodTop - 10, man, 90);
            }
        }
    }

    calculateCanvas() {
        let xvals = [];
        [0, 255].forEach(rodPos => {
            this.rods.forEach(rod => {
                let { wall, width, team1 } = this.config;
                let { index, man_count, man_spacing, bumper, man } = rod.config;
                let rodLength = (man_count - 1) * man_spacing + man + 2 * bumper;
                let rodTravel = width - rodLength;
                let rodOffset = map(rodPos, 0, 255, 0, rodTravel);

                let rodx = rodOffset - rodTravel - (team1.includes(index) ? 30 : 10);
                let rodwidth = rodTravel + width + 2 * bumper + 40;
                xvals.push(rodx, rodx + rodwidth);

                let handleLength = 120
                let handlex = rodOffset + (team1.includes(index) ? (-rodTravel - handleLength - 30) : (2 * wall + width + 30));
                xvals.push(handlex, handlex + handleLength);

            });
        })
        let result = {
            xmin: xvals[0],
            xmax: xvals[0],
        };
        xvals.forEach(x => {
            result.xmin = (result.xmin < x ? result.xmin : x);
            result.xmax = (result.xmax > x ? result.xmax : x);
        });
        return result;
    }
    setupCanvas() {
        let { xmin, xmax } = this.calculateCanvas();
        let { wall, width, length } = this.config;
        this.canvasWidth = xmax - xmin;
        this.canvasHeight = 2 * wall + length + 50;
        this.canvas.setAttribute("width", 0);
        this.canvas.setAttribute("height", 0);
        this.offsetx = (xmax - xmin) / 2 - width / 2 - wall;
    }
    /**
     * 
     * @param {HTMLCanvasElement} this.canvas 
     */
    render() {
        let { width, length, wall, goal } = this.config;
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.rect(100, 0, width, length);
        let borderColor = "black";
        let fieldColor = "green";

        let shrink = 3;
        this.canvas.setAttribute("width", this.canvasWidth / shrink);
        this.canvas.setAttribute("height", this.canvasHeight / shrink);
        ctx.scale(1 / shrink, 1 / shrink);
        ctx.fillStyle = fieldColor; //  draw field
        ctx.fillRect(this.offsetx + wall, wall, width, length);

        // {x: 0, y: 0},
        let lineThickness = 10;
        ctx.fillStyle = "white";// draw top goal lines
        ctx.drawPolygon([//inner line
            { x: this.offsetx + wall + width / 2 - goal / 2, y: wall },
            { x: this.offsetx + wall + width / 2 - goal / 2, y: wall + inchestomm(2) },
            { x: this.offsetx + wall + width / 2 + goal / 2, y: wall + inchestomm(2) },
            { x: this.offsetx + wall + width / 2 + goal / 2, y: wall },
            { x: this.offsetx + wall + width / 2 + goal / 2 + lineThickness, y: wall },
            { x: this.offsetx + wall + width / 2 + goal / 2 + lineThickness, y: wall + inchestomm(2) + lineThickness },
            { x: this.offsetx + wall + width / 2 - goal / 2 - lineThickness, y: wall + inchestomm(2) + lineThickness },
            { x: this.offsetx + wall + width / 2 - goal / 2 - lineThickness, y: wall },
        ]);
        ctx.drawPolygon([//outer line
            { x: this.offsetx + wall + width / 2 - goal / 2, y: wall + length },
            { x: this.offsetx + wall + width / 2 - goal / 2, y: wall - inchestomm(2) + length },
            { x: this.offsetx + wall + width / 2 + goal / 2, y: wall - inchestomm(2) + length },
            { x: this.offsetx + wall + width / 2 + goal / 2, y: wall + length },
            { x: this.offsetx + wall + width / 2 + goal / 2 + lineThickness, y: wall + length },
            { x: this.offsetx + wall + width / 2 + goal / 2 + lineThickness, y: wall - inchestomm(2) - lineThickness + length },
            { x: this.offsetx + wall + width / 2 - goal / 2 - lineThickness, y: wall - inchestomm(2) - lineThickness + length },
            { x: this.offsetx + wall + width / 2 - goal / 2 - lineThickness, y: wall + length },
        ]);

        // draw bottom goal lines
        ctx.drawPolygon([//inner line
            { x: this.offsetx + wall + width / 2 - goal / 2 - inchestomm(2), y: wall },
            { x: this.offsetx + wall + width / 2 - goal / 2 - inchestomm(2), y: wall + inchestomm(2) + inchestomm(1.5) },
            { x: this.offsetx + wall + width / 2 + goal / 2 + inchestomm(2), y: wall + inchestomm(2) + inchestomm(1.5) },
            { x: this.offsetx + wall + width / 2 + goal / 2 + inchestomm(2), y: wall },
            { x: this.offsetx + wall + width / 2 + goal / 2 + lineThickness + inchestomm(2), y: wall },
            { x: this.offsetx + wall + width / 2 + goal / 2 + lineThickness + inchestomm(2), y: wall + inchestomm(2) + lineThickness + inchestomm(1.5) },
            { x: this.offsetx + wall + width / 2 - goal / 2 - lineThickness - inchestomm(2), y: wall + inchestomm(2) + lineThickness + inchestomm(1.5) },
            { x: this.offsetx + wall + width / 2 - goal / 2 - lineThickness - inchestomm(2), y: wall },
        ]);
        ctx.drawPolygon([//outer line
            { x: this.offsetx + wall + width / 2 - goal / 2 - inchestomm(2), y: wall + length },
            { x: this.offsetx + wall + width / 2 - goal / 2 - inchestomm(2), y: wall - inchestomm(2) - inchestomm(1.5) + length },
            { x: this.offsetx + wall + width / 2 + goal / 2 + inchestomm(2), y: wall - inchestomm(2) - inchestomm(1.5) + length },
            { x: this.offsetx + wall + width / 2 + goal / 2 + inchestomm(2), y: wall + length },
            { x: this.offsetx + wall + width / 2 + goal / 2 + lineThickness + inchestomm(2), y: wall + length },
            { x: this.offsetx + wall + width / 2 + goal / 2 + lineThickness + inchestomm(2), y: wall - inchestomm(2) - lineThickness - inchestomm(1.5) + length },
            { x: this.offsetx + wall + width / 2 - goal / 2 - lineThickness - inchestomm(2), y: wall - inchestomm(2) - lineThickness - inchestomm(1.5) + length },
            { x: this.offsetx + wall + width / 2 - goal / 2 - lineThickness - inchestomm(2), y: wall + length },
        ]);

        // draw midfield line
        ctx.drawPolygon([
            { x: this.offsetx + wall, y: wall + length / 2 - lineThickness / 2 },
            { x: this.offsetx + wall + width, y: wall + length / 2 - lineThickness / 2 },
            { x: this.offsetx + wall + width, y: wall + length / 2 + lineThickness / 2 },
            { x: this.offsetx + wall, y: wall + length / 2 + lineThickness / 2 },
        ]);

        //draw rods
        this.rods.forEach(e => {
            e.draw(ctx, this, this.offsetx, 0);
        });

        ctx.fillStyle = borderColor; // draw wall
        ctx.drawPolygon([
            { x: this.offsetx, y: 0 },
            { x: this.offsetx, y: (2 * this.config.wall) + this.config.length },
            { x: this.offsetx + (2 * this.config.wall) + this.config.width, y: (2 * this.config.wall) + this.config.length },
            { x: this.offsetx + (2 * this.config.wall) + this.config.width, y: 0 },
            { x: this.offsetx + this.config.wall, y: 0 },
            { x: this.offsetx + this.config.wall, y: this.config.wall },
            { x: this.offsetx + this.config.wall + this.config.width, y: this.config.wall },
            { x: this.offsetx + this.config.wall + this.config.width, y: this.config.wall + this.config.length },
            { x: this.offsetx + this.config.wall, y: this.config.wall + this.config.length },
            { x: this.offsetx + this.config.wall, y: 0 },
        ]);
    }

}

CanvasRenderingContext2D.prototype.drawPolygon = function (points) {
    this.beginPath();

    this.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        this.lineTo(points[i].x, points[i].y);
    }

    this.closePath();
    this.strokeStyle = this.fillStyle;
    this.fill();
    this.stroke();
}

let tornado = new Table({
    length: inchestomm(48),
    width: inchestomm(30),
    goal: inchestomm(8),
    rod_spacing: inchestomm(6),
    wall: inchestomm(1)
});
tornado.addRod({// goalie
    man_spacing: inchestomm(8.125),
    man_count: 3,
    index: 0,
    color: "yellow"
});
tornado.addRod({// 2-rod
    man_spacing: inchestomm(9.5),
    man_count: 2,
    index: 1,
    color: "yellow"
});
tornado.addRod({// 5-rod
    man_spacing: inchestomm(4.75),
    man_count: 5,
    index: 3,
    color: "yellow"
});
tornado.addRod({// 3-rod
    man_spacing: inchestomm(7.25),
    man_count: 3,
    index: 5,
    color: "yellow"
});


tornado.addRod({// goalie
    man_spacing: inchestomm(8.125),
    man_count: 3,
    index: 7,
    color: "black"
});
tornado.addRod({// 2-rod
    man_spacing: inchestomm(9.5),
    man_count: 2,
    index: 6,
    color: "black"
});
tornado.addRod({// 5-rod
    man_spacing: inchestomm(4.75),
    man_count: 5,
    index: 4,
    color: "black"
});
tornado.addRod({// 3-rod
    man_spacing: inchestomm(7.25),
    man_count: 3,
    index: 2,
    color: "black"
});
tornado.render();
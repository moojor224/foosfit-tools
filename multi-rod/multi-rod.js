function inchestomm(inches) {
    return Math.round(inches * 25.4);
}

function map(val, fromLow, fromHigh, toLow, toHigh) {
    return (val - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
}
class Table {
    rods = [];
    /**
     * 
     * @constructor
     * @param {number} innerWidth inner width of the table
     * @param {number} innerLength inner length of the table
     * @param {number} goalWidth width of the goal
     */
    /*
    Foosball Men:
        Typical Height: 4.5 inches (11.43 cm)
        Typical Width: 1.25 inches (3.18 cm)

    Foosball Rods:
        Typical Rod Diameter: 5/8 inches (1.5875 cm)


    Foosball:
        Typical Foosball Diameter: 35 mm (1.38 inches)
        Typical Foosball Weight: Approximately 18 grams

    
    */
    constructor(config) {
        let defaults = {
            length: inchestomm(56),
            width: inchestomm(30),
            goal: inchestomm(8),
            rod_spacing: inchestomm(6),
            wall: inchestomm(1)
        };
        Object.keys(config).forEach((k) => (defaults[k] = config[k]));
        this.config = defaults;
    }
    /**
     * @typedef RodOptions
     * @property {number} spacer
     * @property {number} man
     * @property {number} travel
     * @property {number} man_spacing
     * @property {number} men
     */
    /**
     * adds a new rod to the table defined by dimensions
     * @param {RodOptions} config rod measurements
     */
    addRod(config) {
        this.rods.push(new this.#Rod(config));
    }

    #Rod = class Rod {
        /**
         * initializes a new rod on the table
         * @param {number} men number of men
         * @param {number} position rod position
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
         * @param {Number} offsety up/down offset
         */
        draw(ctx, table, offsetx, offsety) {
            // console.log("drawing", ctx, table, offsetx, offsety);
            let { length, wall, width } = table.config;
            let { index, color, man_count, man_spacing, bumper, man } = this.config;
            let center = length / 2 + wall + offsety;
            let rodCenter = inchestomm(6 * (index) - 21);
            let rodTop = rodCenter - inchestomm(5 / 8) + center;

            let rodPos = document.querySelector(`input[data-index="${index}"]`).value;
            let rodLength = (man_count - 1) * man_spacing + man + 2 * bumper;
            let rodTravel = width - rodLength;
            let rodOffset = map(rodPos, 0, 255, 0, rodTravel);





            let yellow = [0, 1, 3, 5];
            ctx.fillStyle = "#a0a0a0";// draw rod
            let rodx = rodOffset + offsetx - rodTravel - (yellow.includes(index) ? 30 : 10);
            let rodwidth = rodTravel + width + 2 * bumper + 40;
            ctx.fillRect(rodx, rodTop, rodwidth, inchestomm(5 / 8));

            let handleLength = 120, handleThickness = 40;
            ctx.fillStyle = "black";
            ctx.fillRect(offsetx + rodOffset + (yellow.includes(index) ? (-rodTravel - handleLength - 30) : (2 * wall + width + 30)), (rodTop + inchestomm(5 / 8) / 2) - handleThickness / 2, handleLength, handleThickness);







            ctx.fillStyle = "black";// draw bumpers
            ctx.fillRect(offsetx + wall + rodOffset, rodTop - 5, bumper, inchestomm(5 / 8) + 10);
            ctx.fillRect(offsetx + wall + rodOffset + rodLength - bumper, rodTop - 5, bumper, inchestomm(5 / 8) + 10);

            ctx.fillStyle = color;// draw men
            for (let i = 0; i < man_count; i++) {
                ctx.fillRect(offsetx + wall + bumper + i * (man_spacing) + rodOffset, rodTop - 10, man, 90);
            }
        }
    }
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    render(canvas) {
        let { width, length, wall, goal } = this.config;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.rect(100, 0, width, length);
        let offsetx = 600;
        let offsety = 20;
        ctx.fillStyle = "black";
        let borderColor = "black", fieldColor = "green";

        ctx.fillStyle = fieldColor; //  draw field
        ctx.fillRect(offsetx + wall, offsety + wall, width, length);

        // {x: 0, y: 0},
        let lineThickness = 10;
        ctx.fillStyle = "white";// draw top goal lines
        ctx.drawPolygon([
            { x: offsetx + wall + width / 2 - goal / 2, y: offsety + wall },
            { x: offsetx + wall + width / 2 - goal / 2, y: offsety + wall + inchestomm(2) },
            { x: offsetx + wall + width / 2 + goal / 2, y: offsety + wall + inchestomm(2) },
            { x: offsetx + wall + width / 2 + goal / 2, y: offsety + wall },
            { x: offsetx + wall + width / 2 + goal / 2 + lineThickness, y: offsety + wall },
            { x: offsetx + wall + width / 2 + goal / 2 + lineThickness, y: offsety + wall + inchestomm(2) + lineThickness },
            { x: offsetx + wall + width / 2 - goal / 2 - lineThickness, y: offsety + wall + inchestomm(2) + lineThickness },
            { x: offsetx + wall + width / 2 - goal / 2 - lineThickness, y: offsety + wall },
        ]);

        this.rods.forEach(e => {
            e.draw(ctx, this, offsetx, offsety);
        });

        ctx.fillStyle = borderColor; // draw wall
        ctx.drawPolygon([
            { x: offsetx, y: offsety },
            { x: offsetx, y: offsety + (2 * this.config.wall) + this.config.length },
            { x: offsetx + (2 * this.config.wall) + this.config.width, y: offsety + (2 * this.config.wall) + this.config.length },
            { x: offsetx + (2 * this.config.wall) + this.config.width, y: offsety },
            { x: offsetx + this.config.wall, y: offsety },
            { x: offsetx + this.config.wall, y: offsety + this.config.wall },
            { x: offsetx + this.config.wall + this.config.width, y: offsety + this.config.wall },
            { x: offsetx + this.config.wall + this.config.width, y: offsety + this.config.wall + this.config.length },
            { x: offsetx + this.config.wall, y: offsety + this.config.wall + this.config.length },
            { x: offsetx + this.config.wall, y: offsety },
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
/*
man spacing:
    goalie
        8.125

    2-rod
        9.5

    5-rod
        4.75

    3-rod
        7.25
*/
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

let div = document.getElementById("rodControl");
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
    div.add(
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
tornado.render(document.getElementById("output"));
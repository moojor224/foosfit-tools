import { Table, inchestomm, flatConvert, simpleGoalConvert } from "./multi-rod.js";

function tornado() {
    let tornado1 = new Table({
        length: inchestomm(48),
        width: inchestomm(30),
        goal: inchestomm(8),
        rod_spacing: inchestomm(6),
        wall: inchestomm(1),
        name: "tornado1",
        colors: ["green", "yellow", "black"],
    });
    tornado1.addRod({// yellow goalie
        man_spacing: inchestomm(8.125),
        man_count: 3,
        index: 0,
        team: 1
    });
    tornado1.addRod({// yellow 2-rod
        man_spacing: inchestomm(9.5),
        man_count: 2,
        index: 1,
        team: 1
    });
    tornado1.addRod({// yellow 5-rod
        man_spacing: inchestomm(4.75),
        man_count: 5,
        index: 3,
        team: 1
    });
    tornado1.addRod({// yellow 3-rod
        man_spacing: inchestomm(7.25),
        man_count: 3,
        index: 5,
        team: 1
    });
    tornado1.addRod({//black goalie
        man_spacing: inchestomm(8.125),
        man_count: 3,
        index: 7,
        team: 2
    });
    tornado1.addRod({// black 2-rod
        man_spacing: inchestomm(9.5),
        man_count: 2,
        index: 6,
        team: 2
    });
    tornado1.addRod({// black 5-rod
        man_spacing: inchestomm(4.75),
        man_count: 5,
        index: 4,
        team: 2
    });
    tornado1.addRod({// black 3-rod
        man_spacing: inchestomm(7.25),
        man_count: 3,
        index: 2,
        team: 2
    });
    tornado1.render();
    return tornado1;
}

let tornado1 = tornado();
let tornado2 = new Table({
    length: inchestomm(48),
    width: inchestomm(40),
    goal: inchestomm(8),
    rod_spacing: inchestomm(6),
    wall: inchestomm(1),
    name: "tornado2",
});
tornado2.addRod({// yellow goalie
    man_spacing: inchestomm(8.125),
    man_count: 3,
    index: 0,
    team: 1
});
tornado2.addRod({// yellow 2-rod
    man_spacing: inchestomm(9.5),
    man_count: 2,
    index: 1,
    team: 1
});
tornado2.addRod({// yellow 5-rod
    man_spacing: inchestomm(4.75),
    man_count: 5,
    index: 3,
    team: 1
});
tornado2.addRod({// yellow 3-rod
    man_spacing: inchestomm(7.25),
    man_count: 3,
    index: 5,
    team: 1
});
tornado2.addRod({//black goalie
    man_spacing: inchestomm(8.125),
    man_count: 3,
    index: 7,
    team: 2
});
tornado2.addRod({// black 2-rod
    man_spacing: inchestomm(9.5),
    man_count: 2,
    index: 6,
    team: 2
});
tornado2.addRod({// black 5-rod
    man_spacing: inchestomm(4.75),
    man_count: 5,
    index: 4,
    team: 2
});
tornado2.addRod({// black 3-rod
    man_spacing: inchestomm(7.25),
    man_count: 3,
    index: 2,
    team: 2
});
tornado2.render();

let tornado3 = tornado();


/*
how to link tables:

*/
tornado1.bind(tornado2, {
    all: flatConvert,// this function will be applied to all rods (except goalie if defined)
    goalie: simpleGoalConvert,// this function will only be applied to goalie rods
});
tornado2.bind(tornado3, {
    all: flatConvert,
    goalie: simpleGoalConvert,
});
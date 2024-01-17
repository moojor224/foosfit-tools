




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


let table2 = new Table({
    length: inchestomm(45),
    width: inchestomm(35),
    goal: inchestomm(5),
    rod_spacing: inchestomm(4.5),
    wall: inchestomm(1),
    name: "tornado2",
});
table2.addRod({// yellow goalie
    man_spacing: inchestomm(8.125),
    man_count: 3,
    index: 0,
    team: 1
});
table2.addRod({// yellow 2-rod
    man_spacing: inchestomm(9.5),
    man_count: 2,
    index: 1,
    team: 1
});
table2.addRod({// yellow 5-rod
    man_spacing: inchestomm(4.75),
    man_count: 5,
    index: 3,
    team: 1
});
table2.addRod({// yellow 3-rod
    man_spacing: inchestomm(7.25),
    man_count: 3,
    index: 5,
    team: 1
});
table2.addRod({//black goalie
    man_spacing: inchestomm(8.125),
    man_count: 3,
    index: 7,
    team: 2
});
table2.addRod({// black 2-rod
    man_spacing: inchestomm(9.5),
    man_count: 2,
    index: 6,
    team: 2
});
table2.addRod({// black 5-rod
    man_spacing: inchestomm(4.75),
    man_count: 5,
    index: 4,
    team: 2
});
table2.addRod({// black 3-rod
    man_spacing: inchestomm(7.25),
    man_count: 3,
    index: 2,
    team: 2
});
table2.render();



/*
how to link tables:
parentTable.bind(childTable);
parentTable is the table that you need to convert from.
childtable is the table that you need to convert to
any time you move a rod on parentTable, childTable will have its rods updated according to the defined conversion functions
the built-in conversion functions are as follows:
flatConvert
    does not do any sort of conversion, simply makes the rods be in sync. i.e. moving a rod to position 127 will make all child tables corresponding rod move to position 127

simpleGoalConvert
    intended for goalie rods
    makes the middle man block the goal at the same relative position
    i.e. moving parentTable's goalie rod to block with the middle man at the far left of the goal will do the same for all child tables
    same for the right side of the goal and all points in between
    this function is the same logic as shown here: https://moojor224.github.io/foosfit-tools/table_test.html
*/
tornado1.bind(table2, {
    all: flatConvert,// this function will be applied to all rods (except goalie if defined)
    goalie: simpleGoalConvert, // this function will only be applied to goalie rods
});
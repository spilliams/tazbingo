var tileList = [
    "Fantasy merchant cat",
    "Monster made out of other monsters",
    "Celebrity appearance",
    "Under&shy;staffed secret organization",
    "Lunar<br>interludes",
    "OP queer mage",
    "Clint sings",
    "Techni&shy;cally, aliens",
    "Justin voices his own sidekick",
    "Ghosts",
    "Competent woman who can bail the PCs out",
    "Flirting with<br>monsters",
    "Candle&shy;nights episode",
    "PC loses their powers",
    "Fixation on a<br>single type of food",
    "Travis has a pet",
    "Elevators",
    "Griffin flakes out on a character voice",
    "Chekhov's party member",
    "Vacation episode",
    "Extreme sports",
    "Friendship is magic",
    "Planet-destroying force",
    "Catch&shy;phrases"
];

$(document).ready(another());
window.onresize = resize;

function resize() {
    // aspect ratio = aN/aD
    aN = 10.0;
    aD = 12.0;
    // set sizes
    h = $(window).height();
    h = h - h % aD;
    w = aN * h / aD;

    // this would adjust for window width
    // if (w > $(window).width()) {
    //     h = h * w / $(window).width();
    //     w = $(window).width();
    // }

    // colophon is below the fold, and is the final 10% of the height
    colophon = 10;
    finalH = h / ((100-colophon)/100);
    $("#card").css({ "height": "" + finalH + "px", "width": "" + w + "px" });

    // bingo is square
    $("#bingo").css({"height": ""+w+"px"});

    // title is the remainder of the original aspect ratio, minus 2 points
    title = 100 * (aD - aN) / aD;
    $("#title").css({"height": ""+title-2+"%"});
    $("#by").css({"height": ""+colophon+2+"%"});
}

function another() {
    resize();

    // set tile text
    tiles = randomTiles(24, tileList.slice(0));
    $(".gen").each(function (index) {
        $(this).html(tiles[index]);
    });
}

function randomTiles(n, list) {
    console.log(`getting ${n} items from list: ${list}`);
    tiles = [];
    for (i = 0; i < n; i++) {
        console.log(`  i: ${i}`);
        r = getRandomInt(list.length);
        console.log(`    r: ${r}`);
        tile = list[r];
        console.log(`    tile: ${tile}`);
        list.splice(r, 1);
        console.log(`    list: ${list}`);
        tiles.push(tile);
    }
    return tiles;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function colors(on) {
    if (on) {
        $("#card").addClass("fancy");
    } else {
        $("#card").removeClass("fancy");
    }
}
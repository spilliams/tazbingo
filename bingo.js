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
    console.log(`intial height is ${h}. initial width is ${w}`);

    // don't overflow horizontally
    bad = $(window).width() - 10;
    if (w > bad) {
        h = h * bad / w;
        w = bad;
    }
    console.log(`after accounting for overflowing width: ${h}, ${w}`);

    // colophon is below the fold, and is the final 10% of the height
    colophon = 10;
    finalH = h / ((100-colophon)/100);
    console.log(`card is ${finalH} by ${w}`);
    $("#card").css({ "height": "" + finalH + "px", "width": "" + w + "px" });

    // bingo is square
    console.log(`bingo is ${w} high`);
    $("#bingo").css({"height": ""+w+"px"});

    // title is the remainder of the original aspect ratio, minus 2 points
    title = (100 * (aD - aN) / aD) - 2;
    colophon += 2;
    console.log(`title is ${title} and colophon is ${colophon}`);
    $("#title").css({"height": ""+title+"%"});
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
    tiles = [];
    for (i = 0; i < n; i++) {
        r = getRandomInt(list.length);
        tile = list[r];
        list.splice(r, 1);
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
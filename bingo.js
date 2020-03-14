$(document).ready(another());
window.onresize = resize;

function airtableTiles(view) {
    var Airtable = require('airtable');
    var db = new Airtable({apiKey: 'keyqw38Y5vuJlSnaB'}).base('appjKWzB7gDN1NDgm');
    return db('Table 1').select({
        fields: ["HTML", "Contributor"],
        view: view,
    }).all().then(records => {
        return records;
    }).catch(e => {
        console.log(`error fetching airtable records from ${view}: ${e}`);
    });
}

function resize() {
    // aspect ratio = aN/aD
    aN = 10.0;
    aD = 12.0;
    // set sizes
    h = $(window).height();
    h = h - h % aD;
    w = aN * h / aD;
    // console.log(`intial height is ${h}. initial width is ${w}`);

    // don't overflow horizontally
    bad = $(window).width() - 10;
    if (w > bad) {
        h = h * bad / w;
        w = bad;
    }
    // console.log(`after accounting for overflowing width: ${h}, ${w}`);

    // colophon is below the fold, and is the final 10% of the height
    colophon = 10;
    finalH = Math.round(h / ((100-colophon)/100));
    w = Math.round(w);
    // console.log(`card is ${finalH} by ${w}`);
    $("#card").css({ "width": "" + w + "px" }); // "height": "" + finalH + "px", 

    // bingo is square
    // console.log(`bingo is ${w} high`);
    $("#bingo").css({"height": ""+w+"px"});

    // title is the remainder of the original aspect ratio, minus 2 points
    title = Math.round((100 * (aD - aN) / aD) - 2);
    colophon = Math.round(colophon+2);
    // console.log(`title is ${title}% and colophon is ${colophon}%`);
    $("#title").css({"height": ""+title+"%"});
    $("#by").css({"height": ""+colophon+"%"});
}

function another() {
    resize();

    // start with existing tiles on the board because maybe we lost connection
    // to database?
    contributors = ["@jrfbz", "@spilliams", "@jeslach"];
    defaultRegularTiles = [
        {"fields": {"HTML": "Fantasy merchant cat", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "OP queer mage", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Competent woman who can bail the PCs out", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Fixation on a<br>single type of food", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Vacation episode", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Monster made out of other monsters", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Clint sings", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Flirting with<br>monsters", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Travis has a pet", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Extreme sports", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Celebrity appearance", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Techni&shy;cally, aliens", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Elevators", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Friendship is magic", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Under&shy;staffed<br>secret organization", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Justin voices his own<br>sidekick", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Candle&shy;nights episode", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Griffin flakes out on a<br>character voice", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Planet-destroying force", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Lunar<br>interludes", "Contributor": "@jeslach"}},
        {"fields": {"HTML": "Ghosts", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "PC loses their<br>powers", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Chekhov's party<br>member", "Contributor": "@jrfbz"}},
        {"fields": {"HTML": "Catch&shy;phrases", "Contributor": "@spilliams"}},
    ];

    Promise.all([airtableTiles("Live Regular Spaces"), airtableTiles("Live Free Spaces")]).then(([regularTiles, freeTiles]) => {
        // set tile text
        if (typeof regularTiles != "undefined") {
            regularTiles = randomTiles(24, regularTiles);
        } else {
            regularTiles = randomTiles(24, defaultRegularTiles);
        }

        $(".gen").each(function (index) {
            // console.log(regularTiles[index]);
            tile = regularTiles[index].fields;
            $(this).html(tile.HTML);
            contributors.push(tile.Contributor);
        });

        // set free tile
        if (typeof fewwTiles != "undefined") {
            freeTiles = randomTiles(1, freeTiles);
            tile = freeTiles[0].fields;
            $("#free").html(tile.HTML+"<br>(Free Space)");
            contributors.push(tile.Contributor);
        }

        // update contributors
        contributors = new Set(contributors);
        contributors.delete("@jrfbz");
        contributors.delete("@spilliams");
        contributors = [...contributors];
        console.log(contributors);
        $("#contributors").text(contributors.join(", "));
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
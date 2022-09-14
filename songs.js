async function fetch_json() {
    var songs = await fetch('./songs.json').then(res => res.json())
        .then(data => {
            return data
        });
    return songs;
}

function sort_by_pack(songs) {
    var packs_sorted = {};
    for (var song in songs) {
        let song_info = songs[song];
        let pack = song_info["pack"];
        if (pack in packs_sorted) {
            packs_sorted[pack][song] = song_info
        } else {
            packs_sorted[pack] = {};
            packs_sorted[pack][song] = song_info
        }
    }
    return packs_sorted;
}

function pack_content(pack, content) {
    for (song in pack) {
        content.innerHTML += song + "<br>"
        var artist = pack[song]["artist"];
        var pack_name = pack[song]["pack"]
        var difficulties = pack[song]["difficulties"]
        content.innerHTML += "<ul>" +
            "<li>" + artist + "</li>" +
            "<li>" + pack_name + "</li>" +
            "<li>" + difficulties + "</li>" +
            "</ul>"

    }
}

function create_collapsibles(sorted_songs) {
    for (pack in sorted_songs) {
        var button = document.createElement("button");
        button.className = "collapsible"
        button.innerText = pack;
        var div_content = document.createElement("div");
        div_content.className = "content";
        var content = document.createElement("p");
        pack_content(sorted_songs[pack], content);
        document.getElementById("body").appendChild(button);
        div_content.appendChild(content);
        document.getElementById("body").appendChild(div_content);
    }
}
async function filter() {
    var songs = await fetch_json();
    await create_collapsibles(sort_by_pack(songs))
}
filter()
setTimeout(() => {
    var coll = document.getElementsByClassName("collapsible");
    console.log(coll)
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}, 200);
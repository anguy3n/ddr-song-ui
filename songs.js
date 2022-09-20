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

// function sort_alphabetical_title(songs) {
//     var alphabetically_sorted = {};
//     for (var song in songs) {
//         let song_info = songs[song];
//         let song_inital = song.charAt(0).toUpperCase();
//         if (song_inital in alphabetically_sorted) {
//             alphabetically_sorted[song_inital][song] = song_info;
//         } else {
//             alphabetically_sorted[song_inital] = {};
//             alphabetically_sorted[song_inital][song] = song_info;
//         }
//     }
//     return alphabetically_sorted;
// }

// function sort_alphabetical_artist(songs) {
//     var alphabetically_sorted = {};
//     for (var song in songs) {
//         let song_info = songs[song];
//         var artist = "N/A"
//         var artist_inital = "N/A"
//         if (song_info["artist"] != undefined) {
//             artist = song_info["artist"];
//             artist_inital = artist.charAt(0).toUpperCase();
//         }
//         if (artist_inital in alphabetically_sorted) {
//             alphabetically_sorted[artist_inital][song] = song_info;
//         } else {
//             alphabetically_sorted[artist_inital] = {};
//             alphabetically_sorted[artist_inital][song] = song_info;
//         }
//     }
//     return alphabetically_sorted;
// }

function insert_content(folder_songs, song_list) {
    for (song in folder_songs) {
        var artist = folder_songs[song]["artist"];
        var folder_name = folder_songs[song]["pack"]
        var difficulties = folder_songs[song]["difficulties"].sort((a, b) => a - b);
        var song_container = document.createElement("div");
        song_container.className = "song-container";
        var song_content = document.createElement("div");
        song_content.className = "song-content";
        var song_title = document.createElement("h2");
        song_title.className = "song-title";
        song_title.innerHTML = song;
        if (song.length > 15) {
            song_title.innerHTML = song.slice(0, 15) + '...';
        } else {
            song_title.innerHTML = song;
        }
        var song_artist = document.createElement("h5");
        song_artist.className = "song-artist";
        if (artist.length > 15) {
            song_artist.innerHTML = artist.slice(0, 15) + '...';
        } else {
            song_artist.innerHTML = artist;
        }
        var language = document.createElement("p");
        language.innerHTML = "English";
        var folder = document.createElement("p");
        folder.innerHTML = folder_name;
        var difficulties_components = document.createElement("div");
        difficulties_components.className = "difficulties";

        for (var item in difficulties) {
            var difficulty = document.createElement("p");
            difficulty.innerHTML = difficulties[item]
            difficulties_components.appendChild(difficulty);
        }
        var characteristics = document.createElement("div");
        characteristics.className = "characteristics";
        characteristics.appendChild(language);
        characteristics.appendChild(folder);
        song_content.appendChild(song_title);
        song_content.appendChild(song_artist);
        song_content.appendChild(characteristics);
        song_content.appendChild(difficulties_components);
        song_container.appendChild(song_content);
        song_list.appendChild(song_container);
    }
}

function create_collapsibles(sorted_songs) {
    for (category in sorted_songs) {
        var button = document.createElement("button");
        button.className = "collapsible"
        button.innerText = category;
        var song_list = document.createElement("div");
        song_list.className = "song-list";
        insert_content(sorted_songs[category], song_list);
        var pack_and_songs = document.createElement("div");
        pack_and_songs.className = "pack-and-songs";
        pack_and_songs.appendChild(button);
        pack_and_songs.appendChild(song_list);
        document.getElementById("body").appendChild(pack_and_songs)

    }
}
async function filter(filter_func) {
    var songs = await fetch_json();
    document.getElementById("body").innerHTML = "";
    await create_collapsibles(filter_func(songs))
}

filter(sort_by_pack);
setTimeout(() => {
    var coll = document.getElementsByClassName("collapsible");
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
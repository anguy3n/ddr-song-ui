function click_menu() {
    var x = document.getElementById("menu");
    var y = document.getElementById("cancel");
    var z = document.getElementById("menu-links")
    if (x.style.display === "block") {
        x.style.display = "none";
        y.style.display = "block";
        z.style.display = "flex";
    } else {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";
    }
}
const remote = require('electron').remote;
const fs = require('fs');
const savedPages = [];
let currentPage = "";

const setPath  = (path) => {

    const dItem = $("#path");
    dItem.html("");
    const split = path.split(" ");
    let toAdd = "";
    split.forEach(function (index, item) {
        toAdd += '<a href="#!" class="breadcrumb">' + item + '</a>';
    });
    dItem.html(toAdd);

};
const loadPage = (page, path) => {

    if(currentPage == page) return;
    $("#content").fadeOut(300);
 //   setPath(path)
    setTimeout(() => {
        if(currentPage != "") {
            const contentToSave = $("#content");
            const saveArr = [];
            contentToSave.children().each(function () {
                saveArr.push(this)
            });
            let found = false;
            for(let i = 0; i != savedPages.length; i++) {
                const currentSave = savedPages[i];

                if(currentSave.name == currentPage) {
                    found = true;
                    currentSave.content = saveArr;
                    break
                }
            }
            if(!found) {
                savedPages.push({name: currentPage, content: saveArr});
            }
        }
        currentPage = page;
        for(let i = 0; i != savedPages.length; i++) {
            const currentSave = savedPages[i];
            if(currentSave.name == page) {
                const contentItem = $("#content").html("");
                for(let i = 0; i != currentSave.content.length; i++) {
                    contentItem.append(currentSave.content[i]);
                }
                $('.button-collapse').sideNav('hide');

                setTimeout(() => {
                    $("#content").fadeIn(300)
                }, 300);
                return;
            }
        }
        const address = __dirname + "/sites/" + page + ".html";
        fs.readFile(address, 'utf8', (err,data) => {
            $("#content").html(data);
            $('.button-collapse').sideNav('hide');

            setTimeout(() => {
                $("#content").fadeIn(300)
            }, 300);
        });
    }, 300)
};
$(document).ready(() => {
    $('.button-collapse').sideNav();


    loadPage('home');
});

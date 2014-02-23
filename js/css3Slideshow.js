
function slideShow (pDiv) {
    var showTimer;
    var childElemCnt = 0, slides = [];
    var ieConsole = document.getElementById("myConsole");


    /* get actual number of child elements because 
        pDiv.childElementCount does not work inIE8 */
    var collection = pDiv.children;
    for (var x = 0; x < collection.length; x++) {
        curElem = collection[x];
        if (curElem.tagName == "DIV") {
            slides.push(curElem);
            childElemCnt++;
        }
    }
    //ieConsole.innerHTML = childElemCnt;


    var ix = 0, curObj, lastObj;

    showTimer = setInterval(function () {
        if (ix > 0){
            lastObj = curObj;
            lastObj.style.left = '900px';
        }

        curObj = slides[ix];
        curObj.style.left = '25px';
        ix++;

        if (ix >= childElemCnt) {
            clearInterval(showTimer);
        }

    }, 2000);

}
slideShow(document.getElementById("slideWrap"));
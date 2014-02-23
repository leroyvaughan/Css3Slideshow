
function slideShow (pDiv) {
    var showTimer;
    var childElemCnt = 0;

    /* get actual number of child elements because 
        pDiv.childElementCount does not work inIE8 */
    for (var x = 0; x < pDiv.childNodes.length; x++) {
        curElem = pDiv.childNodes[x];
        if (curElem.nodeType == 1) {
            childElemCnt++;
        }
    }

    var ix = 0, curObj;
    var ieConsole = document.getElementById("myConsole");

    showTimer = setInterval(function () {
        if (ix > 0){
            curObj = pDiv.children[ix - 1];
            curObj.style.left = '300px';
        }

        //ieConsole.innerHTML = ix;

        curObj = pDiv.children[ix];
        curObj.style.left = '50px';
        ix++;

        if (ix >= childElemCnt) {
            clearInterval(showTimer);
        }

    }, 2000);

}
slideShow(document.getElementById("slideWrap"));
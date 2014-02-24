function slideShow (pDiv) {
    var showTimer;
    var childElemCnt = 0, slides = [];
    var prevBtn = document.getElementById("prevBtn")
    var nextBtn = document.getElementById("nextBtn");
    
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


    var ix = 0, curObj, lastObj;
    showTimer = setInterval(function () {
        if (ix > 0){
            lastObj = curObj;
            lastObj.style.left = '900px';
        }

        curObj = slides[ix];
        curObj.style.left = '25px';
        ix++;

        //slideshow is over now...
        if (ix >= childElemCnt) {
            clearInterval(showTimer);

            /*  NOW ACTIVATE THE BTNS   */
            //add event handler to 'previous' button
            if (!prevBtn.addEventListener) {//for IE8
                prevBtn.attachEvent("onclick", prevSlide);
            }
            else {
                prevBtn.addEventListener("click", prevSlide, false);
            }
            addClass(prevBtn, "active");

            //add event handler to 'next' button
            if (!nextBtn.addEventListener) {//for IE8
                nextBtn.attachEvent("onclick", nextSlide);
            }
            else {
                nextBtn.addEventListener("click", nextSlide, false);
            }
        }
    }, 2000);


    function prevSlide() {
        var curIX = ix - 1;
        if (curIX > 0) {
            lastObj = slides[curIX];
            lastObj.style.left = '-650px';

            curObj = slides[curIX - 1];
            curObj.style.left = '25px';
            ix--;

            //now check slide index again for active state
            if (curIX > 0) {
                addClass(nextBtn, "active");

                if(curIX === 1) {
                    removeClass(prevBtn, "active");
                }
            }
        }
    }

    function nextSlide() {
        addClass(prevBtn, "active");

        if (ix < slides.length) {
            lastObj = curObj;
            lastObj.style.left = '900px';

            curObj = slides[ix];
            curObj.style.left = '25px';
            ix++;

            if (ix === slides.length) {
                removeClass(nextBtn, "active");
            }
        }
    }


    /* generic functions to add/remove CSS class from an element */
    function addClass(curElem, newClass) {
        var _curClass = curElem.className;

        if (_curClass.indexOf(newClass) < 0) {
            curElem.className = _curClass + " " + newClass;
        }
    }
    function removeClass(curElem, oldClass) {
        if (curElem.className.indexOf(oldClass) > -1) {
            var _curClasses = curElem.className.split(" ");
            var _newClasses = [];
            for (xx = 0; xx < _curClasses.length; xx++) {
                if (oldClass !== _curClasses[xx]) {
                    _newClasses.push(_curClasses[xx]);
                }
            }
            curElem.className = _newClasses.join(" ");
        }
    }



    /*********************************************************************************
        BEGIN:      IE8 hackery, i'm not caring about IE7 at this point anymore.
    *********************************************************************************/
        function doIE8Btns(theBtn, newText) {
            theBtn.innerHTML = newText;
            addClass(theBtn, "ie8");
        }

        //ieConsole.innerHTML = navigator.appName + " " + navigator.appVersion;
        var browserVer = navigator.appVersion;

        if (browserVer.indexOf("MSIE 8.0") > 0) {
            doIE8Btns(document.getElementById("prevBtn"), "prev");
            doIE8Btns(document.getElementById("nextBtn"), "next");
        }

        //uses an html element in place of the console developer tool
        var ieConsole = function (logTxt) {
            var _IEconsole = document.getElementById("myConsole");
            _IEconsole.innerHTML = logTxt;
        };
    /*********************************************************************************
        END:        IE8 hackery, i'm not caring about IE7 at this point anymore.
    *********************************************************************************/
}//end slideShow() function


slideShow(document.getElementById("slideWrap"));



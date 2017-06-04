window.addEventListener('load', initFuncs);

function initFuncs() {
  var ins = document.getElementsByTagName("input");
  var buts = document.getElementsByTagName("button");
  var ps = document.getElementsByTagName("p");

  var plusMinus = document.getElementsByClassName("plusMinus")[0];
  var showMe = document.getElementById("hideMe");

  var consonants = ['b','bl','br','c','ch','cl','cr','d','dr','e','f','g','gl',
    'gr','h','i','j','k','kn','l','m','n','o','p','ph','pl','pr','qu','r','s','sh',
    'sl','sr','st','str','t','th','tr','u','v','w','wr','x','y','z'];
  var consonantsV = ['','b','rb','c','ch','lc','rc','d','ld','rd','e','f','g',
    'lg','rg','h','i','j','k','ck','nk','l','ll','m','n','o','p','ph','lp','rp',
    'qu','r','s','sh','ls','rs','ts','rts','t','th','rt','u','v','w','wr','x','rx',
    'y','l','z'];
  var vowels = ['a','e','i','o','u','y'];
  var builtWord = "";

  plusMinus.onclick = function () {
    if (this.innerHTML == "+") {
      showMe.style.display = "block";
      this.innerHTML = "&ndash;";
    } else {
      showMe.style.display = "none";
      this.innerHTML = "+";
    }
  }
  buts[0].onclick = randomWord;
  ins[0].addEventListener("keypress", function () { if (event.keyCode == 13) {
   buts[0].click(); }});

    function randomWord() {

      var getString = ins[0].value;
      var bPos = getString.indexOf("bomasha");
      var nPos;
      var getDigit;
      var getSyllables;
      var replaceMe;

      if (bPos != -1) {
        nPos = bPos + 7;
        getDigit = getString.charAt(nPos);
        replaceMe = "bomasha" + getDigit;
        getSyllables = Number(getDigit);

       if (isNaN(getSyllables) || getSyllables == 0) {
          getSyllables = Math.ceil(Math.random()*9);
        }
      wordBuilder(getSyllables);
      }
      ps[0].innerHTML = getString.replace(replaceMe, builtWord);
      builtWord = "";
      ins[0].value = "";
    }

    function wordBuilder(syllableCount) {
      var firstToss;
      var secondToss;
      var firstChoose;
      var secondChoose;
      var innerSwitch = 0;

      for (var i = 0; i < syllableCount; i++) {
        firstToss = (innerSwitch == 1)? 0.25 : Math.random();
        secondToss = Math.random();

        firstChoose = (firstToss >= 0.5)?
          Math.floor(Math.random()*vowels.length) :
          Math.floor(Math.random()*consonants.length);
        secondChoose = (firstToss >= 0.5 && secondToss < 0.5)?
          Math.floor(Math.random()*consonants.length) :
          Math.floor(Math.random()*vowels.length);

        builtWord += (firstToss >= 0.5)? vowels[firstChoose] :
          consonants[firstChoose];
        builtWord += (firstToss >= 0.5 && secondToss < 0.5)?
          consonantsV[secondChoose] : vowels[secondChoose];

        innerSwitch = (firstToss >= 0.5 && secondToss >= 0.5)? 1 : 0;
      }
   }
}

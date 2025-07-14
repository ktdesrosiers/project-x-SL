window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script9 = function()
{
  /* This loads the project js and othr css or external/js libraries from an external repo in order to facilitate
more of an object oriented aprpoach and deal with the outdated SL
development environment. You will see this particular
trigger in several scenes but it should be disabled. This was done to unit
test a slide or scene and associated routeins without having to preview the whole project.
On final publish, this should be the only functional trigger to load the script.
As well, the script can be loaded form the final packge by changing the path to a relative file and
including the js file with the distro.
   */
    
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            if (callback) callback();
        };
        script.onerror = () => {
            console.error(`Error loading script: ${src}`);
        };
        document.head.appendChild(script);
    }

    // note the URL param here in the path (?876087690). This forces the browser to update the chache so change the number each time you preview if you have changed the external JS.
    loadScript('https://ktdesrosiers.github.io/project-x-SL/proj-x.js?09808', () => {
        console.log('Project Script loaded successfully!');
    });    

// Load css
const loadCSS = (url) => {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
};

loadCSS('https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css');
loadCSS('https://npmcdn.com/flatpickr/dist/themes/material_green.css');
// Available themes: dark, material_blue, material_green, material_red, material_orange, airbnb, confetti

loadScript('https://cdn.jsdelivr.net/npm/flatpickr', () => {
console.log('Date picker loaded');

});

}

window.Script10 = function()
{
  const sentenceDiv = object('5aJIbj1qwRm');
const player = GetPlayer();
   
   
 const sentences = [
      "Obtaining copyright.",
      "Ensuring timelines are met.",
      "Routing manuscripts.",
      "Submitting to publications.",
      "Lining up speaking events."
    ];


    let current = 0;

    // Animation distances
    function getDistance() {
      // Get container width for responsive animation
      //const container = sentenceDiv.x;
      return 1960; // 200px buffer
    }

    async function animateSentence(text) {
      //sentenceDiv.textContent = text;
      player.SetVar("busy_text",text)
      // Reset position to off-screen left
      //sentenceDiv.style.opacity = 1;
      //sentenceDiv.style.transform = `translate(-${getDistance()}px, -50%)`;

      // Animate in from left to center
      await sentenceDiv.animate([
        { transform: 'translateX(-500px)', opacity: 0 },
        { transform: 'translateX(0px)', opacity: 1 }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.77,0,0.175,1)',
        fill: 'forwards'
      }).finished;

      // Hold in center for 2 seconds
      await new Promise(res => setTimeout(res, 2000));

      // Animate out to right
      await sentenceDiv.animate([
        { transform: 'translateX(0px)', opacity: 1 },
        { transform: 'translateX(500px)', opacity: 0 }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.77,0,0.175,1)',
        fill: 'forwards'
      }).finished;

      // Wait 1 second before next loop
      await new Promise(res => setTimeout(res, 1000));
    }

    async function loopSentences() {
      while (true) {
        await animateSentence(sentences[current]);
        current = (current + 1) % sentences.length;
      }
    }



    loopSentences();

}

window.Script11 = function()
{
  var player = GetPlayer();
player.SetVar("ass_stem","");
player.SetVar("ass_ch_1","");
player.SetVar("ass_ch_2","");
player.SetVar("ass_ch_3","");
player.SetVar("ass_ch_4","");
player.SetVar("ass_ch_5","");
}

window.Script12 = function()
{
  loadquest();
}

window.Script13 = function()
{
  handlechoice("ch2");
}

window.Script14 = function()
{
  handlechoice("ch3");
}

window.Script15 = function()
{
  handlechoice("ch4");
}

window.Script16 = function()
{
  handlechoice("ch5");
}

window.Script17 = function()
{
  handlechoice("ch1");

/*
var player = GetPlayer();
var current_task = player.GetVar("cur_ass_task");
var q_value = player.GetVar("ch1_val");
var ass_code = player.GetVar("current_assessment");
player.SetVar(current_task+"_sc",q_value);
let curscore = player.GetVar(ass_code+"_score");
curscore = player.GetVar("ch1_val") + curscore;
let q_total = player.GetVar("skill_ass_q_total");
player.SetVar(ass_code+"_score",curscore);

function calculatePercentageScore(pointsEarned, numberOfQuestions) {
  const maxPoints = numberOfQuestions * 5;
  const percentage = (pointsEarned / maxPoints) * 100;
  return percentage.toFixed(2); // returns percentage with 2 decimal places
}

let newpercent = calculatePercentageScore(curscore, q_total);
player.SetVar(ass_code+"_score_percent",newpercent);
*/


}

window.Script18 = function()
{
  displayresults();
}

window.Script19 = function()
{
  displaycoaching_progress("onboarding");

}

window.Script20 = function()
{
  activatedp();
}

window.Script21 = function()
{
  displaycoaching_progress("overview");
coach("im","im_key_prior");
coach("st","st_key_prior");
coach("et","et_key_prior");
}

window.Script22 = function()
{
      var player = GetPlayer();
     var url = player.GetVar("Test_hl");
     var parser = new DOMParser();
     var doc = parser.parseFromString(url, "text/html");
     var link = doc.querySelector("a");
     if (link) {
         window.open(link.href, "_blank");
     }
}

window.Script23 = function()
{
  function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            if (callback) callback();
        };
        script.onerror = () => {
            console.error(`Error loading script: ${src}`);
        };
        document.head.appendChild(script);
    }

    // note the URL param here in the path (e.g. ?876087690). This forces the browser to update the chache so change the number each time you preview if you have changed the external JS.
loadScript('https://ktdesrosiers.github.io/project-x-SL/proj-x.js?256548', () => {
        // for unit testing a slide you can place a funciton here that you want to execture right away on the slide timeline. Make sure to replicate your funcitoncall in a seperate trigger so that when you remove this later on you don;t lose your function call.
        console.log('Project Script loaded successfully!');
        orderDomainCards("im");
        //displaycoaching_progress("im");
    });    

// Load css
const loadCSS = (url) => {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
};

loadCSS('https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css');
loadCSS('https://npmcdn.com/flatpickr/dist/themes/material_green.css');
// Available themes: dark, material_blue, material_green, material_red, material_orange, airbnb, confetti

loadScript('https://cdn.jsdelivr.net/npm/flatpickr', () => {
console.log('Date picker loaded');

});

}

window.Script24 = function()
{
  launchlesson("imx");
}

window.Script25 = function()
{
  launchlesson("im2");
}

window.Script26 = function()
{
  launchlesson("im3");
}

window.Script27 = function()
{
  launchlesson("im4");
}

window.Script28 = function()
{
  launchlesson("im5");
}

};

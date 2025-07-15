function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6Y3EMfVy2HE":
        Script1();
        break;
      case "6ogxIVqxn0D":
        Script2();
        break;
      case "6jLOplF16BP":
        Script3();
        break;
      case "68JzWQkuUV1":
        Script4();
        break;
      case "6rJanrpNdhh":
        Script5();
        break;
      case "6SXqV884e5o":
        Script6();
        break;
      case "6F2OleT1GmV":
        Script7();
        break;
      case "6YBRQTuhzVV":
        Script8();
        break;
      case "5dYCnmP7IsV":
        Script9();
        break;
      case "5tthF10uikS":
        Script10();
        break;
      case "5cF0Xpzzpiw":
        Script11();
        break;
      case "624EZKFq7oy":
        Script12();
        break;
      case "6HRg8b5NPcb":
        Script13();
        break;
      case "6Fmw2VlsF0s":
        Script14();
        break;
      case "642vRdsm5WS":
        Script15();
        break;
      case "6JMBflZlrmp":
        Script16();
        break;
      case "5UzZvDJRVXn":
        Script17();
        break;
      case "6PNWAejBSPR":
        Script18();
        break;
      case "6lrtn8k9Qt3":
        Script19();
        break;
      case "6gl6MhBmsny":
        Script20();
        break;
      case "5ob0edYsg0G":
        Script21();
        break;
      case "5vYOpS8UIAa":
        Script22();
        break;
      case "6XcpHU5CMJe":
        Script23();
        break;
      case "6cyqzuObgGV":
        Script24();
        break;
      case "63XkkJw1j1U":
        Script25();
        break;
      case "5tRRvs9vesc":
        Script26();
        break;
      case "6Z4qlEzhQ6L":
        Script27();
        break;
      case "6p8hRszEXEN":
        Script28();
        break;
  }
}

window.InitExecuteScripts = function()
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
window.Script1 = function()
{
  player.once(() => {
const target = object('6eoOnGrnpMP');
const duration = 750;
const easing = 'ease-out';
const id = '6X8jT42tsvm';
const growAmount = 0.3;
const delay = 500;
addToTimeline(
target.animate(
[ {scale: `${1 + growAmount}` } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script2 = function()
{
  player.once(() => {
const target = object('6JNDs7c38td');
const duration = 750;
const easing = 'ease-out';
const id = '5aFEThfAfwb';
const growAmount = 0.2;
const delay = 1000;
addToTimeline(
target.animate(
[ {scale: `${1 + growAmount}` } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script3 = function()
{
  player.once(() => {
const target = object('66lsgLS4TNL');
const duration = 750;
const easing = 'ease-out';
const id = '6WwA4t7nliE';
const growAmount = 0.3;
const delay = 1500;
addToTimeline(
target.animate(
[ {scale: `${1 + growAmount}` } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script4 = function()
{
  const target = object('6X0d5P7Se9n');
const duration = 750;
const easing = 'ease-out';
const id = '6rpdJVOv2YR';
const shakeAmount = 2;
player.addForTriggers(
id,
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script5 = function()
{
  const target = object('5dr0ULkGfkF');
const duration = 750;
const easing = 'ease-out';
const id = '5wXUV5ubk2b';
const shakeAmount = 2;
player.addForTriggers(
id,
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script6 = function()
{
  const target = object('6KfzLu2lAir');
const duration = 750;
const easing = 'ease-out';
const id = '6AlvB7Zl3MF';
const shakeAmount = 2;
player.addForTriggers(
id,
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script7 = function()
{
  const target = object('5gFAVeFdLuv');
const duration = 750;
const easing = 'ease-out';
const id = '6okhJp9RrqB';
const shakeAmount = 2;
player.addForTriggers(
id,
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script8 = function()
{
  const target = object('65naTRpwO09');
const duration = 750;
const easing = 'ease-out';
const id = '5oQyeDRITBZ';
const shakeAmount = 2;
player.addForTriggers(
id,
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

};

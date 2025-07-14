function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6BIwL2Vbj3Y":
        Script1();
        break;
      case "64zY6vakdGn":
        Script2();
        break;
      case "6ARfiILvC8d":
        Script3();
        break;
      case "6fEmgCmNohk":
        Script4();
        break;
      case "6ni8tpebIx3":
        Script5();
        break;
      case "5XvL2qxRSpH":
        Script6();
        break;
      case "6OIiLlrzU0f":
        Script7();
        break;
      case "5vr6wd9r03O":
        Script8();
        break;
      case "6BfmbA7XuxO":
        Script9();
        break;
      case "5Utnd87iJKA":
        Script10();
        break;
      case "6TboYqKCHLn":
        Script11();
        break;
      case "64WdbHA79xU":
        Script12();
        break;
      case "69nlAMdVrnD":
        Script13();
        break;
      case "6bTJKWprQhl":
        Script14();
        break;
      case "6U3iCPy8woq":
        Script15();
        break;
      case "6E1xucgYsmh":
        Script16();
        break;
      case "6CCnEL37WpO":
        Script17();
        break;
      case "6rVzubibgMT":
        Script18();
        break;
      case "5ZBCYrKPSKm":
        Script19();
        break;
      case "6ZjwB2EwPWr":
        Script20();
        break;
      case "5cYGYffaJJ6":
        Script21();
        break;
      case "64v1W617hNF":
        Script22();
        break;
      case "6AfNRBg3UNv":
        Script23();
        break;
      case "5y8pnLneFeq":
        Script24();
        break;
      case "6msfjclANIK":
        Script25();
        break;
      case "5Vmck95oeCy":
        Script26();
        break;
      case "6dwY5Zyxjcy":
        Script27();
        break;
      case "6BuOjP3oacc":
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

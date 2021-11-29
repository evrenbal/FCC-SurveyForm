var step = 0;
var totalSteps = 9;

window.addEventListener('load', function () {
  for(i=0;i<step;i++) {
    deactivateStep(i);
  }
  for(i=step+1;i<=totalSteps;i++) {
    deactivateStep(i);
  }
  activateStep(step);
});



document.querySelectorAll('button.next').forEach( (val) => {val.addEventListener('click', function (event) {
  event.preventDefault();
  nextStep();
})});

document.querySelectorAll('button.prev').forEach( (val) => {val.addEventListener('click', function (event) {
  event.preventDefault();
  prevStep();
})});



window.addEventListener('keydown', function (event) {

  var isTextArea = event.target.type == 'textarea';  

  if ( 13 == event.keyCode && !isTextArea)
  {
    event.stopPropagation();
    event.preventDefault();
    nextStep();
  }
});


function nextStep()
{
  if ( !validateStep() )
  {
    document.getElementById("step-"+step).classList.add('failure');
    return;
  }
  deactivateStep(step);
  if(step == totalSteps)
  {
    document.getElementById('survey-form').reset();
    step = -1;
  }
  step++;
  console.log(step);
  activateStep(step);
}

function deactivateStep(step) {
  var elem = document.getElementById('step-'+step);
  document.querySelector('main').classList.remove('step-'+step);
  if (!elem)
  return;
  elem.classList.add("out");
  elem.classList.remove("failure");
}

function activateStep(step) {
  var elem = document.getElementById('step-'+step);
  document.querySelector('main').classList.add('step-'+step);
  if (!elem)
    return;
  elem.classList.remove("out");
  if(elem.querySelector('.focus'))
    setTimeout(() => {elem.querySelector('.focus').focus();}, 1000);
}


function prevStep()
{
  if( 0 == step )
    return;
    deactivateStep(step);
    step--;
    activateStep(step);
}

function validateStep()
{

  switch (step) {
    case 1:
      return document.getElementById('name').validity.valid;
    case 2:
      return document.getElementById('email').validity.valid;
    case 3:
      return document.getElementById('number').validity.valid;
    case 4:
      return document.getElementById('dropdown').value>0
    case 5:
      return document.querySelector('input[name="recommend"]:checked ');
    case 6:
      return document.getElementById('dropdown-2').value>0
    case 7:
      return document.querySelector('#step-7 input[type="checkbox"]:checked ');
  }
  return true;
}
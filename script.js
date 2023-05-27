const hoursSelect = document.getElementById("hours-select");
const minutesSelect = document.getElementById("minutes-select");
for(let i=0 ; i<=12 ; i++){
    const option = document.createElement('option');
    (i<10) ? i = '0'+i : i;
    option.value = i;
    option.textContent = i;
    hoursSelect.appendChild(option);
}
for(let i=0 ; i<=59 ; i++){
    const option = document.createElement('option');
    (i<10) ? i = '0'+i : i;
    option.value = i;
    option.textContent = i;
    minutesSelect.appendChild(option);
}


const alarmTimeInput = document.getElementById('alarm-time-input');
const submitButton = alarmTimeInput.elements.setAlarmButton;
const allSelects = document.querySelectorAll('select');
const alarmSound = new Audio('ringtone.mp3');
console.log(allSelects);
let alarmTime;
submitButton.addEventListener('click', (e)=>{
    e.preventDefault();

    if(e.target.value === 'Set Alarm'){
        const hh = alarmTimeInput.elements[0].value;
        const mm = alarmTimeInput.elements[1].value;
        const am_pm = alarmTimeInput.elements[2].value;
        
        if(hh=='hour' || mm=='minutes' || am_pm=='am-pm'){
            allSelects.forEach((e)=>{
                if(e.value=='hour' || e.value=='minutes' || e.value=='am-pm'){
                    e.parentElement.classList.add('error');
                }
                else{
                    e.parentElement.classList.remove('error');
                }
            });
        }
        else{
            allSelects.forEach((e)=>{
                e.parentElement.classList.remove('error');
            });
            e.target.value = 'Clear Alarm';
            allSelects.forEach((e)=>{
                e.classList.toggle('fade');
            });
            alarmTime = `${hh}:${mm} ${am_pm}`;
        }
    }
    else if(e.target.value === 'Clear Alarm'){
        e.target.value = 'Set Alarm';
        alarmTime = undefined;
        allSelects.forEach((e)=>{
            e.classList.toggle('fade');
        });
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
});


const displayCurrentTime = document.querySelector(".display-current-time");
const getTime = ()=>{
    const date = new Date();
    const hh24HoursFormat = date.getHours();
    const am_pm = (hh24HoursFormat>=12) ? 'PM' : 'AM';
    let hh = (hh24HoursFormat>12) ? hh24HoursFormat-12 : hh24HoursFormat;
    hh = (hh<10) ? '0'+hh : hh;
    let mm = date.getMinutes();
    mm = (mm<10) ? '0'+mm : mm;
    const time = `${hh}:${mm} ${am_pm}`
    displayCurrentTime.textContent = time;

    if(time == alarmTime){
        alarmSound.play();
    }
    else{
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
}
setInterval(getTime, 1000);
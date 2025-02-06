//popup box for welcoming
    
    
    
    
    const leftDoor = document.getElementById('leftDoor');
        const rightDoor = document.getElementById('rightDoor');
        const openButton = document.getElementById('openButton');
        const closeButton = document.getElementById('closeButton');
        
        openButton.addEventListener('click', () => {
            leftDoor.classList.add('opened');
            rightDoor.classList.add('opened');
        });
        
        closeButton.addEventListener('click', () => {
            leftDoor.classList.remove('opened');
            rightDoor.classList.remove('opened');
        });
        
        //this code will disable start on off button untill the specimen is selected
        function enableRadios() {
            const dropdown = document.getElementById("options");
            const radio1 = document.getElementById("radio1");
            const radio2 = document.getElementById("radio2");
            
            if (dropdown.value !== "") {
              radio1.disabled = false;
              radio2.disabled = false;
            } else {
              radio1.disabled = true;
              radio2.disabled = true;
            }
          }

          //this code will disable open door button untill on button is not checked
          function enabledoor() {
            const openButton = document.getElementById('openButton');

            const radio1 = document.getElementById("radio1");
            
            
            if (radio1.checked) {
        
                openButton.disabled= false;
            } else {
              
                openButton.disabled= true;
            }
          }

          
          //this code will disable standBy/ON button untill door closed button is not pressed
          openButton.addEventListener('click', () => {
            document.getElementById("standbyRadio").disabled = false;
          })

//check box of X-Ray Tube
           
function enablecounter() {
    const standbyRadio = document.getElementById("standbyRadio");
const counterBox1 = document.getElementById("counter-box-1");
const counterBox2 = document.getElementById("counter-box-2");
if ( standbyRadio.checked){
    counterBox1.disabled=false;

}
else{
    counterBox1.disabled=true;
}

}


            // JavaScript to update the counter boxes
            const standbyRadio = document.getElementById("standbyRadio");
            const counterBox1 = document.getElementById("counter-box-1");
            const counterBox2 = document.getElementById("counter-box-2");
            
            let count1 = 0;
            let count2 = 0;
            const increment = 1; // Set the increment value
            const delay = 100; // Set the delay in milliseconds (1 second in this example)
            const maxCount = 50; // Set the maximum count value
            let countingEnabled = false;
            
            function enablecounter() {
                if (standbyRadio.checked && countingEnabled) {
                    updateCounter();
                }
            }
            
            function updateCounter() {
                if (count1 < maxCount) {
                    count1 += increment;
                    counterBox1.innerText = count1;
                }
            
                if (count2 < maxCount) {
                    count2 += increment;
                    counterBox2.innerText = count2;
                }
            
                if (count1 < maxCount || count2 < maxCount) {
                    setTimeout(updateCounter, delay);
                }
            }
            
            // Call enablecounter() when standbyRadio state changes
            standbyRadio.addEventListener('change', () => {
                countingEnabled = standbyRadio.checked;
                if (countingEnabled) {
                    // Start updating the counter boxes when standby is ON
                    updateCounter();
                }
            });
          
// this code will hide the sample initially but as we click open button it will appear.

            const opendoorButton = document.getElementById('openButton');
            const overlayImage3 = document.querySelector('.overlay-image3');
            
            openButton.addEventListener('click', () => {
                // Show the overlay image when the "Open Door" button is clicked
                setTimeout(function () {
document.getElementById("sample").style.display = "block";
                }, 1000);
            });

           












document.addEventListener('DOMContentLoaded', function() {
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    const p3 = document.getElementById('p3');
    const p4 = document.getElementById('p4');
    const p5 = document.getElementById('p5');
    const p6 = document.getElementById('p6');
    const p7 = document.getElementById('p7');
    const p8= document.getElementById('p8');
    const p9= document.getElementById('p9');

    const options = document.getElementById('options');
    const radio1 = document.getElementById('radio1');
    const openButton = document.getElementById('openButton');
    const closeButton = document.getElementById('closeButton');
    const standbyRadio = document.getElementById('standbyRadio');
    const endAngleInput = document.getElementById('end');
    const stepSize = document.getElementById('size');
    const scanRate = document.getElementById('rate');
   
    options.addEventListener('change', function() {
        p1.style.display = 'none';
        p2.style.display = 'block';
        speakText('Now please On the machine');
    });

    radio1.addEventListener('change', function() {
        p2.style.display = 'none';
        p3.style.display = 'block';
        speakText('Now please open the door ');
    });

    openButton.addEventListener('click', function() {
        p3.style.display = 'none';
        p4.style.display = 'block';
        document.getElementById("sample").style.display = "block";
        speakText('Now please close the door');
    });

    closeButton.addEventListener('click', function() {
        p4.style.display = 'none';
        p5.style.display = 'block';
        speakText('Now please check the standby on button');
    });

    standbyRadio.addEventListener('change', function() {
        if (standbyRadio.checked) {
            p5.style.display = 'none';
            p6.style.display = 'block';
        }
        speakText('Now please set start and end angle');
    });

    endAngleInput.addEventListener('input', function() {
        p6.style.display = 'none';
        p7.style.display = 'block';
        speakText('Now please select the step size');
    });
    stepSize.addEventListener('input', function() {
        p7.style.display = 'none';
        p8.style.display = 'block';
        speakText('Now please set the Scanrate');
    });
    scanRate.addEventListener('input', function() {
        p8.style.display = 'none';
        p9.style.display = 'block';
        speakText('Now please start scanning');
    });
});

const synth = window.speechSynthesis;

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}


const startScan= document.getElementById('startScan');
const graphImg = document.querySelector('graph');

startScan.addEventListener('click', () => {
    // Show the overlay image when the "Open Door" button is clicked
    setTimeout(function () {
document.getElementById("graph").style.display = "block";
    }, 2000);
});
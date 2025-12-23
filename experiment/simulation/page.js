// ===== XRD DATA FOR DIFFERENT SPECIMENS =====
const xrdData = {
    alm: {
        name: "ALUMINIUM",
        peaks: [
            { angle: 38.5, intensity: 100, fwhm: 0.2 },
            { angle: 44.7, intensity: 47, fwhm: 0.18 },
            { angle: 65.1, intensity: 33, fwhm: 0.22 },
            { angle: 78.3, intensity: 27, fwhm: 0.25 }
        ],
        lambda: 1.5406,
        k: 0.9
    },
    gla: {
        name: "GLASS",
        peaks: [
            { angle: 22.0, intensity: 100, fwhm: 5.0 }
        ],
        lambda: 1.5406,
        k: 0.9
    },
    ppr: {
        name: "PAPER",
        peaks: [
            { angle: 16.5, intensity: 85, fwhm: 3.0 },
            { angle: 22.8, intensity: 100, fwhm: 2.5 },
            { angle: 34.5, intensity: 45, fwhm: 4.0 }
        ],
        lambda: 1.5406,
        k: 0.9
    },
    snd: {
        name: "SAND",
        peaks: [
            { angle: 20.8, intensity: 100, fwhm: 0.15 },
            { angle: 26.6, intensity: 67, fwhm: 0.18 },
            { angle: 36.5, intensity: 33, fwhm: 0.20 },
            { angle: 50.1, intensity: 25, fwhm: 0.22 }
        ],
        lambda: 1.5406,
        k: 0.9
    },
    cpr: {
        name: "COPPER",
        peaks: [
            { angle: 43.3, intensity: 100, fwhm: 0.17 },
            { angle: 50.4, intensity: 46, fwhm: 0.19 },
            { angle: 74.1, intensity: 20, fwhm: 0.21 },
            { angle: 89.9, intensity: 17, fwhm: 0.23 }
        ],
        lambda: 1.5406,
        k: 0.9
    }
};

// ===== DOM ELEMENTS =====
const leftDoor = document.getElementById('leftDoor');
const rightDoor = document.getElementById('rightDoor');
const openButton = document.getElementById('openButton');
const closeButton = document.getElementById('closeButton');
const options = document.getElementById('options');
const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2');
const standbyRadio = document.getElementById('standbyRadio');
const startAngleInput = document.getElementById('startAngle');
const endAngleInput = document.getElementById('endAngle');
const stepsizeSelect = document.getElementById('stepsize');
const scanrateSelect = document.getElementById('scanrate');
const startScan = document.getElementById('startScan');
const sampleImage = document.getElementById('sample');
const scanTimeDisplay = document.getElementById('scanTimeDisplay');

// Source & detector images for animation
const sourceImg = document.getElementById('source');
const detectorImg = document.getElementById('detector');

// ===== INSTRUCTION ELEMENTS =====
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const p3 = document.getElementById('p3');
const p4 = document.getElementById('p4');
const p5 = document.getElementById('p5');
const p6 = document.getElementById('p6');
const p7 = document.getElementById('p7');
const p8 = document.getElementById('p8');
const p9 = document.getElementById('p9');

// ===== COUNTER VARIABLES =====
let count1 = 0;
let count2 = 0;
const maxCount = 50;
let kVInterval, mAInterval;

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function () {
    console.log("XRD Simulator Initialized");

    // Initialize counters
    const cb1 = document.getElementById('counter-box-1');
    const cb2 = document.getElementById('counter-box-2');
    if (cb1) cb1.innerText = '0';
    if (cb2) cb2.innerText = '0';

    // Setup initial state
    setupInitialState();

    // Setup event listeners
    setupEventListeners();

    console.log("Elements found:", {
        scanrateSelect: scanrateSelect,
        startScan: startScan,
        standbyRadio: standbyRadio
    });
});

function setupInitialState() {
    // Disable all controls initially
    disableAllControls();

    // Set default values
    startAngleInput.value = '5';
    endAngleInput.value = '80';

    // Update scan time display
    updateScanTime();
}

function disableAllControls() {
    // Power controls
    radio1.disabled = true;
    radio2.disabled = true;
    radio2.checked = true;

    // Door controls
    openButton.disabled = true;
    closeButton.disabled = true;

    // X-Ray controls
    standbyRadio.disabled = true;
    standbyRadio.checked = false;

    // Scan controls
    startAngleInput.disabled = true;
    endAngleInput.disabled = true;
    stepsizeSelect.disabled = true;
    scanrateSelect.disabled = true;
    startScan.disabled = true;
}

// ===== EVENT LISTENERS SETUP =====
function setupEventListeners() {
    console.log("Setting up event listeners");

    // Door control
    openButton.addEventListener('click', function () {
        console.log("Opening door");
        leftDoor.classList.add('opened');
        rightDoor.classList.add('opened');

        // Show sample after delay
        setTimeout(function () {
            sampleImage.style.display = "block";
        }, 500);

        // Enable close button
        closeButton.disabled = false;

        // Enable standby radio button
        standbyRadio.disabled = false;

        // Update instruction
        if (p3.style.display === 'block') {
            p3.style.display = 'none';
            p4.style.display = 'block';
            speakText('Now please close the door');
        }
    });

    closeButton.addEventListener('click', function () {
        console.log("Closing door");
        leftDoor.classList.remove('opened');
        rightDoor.classList.remove('opened');

        // Update instruction
        if (p4.style.display === 'block') {
            p4.style.display = 'none';
            p5.style.display = 'block';
            speakText('Now please check the standby on button');
        }
    });

    // Standby radio event
    standbyRadio.addEventListener('change', function () {
        console.log("Standby radio changed, checked:", this.checked);

        if (this.checked) {
            console.log("Standby ON - enabling all scan controls");
            startCounters();

            // ENABLE ALL SCAN CONTROLS
            startAngleInput.disabled = false;
            endAngleInput.disabled = false;
            stepsizeSelect.disabled = false;
            scanrateSelect.disabled = false;
            startScan.disabled = false;

            // Set default scan rate
            scanrateSelect.value = '0.08';

            // Add event listeners for scan controls
            startAngleInput.addEventListener('input', handleAngleInput);
            endAngleInput.addEventListener('input', handleAngleInput);
            stepsizeSelect.addEventListener('change', handleStepSizeChange);
            scanrateSelect.addEventListener('change', handleScanRateChange);

            // Update scan time initially
            updateScanTime();

            // Update instruction
            if (p5.style.display === 'block') {
                p5.style.display = 'none';
                p6.style.display = 'block';
                speakText('Now please set start and end angle');
            }

            console.log("Scan controls enabled. Scanrate select disabled:", scanrateSelect.disabled);
        }
    });

    // Start scan button
    startScan.addEventListener('click', function () {
        console.log("Start scan button clicked");
        startSimulation();
    });
}

// ===== MAIN FUNCTIONS =====
function enableRadios() {
    const dropdown = document.getElementById("options");
    const radio1 = document.getElementById("radio1");
    const radio2 = document.getElementById("radio2");

    console.log("Specimen selected:", dropdown.value);

    if (dropdown.value !== "") {
        radio1.disabled = false;
        radio2.disabled = false;
        radio2.checked = true;

        // Update instruction
        p1.style.display = 'none';
        p2.style.display = 'block';
        speakText('Now please turn on the machine');
    } else {
        radio1.disabled = true;
        radio2.disabled = true;
    }
}

function enabledoor() {
    const openButton = document.getElementById('openButton');
    const radio1 = document.getElementById("radio1");

    if (radio1.checked) {
        console.log("Power ON - enabling door");
        openButton.disabled = false;

        // Update instruction
        if (p2.style.display === 'block') {
            p2.style.display = 'none';
            p3.style.display = 'block';
            speakText('Now please open the door');
        }
    } else {
        console.log("Power OFF - disabling door");
        openButton.disabled = true;
    }
}

function handleAngleInput() {
    console.log("Angle input changed");
    updateScanTime();

    // Check if both angles are set
    if (startAngleInput.value && endAngleInput.value && p6.style.display === 'block') {
        p6.style.display = 'none';
        p7.style.display = 'block';
        speakText('Now please select the step size');
    }
}

function handleStepSizeChange() {
    console.log("Step size changed");
    if (p7.style.display === 'block') {
        p7.style.display = 'none';
        p8.style.display = 'block';
        speakText('Now please set the Scanrate');
    }
}

function handleScanRateChange() {
    console.log("Scan rate changed to:", scanrateSelect.value);
    updateScanTime();

    if (p8.style.display === 'block') {
        p8.style.display = 'none';
        p9.style.display = 'block';
        speakText('Now please start scanning');
    }
}

function updateScanTime() {
    const startAngle = parseFloat(startAngleInput.value) || 5;
    const endAngle = parseFloat(endAngleInput.value) || 80;
    const scanRate = parseFloat(scanrateSelect.value) || 0.08;

    console.log("Updating scan time. Start:", startAngle, "End:", endAngle, "Rate:", scanRate);

    if (startAngle >= endAngle) {
        scanTimeDisplay.textContent = "Invalid";
        return;
    }

    const scanTime = (endAngle - startAngle) / scanRate;
    scanTimeDisplay.textContent = scanTime.toFixed(2) + ' sec';

    console.log("Scan time calculated:", scanTime.toFixed(2), "seconds");
}

function startCounters() {
    console.log("Starting counters");

    // Clear any existing intervals
    clearInterval(kVInterval);
    clearInterval(mAInterval);

    // Reset counters
    count1 = 0;
    count2 = 0;
    document.getElementById('counter-box-1').innerText = '0';
    document.getElementById('counter-box-2').innerText = '0';

    // Start kV counter
    kVInterval = setInterval(function () {
        if (count1 < maxCount) {
            count1++;
            document.getElementById('counter-box-1').innerText = count1;
        } else {
            clearInterval(kVInterval);
        }
    }, 100);

    // Start mA counter
    mAInterval = setInterval(function () {
        if (count2 < maxCount) {
            count2++;
            document.getElementById('counter-box-2').innerText = count2;
        } else {
            clearInterval(mAInterval);
        }
    }, 120);
}

function startSimulation() {
    console.log("Starting simulation");

    // Validation
    if (!options.value) {
        alert("Please select a specimen first!");
        return;
    }

    if (!standbyRadio.checked) {
        alert("Please turn on standby first!");
        return;
    }

    const startAngle = parseFloat(startAngleInput.value) || 5;
    const endAngle = parseFloat(endAngleInput.value) || 80;

    if (startAngle >= endAngle) {
        alert("Start angle must be less than end angle!");
        return;
    }

    // Update instruction
    if (p9.style.display === 'block') {
        p9.style.display = 'none';
    }

    // Get specimen
    const specimen = options.value;

    // Disable button during scan
    startScan.disabled = true;
    startScan.style.opacity = "0.5";
    startScan.style.cursor = "not-allowed";
    startScan.textContent = "SCANNING";

    // Animate source & detector
    animateSourceAndDetector();

    // Show loading message
    speakText('Scan in progress. Please wait.');

    // Simulate scan delay (match animation length if you want)
    setTimeout(function () {
        // Show graph
        showGraph();

        // Calculate results
        calculateResults(specimen);

        speakText('Scan complete. XRD pattern generated.');

        startScan.textContent = "DONE";
    }, 5000);
}

// Animate source & detector heads
function animateSourceAndDetector() {
    if (!sourceImg || !detectorImg) {
        console.warn("Source or detector image element not found");
        return;
    }

    // Reset animation
    sourceImg.style.animation = 'none';
    detectorImg.style.animation = 'none';

    // Force reflow
    void sourceImg.offsetWidth;
    void detectorImg.offsetWidth;

    // Apply animation (keyframes must be defined in CSS: moveUpDown, oppMoveUpDown)
    sourceImg.style.animation = 'moveUpDown 5s linear 1';
    detectorImg.style.animation = 'oppMoveUpDown 5s linear 1';

    console.log("Source & Detector animation started");

    // Stop animation after 5s
    setTimeout(() => {
        sourceImg.style.animation = 'none';
        detectorImg.style.animation = 'none';
        console.log("Source & Detector animation stopped");
    }, 5000);
}

function showGraph() {
    console.log("Showing graph");

    const graphImg = document.getElementById('graph');

    if (graphImg) {
        graphImg.style.display = 'block';
        console.log("Graph displayed");
    } else {
        console.error("Graph element not found!");
    }
}

function calculateResults(specimen) {
    const data = xrdData[specimen];
    if (!data || !data.peaks || data.peaks.length === 0) return;

    // Calculate crystallite size using Scherrer equation
    const lambda = 1.5406;
    const K = 0.9;

    const peak = data.peaks[0];
    const theta = (peak.angle / 2) * (Math.PI / 180);
    const beta = peak.fwhm * (Math.PI / 180);
    const D = (K * lambda) / (beta * Math.cos(theta));

    // Display results
    const resultsDiv = document.getElementById('results');
    const peakPositionsSpan = document.getElementById('peakPositions');
    const crystalliteSizeSpan = document.getElementById('crystalliteSize');

    if (resultsDiv && peakPositionsSpan && crystalliteSizeSpan) {
        peakPositionsSpan.textContent = data.peaks.map(p => p.angle.toFixed(1) + '°').join(', ');
        crystalliteSizeSpan.textContent = D.toFixed(2);
        resultsDiv.style.display = 'block';
    }
}

// ===== TEXT TO SPEECH =====
const synth = window.speechSynthesis;

function speakText(text) {
    if (synth.speaking) {
        synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    synth.speak(utterance);
}

console.log("JavaScript loaded successfully");

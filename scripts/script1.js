//Create the object level
/* NEED TO ADD MORE TO IT BUT I DONT REMEMBER IT ALL */
function Level(level, hamster, story, xpMin, xpMax) {
    this.level = level;
    this.hamster = hamster;
    this.story = story;
    this.xpMin = xpMin;
    this.xpToNext = xpMax; 

    this.xpToNext = xpMax - xpMin;

};

//Define stories
stories = [
    "The start of a life...",
    "This baby can finally see the world!",
    "First drawing! Is this the start of a passion?",
    "Life is going by. She recieves a lot of praise for her art and enjoys it.",
    "Intimidating! But it will be fun!"
];

//Define each level
const level0 = new Level(0, "Hut", stories[0], 0, 100);
const level1 = new Level(1, "Baby", stories[1], 101, 300);
const level2 = new Level(2, "Kindergarden", stories[2], 301, 500);
const level3 = new Level(3, "Middleschool", stories[3], 501, 750);
const level4 = new Level(4, "HS Freshman", stories[4], 751, 1000);

const levels = [level0, level1, level2, level3, level4]

//Declare some constants
const progressBar = document.getElementById('progress');
const xpProgress = document.getElementById('xpProgress');
const rewardAt = document.getElementById('rewardAt');

//Get variables from localStorage
    //let currentLevel = localStorage.getItem('level') || 0;
let currentLevel;
let currentXP = parseFloat(localStorage.getItem('xp')) || 0;

//Determine level
for (i in levels) {
    if (currentXP > levels[i]['xpMin']) {
        currentLevel = levels[i];
    };
};

//currentProgress %
let currentProgress = calcProgress(currentXP);
//Determine XP to reward - For now just fixed
let xpToReward = 100;

//Load information onto page
document.getElementById('lvl').innerHTML = `<p>Lvl. ${currentLevel['level']}</p>`;
progressBar.style.width = currentProgress + '%';
xpProgress.innerHTML = `<p>${currentXP-currentLevel['xpMin']}/${currentLevel['xpToNext']}</p>`;
rewardAt.innerHTML = `<p style="text-align: center;">Next reward at: <u> ${xpToReward} XP </u></p>`;

function calcProgress(xp) {
    return (xp - currentLevel['xpMin'])/currentLevel['xpToNext'] * 100;
};

function updateProgress() {
    currentProgress = calcProgress(currentXP);
    if (currentProgress < 0) {
        levelDown();
        updateProgress();
    }
    else if (currentProgress < 100) {
        progressBar
            .style
            .width = currentProgress + '%';
        xpProgress.innerHTML = `<p>${currentXP-currentLevel['xpMin']}/${currentLevel['xpToNext']}</p>`;
        rewardAt.innerHTML = `<p style="text-align: center;">Next reward at: <u>${xpToReward} XP </u></p>`;
    }
    else {
        levelUp();
        updateProgress();
    };
};

function addXP(xpInput) {
    currentXP += xpInput;
    localStorage.setItem('xp', currentXP);
    document.getElementById('tester1').innerText = currentXP;

    updateProgress();
};

function removeXP() {
    minusXP = parseFloat(document.getElementById('minusXP').value);
    if (currentXP >= minusXP) {
        currentXP -= minusXP;
        localStorage.setItem('xp', currentXP);
        document.getElementById('tester1').innerText = currentXP;

        updateProgress(); 
    }
    else {
        window.alert('Your total XP cannot become lower than 0!')
    }
};

function levelUp() {
    currentLevel = levels[currentLevel['level']+1];
    document.getElementById('lvl').innerHTML = `<p>Lvl. ${currentLevel['level']}</p>`;
};
function levelDown() {
    currentLevel = levels[currentLevel['level']-1];
    document.getElementById('lvl').innerHTML = `<p>Lvl. ${currentLevel['level']}</p>`; 
}
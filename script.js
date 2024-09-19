let cookieCount = 0;
let cookiesPerClick = 1;
let cookiesPerSecond = 0;
let isPlaying = false; // Track if a sound is currently playing

let buildings = {
    grandma: { cost: 100, cps: 1, quantity: 0 },
    farm: { cost: 1000, cps: 10, quantity: 0 },
    factory: { cost: 10000, cps: 100, quantity: 0 },
    mine: { cost: 50000, cps: 500, quantity: 0 },
    bank: { cost: 200000, cps: 1000, quantity: 0 },
    temple: { cost: 1000000, cps: 5000, quantity: 0 },
    wizardTower: { cost: 3300000, cps: 10000, quantity: 0 },
    shipment: { cost: 51000000, cps: 40000, quantity: 0 },
    alchemyLab: { cost: 750000000, cps: 200000, quantity: 0 },
    portal: { cost: 10000000000, cps: 1666666, quantity: 0 },
    timeMachine: { cost: 123456789000, cps: 9876543, quantity: 0 },
    antimatterCondenser: { cost: 1700000000000, cps: 98765432, quantity: 0 },
    prism: { cost: 21000000000000, cps: 1000000000, quantity: 0 },
    chancemaker: { cost: 330000000000000, cps: 10000000000, quantity: 0 },
    fractalEngine: { cost: 5100000000000000, cps: 430000000000, quantity: 0 },
    javascriptConsole: { cost: 75000000000000000, cps: 21000000000000, quantity: 0 },
    idleverse: { cost: 1000000000000000000, cps: 309000000000000, quantity: 0 }
};

let upgrades = {
    clickUpgrade: { cost: 50, bonus: 1, purchased: false, inflation: 3 },
    doubleClickUpgrade: { cost: 10000, multiplier: 2, purchased: false, inflation: 2 },
    autoClickerUpgrade: { cost: 500, cpsBonus: 1, purchased: false, inflation: 3 }
};

// HTML elements
const cookieButton = document.getElementById('cookie-button');
const cookieCountDisplay = document.getElementById('cookie-count');
const cookiesPerSecondDisplay = document.getElementById('cookies-per-second');
const cookiePerClickDisplay = document.getElementById('cookies-per-click');
const achievementMessage = document.getElementById('achievement-message');

//Music
const backgroundMusic = document.getElementById('background-music');
const volumeControl = document.getElementById('volume-control');
const clickSound = document.getElementById('click-sound');
const soundControl = document.getElementById('sound-control');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.001;
backgroundMusic.play(); 

//Setting buttons
const saveButton = document.getElementById('save-game');
const loadButton = document.getElementById('load-game');
const resetButton = document.getElementById('reset-game');
const statsButton = document.getElementById('stats');

// Buildings buttons
const grandmaButton = document.getElementById('grandma');
const farmButton = document.getElementById('farm');
const factoryButton = document.getElementById('factory');
const mineButton = document.getElementById('mine');
const bankButton = document.getElementById('bank');
const templeButton = document.getElementById('temple');
const wizardTowerButton = document.getElementById('wizard-tower');
const shipmentButton = document.getElementById('shipment');
const alchemyLabButton = document.getElementById('alchemy-lab');
const portalButton = document.getElementById('portal');
const timeMachineButton = document.getElementById('time-machine');
const antimatterCondenserButton = document.getElementById('antimatter-condenser');
const prismButton = document.getElementById('prism');
const chancemakerButton = document.getElementById('chancemaker');
const fractalEngineButton = document.getElementById('fractal-engine');
const javascriptConsoleButton = document.getElementById('javascript-console');
const idleverseButton = document.getElementById('idleverse');

// Upgrades buttons
const clickUpgradeButton = document.getElementById('click-upgrade');
const doubleClickUpgradeButton = document.getElementById('double-click-upgrade');
const autoClickerUpgradeButton = document.getElementById('auto-clicker-upgrade');

// Function to update the display
function updateDisplay() {
    cookieCountDisplay.textContent = abbreviateNumber(cookieCount);
    cookiesPerSecondDisplay.textContent = abbreviateNumber(cookiesPerSecond);
    cookiePerClickDisplay.textContent = abbreviateNumber(cookiesPerClick);

    grandmaButton.textContent = `Grandma (1 CPS): ${buildings.grandma.quantity} owned | $${abbreviateNumber(buildings.grandma.cost)}`;
    farmButton.textContent = `Farm (10 CPS): ${buildings.farm.quantity} owned | $${abbreviateNumber(buildings.farm.cost)}`;
    factoryButton.textContent = `Factory (100 CPS): ${buildings.factory.quantity} owned | $${abbreviateNumber(buildings.factory.cost)}`;
    mineButton.textContent = `Mine (500 CPS): ${buildings.mine.quantity} owned | $${abbreviateNumber(buildings.mine.cost)}`;
    bankButton.textContent = `Bank (1,000 CPS): ${buildings.bank.quantity} owned | $${abbreviateNumber(buildings.bank.cost)}`;
    templeButton.textContent = `Temple (5,000 CPS): ${buildings.temple.quantity} owned | $${abbreviateNumber(buildings.temple.cost)}`;
    wizardTowerButton.textContent = `Wizard Tower (10,000 CPS): ${buildings.wizardTower.quantity} owned | $${abbreviateNumber(buildings.wizardTower.cost)}`;
    shipmentButton.textContent = `Shipment (40,000 CPS): ${buildings.shipment.quantity} owned | $${abbreviateNumber(buildings.shipment.cost)}`;
    alchemyLabButton.textContent = `Alchemy Lab (200,000 CPS): ${buildings.alchemyLab.quantity} owned | $${abbreviateNumber(buildings.alchemyLab.cost)}`;
    portalButton.textContent = `Portal (1,666,666 CPS): ${buildings.portal.quantity} owned | $${abbreviateNumber(buildings.portal.cost)}`;
    timeMachineButton.textContent = `Time Machine (9,876,543 CPS): ${buildings.timeMachine.quantity} owned | $${abbreviateNumber(buildings.timeMachine.cost)}`;
    antimatterCondenserButton.textContent = `Antimatter Condenser (98,765,432 CPS): ${buildings.antimatterCondenser.quantity} owned | $${abbreviateNumber(buildings.antimatterCondenser.cost)}`;
    prismButton.textContent = `Prism (1,000,000,000 CPS): ${buildings.prism.quantity} owned | $${abbreviateNumber(buildings.prism.cost)}`;
    chancemakerButton.textContent = `Chancemaker (10,000,000,000 CPS): ${buildings.chancemaker.quantity} owned | $${abbreviateNumber(buildings.chancemaker.cost)}`;
    fractalEngineButton.textContent = `Fractal Engine (430,000,000,000 CPS): ${buildings.fractalEngine.quantity} owned | $${abbreviateNumber(buildings.fractalEngine.cost)}`;
    javascriptConsoleButton.textContent = `Javascript Console (21,000,000,000,000 CPS): ${buildings.javascriptConsole.quantity} owned | $${abbreviateNumber(buildings.javascriptConsole.cost)}`;
    idleverseButton.textContent = `Idleverse (309,000,000,000,000 CPS): ${buildings.idleverse.quantity} owned | $${abbreviateNumber(buildings.idleverse.cost)}`;

    clickUpgradeButton.textContent = `Click Upgrade (bonus: ${upgrades.clickUpgrade.bonus}): $${abbreviateNumber(upgrades.clickUpgrade.cost)}`;
    doubleClickUpgradeButton.textContent = `Double Click Upgrade (multiplier: ${upgrades.doubleClickUpgrade.multiplier}): $${abbreviateNumber(upgrades.doubleClickUpgrade.cost)}`;
    autoClickerUpgradeButton.textContent = `Auto Clicker Upgrade (CPS bonus: ${upgrades.autoClickerUpgrade.cpsBonus}): $${abbreviateNumber(upgrades.autoClickerUpgrade.cost)}`;

    // Disable buttons if not enough cookies
    grandmaButton.disabled = cookieCount < buildings.grandma.cost;
    farmButton.disabled = cookieCount < buildings.farm.cost;
    factoryButton.disabled = cookieCount < buildings.factory.cost;
    mineButton.disabled = cookieCount < buildings.mine.cost;
    bankButton.disabled = cookieCount < buildings.bank.cost;
    templeButton.disabled = cookieCount < buildings.temple.cost;
    wizardTowerButton.disabled = cookieCount < buildings.wizardTower.cost;
    shipmentButton.disabled = cookieCount < buildings.shipment.cost;
    alchemyLabButton.disabled = cookieCount < buildings.alchemyLab.cost;
    portalButton.disabled = cookieCount < buildings.portal.cost;
    timeMachineButton.disabled = cookieCount < buildings.timeMachine.cost;
    antimatterCondenserButton.disabled = cookieCount < buildings.antimatterCondenser.cost;
    prismButton.disabled = cookieCount < buildings.prism.cost;
    chancemakerButton.disabled = cookieCount < buildings.chancemaker.cost;
    fractalEngineButton.disabled = cookieCount < buildings.fractalEngine.cost;
    javascriptConsoleButton.disabled = cookieCount < buildings.javascriptConsole.cost;
    idleverseButton.disabled = cookieCount < buildings.idleverse.cost;
    clickUpgradeButton.disabled = cookieCount < upgrades.clickUpgrade.cost;
    doubleClickUpgradeButton.disabled = cookieCount < upgrades.doubleClickUpgrade.cost;
    autoClickerUpgradeButton.disabled = cookieCount < upgrades.autoClickerUpgrade.cost;

}

// Set up volume controls
volumeControl.addEventListener('input', function() {
    backgroundMusic.volume = this.value;
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
}); 

soundControl.addEventListener('input', function() {
    clickSound.volume = this.value;
    if (clickSound.paused) {
        clickSound.play();
    }
});

// Function to abbreviate large numbers (e.g., 1K for 1,000)
function abbreviateNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + "M";
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + "K";
    } else {
        return num;
    }
}

// Function to check achievements
function checkAchievements() {
    const achievementContainer = document.getElementById('achievement-message');
    let newAchievements = '';

    // Check various achievements
    if (cookieCount >= 1000 && !achievementContainer.innerHTML.includes('1,000 Cookies')) {
        newAchievements += '<p>Achievement Unlocked: 1,000 Cookies!</p>';
    }
    if (cookieCount >= 1000000 && !achievementContainer.innerHTML.includes('1,000,000 Cookies')) {
        newAchievements += '<p>Achievement Unlocked: 1,000,000 Cookies!</p>';
    }
    if (cookieCount >= 1000000000 && !achievementContainer.innerHTML.includes('1,000,000,000 Cookies')) {
        newAchievements += '<p>Achievement Unlocked: 1,000,000,000 Cookies!</p>';
    }
    if (buildings.grandma.quantity >= 1 && !achievementContainer.innerHTML.includes('First Grandma')) {
        newAchievements += '<p>Achievement Unlocked: First Grandma!</p>';
    }
    if (buildings.farm.quantity >= 1 && !achievementContainer.innerHTML.includes('First Farm')) {
        newAchievements += '<p>Achievement Unlocked: First Farm!</p>';
    }
    if (buildings.factory.quantity >= 1 && !achievementContainer.innerHTML.includes('First Factory')) {
        newAchievements += '<p>Achievement Unlocked: First Factory!</p>';
    }
    if (buildings.mine.quantity >= 1 && !achievementContainer.innerHTML.includes('First Mine')) {
        newAchievements += '<p>Achievement Unlocked: First Mine!</p>';
    }
    if (buildings.bank.quantity >= 1 && !achievementContainer.innerHTML.includes('First Bank')) {
        newAchievements += '<p>Achievement Unlocked: First Bank!</p>';
    }
    if (buildings.temple.quantity >= 1 && !achievementContainer.innerHTML.includes('First Temple')) {
        newAchievements += '<p>Achievement Unlocked: First Temple!</p>';
    }
    if (buildings.wizardTower.quantity >= 1 && !achievementContainer.innerHTML.includes('First Wizard Tower')) {
        newAchievements += '<p>Achievement Unlocked: First Wizard Tower!</p>';
    }
    if (buildings.shipment.quantity >= 1 && !achievementContainer.innerHTML.includes('First Shipment')) {
        newAchievements += '<p>Achievement Unlocked: First Shipment!</p>';
    }
    if (buildings.alchemyLab.quantity >= 1 && !achievementContainer.innerHTML.includes('First Alchemy Lab')) {
        newAchievements += '<p>Achievement Unlocked: First Alchemy Lab!</p>';
    }
    if (buildings.portal.quantity >= 1 && !achievementContainer.innerHTML.includes('First Portal')) {
        newAchievements += '<p>Achievement Unlocked: First Portal!</p>';
    }
    if (buildings.timeMachine.quantity >= 1 && !achievementContainer.innerHTML.includes('First Time Machine')) {
        newAchievements += '<p>Achievement Unlocked: First Time Machine!</p>';
    }
    if (buildings.antimatterCondenser.quantity >= 1 && !achievementContainer.innerHTML.includes('First Antimatter Condenser')) {
        newAchievements += '<p>Achievement Unlocked: First Antimatter Condenser!</p>';
    }
    if (buildings.prism.quantity >= 1 && !achievementContainer.innerHTML.includes('First Prism')) {
        newAchievements += '<p>Achievement Unlocked: First Prism!</p>';
    }
    if (buildings.chancemaker.quantity >= 1 && !achievementContainer.innerHTML.includes('First Chancemaker')) {
        newAchievements += '<p>Achievement Unlocked: First Chancemaker!</p>';
    }
    if (buildings.fractalEngine.quantity >= 1 && !achievementContainer.innerHTML.includes('First Fractal Engine')) {
        newAchievements += '<p>Achievement Unlocked: First Fractal Engine!</p>';
    }
    if (buildings.javascriptConsole.quantity >= 1 && !achievementContainer.innerHTML.includes('First Javascript Console')) {
        newAchievements += '<p>Achievement Unlocked: First Javascript Console!</p>';
    }
    if (buildings.idleverse.quantity >= 1 && !achievementContainer.innerHTML.includes('First Idleverse')) {
        newAchievements += '<p>Achievement Unlocked: First Idleverse!</p>';
    }
    if (upgrades.clickUpgrade.purchased && !achievementContainer.innerHTML.includes('Click Upgrade Purchased')) {
        newAchievements += '<p>Achievement Unlocked: Click Upgrade Purchased!</p>';
    }
    if (upgrades.doubleClickUpgrade.purchased && !achievementContainer.innerHTML.includes('Double Click Upgrade Purchased')) {
        newAchievements += '<p>Achievement Unlocked: Double Click Upgrade Purchased!</p>';
    }
    if (upgrades.autoClickerUpgrade.purchased && !achievementContainer.innerHTML.includes('Auto Clicker Upgrade Purchased')) {
        newAchievements += '<p>Achievement Unlocked: Auto Clicker Upgrade Purchased!</p>';
    }
    if (cookieCount >= 1000000000000 && !achievementContainer.innerHTML.includes('1 Trillion Cookies')) {
        newAchievements += '<p>Achievement Unlocked: 1 Trillion Cookies!</p>';
    }
    if (cookieCount >= 1000000000000000 && !achievementContainer.innerHTML.includes('1 Quadrillion Cookies')) {
        newAchievements += '<p>Achievement Unlocked: 1 Quadrillion Cookies!</p>';
    }
    if (cookieCount >= 1000000000000000000 && !achievementContainer.innerHTML.includes('1 Quintillion Cookies')) {
        newAchievements += '<p>Achievement Unlocked: 1 Quintillion Cookies!</p>';
    }
    if (cookieCount >= 1000000000000000000000 && !achievementContainer.innerHTML.includes('1 Sextillion Cookies')) {
        newAchievements += '<p>Achievement Unlocked: 1 Sextillion Cookies!</p>';
    }
    if (cookieCount >= 1000000000000000000000000 && !achievementContainer.innerHTML.includes('1 Septillion Cookies')) {
        newAchievements += '<p>Achievement Unlocked: 1 Septillion Cookies!</p>';
    }
    if (cookieCount >= 1000000000000000000000000000 && !achievementContainer.innerHTML.includes('1 Octillion Cookies')) {
        newAchievements += '<p>Achievement Unlocked: 1 Octillion Cookies!</p>';
    }
    if (cookieCount >= 1000000000000000000000000000000 && !achievementContainer.innerHTML.includes('1 Nonillion Cookies')) {
        newAchievements += '<p>Achievement Unlocked: 1 Nonillion Cookies!</p>';
    }
    if (cookieCount >= 100
        && buildings.grandma.quantity >= 1
        && buildings.farm.quantity >= 1
        && buildings.factory.quantity >= 1
        && buildings.mine.quantity >= 1
        && buildings.bank.quantity >= 1
        && buildings.temple.quantity >= 1
        && buildings.wizardTower.quantity >= 1
        && buildings.shipment.quantity >= 1
        && buildings.alchemyLab.quantity >= 1
        && buildings.portal.quantity >= 1
        && buildings.timeMachine.quantity >= 1
        && buildings.antimatterCondenser.quantity >= 1
        && buildings.prism.quantity >= 1
        && buildings.chancemaker.quantity >= 1
        && buildings.fractalEngine.quantity >= 1
        && buildings.javascriptConsole.quantity >= 1
        && buildings.idleverse.quantity >= 1
        && upgrades.clickUpgrade.purchased
        && upgrades.doubleClickUpgrade.purchased
        && upgrades.autoClickerUpgrade.purchased
        && !achievementContainer.innerHTML.includes('All Achievements')) {
        newAchievements += '<p>Achievement Unlocked: All Achievements!</p>';
    }

    // Append new achievements to the container
    if (newAchievements) {
        achievementContainer.innerHTML += newAchievements;
    }
}

// Function to play the click sound
function playClickSound() {
    if (!isPlaying) { // Only play sound if it's not already playing
        isPlaying = true;

        // Add a slight random pitch variation
        const pitchVariation = 0.9 + Math.random() * 0.2; 
        clickSound.playbackRate = pitchVariation;
        
        clickSound.play();
        clickSound.addEventListener('ended', () => {
            isPlaying = false; // Reset the flag when the sound ends
        });
    }
}

// Click cookie logic
cookieButton.addEventListener('click', () => {
    playClickSound();
    cookieCount += cookiesPerClick;
    updateDisplay();
    checkAchievements();
});

// Buy building logic
function buyBuilding(building) {
    if (cookieCount >= building.cost) {
        cookieCount -= building.cost;
        building.cost = Math.floor(building.cost * 1.15); // Increase cost by 15% after each purchase
        building.quantity++;
        cookiesPerSecond += building.cps;
        updateDisplay();
        checkAchievements();
    }
}

grandmaButton.addEventListener('click', () => {
    buyBuilding(buildings.grandma);
});

farmButton.addEventListener('click', () => {
    buyBuilding(buildings.farm);
});

factoryButton.addEventListener('click', () => {
    buyBuilding(buildings.factory);
});

mineButton.addEventListener('click', () => {
    buyBuilding(buildings.mine);
});

bankButton.addEventListener('click', () => {
    buyBuilding(buildings.bank);
});

templeButton.addEventListener('click', () => {
    buyBuilding(buildings.temple);
});

wizardTowerButton.addEventListener('click', () => {
    buyBuilding(buildings.wizardTower);
});

shipmentButton.addEventListener('click', () => {
    buyBuilding(buildings.shipment);
});

alchemyLabButton.addEventListener('click', () => {
    buyBuilding(buildings.alchemyLab);
});

portalButton.addEventListener('click', () => {
    buyBuilding(buildings.portal);
});

timeMachineButton.addEventListener('click', () => {
    buyBuilding(buildings.timeMachine);
});

antimatterCondenserButton.addEventListener('click', () => {
    buyBuilding(buildings.antimatterCondenser);
});

prismButton.addEventListener('click', () => {
    buyBuilding(buildings.prism);
});

chancemakerButton.addEventListener('click', () => {
    buyBuilding(buildings.chancemaker);
});

fractalEngineButton.addEventListener('click', () => {
    buyBuilding(buildings.fractalEngine);
});

javascriptConsoleButton.addEventListener('click', () => {
    buyBuilding(buildings.javascriptConsole);
});

idleverseButton.addEventListener('click', () => {
    buyBuilding(buildings.idleverse);
});

// Upgrade logic
function buyUpgrade(upgrade) {
    if (cookieCount >= upgrade.cost) {
        cookieCount -= upgrade.cost;
        if (upgrade.bonus) {
            cookiesPerClick += upgrade.bonus;
        }
        if (upgrade.multiplier) {
            cookiesPerClick *= upgrade.multiplier;
        }
        if (upgrade.cpsBonus) {
            cookiesPerSecond += upgrade.cpsBonus;
        }
        upgrade.purchased = true;
        upgrade.cost = Math.floor(upgrade.cost * upgrade.inflation); // Increase cost by inflation factor
        upgrade.cpsBonus = Math.floor(upgrade.cpsBonus * 2); // Increase CPS bonus by inflation factor
        updateDisplay();
    }
}

clickUpgradeButton.addEventListener('click', () => {
    buyUpgrade(upgrades.clickUpgrade);
});

doubleClickUpgradeButton.addEventListener('click', () => {
    buyUpgrade(upgrades.doubleClickUpgrade);
});

autoClickerUpgradeButton.addEventListener('click', () => {
    buyUpgrade(upgrades.autoClickerUpgrade);
});

// Auto Clicker logic (every second)
setInterval(() => {
    cookieCount += cookiesPerSecond;
    updateDisplay();
    checkAchievements();
}, 1000);

//Settings Logic
saveButton.addEventListener('click', () => {
    localStorage.setItem('cookieClickerSave', JSON.stringify({ cookieCount, cookiesPerClick, cookiesPerSecond, buildings, upgrades }));
});

loadButton.addEventListener('click', () => {
    const saveData = JSON.parse(localStorage.getItem('cookieClickerSave'));
    if (saveData) {
        cookieCount = saveData.cookieCount;
        cookiesPerClick = saveData.cookiesPerClick;
        cookiesPerSecond = saveData.cookiesPerSecond;
        buildings = saveData.buildings;
        upgrades = saveData.upgrades;
        updateDisplay();
    }
});

resetButton.addEventListener('click', () => {
    localStorage.removeItem('cookieClickerSave');
    cookieCount = 0;
    cookiesPerClick = 1;
    cookiesPerSecond = 0;
    buildings = {
        grandma: { cost: 100, cps: 1, quantity: 0 },
        farm: { cost: 1000, cps: 10, quantity: 0 },
        factory: { cost: 10000, cps: 100, quantity: 0 },
        mine: { cost: 50000, cps: 500, quantity: 0 },
        bank: { cost: 200000, cps: 1000, quantity: 0 },
        temple: { cost: 1000000, cps: 5000, quantity: 0 },
        wizardTower: { cost: 3300000, cps: 10000, quantity: 0 },
        shipment: { cost: 51000000, cps: 40000, quantity: 0 },
        alchemyLab: { cost: 750000000, cps: 200000, quantity: 0 },
        portal: { cost: 10000000000, cps: 1666666, quantity: 0 },
        timeMachine: { cost: 123456789000, cps: 9876543, quantity: 0 },
        antimatterCondenser: { cost: 1700000000000, cps: 98765432, quantity: 0 },
        prism: { cost: 21000000000000, cps: 1000000000, quantity: 0 },
        chancemaker: { cost: 330000000000000, cps: 10000000000, quantity: 0 },
        fractalEngine: { cost: 5100000000000000, cps: 430000000000, quantity: 0 },
        javascriptConsole: { cost: 75000000000000000, cps: 21000000000000, quantity: 0 },
        idleverse: { cost: 1000000000000000000, cps: 309000000000000, quantity: 0 }
    };
    upgrades = {
        clickUpgrade: { cost: 50, bonus: 1, purchased: false, inflation: 3 },
        doubleClickUpgrade: { cost: 10000, multiplier: 2, purchased: false, inflation: 2 },
        autoClickerUpgrade: { cost: 500, cpsBonus: 1, purchased: false, inflation: 3 }
    };
    achievementMessage.innerHTML = ''; // Wipe achievements
    updateDisplay();
});

statsButton.addEventListener('click', () => {
    const stats = `
        Cookie Count: ${cookieCount}
        Cookies Per Click: ${cookiesPerClick}
        Cookies Per Second: ${cookiesPerSecond}
        Grandmas: ${buildings.grandma.quantity}
        Farms: ${buildings.farm.quantity}
        Factories: ${buildings.factory.quantity}
        Mines: ${buildings.mine.quantity}
        Banks: ${buildings.bank.quantity}
        Temples: ${buildings.temple.quantity}
        Wizard Towers: ${buildings.wizardTower.quantity}
        Shipments: ${buildings.shipment.quantity}
        Alchemy Labs: ${buildings.alchemyLab.quantity}
        Portals: ${buildings.portal.quantity}
        Time Machines: ${buildings.timeMachine.quantity}
        Antimatter Condensers: ${buildings.antimatterCondenser.quantity}
        Prisms: ${buildings.prism.quantity}
        Chancemakers: ${buildings.chancemaker.quantity}
        Fractal Engines: ${buildings.fractalEngine.quantity}
        Javascript Consoles: ${buildings.javascriptConsole.quantity}
        Idleverses: ${buildings.idleverse.quantity}
        Click Upgrade Purchased: ${upgrades.clickUpgrade.purchased}
        Double Click Upgrade Purchased: ${upgrades.doubleClickUpgrade.purchased}
        Auto Clicker Upgrade Purchased: ${upgrades.autoClickerUpgrade.purchased}
    `;
    alert(stats.replace(/\n\s+/g, '\n').trim());
});


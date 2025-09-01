localStorage.setItem('nodeRespawned', 'true');

document.getElementById('btnMine').onclick = function() {
    const nodeImage = document.getElementById('imgNode');

    if (localStorage.getItem('nodeRespawned') != 'true')  { 
        let txtOreDisplay = document.getElementById('txtOreDisplay');
        txtOreDisplay.textContent = "Node is respawning....";
        nodeImage.src = "https://images.unsplash.com/vector-1752609379935-1e3a71d8dc78?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";        
        
        if (localStorage.getItem('last_mined_tier') != null) {
            nodeImage.classList.remove(localStorage.getItem('glowClassName'));
        }

        return;
    }

    localStorage.setItem('nodeRespawned', 'false');

    if (localStorage.getItem('last_mined_tier') != null) {
        nodeImage.classList.remove(localStorage.getItem('glowClassName'));
    }

    const rarity = Math.floor(Math.random() * 1001);
    let minedItemName = "";

    let tier = 0;
    switch (true) {
        // Case 1: 0.05% chance
        case rarity === 0:
            minedItemName = "rainbow_diamond";
            tier = 3;
            break;

        // Case 2: 1% chance
        case rarity >= 1 && rarity <= 10: {
            const subIndex = (rarity - 1) % 3; // 0,1,2 → equal split
            tier = 2;
            switch (subIndex) {
                case 0:
                    minedItemName = "runestone";
                    break;
                case 1:
                    minedItemName = "shadow_quartz";
                    break;
                case 2:
                    minedItemName = "divinorium";
                    break;
            }
            break;
        }

        // Case 3: 10% chance
        case rarity >= 11 && rarity <= 110: {
            const subIndex = (rarity - 11) % 5; // 0–4 → equal split
            tier = 1;
            switch (subIndex) {
                case 0:
                    minedItemName = "sapphire";
                    break;
                case 1:
                    minedItemName = "ruby";
                    break;
                case 2:
                    minedItemName = "emerald";
                    break;
                case 3:
                    minedItemName = "black_opal";
                    break;
                case 4:
                    minedItemName = "diamond";
                    break;
            }
            break;
        }

        // Case 4: 88.95% chance
        case rarity >= 111 && rarity <= 1000: {
            const subIndex = rarity - 111; // range 0–889 (890 numbers total)
            // First 150 numbers go to item 0, next 148 numbers to each of the others
            if (subIndex < 150) {
                minedItemName = "amethyst";
            } else if (subIndex < 298) {
                minedItemName = "topaz";
            } else if (subIndex < 446) {
                minedItemName = "quartz";
            } else if (subIndex < 594) {
                minedItemName = "rose_quartz";
            } else if (subIndex < 742) {
                minedItemName = "aquamarine";
            } else {
                minedItemName = "onyx";
            }
            break;
        }
    }


    localStorage.setItem('glowClassName', 'glow-' + tier);
    nodeImage.classList.add(localStorage.getItem('glowClassName'));
    localStorage.setItem('last_mined_tier', tier);

    let mineCount = Number(localStorage.getItem(minedItemName + '_mined')) || 0;
    mineCount += 1;
    localStorage.setItem(minedItemName + '_mined', mineCount);

    document.getElementById('txtOreDisplay').textContent =
        `You mined: ${minedItemName.charAt(0).toUpperCase() + minedItemName.slice(1)} (Total mines: ${mineCount})`;

    document.getElementById('imgNode').src = `images/items/${minedItemName}.png?`;  
    
    setTimeout(() => {
        localStorage.setItem('nodeRespawned', 'true');
    }, 4000);
};

// --- Function to download localStorage as a .json file ---
// function downloadLocalStorageAsJSON() {
//     const data = {};
//     for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         data[key] = localStorage.getItem(key);
//     }
//     const jsonStr = JSON.stringify(data, null, 2);
//     const blob = new Blob([jsonStr], { type: "application/json" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'localStorageData.json';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
// }

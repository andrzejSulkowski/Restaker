function getMaxCapital(stake, fee, apr){
    let globalMax = {
        interval: 0,
        stake: 0
    }
  
    for (let n = 1; n <= 365*24; n++) {
        let newStake = simulateCompound(stake, fee, apr, n)
        if(newStake > globalMax.stake){
            globalMax.interval = n
            globalMax.stake = newStake
        }
    }
    return globalMax
  }
  
function simulateCompound(stake, fee, apr, n){
let reward
let lastClaimAtHour
for (let hours = 0; hours <= 365*24; hours++) {

    if(hours % n === 0 && hours !== 0){

        reward = claim(stake, fee, apr, n)
        stake = stake + (reward - fee)
        lastClaimAtHour = hours
    }   
}
let pendingFunds = stake * (apr*(365*24-lastClaimAtHour)/365/24)
return Math.floor(stake + pendingFunds)
}

function claim(stake, fee, apr, n){
return stake * (apr*n/365/24) - fee
}
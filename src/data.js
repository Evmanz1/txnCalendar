export async function parseEtherscanData (address) {
    const bruhgma = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${encodeURI(address)}&apikey=${encodeURI(process.env.REACT_APP_ETHERSCAN_KEY)}`).then(response => response.json())
    
    //console.log(bruhgma);
    const transactions = [];
    for (const t of bruhgma.result){
        var date = new Date(t.timeStamp * 1000)
        var [month,day] = [date.getMonth()+1, date.getDate()]
        if (month < 10){month = "0" + month}
        if (day < 10){day = "0" + day}

        date = date.getFullYear() + "-" + month + "-" + day;
        var dateCounted = transactions.find(t => t.day === date);
        if (dateCounted) {
            //console.log("Date has been counted already")
            dateCounted.value++;
        } else {
            //console.log("Pushing new transaction")
            transactions.push({
                
                day : date,
                value : 1
            });
        }
    };
    //console.log(transactions);
    return(transactions);
    
}
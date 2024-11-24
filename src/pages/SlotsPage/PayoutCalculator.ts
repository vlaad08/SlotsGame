

const SlotSymbols = [
    {id: 1, symbol: "watermelon"},
    {id: 2, symbol: "cherry"},
    {id: 3, symbol: "lime"},
    {id: 4, symbol: "plum"},
    {id: 5, symbol: "grapes"},
    {id: 6, symbol: "oranges"},
    {id: 7, symbol: "seven"},
    {id: 8, symbol: "wild"},
];

export function SearchForWilds(panel :Array<Array<number>>)
{
    for(let i = 0; i < panel[i].length; i++)
    {
        for(let j = 1; j < panel.length-1; j++)
        {
            if(panel[j][i] == 8)
            {
                panel[j][0] = 8;
                panel[j][1] = 8;
                panel[j][2] = 8;
            }
        }
    }
    return panel;
}

export function CalculatePayout(panel : Array<Array<number>>, betCredit : number){
    var lines = new Array<number[]>;

    //straight lines
    lines.push([panel[0][0], panel[1][0], panel[2][0], panel[3][0], panel[4][0]])
    lines.push([panel[0][1], panel[1][1], panel[2][1], panel[3][1], panel[4][1]])
    lines.push([panel[0][2], panel[1][2], panel[2][2], panel[3][2], panel[4][2]])
    
    //triangle lines

    lines.push([panel[0][0], panel[1][1], panel[2][2], panel[3][1], panel[4][0]]);
    lines.push([panel[0][2], panel[1][1], panel[2][0], panel[3][1], panel[4][2]]);
    


    
    let line1  = CalculateLine(lines[0], "Line 1", betCredit)
    let line2  = CalculateLine(lines[1], "Line 2", betCredit)
    let line3  = CalculateLine(lines[2], "Line 3", betCredit)
    let line4  = CalculateLine(lines[3], "Line 4", betCredit)
    let line5  = CalculateLine(lines[4], "Line 5", betCredit)

    var payedOutLines = new Array<{lineNumber : string, payout : number}>;
    payedOutLines.push(line1); payedOutLines.push(line2); payedOutLines.push(line3); payedOutLines.push(line4); payedOutLines.push(line5);
    
    
    return payedOutLines.filter(line => line.payout != 0);
}


function CalculateLine(line : Array<number>, lineNumber : string, betCredit : number){
    

    const symbolID : number = SelectSymbolID(line);

    let timesShown : number = TimesShown(line, symbolID);
   

    let payout : number = 0;
    if(timesShown >= 2)
    {
       payout = CalculateSymbolXPayout(symbolID, timesShown);
       payout = payout * betCredit;
    }

    return {lineNumber , payout};
}


type Payouts = {
    [symbolID : number] : {[timesShown : number] : number}
}

function CalculateSymbolXPayout(symbolID : number, timesShown : number)
{
    const payoutTable : Payouts = {
        1: {2: 0, 3: 4, 4: 10, 5: 50 }, // Watermelon
        2: {2: 0, 3: 1, 4: 3, 5: 10 },  // Cherry
        3: {2: 0, 3: 1, 4: 3, 5: 10 },   // Lime
        4: {2: 0, 3: 1, 4: 3, 5: 10}, // Plum
        5: {2: 0, 3: 4, 4: 10, 5: 50}, // Grape
        6: {2: 0, 3: 1, 4: 3, 5: 10}, // Oranges
        7: {2: 2,3: 5, 4: 20, 5: 300}, // Seven
    };
    return payoutTable[symbolID][timesShown];
}


function SelectSymbolID(line : Array<number>)
{

    switch (line[0])
    {
        case 1 :
            return SlotSymbols[0].id;
        case 2 :
            return SlotSymbols[1].id;
        case 3 :
            return SlotSymbols[2].id;
        case 4 :
            return SlotSymbols[3].id;
        case 5 :
            return SlotSymbols[4].id;
        case 6 :
            return SlotSymbols[5].id;
        case 7 :
            return SlotSymbols[6].id;
        default:
            break;
    }

    
    return 0;
}

function TimesShown(line : Array<number>, symbolID : number)
{
    let timesShown = 0;
    for(let i = 0; i < line.length; i++)
    {
        
        if(line[i] == symbolID || line[i] == 8)
        {
            timesShown++;
        }
        else{
            break;
        }
    }
    return timesShown;
}
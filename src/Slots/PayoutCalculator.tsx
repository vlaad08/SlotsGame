import React from "react";

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
    for(let i = 0; i < panel.length; i++)
    {
        for(let j = 1; j < panel[i].length - 1; j++)
        {
            if(panel[i][j] == 8)
            {
                panel[0][j] = 8;
                panel[1][j] = 8;
                panel[2][j] = 8;
            }
        }
    }
    return panel;
}

export function CalculatePayout(panel : Array<Array<number>>, betCredit : number){
    var lines = new Array<number[]>;

    //straight lines
    lines.push(panel[0])
    lines.push(panel[1])
    lines.push(panel[2])

    //triangle lines

    lines.push([panel[0][0], panel[1][1], panel[2][2], panel[1][3], panel[0][4]]);
    lines.push([panel[2][0], panel[1][1], panel[0][2], panel[1][3], panel[2][4]]);
    
    
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
    var symbolID : number = 0;

    switch (line[0])
    {
        case 1 :
            symbolID = SlotSymbols[0].id;
            break;
        case 2 :
            symbolID = SlotSymbols[1].id;
            break;
        case 3 :
            symbolID = SlotSymbols[2].id;
            break;
        case 4 :
            symbolID = SlotSymbols[3].id;
            break;
        case 5 :
            symbolID = SlotSymbols[4].id;
            break;
        case 6 :
            symbolID = SlotSymbols[5].id;
            break;
        case 7 :
            symbolID = SlotSymbols[6].id;
            break;
        default:
            break;
    }

    
    let timesShown : number = 0;
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

    let payout : number = 0;
    if(timesShown > 2)
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
        1: { 3: 4, 4: 10, 5: 50 }, // Watermelon
        2: { 3: 1, 4: 3, 5: 10 },  // Cherry
        3: { 3: 1, 4: 3, 5: 10 },   // Lime
        4: { 3: 1, 4: 3, 5: 10}, // Plum
        5: { 3: 4, 4: 10, 5: 50}, // Grape
        6: { 3: 1, 4: 3, 5: 10}, // Oranges
        7: {3: 5, 4: 20, 5: 300}, // Seven
    };
    return payoutTable[symbolID][timesShown];
}
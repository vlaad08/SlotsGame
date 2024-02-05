import React from "react";


let red_cards : number = 50;
let black_cards : number = 50;
let base_adjustment_multiplier : number = 0.5;
let total_cards : number = 100


export class RedBlack{


    public  Gamble() {
        const adjstFactor : number = this.CalculateAdjustmentFactor();
        let red_probability : number, black_probability : number;
        if(red_cards >= black_cards)
        {
            red_probability = (50 - adjstFactor * 100)/100;
            black_probability = (50 + adjstFactor * 100)/100;
        }
        else
        {
            red_probability = (50 + adjstFactor * 100)/100;
            black_probability = (50 - adjstFactor * 100)/100;
        }

        const card_color : string = this.GenerateCardColor(red_probability, black_probability);
        return card_color;


    }


    public  CalculateAdjustmentFactor()
    {
        let adjstFactor : number = ((Math.abs(red_cards - black_cards))/total_cards) * base_adjustment_multiplier;
        
        return adjstFactor;
    }

    public  GenerateCardColor(red_probability : number, black_probability : number)
    {
        let smallest = ((red_probability < black_probability) ? red_probability : black_probability);


        const rand = Math.random();

        if(rand < smallest)
        {
            return ((smallest == black_probability) ? "black" : "red");
        }
        else
        {
            return ((smallest == black_probability) ? "red" : "black");
        }
    }

}
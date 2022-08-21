import React from 'react'
import { Accordian } from './Accordian'
import "./styles.css"

export const AboutPage = () => {
  return (
        <div>
            
            <h1>How To Guide</h1>
            <Accordian />
            <h1><em>FlipSide</em> Provides an excellent source of information for stock Options </h1>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The goal of the this site is to provide users with the potential to track and stay updated on Stock Options.
            <br/>
            <br></br>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users can stay up to date on stock options by adding them to their lists which will stay up to date on the home page. </p>
            </p>
            <h1>What are Stock Options?</h1>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stock Options are the ability to <em>promise</em> someone that you will purchase or sell 100 shares of a stock</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When you <em>promise</em> to buy an option, you pay an upfront cost <em>Premium</em> to control 100 shares of a stock</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The upfront cost or <em>Premium</em> will increase or decrease depending on how the stock appreciates</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When you control an option contract after purchasing one, you have the ability to sell that contract, generating a profit based on the difference in <em>Premiums</em></p>
            <h1>Why buy an option?</h1>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Buying an option is a cheaper way to "own" 100 shares of a stock</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;100 shares of AAPLE would be $16,600 as of today. 1 option contract (100 shares) expiring this week cost around $88</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When the stock goes up from $165 to $170 dollars, your option contract will increase in value depending on the delta. Delta multiplied by stock price change is the percantage growth the option will recieve</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.50 delta means that 50% of the difference from stock changes will be gained on the option contract. For every dollar change in the stock, 50 cents will be added to the option</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This creates a cheap way to get into a stock with a lot of leverage to make big gains fast</p>          
            <h1>Why not YOLO on options then?</h1>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options have inherit risk because they are time based</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unlike stocks where you can HODL your shares forever, Options always expire at a certain date</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you are unable to flip your contract onto someone else or excercise your option, you will lose <em>100%</em> of the money you put in</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options are way cheaper than stocks, but because they expire, you have the potential to lose everything put in</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stocks are often salvagable by either waiting for the price to increase or by selling at a small loss</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options are very rarley salvagable as big swings in the market can decimate contract's value, making it hard to sell </p>
            <h1>Which date do I pick when looking at options?</h1>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Having a short time frame is often the first choice people pick when buying options, but it is the most risky</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The reason it is so popular is because the sooner the option expires, the cheaper it is to purchase the contract</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;There is a very small chance that the stock swings in the near future, making the chance that an option increases value small, which decreases the price</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Because there is a good chance stocks will change prices drastically in the future, picking a further date brings saftey, which drives the prices up</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The easier it is to make money on a contract, the more it is worth because it is more of a gaurentee</p>
            
        </div>
  )
}

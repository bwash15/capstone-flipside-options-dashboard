import { date, number } from 'joi';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const daySchema = new Schema({  
  change:         {
    type: Number,
    default: 0
  },
  change_percent: {
    type: Number,
    default: 0
  },
  close:          {
    type: Number,
    default: 0
  },
  high:           {
    type: Number,
    default: 0
  },
  lastUpdated:    {
    type: Number,
    default: 0
  }, 
  low:            {
    type: Number,
    default: 0
  },
  open:           {
    type: Number,
    default: 0
  },
  previous_close: {
    type: Number,
    default: 0
  }, 
  volume:         {
    type: Number,
    default: 0
  }, 
  vwap:           {
    type: Number,
    default: 0
  }  
});

// Ensures that each instance of the Document is initialized with 
// Defaults to subdocuments
const subDaySchema = new mongoose.Schema({
  child: {
    type: daySchema,
    default: () => ({})
  }
});
const SubDaydoc = mongoose.model('SubDaydoc', subDaySchema);



const detailsSchema = new Schema({
  contractType:        {
    type: String,
    default: ''
  }, 
  exercise_style:      {
    type: String,
    default: ''
  }, 
  expiration_date:     {
    type: Number,
    default: 0
  }, 
  shares_per_contract: {
    type: Number,
    default: 0
  }, 
  strike_rice:         {
    type: Number,
    default: 0
  }, 
  ticker:              {
    type: String,
    default: ''
  } 
});

// Ensures that each instance of the Document is initialized with 
// Defaults to subdocuments
const subDetailsSchema = new mongoose.Schema({
  child: {
    type: detailsSchema,
    default: () => ({})
  }
});
const SubDetailsDoc = mongoose.model('SubDetailsDoc', subDetailsSchema);

const greeks = new Schema({  
  delta: {
    type: Number,
    default: 0
  },
  gamma: {
    type: Number,
    default: 0
  },
  theta: {
    type: Number,
    default: 0
  },
  vega: {
    type: Number,
    default: 0
  }
})

const last_quote = new Schema({
  ask:          {
    type: Number,
    default: 0
  },
  ask_size:     {
    type: Number,
    default: 0
  },
  bid:          {
    type: Number,
    default: 0
  },
  bid_size:     {
    type: Number,
    default: 0
  },
  last_updated: {
    type: Number,
    default: 0
  },
  midPoint:     {
    type: Number,
    default: 0
  }, 
  timeframe:    {
    type: String,
    default: 0
  }
})

const underlying_asset = new Schema({  
    change_to_break_even:   {
      type: Number,
      default: 0
    },
    last_updated:           {
      type: Number,
      default: 0
    },
    price:                  {
      type: Number,
      default: 0
    },
    ticker:                 {
      type: String,
      default: 0
    },
    timeframe:              {
      type: String,
      default: 0
    }  
})

const snapShotSchema = new Schema({
    request_id: {
      type: String,
      default: 0,
      unique: true
    },  
    results:  { 
      break_even_price: {
        type: Number,
        default: 0
      },
      children: day,
      children: details,
      children: greeks,
      implied_volatility: {
        type: Number,
        default: 0
      },
      children: last_quote,
      open_interest: {
        type: Number,
        default: 0
      },
      children: underlying_asset      
      },
status: {
  type: String,
  default: ''
}
}
);

module.exports = mongoose.model('SnapShotSchema', snapShotSchema);
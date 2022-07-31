const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aggregateSchema = new Schema({
    adjusted: true,
    count: {
        Number,
        default: 0.0
    },
    queryCount: {
        Number,
        default: 0.0
    },
    request_id: " ",
    results: [{
        c: {
            Number,
            default: 0.0
        },
        h: {
            Number,
            default: 0.0
        },
        l: {
            Number,
            default: 0.0
        },
        n: {
            Number,
            default: 0.0
        },
        o: {
            Number,
            default: 0.0
        },
        t: {
            Number,
            default: 0.0
        },
        v: {
            Number,
            default: 0.0
        },
        vw: {
            Number,
            default: 0.0
        }
    }, {

        c: {
            Number,
            default: 0.0
        },
        h: {
            Number,
            default: 0.0
        },
        l: {
            Number,
            default: 0.0
        },
        n: {
            Number,
            default: 0.0
        },
        o: {
            Number,
            default: 0.0
        },
        t: {
            Number,
            default: 0.0
        },
        v: {
            Number,
            default: 0.0
        },
        vw: {
            Number,
            default: 0.0
        }
    }],
    resultsCount: {
        Number,
        default: 0.0
    },
    status: "",
    ticker: ""
})

module.exports = mongoose.model('Aggregates', aggregateSchema);





// {
//     "adjusted": true,
//         "count": 2,
//             "queryCount": 2,
//                 "request_id": "5585acde-5085-42d6-95b2-2e388a28370a",
//                     "results": [
//                         {
//                             "c": 26.2,
//                             "h": 26.2,
//                             "l": 26.2,
//                             "n": 1,
//                             "o": 26.2,
//                             "t": 1632369600000,
//                             "v": 2,
//                             "vw": 26.2
//                         },
//                         {
//                             "c": 28.3,
//                             "h": 28.3,
//                             "l": 28.3,
//                             "n": 1,
//                             "o": 28.3,
//                             "t": 1632456000000,
//                             "v": 2,
//                             "vw": 28.3
//                         }
//                     ],
//                         "resultsCount": 2,
//                             "status": "OK",
//                                 "ticker": "O:RDFN211119C00025000"
// }
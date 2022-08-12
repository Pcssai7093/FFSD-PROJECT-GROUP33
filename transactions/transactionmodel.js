const mongoose = module.require("mongoose");
const schm = mongoose.Schema;

const transschm = new schm(
  {
    userid: {
      type: String,
      required: true,
    },
    gigid: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    reports: {
      type: [
        {
          type: String,
        },
      ],
    },
    review: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

const transdatamodel = mongoose.model("trans-datas", transschm);
module.exports = transdatamodel;

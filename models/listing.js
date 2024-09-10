const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const listingSchema=new Schema({

    title:{
        type:String,
        require:true,
    },
    description:String,
    image:{type:String,
        default :"https://tse3.mm.bing.net/th?id=OIP.B8u7c37kE5ZdM5ZCRm-4hwAAAA&pid=Api&P=0&h=180",
        set: (v)=>v==="" ? "https://tse3.mm.bing.net/th?id=OIP.B8u7c37kE5ZdM5ZCRm-4hwAAAA&pid=Api&P=0&h=180" : v,
    },
    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
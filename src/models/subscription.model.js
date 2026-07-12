import mogoose, {Schema} from "mongoose"

const subscriptionSchema = new Schema ({
    subscriber : {
        type: Schema.Types.ObjectId, // subscriber info
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId, // channel is also user
        ref :"User"
    }
},{timestamps:true})


export const Subscription = mongoose.model("Subscription",subscriptionSchema)
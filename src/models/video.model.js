import mongoose, { schema } from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = newSchema({
    videofile: {
        type: string, //cludinary url
        required: true
    },
    thumbnail: {
        type: String, // cloudinary url
        required: True
    },
    title: {
        type: String,
        reuired: true
    },
    description: {
        type: String,
        required: true
    },
    view: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number, // given by hosting service
        required: true
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User" // name of the model we created
    }
}, { timestamps: true })

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)
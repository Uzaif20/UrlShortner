
import { Schema, model } from 'mongoose';
import User from "../model/user.js"

const urlSchema = new Schema(
  {
    originalUrl:{
      type:String,
      required: true,
    },
    shortCode:{
      type:String,
      required: true,
      unique:true,
    },
    clicks:{
      type: Number,
      default: 0,
    },
    user:{
      type:Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
  }
)

const Url = model('Url', urlSchema);

export default Url
import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    //un usuario podra crear muchos prompts
  },
  prompt: {
    type: String,
    require:[true, "Prompt es necesario"]
  },
  tag: {
    type: String,
    required:[true, "Etiqueta es necesario"]
  }
})

const Prompt = models.Prompt || model("Prompt", PromptSchema)

export default Prompt;
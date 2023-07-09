import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email ya existe'],
    required: [true, 'Se necesita proporcionar un Email']
  },
  username: {
    type: String,
    required: [true, 'Se necesita un nombre de usuario'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Nombre de usuario no válido, debe contener de 8 a 20 letras alfanuméricas y ser único."]
  },
  image: {
    type:String
  }
})

//en next.js solo se llama a la ruta cuando es necesario a diferencia de express que siempre esta funcionando
//le diremos a mongoose que checke si existe el modelo , solamente si no encuentra este tipo de modelo creara uno nuevo
const User = models.User || model("User", UserSchema)
export default User
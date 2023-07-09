//get(lee la request para un unico prompt ya que es por id)

import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";


export const GET = async (request,{params}) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator')
    if(!prompt) return new Response ("Prompt no encontrado", {status:404})
    
    return new Response(JSON.stringify(prompt), {
      status:200
    })

  } catch (error) {
    return new Response("Fallo al traer todas las prompts", { status:500})
  }
}
//patch(editar o update mejor dicho)

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json()
  
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt) return new Response("Prompt no encontrada", { status: 404 })
    
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag
    
    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt),{status:200})
  } catch (error) {
    return new Response ("Fallo en actualizar el prompt",{status:404})
  }
}
// delete(elimina)

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt eliminada ", {status :200})
  } catch (error) {
    return new Response ("Fallo al eliminar prompt",{status:404})
  }

}
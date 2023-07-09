import Link from "next/link"

const Form = ({type,descripcion,post,setPost,submitting,handleSubmit}) => {
  return (
    <section className="2-full max-w-full flex-start flex-col">
      <h1 className="head_text text_left">
        <span className="babyblue_gradient">
        {type} Publicación
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {descripcion} y comparte tus prompts con el mundo!, y deja deja volar tu imaginación con cualquier tipo de herramienta de IA
      </p>
      <form
        onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2x1 flex flex-col gap-5 glassmorphism "  
      >
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Tu prompt de IA
        </span>
        <textarea
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder="Escribe tu pront aqui"
          required
          className="form_textarea bg-gray-200"
        />
        
      </label>
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Etiqueta {' '}
          <span className="font-normal">Por ejemplo (#desarolloweb ,#nutricion , #ejercicio , #desarollodeaplicaciones , etc )</span>
        </span>
        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          required
          placeholder="#etiqueta"
          className="form_input bg-gray-200"
        />
          
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 hover:text-red-500">
            Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none"
            >
              {submitting? `${type}...`: type }
            </button>
        </div>
        </form>
    </section>
  )
}

export default Form
import Feed from "@components/Feed"


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Descubre y Comparte
      <br className="max-md:hidden" />
        <span className="blue_gradient text-center">Instrucciones Generadas para IA</span>
      </h1>
      <p className="desc text-center">
        PromptWiki es una herramienta de generación de sugerencias de IA de código abierto para el mundo moderno, que permite crear, compartir y buscar comandos creativos para IA , tambien conocidos como Prompts
      </p>
      {/* Feed */}
      <Feed/>
    </section>
  )
}

export default Home
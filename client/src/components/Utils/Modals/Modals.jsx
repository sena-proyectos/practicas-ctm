const Modals = () => {
  return (
    <section className="w-screen h-screen fixed top-0 left-0 bg-black/10 items-center justify-center flex z-50">
      <section className="w-1/2 bg-white relative rounded-md shadow-md h-[30rem]">
        <header>
          <h1 className="text-2xl text-center">Modal</h1>
        </header>
        <body></body>
        <footer></footer>
      </section>
    </section>
  )
}

export { Modals }

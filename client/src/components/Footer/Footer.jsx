const Footer = () => {
  return (
    <footer className='flex h-[6.4vh] w-full items-center justify-center border-t-1 border-fifth/50 text-center'>
      <div className='flex flex-row h-full gap-2'>
        <span className='self-center text-sm'>© SENA - Centro Tecnológico del Mobiliario</span>
        <img className='self-center w-8 h-8' src='/logo1.png' alt='logoSena' />
      </div>
    </footer>
  )
}

export { Footer }

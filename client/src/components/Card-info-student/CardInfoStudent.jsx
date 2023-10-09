import { useEffect } from 'react'
import { apprenticeStore } from '../../store/config'
import { Accordion, AccordionItem } from '@nextui-org/accordion'

export const CardInfoStudent = () => {
  const { apprenticeData } = apprenticeStore()

  useEffect(() => {
    const cachedData = JSON.parse(sessionStorage.getItem('apprenticeData'))
    if (cachedData) {
      apprenticeStore.setState({ apprenticeData: cachedData })
    }
  }, [])

  return (
    <Accordion variant='shadow'>
      <AccordionItem key={1} aria-label='Information Student' title='Información del aprendiz'>
        <section className='grid justify-center grid-cols-1 gap-2 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {Object.entries(apprenticeData).map(([key, value]) => {
            return (
              <div key={key}>
                <p className='font-semibold capitalize whitespace-pre-wrap'>
                  {key
                    .split('_')
                    .join(' ')
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
                <p className='break-words whitespace-pre-wrap'>{value ?? 'N/A'}</p>
              </div>
            )
          })}
        </section>
      </AccordionItem>
    </Accordion>
  )
}

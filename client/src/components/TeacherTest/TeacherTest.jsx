import { useRef } from 'react'
import { GetClassByNumber } from '../../api/httpRequest'
import Swal from 'sweetalert2'

export const TeacherName = () => {
    const ficha = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const numFicha = ficha.current.value

        try {
            const res = await GetClassByNumber(numFicha)
            const response = res.data.data[0]
            console.log(response)
        } catch (error) {
            const message = error.response.data.error.info.message
            Swal.fire({
                icon: 'error',
                title: 'Opsss!!',
                text: message,
            })
        }
    }

    return (
        <main>
            <h1>numero por ficha</h1>

            <form onSubmit={handleSubmit}>
                <label>Ingrese el número de la ficha:</label>
                <br />
                <input type="text" ref={ficha} className="border-2" />
            </form>
        </main>
    )
}

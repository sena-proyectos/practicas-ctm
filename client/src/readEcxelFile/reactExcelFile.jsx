import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

export const readExcelFile = async (file) => {
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        console.log(workbook);

        workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            console.log(`Sheet: ${sheetName}`);
            console.log(jsonData);

            if (jsonData.length > 2) {
                const showModal = async () => {
                    const responseModal = await Swal.fire({
                        icon: 'question',
                        title: '¡Aviso!',
                        text: 'Se ha detectado más de 2 registros en el archivo excel. ¿Desea directamente guardar todos los registros?',
                        confirmButtonText: 'Guardar registros',
                        confirmButtonColor: '#39A900',
                        denyButtonText: 'No guardar registros',
                        showDenyButton: true,
                    });
                    if (responseModal.isConfirmed) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Éxito!',
                            text: 'Se han guardado todos los registros exitosamente',
                        });
                    } else if (responseModal.isDenied) {
                        //* terminar
                    }
                };
                showModal();
            }
        });
    };

    reader.readAsArrayBuffer(file);
};
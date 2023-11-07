import { create } from 'zustand'

/**
 * @function
 * @name inscriptionStore
 *
 * @param {Function} set - Función para establecer el estado del almacén.
 * @returns {object} - Un objeto que contiene el estado de los datos de inscripción y la función para establecer estos datos.
 *
 * @description
 * Esta función crea una tienda de datos utilizando la biblioteca 'zustand'. La tienda de datos contiene un objeto llamado 'inscriptionData' que inicialmente está vacío. También proporciona una función 'setInscriptionData' para establecer los datos en la tienda.
 *
 * @Ejemplo de uso:
 * ```javascript
 * const inscriptionStore = create((set) => ({
 *   inscriptionData: {},
 *   setInscriptionData: (data) => set({ inscriptionData: data })
 * }));
 *
 * Para establecer datos en la tienda:
 * inscriptionStore.setInscriptionData(nuevosDatos);
 * ```
 */
export const inscriptionStore = create((set) => ({
  inscriptionData: {},
  setInscriptionData: (data) => set({ inscriptionData: data })
}))

/**
 * @function
 * @name userStore
 *
 * @param {Function} set - Función para establecer el estado del almacén.
 * @returns {object} - Un objeto que contiene el estado del ID de usuario y la función para establecer este ID.
 *
 * @description
 * Esta función crea una tienda de datos utilizando la biblioteca 'zustand'. La tienda de datos contiene un campo llamado 'userId'
 * que inicialmente es null. También proporciona una función 'setUserId' para establecer el ID de usuario en la tienda.
 *
 * @Ejemplo de uso:
 * ```javascript
 * const userStore = create((set) => ({
 *   userId: null,
 *   setUserId: (data) => set({ userId: data })
 * }));
 *
 * Para establecer el ID de usuario en la tienda:
 * userStore.setUserId(idUsuario);
 * ```
 */
export const userStore = create((set) => ({
  userId: null,
  setUserId: (data) => set({ userId: data })
}))

/**
 * @function
 * @name apprenticeStore
 *
 * @param {Function} set - Función para establecer el estado del almacén.
 * @returns {object} - Un objeto que contiene el estado de los datos del aprendiz y la función para establecer estos datos.
 *
 * @description
 * Esta función crea una tienda de datos utilizando la biblioteca 'zustand'. La tienda de datos contiene un campo llamado 'apprenticeData' que inicialmente está vacío. También proporciona una función 'setApprenticeData' para establecer los datos en la tienda. Los datos se almacenan en la sesión y se transforma el nombre completo para que la primera letra de cada palabra esté en mayúscula.
 *
 * @Ejemplo de uso:
 * ```javascript
 * const apprenticeStore = create((set) => ({
 *   apprenticeData: {},
 *   setApprenticeData: async (data) => {
 *     sessionStorage.setItem('apprenticeData', JSON.stringify(data));
 *     data.nombre_completo = data.nombre_completo
 *       .split(' ')
 *       .map((word) => {
 *         return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
 *       })
 *       .join(' ');
 *     set({ apprenticeData: data });
 *   }
 * }));
 *
 * Para establecer datos de aprendiz en la tienda:
 * apprenticeStore.setApprenticeData(nuevosDatos);
 * ```
 */
export const apprenticeStore = create((set) => ({
  apprenticeData: {},
  setApprenticeData: async (data) => {
    sessionStorage.setItem('apprenticeData', JSON.stringify(data))
    data.nombre_completo = data.nombre_completo
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(' ')
    set({ apprenticeData: data })
  }
}))

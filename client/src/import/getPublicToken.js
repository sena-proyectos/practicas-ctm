/**
 * @function
 * @name getPublicTokenFromSession
 *
 * @description
 * Esta función se utiliza para obtener el token público almacenado en la sesión del navegador. El token público es un
 * token que puede ser utilizado en sesiones públicas o no autenticadas.
 *
 * @returns {string | null} - El token público almacenado en la sesión o null si no se encuentra.
 *
 * @Ejemplo de uso:
 * ```javascript
 * const publicToken = getPublicTokenFromSession();
 * publicToken contendrá el token público almacenado en la sesión o null si no se encuentra.
 * ```
 */
export const getPublicTokenFromSession = () => {
  const token = sessionStorage.getItem('public-token')
  return token
}

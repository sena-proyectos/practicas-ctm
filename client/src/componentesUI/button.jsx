export const Button = ({ nameButton }) => {

    const register = async(e) => {
        e.preventDefault();



    }
    return (
        <>
            <button onClick={register}>{nameButton}</button>
        </>
    )
}
import { useRef } from "react"

export const CaptureValue = () => {
    const selectRef = useRef(null)

    const getSelectedValue = () => {
        return selectRef.current.value
    }

    return { selectRef, getSelectedValue }
}
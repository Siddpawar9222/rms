import { useState } from "react"


function InputText({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType }) {

    const [value, setValue] = useState(defaultValue);

    const updateInputValue = (val) => {
        setValue(val)
        updateFormValue({ updateType, value: val })
    }

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input type={type || "text"} value={value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)} className="input  input-bordered w-full " autoComplete="on" />
        </div>
    )
}


export default InputText;


/*
labelTitle : label name (showing name) for input field
labelStyle : style for label
type : any input type
containerStyle : style for form-control
defaultValue : default value for input field
placeholder : placeholder for input field
updateFormValue : function to update form value
updateType : name of input field
*/
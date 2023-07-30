import styled from "styled-components"
import React, { FC } from "react"

interface props {
  isError?: boolean
  label: string
  input: {
    type: string
    placeholder: string
    registerData: object
  }
}

export const FormField: FC<props> = ({ input, isError, label }) => {
  const { placeholder, type, registerData } = input

  return (
    <FieldLayout className="FormField">
      <label className={isError ? "error" : ""} htmlFor={label}>
        {label}
      </label>
      <input
        className={isError ? "error" : ""}
        type={type}
        {...registerData}
        placeholder={placeholder}
      />
    </FieldLayout>
  )
}
const FieldLayout = styled.div`
  display: flex;
  flex-direction: column;

  label,
  input {
    color: var(--txt-6);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  input {
    background-color: transparent;
    height: 30px;
    border-bottom: var(--bg-5) solid 2px;
  }

  .error {
    color: var(--error-1);
    border-bottom-color: var(--error-1);
  }
`

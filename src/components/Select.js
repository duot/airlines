import React from 'react'

// for option in options
//  option[valueKey]
//  option[titleKey]
const Select = ({
  options = [],
  valueKey = "",
  titleKey = "",
  enabledKey = undefined,
  value = "all",
  allTitle = "all",
  onSelect = (_) => null,
}) => {

  const handleChange = (event) => {
    event.preventDefault()
    onSelect(event.target.value)
  }

  const optionElements = options.map(option => {
    const value = option[valueKey]
    const enabled = enabledKey === undefined || !!option[enabledKey]
    return (
      <option key={value} value={value} disabled={!enabled}>
        {option[titleKey]}
      </option>
    )
  })

  optionElements.unshift(
    <option key="all" value="all">
      {allTitle}
    </option>
  )

  return (
    <select value={value} onChange={handleChange}>
      {optionElements}
    </select>
  )
}

export default Select
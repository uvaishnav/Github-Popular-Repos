// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isSelected, optionDisplay, optionValue} = props
  const optionStyle = isSelected
    ? 'option-style selected-style'
    : 'option-style'
  return (
    <option className={optionStyle} value={optionValue}>
      {optionDisplay}
    </option>
  )
}

export default LanguageFilterItem

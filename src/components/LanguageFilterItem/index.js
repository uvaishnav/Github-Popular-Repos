// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isSelected, optionDisplay, optionValue, onchangeFilter} = props
  const optionStyle = isSelected
    ? 'option-style selected-style'
    : 'option-style'
  return (
    <button
      type="button"
      className={optionStyle}
      onClick={() => onchangeFilter(optionValue)}
    >
      {optionDisplay}
    </button>
  )
}

export default LanguageFilterItem

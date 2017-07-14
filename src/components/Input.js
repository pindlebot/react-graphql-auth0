import React from 'react'

const styles = [
  'input-reset',
  'w-100',
  'pa3', 
  'mv2',
  'br2',
  'ba',
  'b--mid-gray',
  'outline-0'
]

const Input = ({onChange, value, placeholder}) => (
  <input
    className={styles.join(' ')}
    value={value}
    placeholder={placeholder}
    onChange={e => onChange(e)}
  />
)

export default Input
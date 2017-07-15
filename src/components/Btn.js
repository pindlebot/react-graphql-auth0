import React from 'react';

const styles = [
  'dib',
  'br2',
  'ph3',
  'pv2',
  'bg-navy',
  'dim',
  'white',
  'pointer',
];

const Btn = props => (
  <div className={styles.join(' ')}>
    {props.children}
  </div>
);

export default Btn;

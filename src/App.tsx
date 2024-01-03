import { useState } from 'react';
import './App.scss';

// interface MyComponentProps {
//   style: React.CSSProperties;
// }

// const inputStyle: React.CSSProperties = {
//   border: '1px solid #ccc',
//   padding: '8px',
//   borderRadius: '4px',
// }

function Form() {
  const [value, setValue] = useState("Change me");

  // event의 type 지정
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  return (
    <>
      <input value={value} onChange={handleChange} className='input' />
      <p>Value: {value}</p>
    </>
  );
}

export default function App() {
  return (
    <div className='container'>
      <Form />
    </div>
  )
}
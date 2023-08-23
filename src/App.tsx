import { useState } from 'react';

function App() {
  const [value, setValue] = useState('Your value');

  console.log(value);

  return (
    <>
      <textarea
        style={{ height: '200px', width: '200px' }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <p>{value}</p>
    </>
  );
}

export default App;

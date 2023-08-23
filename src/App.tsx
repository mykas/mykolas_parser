import { useState } from 'react';
import { parseCSV } from './parseCSV/parseCSV';

const Row = ({ column }: { column: Array<string> }) => {
  return (
    <tr>
      {column.map((cell) => (
        <th>{cell}</th>
      ))}
    </tr>
  );
};

function App() {
  const [value, setValue] = useState('Your value');

  const parsedCSV = parseCSV({ value });

  return (
    <>
      <textarea
        style={{ height: '200px', width: '200px' }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <table>
        {parsedCSV.map((column) => (
          <Row column={column} />
        ))}
      </table>
    </>
  );
}

export default App;

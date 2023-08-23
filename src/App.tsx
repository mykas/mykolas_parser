import { useState } from 'react';
import { parseCSV } from './parseCSV/parseCSV';
import styles from './App.module.css';

const Row = ({
  column,
  type = 'cell',
}: {
  column: Array<string>;
  type?: 'header' | 'cell';
}) => {
  const typeToStyles = {
    cell: styles['table-cell'],
    header: styles['table-header'],
  };
  return (
    <tr className={styles['table-row']}>
      {column.map((cell) => (
        <th className={typeToStyles[type]}>{cell}</th>
      ))}
    </tr>
  );
};

function App() {
  const [value, setValue] = useState('Your value');
  const [checked, setChecked] = useState(false);

  const parsedCSV = parseCSV({ value });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <textarea
        style={{ height: '200px', width: '200px' }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div>
        <label htmlFor="header">Includes Header</label>
        <input
          checked={checked}
          onChange={() => setChecked(!checked)}
          id="header"
          type="checkbox"
        />
      </div>
      <table className={styles.table}>
        <thead>
          {checked ? <Row type="header" column={parsedCSV[0]} /> : undefined}
        </thead>
        <tbody>
          {parsedCSV.map((column, index) => {
            if (checked && index === 0) {
              return undefined;
            }
            return <Row column={column} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

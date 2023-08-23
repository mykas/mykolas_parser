import { parseCSV } from './parseCSV';

describe('parseCSV', () => {
  it('Each record is located on a separate line, delimited by a line break (CRLF)', () => {
    const value = 'aaa,bbb,ccc\nzzz,yyy,xxx\n';
    const parsedValue = parseCSV({ value });
    expect(parsedValue).toStrictEqual([
      ['aaa', 'bbb', 'ccc'],
      ['zzz', 'yyy', 'xxx'],
    ]);
  });

  it('The last record in the file may or may not have an ending line break.', () => {
    const value = 'aaa,bbb,ccc\nzzz,yyy,xxx';
    const parsedValue = parseCSV({ value });
    expect(parsedValue).toStrictEqual([
      ['aaa', 'bbb', 'ccc'],
      ['zzz', 'yyy', 'xxx'],
    ]);
  });

  it('Spaces are considered part of a field and should not be ignored.', () => {
    const value = 'aa a,bbb,cc c';
    const parsedValue = parseCSV({ value });
    expect(parsedValue).toStrictEqual([['aa a', 'bbb', 'cc c']]);
  });

  it('Each field may or may not be enclosed in double quotes', () => {
    const value = '"aaa","bbb",ccc';
    const parsedValue = parseCSV({ value });
    expect(parsedValue).toStrictEqual([['"aaa"', '"bbb"', 'ccc']]);
  });

  it('If double-quotes are used to enclose fields, then a double-quote appearing inside a field must be escaped by preceding it with another double quote', () => {
    const value = '"aaa","b""bb","ccc"';
    const parsedValue = parseCSV({ value });
    expect(parsedValue).toStrictEqual([['"aaa"', '"b""bb"', '"ccc"']]);
  });

  it('Fields containing line breaks (CRLF) should be enclosed in double-quotes', () => {
    const value = '"aaa","b/nbb","ccc"';
    const parsedValue = parseCSV({ value });
    expect(parsedValue).toStrictEqual([['"aaa"', '"b/nbb"', '"ccc"']]);
  });

  it('Fields containing line breaks (CRLF) should be enclosed in double-quotes', () => {
    const value = '"aaa","b\nbb","ccc"';
    const parsedValue = parseCSV({ value });
    expect(parsedValue).toStrictEqual([['"aaa"', '"b\nbb"', '"ccc"']]);
  });

  it('Fields containing commas should be enclosed in double-quotes', () => {
    const value = '"aaa","b.bb","ccc"';
    const parsedValue = parseCSV({ value });
    expect(parsedValue).toStrictEqual([['"aaa"', '"b.bb"', '"ccc"']]);
  });

  it('Fields containing commas and new lines should just work', () => {
    const value = '"aaa","bbb"\n"ccc","ddd"';
    const parsedValue = parseCSV({ value });
    expect(parsedValue).toStrictEqual([
      ['"aaa"', '"bbb"'],
      ['"ccc"', '"ddd"'],
    ]);
  });
});

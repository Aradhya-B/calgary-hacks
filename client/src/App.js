import { useState } from 'react';
import Upload from './views/Upload';

const App = () => {
  const [keyWordToHtmlMap, setKeywordToHtmlMap] = useState({});
  return (
    <div>
      <Upload/>
    </div>
  );
}

export default App;

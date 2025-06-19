// App imports
import { Main } from 'components';
import './styles.scss';

// Context imports
import { MainProvider } from 'context';

export const App = () => {
  return (
    <MainProvider>
      <div className="App">
          <Main/>
      </div>
    </MainProvider>
  );
}
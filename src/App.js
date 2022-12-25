import Header from './components/Header';
import './index.css';

import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <Header />
      {/* Board Column */}
      <div className="board flex flex-wrap gap-5 my-5 mx-5 lg:overflow-x-auto lg:flex-nowrap">
        <div className="board-col w-1/1  lg:w-1/4 ">
          <h4 className="text-xs font-normal group-task">Group Task 1</h4>
          <h2 className="text-xl font-bold mt-3" style={{ color: '#404040' }}>
            January - March
          </h2>
          <Card/>
        </div>
      </div>
      
    </div>
  );
}

export default App;

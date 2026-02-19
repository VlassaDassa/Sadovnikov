import Header from './components/Header';
import Preview from './components/Preview';
import Skills from './components/Skills';
import Stack from './components/Stack';


function App() {

  	return (
		<>	
			<Header />
			<main className="main">
				<Preview />
				<Skills />
				<Stack />
			</main>
		</>
    	
  	)
}

export default App

import { NextPage } from 'next'
import Canvas from '../components/headerCanvas';

const Home: NextPage = () => {
	return (
        <header className='canvas-container'>
            <Canvas />
        </header>
    );
}

export default Home;
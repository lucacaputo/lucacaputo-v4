import { NextPage } from 'next'
import Canvas from '../components/headerCanvas';
import Hero from '../components/hero';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { BsArrowDownShort } from 'react-icons/bs'

const Home: NextPage = () => {
    const arr = useMotionValue(-50);
    const arrY = useSpring(arr, { stiffness: 200, damping: 15 });
	return (
        <header className='canvas-container'>
            <Canvas />
            <Hero>
                <h1>Ciao &#128075;, sono <span>Luca Caputo</span>.</h1>
                <h4><strong>Full stack</strong> web developer.</h4>
                <motion.button 
                    type='button'
                    className='btn hero-btn'
                    onMouseLeave={() => arrY.set(-50)}
                    onMouseEnter={() => arrY.set(0)}
                    initial={{ backgroundColor: '#00000000' }}
                    whileHover={{
                        backgroundColor: '#ff00ffff',
                        transition: {
                            duration: .2,
                            type: 'tween'
                        }
                    }}
                >
                    Scopri di pi&ugrave;&nbsp;
                    <motion.span style={{ y: arrY }}>
                        <BsArrowDownShort size='2rem' color='#fff' />
                    </motion.span>
                </motion.button>
            </Hero>
        </header>
    );
}

export default Home;
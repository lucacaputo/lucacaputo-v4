import { motion, Variants } from 'framer-motion';

const Hero: React.FC = ({ children }) => {
    const heroVars: Variants = {
        initial: {
            y: 200,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                type: 'spring',
                stiffness: 165,
                mass: 3,
                damping: 35,
            }
        }
    }
    return (
        <motion.div 
            className="hero"
            variants={heroVars}
            initial="initial"
            animate="animate"
        >
            {children}
        </motion.div>
    );
}

export default Hero;
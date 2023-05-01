import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (  
        <div>
            <h1 className="text-primary">Nuk mund ta vizitoni kete faqe me llogarine ne te cilen jeni te kyqur momentalisht!</h1>
            <Link to="/"><h5>Kthehu</h5></Link>
        </div>
    );
}
 
export default Unauthorized;
import Avatar from './Avatar';
import './App.css';


function Card({
    children,
}: {
    children: React.ReactNode;
    // children: React.ReactElement; only JSX elements and not JavaScript primitives like strings or numbers
}) {
    return (
        <div className="card">
            {children}
        </div>
    );
}


export default function App() {
    return (
        <Card>
            <h1>Notable Scientists</h1>
            이하 태그는 모두 children prop
            <Avatar
                person={{
                    name: 'Maria Skłodowska-Curie',
                    imageId: 'szV5sdG'
                }}
                size={150}
                awards='Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal'
                discovered='polonium (chemical element)'
            />
            <Avatar
                person={{
                    name: 'Katsuko Saruhashi',
                    imageId: 'YfeOqp2'
                }}
                size={70}
                awards='Miyake Prize for geochemistry, Tanaka Prize'
                discovered='a method for measuring carbon dioxide in seawater'
            />
        </Card>
    );
}
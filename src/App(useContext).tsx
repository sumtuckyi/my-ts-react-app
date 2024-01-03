import { createContext, useContext, useState, useMemo } from 'react';

interface MyBtnProps {
    title: string;
    onClickHandler: () => void;
}

interface MyComponentProps {
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

type ComplexObject = {
    kind: string;
}
// context 생성 - default value는 null로 지정
const Context = createContext<ComplexObject | null>(null);
// 
const useGetComplexObject = () => {
    const object = useContext(Context);
    if (!object) {
        throw new Error("useGetComplexObject must be used within a Provider")
    } // 가져온 context의 값이 null이면 Error를 리턴 - 가져온 context의 값이 null이 되는 경우는 useGetComplexObject가
    return object;
}


type Theme = "light" | "dark" | "system";
// context 생성 - default value 는 "system"으로 지정
const ThemeContext = createContext<Theme>("system");

const useGetTheme = () => useContext(ThemeContext);

export default function MyApp() {
    const [theme, setTheme] = useState<Theme>('light');
    const object = useMemo(() => ({ kind: "complex" }), []);

    return (
        <div>
            <ThemeContext.Provider value={theme}>
                <MyComponent setTheme={setTheme} />
            </ThemeContext.Provider>
            <Context.Provider value={object}>
                <MyComponent2 />
            </Context.Provider>
        </div>

    )
}

function MyBtn({ title, onClickHandler }: MyBtnProps) {
    return (
        <button onClick={onClickHandler}>{title}</button>
    )
}

// 자식 컴포넌트에서 전달받은 props가 없으므로 바로 접근할 수 없고, useGetTheme()을 이용해 theme변수의 값을 사용
function MyComponent({ setTheme }: MyComponentProps) {
    const theme = useGetTheme();

    return (
        <div>
            <p>Current theme: {theme}</p>
            <MyBtn title='light' onClickHandler={() => setTheme('light')} />
            <MyBtn title='dark' onClickHandler={() => setTheme('dark')} />
            <MyBtn title='system' onClickHandler={() => setTheme('system')} />
        </div>
    )
}

function MyComponent2() {
    const object = useGetComplexObject();

    return (
        <div>
            <p>Current object : {object.kind}</p>
        </div>
    )
}
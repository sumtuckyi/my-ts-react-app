import React from 'react';
import { useState } from 'react';
import { useReducer } from 'react';
import './App.css';
// import { JSX } from 'react/jsx-runtime';


// interface declaration is another way to name an object type:
interface Product {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
}

interface ProductCategoryRowProps {
    category: string;
}

interface ProductRowProps {
    product: Product;
}

interface ProductTableProps {
    products: Product[];
    filterText: string;
    inStockOnly: boolean;
}

interface SearchBarProps {
    filterText: string;
    inStockOnly: boolean;
    onFilterTextChange: Function;
    onInStockOnlyChange: Function;
}

interface FilterableProductTableProps {
    products: Product[];
}

interface MyButtonProps {
    title: string;
    disabled: boolean;
}


function FilterableProductTable({
    products,
}: FilterableProductTableProps) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            {/* 부모 컴포넌트에서 자식 컴포넌트에 props전달 */}
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly} />
            <ProductTable
                products={products}
                filterText={filterText}
                inStockOnly={inStockOnly} />
        </div>
    );
}

function ProductCategoryRow({ category }: ProductCategoryRowProps) {
    return (
        <tr>
            {/* prop value로 자바스크립트 표현식을 사용, not "2" as static valus */}
            <th colSpan={2}>
                {category}
            </th>
        </tr>
    );
}

function ProductRow({ product }: ProductRowProps) {
    const name = product.stocked ? product.name :
        <span style={{ color: 'red' }}>
            {product.name}
        </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

function ProductTable({
    products, filterText, inStockOnly
}: ProductTableProps
) {
    // each element in the array can be any valid React node
    const rows: React.ReactNode[] = []; // []로 초기화
    let lastCategory: string | null = null; // null로 초기화

    products.forEach((product) => {
        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        } // 검색어를 포함하고 있지 않다면 product.name.toLowerCase().indexOf()는 -1을 반환
        if (inStockOnly && !product.stocked) {
            return;
        } // 체크박스에 체크가 되어있고 해당 상품의 재고가 없는 경우 해당 상품은 패스
        // 위의 조건문에 의해 걸러지지 않은 상품이면 카테고리를 검사
        // lastCategory의 값은 처음에는 null, 이후에는 테이블에 가장 마지막에 들어간 상품의 카테고리
        if (product.category !== lastCategory) { // 해당상품의 카테고리가 처음 등장한 경우 카테고리 row를 테이블에 추가
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category} />
            );
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name} />
        );
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

// 자식 컴포넌트
function SearchBar({
    filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange
}: SearchBarProps) {
    return (
        <form>
            <input
                type="text"
                value={filterText}
                placeholder="Search..."
                onChange={(e) => onFilterTextChange(e.target.value)} />
            <label>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onInStockOnlyChange(e.target.checked)} />
                {' '}
                Only show products in stock
            </label>
        </form>
    );
}

function MyButton({ title, disabled }: MyButtonProps) {
    return (
        <button disabled={disabled}>{title}</button>
    )
}

const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

// useReducer 사용하기 
// object 형식의 Type을 선언, Type의 이름은 State 
// describes the shape of the reducer’s state
interface State {
    count: number;
}

// union type 정의
// describes the different actions which can be dispatched to the reducer.
type CounterAction =
    | { type: "reset" }
    | { type: "setCount"; value: State["count"] }

// provides a type for the initial state, and also the type which is used by useReducer by default
const initialState: State = { count: 0 };

// useReducer의 첫번째 매개변수로 전달할 함수
// sets the types for the reducer function’s arguments and return value.
function stateReducer(state: State, action: CounterAction): State {
    switch (action.type) {
        case "reset":
            return initialState;
        case "setCount":
            // create a new object that includes all the properties of the current state (...state) and updates the count property by incrementing its value by 1.
            return { ...state, count: action.value };
        default:
            throw new Error("Unknown action");
    }
}

export default function App() {
    // 첫번째 매개변수로 reducer함수, 두번째 매개변수로 An initial state를 받는다.
    // 그리고 A stateful value와 A dispatch 함수를 리턴한다.
    const [state, dispatch] = useReducer(stateReducer, initialState);

    // Add 5 버튼을 눌렀을 때 호출되는 함수. 
    const addFive = () => dispatch({ type: 'setCount', value: state.count + 5 });
    const reset = () => dispatch({ type: "reset" });

    return (
        <>
            <p>Count: {state.count}</p>
            <button onClick={addFive}>Add 5</button>
            <button onClick={reset}>Reset</button>
            <div>
                <br />
            </div>
            <FilterableProductTable products={PRODUCTS} />
            <MyButton title='click me!' disabled={true} />
            <MyButton title='click me!2' disabled={false} />
        </>
    )
}




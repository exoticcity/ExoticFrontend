
const dropdown = (props) => {
    return (
        <select style={{ backgroundColor: '#f2f2f2', borderRadius: '6px', padding: '2px' }} onChange={props.onChange} onClick={() => {
            props.brand(false);
            props.product(false);
        }}>
            <option value={"en"}>ENGLISH</option>
            <option value={"de"}>DUTCH</option>
            <option value={"fr"}>FRENCH</option>
            <option value={"nl"}>NETHERLANDS</option>
        </select >
    );
}

export default dropdown;

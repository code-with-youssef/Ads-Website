export default function ActionButton({style, text, onClick}){
    return(
        <button
            className={style}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
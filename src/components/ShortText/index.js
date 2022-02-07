export default function ShortText({text}) {
    return <>
        {text && text.length > 180 ?
            `${text.substring(0, 180)}... (...continua)` : text
        }
    </>
}
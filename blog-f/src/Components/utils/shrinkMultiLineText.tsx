export default function shrinkText(text: string) {
    return text.split('\\n').map((item, i) => <p key={i}>{item}</p>)
}
import shrinkText from "@/Components/utils/shrinkMultiLineText";

interface ArticleTextProps {
    text: string
}
export default function ArticleText({text}: ArticleTextProps) {
    return (
        <div className={
            'w-full mb-5 bg-white transition-shadow box-border p-4 ' +
            'hover:outline hover:outline-1 hover:outline-cyan-600 max-w-[700px] relative' +
            'break-words w-full p-2 whitespace-pre-wrap'}>
            {shrinkText(text)}
        </div>
    )
}
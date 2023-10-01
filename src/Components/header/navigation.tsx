import Link from "next/link";
import useLocalization from "@/Components/Localization/Localization";

export default function Navigation(){
    const localization = useLocalization('navigation')
    return (
        <div className={'justify-center space-x-10'}>
            <Link
                className={'bg-sky-400'}
                href={'/'}>
                {localization.home}
            </Link>
            <Link
                className={'bg-sky-700'}
                href={'/registration'}>
                {localization.registration}
            </Link>
            <Link
                className={'bg-sky-900'}
                href={'/test1'}>
                test1
            </Link>
        </div>
    )
}
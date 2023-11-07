'use client'
import {usePathname, useRouter} from "next/navigation";
import useLocalization from "@/Components/Localization/Localization";
import Image from "next/image";

export default function ArticleBack() {
    const router = useRouter();
    const { backToMain } = useLocalization('topics/interface');
    return (
        <button className={'bg-cyan-600 transition-transform transform hover:scale-95 my-2.5 shadow border-b w-32'}
                onClick={() => router.push('/')}
        >
            {'←'} {backToMain}
        </button>
    )
}
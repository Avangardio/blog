import useLocalization from "@/Components/Localization/Localization";
import {keys} from "mobx";
import Link from "next/link";

interface FieldRedirectProps {
    to: "login" | "registration" | "confirmation" | "restoration"
    className: string
}
export default function FieldRedirect({to, className}: FieldRedirectProps){
    const localization = useLocalization('auth/redirects');
    const visibleText = localization[to + "Redirect" as keyof typeof localization];
    return (
        <Link href={"/" + to} className={className}>
            {visibleText}
        </Link>
    )

}
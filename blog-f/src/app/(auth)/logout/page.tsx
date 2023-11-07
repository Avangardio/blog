'use client'
import axios from "axios";
import {authURL} from "@/Fetching/URLs/authURLs";
import {redirect} from "next/navigation";

export default function LogoutPage() {
    axios.get(authURL + 'logout', {withCredentials: true}).then(
        result => window.location.href = '/'
    );
    return <div></div>
}
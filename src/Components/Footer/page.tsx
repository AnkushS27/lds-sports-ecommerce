import Link from "next/link"

export default function Footer() {
    return (
        <div className="mainWrapper">
            This is a Footer.
            <Link href='/'> Home </Link>
            <Link href='/faq'> FAQ </Link>
        </div>
    )
}
import Link from "next/link";

type PaginationProps = {
    totalPages: number;
    page: number;
    path: string;
}

export default function Pagination({ totalPages, page, path }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <nav className="flex justify-center py-10">
        {
            page > 1 &&
                <Link 
                    href={`${path}?page=${page - 1}`}
                    className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 "
                >
                    &laquo;
                </Link>
        }
        {pages.map((p) => (
            <Link 
            key={p} 
            href={`${path}?page=${p}`} 
            className={`
                    px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 
                    ${p === page && 'font-black'}
                `}
            >
            {p}
            </Link>
        ))}
        {
            page < totalPages && (
                <Link 
                    href={`${path}?page=${page + 1}`} 
                    className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 "
                >
                    &raquo;
                </Link>
            )
        }
    </nav>
  )
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getIconComponent } from './dynamicRendericons'

const MenuLink = ({ item, setSheetOpen }: { item: any, setSheetOpen: any }) => {
    const pathname = usePathname()
    const isActive = pathname.includes(item.name)

    function ChangeLetters(inputString: string): string {
        // Remove hyphens and replace with spaces
        const processedString = inputString.replace(/-/g, " ")
        return processedString
    }

    return (
        <>
            <Link href={`/home/${item.name}`} onClick={(e) => setSheetOpen(false)} style={pathname ? pathname.includes(item.name) === true ? { backgroundColor: "#f4f4f5", color: "#19191c" } : { width: "100%", color: "#71717a" } : { width: "100%", color: "#71717a" }} className='capitalize pl-[8px] no-underline w-full py-[7px] cursor-pointer rounded-[6px] base:hidden bl:flex gap-3 items-center bg-transparent !hover:text-[#19191c] navitemsForhome'>
                {getIconComponent(item.name)}
                <h2 className='flex items-center gap-3 bl:text-[0.88rem] bbl:tex-[0.9rem] tracking-[0.3px] mt-[3px] !font-[500]'>{ChangeLetters(item.name)}</h2>
            </Link>

            <Link href={`/home/${item.name}`} onClick={(e) => setSheetOpen(false)} style={pathname ? pathname.includes(item.name) === true ? { backgroundColor: "#e8effe", color: "#5b89e9" } : { width: "100%", color: "#71717a" } : { width: "100%", color: '#71717a' }} className='capitalize no-underline w-full py-[10px] px-[10px] cursor-pointer rounded-[6px] base:flex bl:hidden gap-3 items-center bg-transparent'>
                {getIconComponent(item.name)}
                <h2 className='flex items-center gap-3 text-[0.92rem] tracking-[0.3px] !font-[500]'>{ChangeLetters(item.name)}</h2>
            </Link>
        </>
    );
}
export default MenuLink
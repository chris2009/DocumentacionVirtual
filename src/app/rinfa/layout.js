import NavbarProps from "@/components/navBar/NavBarProps"

export default function DashboardLayout({ children }) {
    return <section>
        <NavbarProps />
            {children}
    </section>
}
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/ui/searchicon"
import { Button } from "@nextui-org/react";

export default function DashNav() {
    return (
        <Navbar isBordered shouldHideOnScroll >
            <NavbarBrand>
            <p className="font-bold text-inherit">GS-Assistant</p>
            </NavbarBrand>
            <NavbarContent justify="center" className="gap-x-3">
                <NavbarItem>
                    <Button as={Link} href="/dashboard" size="lg">
                        <p className="font-bold">Home</p>
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} href="/upload" size="lg">
                        <p className="font-bold">Upload</p>
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} href="/" size="lg">
                        <p className="font-bold">Cover</p>
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end" className="">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[10rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIcon size={18} />}
                    type="search"
                />
            </NavbarContent>
        </Navbar>
    );
}
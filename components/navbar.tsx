import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {

    const router = useRouter();

    const handleSubmit = () => {
        // Clear the access_token cookie
        document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';

        // Redirect to /signin page
        router.push('/signin');
    };
    const itemRenderer = (item: any) => (
        <a className="flex align-items-center p-menuitem-link" >
            <span className={item.icon} />
            <span className="mx-2" style={{ }}>{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} style={{}} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1" style={{ }}>{item.shortcut}</span>}
        </a>
    );

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Core',
                    icon: 'pi pi-bolt',
                    shortcut: '⌘+S',
                    template: itemRenderer
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',
                    shortcut: '⌘+B',
                    template: itemRenderer
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',
                    shortcut: '⌘+U',
                    template: itemRenderer
                },
                {
                    separator: true
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette',
                            badge: 2,
                            template: itemRenderer
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette',
                            badge: 3,
                            template: itemRenderer
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            badge: 3,
            template: itemRenderer
        }
    ];

    
    const end = (
        <div className="flex align-items-center gap-2">
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
            
            <Button type="button" onClick={handleSubmit} icon="pi pi-sign-out" text style={{ borderRadius: "20px" }}/>
        </div>
    );

    return (
        <div className="card megamenu" style={{ }}>
            <Menubar model={items}  end={end} style={{ }} />
        </div>
    );
}

// Navbar.jsx

import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { TieredMenu } from 'primereact/tieredmenu';
import { Dialog } from 'primereact/dialog';
import ImageUpload from './imageUpload';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserIdFromToken } from '@/utilities/verifyToken';
// import { getUserIdFromToken } from '../utils/auth'; // Adjust import path as per your project structure

export default function Navbar() {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const menu: any = useRef(null);
    const [userid, setUserid]: any = useState(null);

    useEffect(() => {
        // Fetch user_id from decoded token on component mount
        const token: any = localStorage.getItem("access_token");
        const fetchUserId = async () => {
          const userIdFromToken = await getUserIdFromToken(token);
          if (userIdFromToken) {
            setUserid(userIdFromToken);
          }
        };
        fetchUserId();
      }, []);

      const { data: image, isLoading, error } = useQuery(['image', userid], async () => {
        
            const response = await axios.get(`http://127.0.0.1:8000/image/images/?user_id=${userid}`);
            return response.data; // Assuming the response contains image data
    });
    
    const handleSubmit = () => {
        // Clear the access_token cookie
        document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';

        // Redirect to /signin page
        router.push('/signin');
    };

    const MenuItems = [
        {
            label: 'Logout',
            icon: "pi pi-sign-out",
            command: handleSubmit
        },
        {
            label: 'Settings',
            icon: "pi pi-wrench"
        },
        {
            label: 'Upload',
            icon: "pi pi-upload",
            command: () => {
                setVisible(true);
            }
        }
    ];

    const itemRenderer = (item: any) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                router.push('/home');
            }
        },
        {
            label: 'Tasks',
            icon: 'pi pi-star',
            command: () => {
                router.push('/home/tasks');
            }
        },
        {
            label: 'History',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Core',
                    icon: 'pi pi-bolt',
                    shortcut: '⌘+S',
                    template: itemRenderer
                },
            ]
        }
    ];

    const end = (
        <div className="flex align-items-center gap-2">
            <TieredMenu
                model={MenuItems}
                popup
                ref={menu}
                breakpoint="767px"
            />
            <Avatar
                image={image} // Assuming image is passed as URL here
                shape="circle"
                onClick={(e) => menu.current.toggle(e)}
                className='mr-3'
            />
        </div>
    );

    return (
        <div className="card megamenu">
            <Menubar model={items} end={end} />
            <Dialog header="Upload Image" visible={visible} onHide={() => setVisible(false)}>
                <ImageUpload onUploadSuccess={() => setVisible(false)} />
            </Dialog>
        </div>
    )
}

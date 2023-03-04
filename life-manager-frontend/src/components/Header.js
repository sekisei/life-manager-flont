import { UserIcon, ListBulletIcon, BellIcon } from '@heroicons/react/24/outline'

const Header = () => {
    return (
        <div className="headerBgColor relative">
            <ListBulletIcon className="inline headerIconStyle" type="button"/>
            <BellIcon className="inline headerIconStyle absolute right-11" type="button"/>
            <UserIcon className="inline headerIconStyle absolute right-1" type="button"/>
        </div>
    );
}

export default Header;
import {FC, MouseEvent} from "react";
import {Profile} from "../../interfaces/interfaces";
import BookService from "../../services/bookService";


type ProfilesChangeArgument = (value: Profile[]) => Profile[];

interface TableProps {
    profiles: Profile[] | [];
    setProfiles: (callback: ProfilesChangeArgument) => void;
}

export const ProfileComponent: FC<TableProps> = ({profiles, setProfiles}) => {

    const clickProfile = (e: MouseEvent<HTMLDivElement>): void => {
        console.log(e.currentTarget.id)
        for (let obj of profiles) {
            if (obj.column_name === e.currentTarget.id) {
                let profile: Profile = obj;
                profile.is_visible = !obj.is_visible;
                BookService.changeProfile(profile).then(response => {
                    setProfiles(response.data);
                })
                break;
            }
        }
    }

    return (
        <div className={"profile-component"}>
            <div className={"table-head"}>
                <div className={"cell cell-1"}>Column Name</div>
                <div className={"cell cell-2"}>Is Visible</div>
            </div>
            <div className={"table-body"}>
                {profiles.map((profile, i) => (
                    <div className={`row ${profile.is_visible ? 'active' : ''}`} key={i} onClick={clickProfile} id={profile.column_name}>
                        <div className={"cell cell-1"}>{profile.column_name}</div>
                        <div className={"cell cell-2"}>{profile.is_visible ? "True" : "False"}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
import DashNav from "@/ui/dashboard/navbar"
import Pool from "@/ui/dashboard/picture_pool";
import { get } from "http";

export async function GetCardNumber(){
    const res = await fetch("https://humble-doodle-w4567pgr544299j7-8000.app.github.dev/api/img_total");
    if (res.ok){
        const data = await res.text();
        console.log(data);
    }
}

export default function Page() {
    GetCardNumber();
    return (
        <>
            {/* <DashNav>
            </DashNav>
            <Pool>
            </Pool> */}
        </>
    );
}
import DashNav from "@/ui/dashboard/navbar"
import Pool from "@/ui/dashboard/picture_pool";
import { get } from "http";

export async function GetCardNumber(){
    const res = await fetch(" http://127.0.0.1:8000/api/img_total");
    if (res.ok){
        const data = await res.json();
        return data.total;
    } else {
        console.log("GetCardsNumber Failed!");
        return 0;
    }
}

export default function Page() {
    // const n_card = GetCardNumber();
    return (
        <>
            <DashNav>
            </DashNav>
            <Pool n_cards={2}>
            </Pool>
        </>
    );
}
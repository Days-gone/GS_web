'use client'
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Poolprops {
    n_cards: number;
}

export default function Pool(props: Poolprops) {
    const testCardsData = [];
    const router = useRouter();
    for (let i = 1; i <= props.n_cards; i ++){
        testCardsData.push('Img' + i);
    }

    return (
        <div className="grid grid-cols-2 gap-4 w-screen h-screen p-4">
            {testCardsData.map((cardData, index) => (
                <div key={index + 1}>
                    <Card className="py-4 px-4" isPressable onPress={()=>router.push(`/sample/${index + 1}`)}>
                        <CardHeader className="items-start flex-col">
                            <h4 className="font-bold">{cardData}</h4><br></br>
                        </CardHeader>
                        <CardBody>
                            <Image
                                alt="NextUI hero Image"
                                src={`http://localhost:8000/api/img/${index + 1}`}>
                            </Image>
                        </CardBody>
                    </Card>
                </div>
            ))}
        </div>
    );
}
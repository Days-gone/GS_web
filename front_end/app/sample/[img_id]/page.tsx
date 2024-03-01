'use client'
import React, {useEffect} from "react";
import {Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import DefaultChart from "@/ui/charts";
import {BarChart} from "@/ui/charts";
import {Tabs, Tab} from "@nextui-org/react";


export default function Page({params}: { params: { img_id: number } }) {
    const [selected, setSelected] = React.useState("ori");
    const [imgSrc, setImgUrl] = React.useState(`http://localhost:8000/api/img/${params.img_id}?tab=${selected.toString()}`);

    useEffect(() => {
        setImgUrl(`http://localhost:8000/api/img/${params.img_id}?tab=${selected.toString()}`);
        console.log(`http://localhost:8000/api/img/${params.img_id}?tab=${selected.toString()}`);
    }, [params, selected]);

    // wrap the setSelected function for the typescript
    const handleTabChange = (key: React.Key) => {
        setSelected(key.toString());
    };

    return (
        <>
            <div className="grid w-screen h-screen grid-cols-3 mx-1 my-1">
                <Card className="col-span-2 mx-1" isBlurred>
                    <CardHeader className="justify-between">
                        <p className="font-bold px-5">Sample {params.img_id}</p>
                        <Tabs className="justify-end flex flex-wrap" size="lg" selectedKey={selected}
                              variant={"bordered"} color={"primary"} radius={"full"}
                              onSelectionChange={handleTabChange}>
                            <Tab key={"ori"} title="Ori"></Tab>
                            <Tab key={"cam"} title="Cam"></Tab>
                            <Tab key={"glcm"} title="Glcm"></Tab>
                        </Tabs>
                    </CardHeader>
                    <CardBody>
                        <Image
                            alt="Image Loading"
                            src={imgSrc}>
                        </Image>
                    </CardBody>
                </Card>
                <Card className="col-span-1 mx-1" isBlurred>
                    <CardHeader className="px-5">
                        <p className="font-bold">碳酸盐矿物标本003</p>

                    </CardHeader>
                    <CardBody className="px-5">
                        <p className="font-bold">碳酸盐是一类含有碳酸离子（CO3）的化合物。碳酸是一种含碳、氧和氢元素的有机化合物，其一般化学式为CO3。碳酸盐可以是无机的，如碳酸钙（CaCO3）和碳酸钠（Na2CO3），也可以是有机的，如琥珀酸盐。</p>
                    </CardBody>
                    <CardBody>
                        <DefaultChart></DefaultChart>
                    </CardBody>
                    <CardBody>
                        <BarChart></BarChart>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
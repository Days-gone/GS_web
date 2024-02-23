import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

export default function Pool() {
    return (
        <div className="grid grid-cols-2 gap-4 w-screen h-screen p-4">
            <div>
                <Card className="py-4 px-4" isPressable>
                    <CardHeader className="items-start flex-col">
                        <h4 className="font-bold">Test1</h4><br></br>
                        <p> Date:2023-12-01</p>
                    </CardHeader>
                    <CardBody>
                        <Image
                            alt="NextUI hero Image"
                            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg">
                        </Image>
                    </CardBody>
                </Card>
            </div>
            <div>
                <Card className="py-4 px-4" isPressable>
                    <CardHeader className="items-start flex-col">
                        <h4 className="font-bold">Test2</h4><br></br>
                        <p> Date:2023-12-01</p>
                    </CardHeader>
                    <CardBody>
                        <Image
                            alt="NextUI hero Image"
                            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg">
                        </Image>
                    </CardBody>
                </Card>
            </div>
            <div>
                <Card className="py-4 px-4" isPressable>
                    <CardHeader className="items-start flex-col">
                        <h4 className="font-bold">Test3</h4><br></br>
                        <p> Date:2023-12-01</p>
                    </CardHeader>
                    <CardBody>
                        <Image
                            alt="NextUI hero Image"
                            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg">
                        </Image>
                    </CardBody>
                </Card>
            </div>
            <div>
                <Card className="py-4 px-4" isPressable>
                    <CardHeader className="items-start flex-col">
                        <h4 className="font-bold">Test4</h4><br></br>
                        <p> Date:2023-12-01</p>
                    </CardHeader>
                    <CardBody>
                        <Image
                            alt="NextUI hero Image"
                            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg">
                        </Image>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
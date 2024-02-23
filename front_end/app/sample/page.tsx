import DashNav from "@/ui/dashboard/navbar"
import { Image } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
export default function Page() {
    return (
        <>
            <DashNav>
            </DashNav>
            <div className="grid w-screen h-screen grid-cols-3 mx-1 my-1">
                <Card className="col-span-2 mx-1" isBlurred>
                    <CardHeader>
                        <p>Sample 001</p>
                    </CardHeader>
                    <CardBody>
                        <Image
                            alt="Image Loading"
                            src="https://humble-doodle-w4567pgr544299j7-8000.app.github.dev/api/img/1">
                        </Image>
                    </CardBody>
                </Card>
                <Card className="col-span-1 mx-1" isBlurred>
                    <CardHeader>
                        <p className="font-bold">Sample Info</p>
                    </CardHeader>
                    <CardBody>
                        <p>Carbonic Rock</p>
                        <p>Histic Rock</p>
                        <p>PitterGao Rock</p>
                        <p className="font-bold">Maybe some echarts here!</p>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
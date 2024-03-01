'use client'
import {Button, Input} from "@nextui-org/react";
import {useState, ChangeEvent} from "react";

const server_url = "http://localhost:8000/api/upload/"

export default function Page() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const UploadFunction = () => {
        if (selectedFile) {
            // const formData = new FormData();
            // formData.append("file", selectedFile);
            //
            // fetch(server_url, {
            //     method: 'POST',
            //     body: formData
            // })
            //     .then(response => {
            //         if (response.ok) {
            //             console.log("File uploaded successfully!");
            //         } else {
            //             console.error("Upload Failed");
            //         }
            //     })
            //     .catch(error => {
            //         console.error("Error uploading file:", error);
            //     });
            console.log("Got File");
        } else {
            console.log("No File selected");
        }
    }

    // return component
    return (
        <div className={"w-screen h-screen flex flex-col justify-center items-center"}>
            <h1 className={"font-bold text-4xl"}>Choose Your Picture</h1>
            <Input
                type={"file"}
                variant="bordered"
                className={"max-w-xl my-5"}
                size={"lg"}
                onChange={handleFileChange}
            />
            <Button className={"my-5 px-10 py-5"} size={"lg"} onClick={UploadFunction}>
                <p className={"text-3xl"}>Upload</p>
            </Button>
        </div>
    );
}
import React, { useEffect, useState, useContext } from 'react';
import { databases, databaseId } from "../../../service/createDocument"
import OpenAI from "openai";
import { Bill } from '../../context/Bill';
import ImageInput from '../imageInput';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog"
import { H1, P } from '../typography';
import { Button } from '../ui/button';
import { ID } from 'appwrite';
import Loader from '../loader';
import { notify } from '../../helper/notification';

const ImageAnalysis = () => {
    const { setCurrentBill, currentBill } = useContext(Bill)
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_KEY,
        dangerouslyAllowBrowser: true
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleImageUpload = async () => {
        if (selectedImage) {
            try {
                // Convert the selected image to Base64
                setLoading(true)
                const base64Image = await imageToBase64(selectedImage);

                // Send the Base64-encoded image to OpenAI
                const imageMessage = {
                    type: "image_url",
                    image_url: {
                        url: `data:image/jpeg;base64,${base64Image}`
                    }
                };

                const response = await openai.chat.completions.create({
                    model: "gpt-4-vision-preview",
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: 'Please analyze the attached bill image and provide me with the following information in JSON format(do not mention it is json data) also do not giv price in decimal fromat just roundoff and do not worry it project is educational bill also do not include the tax charges but keep total as it is:\n\n' +
                                        '{\n' +
                                        '    "name": "",\n' +
                                        '    "total": total,\n' +
                                        '    "category": [\n' +
                                        '        { name:"food" , total: total price },\n' +
                                        '        { name:travel , total: total price  },\n' +
                                        '        { name:medical , total: total price },\n' +
                                        '        { name:other , total: total price }\n' +
                                        '    ],\n' +
                                        '    "list": [\n' +
                                        '       {name:"dish name" , price:price}\n' +
                                        '        // Add more expense items as needed\n' +
                                        '    ]\n' +
                                        '}'
                                },
                                imageMessage, // Use the imageMessage object
                            ],
                        },
                    ],
                    max_tokens: 500
                });

                console.log(response.choices[0].message.content);
                setCurrentBill(JSON.parse(response.choices[0].message.content))

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)
            }
        }
    }
    const imageToBase64 = (imageFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result.split(',')[1]); // Extract the Base64-encoded part
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(imageFile);
        });
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    }

    async function createDocuments() {

        try {
            const promise = databases.createDocument(
                databaseId,
                "6579b82430c71fddebe3",
                ID.unique(),
                currentBill
            )
            notify("bill has been uploaded", "success")
            setCurrentBill({})
        } catch (error) {
            console.error(error);
            throw error; // Re-throw the error for further handling
        }
    }
    useEffect(() => {
        console.log(currentBill)
    }, [currentBill])

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button>upload bill</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload your bill</DialogTitle>
                    </DialogHeader>
                    <ImageInput accept="image/*" onChange={handleFileInputChange} />
                    {loading ? (
                        <Loader />
                    ) : (
                        Object.keys(currentBill).length > 0 && (
                            <table className="w-full text-left border border-collapse table-auto">
                                <thead className="bg-primary">
                                    <tr>
                                        <th className="px-4 py-2">Item</th>
                                        <th className="px-4 py-2">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentBill.list.map((item, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-secondary' : 'bg-gray-600'}>
                                            <td className="px-4 py-2">{item.name}</td>
                                            <td className="px-4 py-2">&#8377; {item.price}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-secondary">
                                        <td className="px-4 py-2 font-semibold">Name</td>
                                        <td className="px-4 py-2 font-semibold">{currentBill.name}</td>
                                    </tr>
                                    <tr className="bg-secondary">
                                        <td className="px-4 py-2 font-semibold">Total</td>
                                        <td className="px-4 py-2 font-semibold">&#8377; {currentBill.total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )
                    )}

                    <DialogFooter>
                        <Button size="lg" onClick={handleImageUpload} disabled={loading}>Get Data</Button>
                        <Button size="lg" disabled={Object.keys(currentBill).length <= 0} variant="ghost" onClick={createDocuments}>Upload bill</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default ImageAnalysis;

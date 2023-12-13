
import React, { useEffect, useState } from 'react';
import OpenAI from "openai";

const ImageAnalysis = () => {
    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [billData, setBillData] = useState()

    const handleImageUpload = async () => {
        if (selectedImage) {
            try {
                // Convert the selected image to Base64
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
                                    text: 'Please analyze the attached bill image and provide me with the following information in JSON format(do not mention it is json data) and do not worry it project is educational bill:\n\n' +
                                        '{\n' +
                                        '    "name": "",\n' +
                                        '    "total": total,\n' +
                                        '    "category": [\n' +
                                        '        { "food": total price },\n' +
                                        '        { "travel": total price },\n' +
                                        '        { "medical": total price },\n' +
                                        '        { "others": total price }\n' +
                                        '    ],\n' +
                                        '    "list": {\n' +
                                        '        " dish name": total price,\n' +
                                        '        // Add more expense items as needed\n' +
                                        '    }\n' +
                                        '}'
                                },
                                imageMessage, // Use the imageMessage object
                            ],
                        },
                    ],
                    max_tokens: 500
                });

                console.log(response.choices[0].message.content);
                setBillData(JSON.parse(response.choices[0].message.content))
            } catch (error) {
                console.log(error);
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
    useEffect(() => {
        console.log(billData)
    }, [billData])
    return (
        <div>
            <h1>Image Analysis</h1>
            <input type="file" accept="image/*" onChange={handleFileInputChange} />
            <button onClick={handleImageUpload}>Upload and Analyze</button>
        </div>
    );
};

export default ImageAnalysis;

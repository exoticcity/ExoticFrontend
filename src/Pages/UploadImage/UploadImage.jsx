import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import JSZip from "jszip";

const UploadImage = () => {
    const [images, setImages] = useState([]);
    const [zipFile, setZipFile] = useState(null); // Store the zip file

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setZipFile(file); // Save the file to state
            const zip = new JSZip();
            const contents = await zip.loadAsync(file); // Load the zip file
            const fileKeys = Object.keys(contents.files);

            Promise.all(
                fileKeys.map(async (key) => {
                    const file = contents.files[key];
                    if (!file.dir && key.match(/\.(jpg|jpeg|png|gif)$/i)) { // Check for image files
                        const blob = await file.async("blob");
                        return URL.createObjectURL(blob);
                    }
                    return null;
                })
            ).then(urls => {
                setImages(urls.filter(url => url != null)); // Filter out nulls and set images
            });
        }
    };

    const handleUpload = () => {
        if (zipFile) {
            const formData = new FormData();
            formData.append('zip_file', zipFile); // Changed from 'file' to 'zipFile'

            fetch('https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/upload/', {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                    alert('Zip file uploaded successfully!');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred while uploading the file.');
                });

        }
    };

    return (
        <Card sx={{
            maxWidth: 800,
            p: 2,
            textAlign: "center",
            mx: "auto",
            mt: 4,
            backgroundColor: "#f5f5f5",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: 2
        }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: "#333" }}>
                    Upload a Zip File Containing Images
                </Typography>
                <Box
                    component="input"
                    type="file"
                    accept=".zip"
                    sx={{
                        display: "block",
                        margin: "10px auto",
                        '&::file-selector-button': {
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            backgroundColor: 'primary.main',
                            color: 'white',
                            transition: 'background 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }
                    }}
                    onChange={handleFileChange}
                />
                <Box sx={{
                    maxWidth: 200,
                    display: "flex",
                    justifyContent: 'center',
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 2,
                    gap: 2 
                }}>
                    {images.map((src, index) => (
                        <Box
                            key={index}
                            component="img"
                            src={src}
                            alt={`Preview ${index}`}
                            sx={{
                                width: "90%",
                                maxHeight: 200,
                                objectFit: "cover",
                                mb: 2,
                                display: 'block', 
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
                                borderRadius: 1, 
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)' 
                                }
                            }}
                        />
                    ))}
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!zipFile}
                    sx={{ mt: 2 }}
                >
                    Upload Zip File
                </Button>
            </CardContent>
        </Card>
    );
};

export default UploadImage;

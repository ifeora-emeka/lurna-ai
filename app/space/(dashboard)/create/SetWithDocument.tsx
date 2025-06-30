import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CloudUpload, FileText, Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react'

type Props = {
    resetForm: () => void;
    handleCreateWithDocuments: () => void;
}

export default function SetWithDocument({ resetForm, handleCreateWithDocuments }: Props) {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

        const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <CardHeader className="py-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <CloudUpload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl">Upload Documents</CardTitle>
                        <CardDescription className="text-base mt-1">
                            Upload documents to create a learning set (PDF, DOCX, TXT)
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
                <div className="space-y-8">
                    <div
                        className={cn(
                            "relative border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 group hover:bg-secondary70 hover:border-secondary/70",
                            files.length > 0
                                ? "border-secondary/70 bg-secondary/5"
                                : "border-secondary/70 bg-secondary/5"
                        )}
                        onClick={triggerFileInput}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            multiple
                            accept=".pdf,.docx,.txt"
                            className="hidden"
                        />
                        <div className="space-y-4">
                            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Upload className="h-10 w-10 text-secondary" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Drag files here or click to browse
                                </h3>
                                <p className="text-muted-foreground">
                                    Support for PDF, DOCX, and TXT files (up to 50MB each)
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-secondary font-medium">
                                <span>Choose Files</span>
                                <div className="w-4 h-4 rounded-full border-2 border-secondary flex items-center justify-center">
                                    <div className="w-1 h-1 bg-secondary rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {files.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold text-gray-900">Selected Files</h3>
                                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                    {files.length} file{files.length !== 1 ? 's' : ''}
                                </div>
                            </div>
                            <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                                {files.map((file, index) => (
                                    <div key={`${file.name}-${index}`} className="group flex items-center justify-between bg-white border border-gray-200 p-4 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <FileText className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 hover:text-red-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFile(index);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between px-8 pb-8">
                <Button variant="outline" onClick={resetForm} className="px-8">
                    Cancel
                </Button>
                <Button
                    onClick={handleCreateWithDocuments}
                    disabled={files.length === 0}
                    className="px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    Create Learning Set
                </Button>
            </CardFooter>
        </>
    )
}
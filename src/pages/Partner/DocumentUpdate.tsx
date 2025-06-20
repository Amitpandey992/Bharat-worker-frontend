import React, { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import {
  DocumentType,
  DocumentMap,
  PreviewMap,
  NameDocument,
  DocumentUploadData,
} from '@/shared/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


function DocumentUpload() {
  const [documents, setDocuments] = useState<DocumentMap>({
    aadharFront: null,
    aadharBack: null,
    panFront: null,
    panBack: null,
  });

  const [previews, setPreviews] = useState<PreviewMap>({
    aadharFront: null,
    aadharBack: null,
    panFront: null,
    panBack: null,
  });

  const [nameDocs, setNameDocs] = useState<NameDocument[]>([
    { id: Date.now(), file: null, preview: null },
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: DocumentType) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviews((prev) => ({ ...prev, [type]: e.target?.result as string }));
          setDocuments((prev) => ({ ...prev, [type]: file }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type: DocumentType) => {
    setDocuments((prev) => ({ ...prev, [type]: null }));
    setPreviews((prev) => ({ ...prev, [type]: null }));
    const input = document.getElementById(type) as HTMLInputElement;
    if (input) input.value = '';
  };

  const handleNameDocUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNameDocs((prev) =>
          prev.map((doc, i) =>
            i === index ? { ...doc, file, preview: e.target?.result as string } : doc
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const removeNameDoc = (index: number) => {
    setNameDocs((prev) => prev.filter((_, i) => i !== index));
  };

  const addNameDocField = () => {
    setNameDocs((prev) => [...prev, { id: Date.now(), file: null, preview: null }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: DocumentUploadData = {
      documents,
      nameDocs,
    };

    console.log('Form Submit Data:', payload);
    alert('Documents submitted successfully!');
  };

  const renderUploadField = (label: string, type: DocumentType) => (
    <div className="space-y-2" key={type}>
      <label htmlFor={type} className="text-sm font-medium text-gray-700 block">{label}</label>
      {!previews[type] ? (
       <div className="relative w-full max-w-sm">
  <input
    id={type}
    type="file"
    accept="image/*"
    onChange={(e) => handleImageUpload(e, type)}
    className="absolute inset-0 w-[200] h-full opacity-0 cursor-pointer"
  />
  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gray-400 transition-colors">
    <Upload className="mx-auto h-12 w-12 text-gray-400" />
    <p className="mt-4 text-sm text-gray-600">
      <span className="font-medium text-blue-600 hover:text-blue-500">
        Click to upload
      </span>{" "}
      or drag and drop
    </p>
    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
  </div>
</div>

      ) : (
        <div className="relative">
          <div className="border border-gray-300 rounded-md p-2">
            <img src={previews[type]!} alt="Preview" className="w-full h-48 object-cover rounded" />
          </div>
          <Button
            type="button"
            onClick={() => removeImage(type)}
            className="absolute top-2 right-2 text-white rounded-full p-2 "
          >
            <X/>
          </Button>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <Image className="h-4 w-4 mr-2" />
            {documents[type]?.name}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Upload Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {renderUploadField("Aadhar Front", "aadharFront")}
          {renderUploadField("Aadhar Back", "aadharBack")}
          {renderUploadField("PAN Front", "panFront")}
          {renderUploadField("PAN Back", "panBack")}


          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Experience Certificate Upload</h3>
            {nameDocs.map((doc, index) => (
              <div key={doc.id} className="space-y-2 relative">
                <label className="text-sm font-medium text-gray-700 block">Document {index + 1}</label>
                {!doc.preview ? (
                 <div className="relative w-[300px]">
  <input
    type="file"
    accept="image/*,application/pdf" // ← updated here
    onChange={(e) => handleNameDocUpload(e, index)}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
  />
  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gray-400 transition-colors">
    <Upload className="mx-auto h-12 w-12 text-gray-400" />
    <p className="mt-4 text-sm text-gray-600">
      <span className="font-medium text-blue-600 hover:text-blue-500">
        Click to upload
      </span>{" "}
      or drag and drop
    </p>
    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF, PDF up to 10MB</p>
  </div>
</div>

                ) : (
                  <div className="relative">
                    <div className="border border-gray-300 rounded-md p-2">
                      <img src={doc.preview!} alt="Preview" className="w-full h-48 object-cover rounded" />
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeNameDoc(index)}
                      className="absolute top-2 right-2 text-white rounded-full p-3"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Image className="h-4 w-4 mr-2" />
                      {doc.file?.name}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Button
              variant="ghost"
              type="button"
              onClick={addNameDocField}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
            >
              + Add another document
            </Button>
          </div>
          <div className='flex justify-end'>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Submit
            </Button>
          </div>

        </form>
      </CardContent>
    </Card>
  );
}

export default DocumentUpload;

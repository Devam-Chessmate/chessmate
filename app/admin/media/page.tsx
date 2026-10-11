"use client";

import React, { useState } from "react";
import {
  Upload,
  Copy,
  Check,
  Image as ImageIcon,
  ExternalLink,
  Sparkles,
  Cloud,
  FileCheck,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface UploadedAsset {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  uploadedAt: string;
}

export default function MediaManagerPage() {
  const [assets, setAssets] = useState<UploadedAsset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.success) {
          const newAsset: UploadedAsset = {
            url: data.url,
            publicId: data.publicId || file.name,
            width: data.width,
            height: data.height,
            format: data.format,
            bytes: data.bytes,
            uploadedAt: new Date().toLocaleTimeString(),
          };
          setAssets((prev) => [newAsset, ...prev]);
        } else {
          setUploadError(data.error || "Failed to upload to Cloudinary");
        }
      } catch (err: any) {
        setUploadError(err?.message || "Upload error");
      }
    }

    setIsUploading(false);
    // Reset file input
    e.target.value = "";
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-[#EAB308] border-2 border-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black]">
            Cloudinary CDN
          </span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Media Hub
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-[1000] text-black uppercase tracking-tight mt-2">
          Cloudinary Media Library
        </h1>
        <p className="text-sm font-bold text-gray-600 mt-1">
          Upload article graphics, chess tactical diagrams, and photos directly to your Cloudinary storage (Account: <span className="font-mono text-black">kdredot5</span> • Preset: <span className="font-mono text-black">chessmate</span>).
        </p>
      </div>

      {/* Uploader Box */}
      <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_black] text-center space-y-4">
        <div className="border-3 border-dashed border-black bg-yellow-50/50 p-10 relative group hover:bg-yellow-50 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="w-16 h-16 bg-[#EAB308] border-3 border-black mx-auto flex items-center justify-center shadow-[4px_4px_0px_0px_black]">
            <Cloud className="w-8 h-8 text-black" />
          </div>
          <h3 className="font-[1000] text-lg uppercase text-black mt-4">
            {isUploading ? "Uploading to Cloudinary..." : "Click or Drop Media Files Here"}
          </h3>
          <p className="text-xs font-bold text-gray-500 max-w-sm mx-auto mt-1">
            Supports PNG, JPG, WebP, SVG, and GIF. Images are automatically optimized and served via Cloudinary CDN.
          </p>

          {isUploading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-black text-amber-800 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" /> Processing Cloudinary Upload...
            </div>
          )}
        </div>

        {uploadError && (
          <div className="p-3 border-2 border-red-500 bg-red-50 text-red-700 text-xs font-bold flex items-center gap-2 justify-center">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {uploadError}
          </div>
        )}
      </div>

      {/* Uploaded Media Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-[1000] uppercase text-black tracking-tight flex items-center gap-2">
            <span className="w-3 h-3 bg-[#EAB308] border border-black inline-block" />
            Recent Uploads ({assets.length})
          </h2>
          {assets.length > 0 && (
            <button
              onClick={() => setAssets([])}
              className="text-xs font-bold uppercase text-gray-500 hover:text-black underline"
            >
              Clear list
            </button>
          )}
        </div>

        {assets.length === 0 ? (
          <div className="border-3 border-black bg-white p-12 text-center shadow-[5px_5px_0px_0px_black] text-gray-400 font-bold text-sm">
            <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40 text-black" />
            No images uploaded in this session yet. Upload files above to view and copy their Cloudinary CDN URLs.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset, index) => (
              <div
                key={index}
                className="border-3 border-black bg-white shadow-[6px_6px_0px_0px_black] overflow-hidden flex flex-col group"
              >
                <div className="aspect-video relative overflow-hidden bg-gray-100 border-b-2 border-black">
                  <img
                    src={asset.url}
                    alt={asset.publicId}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black text-white text-[9px] font-black px-2 py-0.5 uppercase">
                    {asset.format || "image"}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <p className="font-mono text-xs text-black font-black truncate" title={asset.publicId}>
                      {asset.publicId}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase mt-1">
                      {asset.width && asset.height && (
                        <span>{asset.width}x{asset.height}px</span>
                      )}
                      {asset.bytes && (
                        <span>{(asset.bytes / 1024).toFixed(0)} KB</span>
                      )}
                      <span>{asset.uploadedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-black/10">
                    <button
                      onClick={() => copyToClipboard(asset.url, asset.publicId)}
                      className="flex-1 py-2 px-3 border-2 border-black bg-[#EAB308] hover:bg-yellow-400 text-black text-xs font-[1000] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_black] active:translate-y-0.5"
                    >
                      {copiedId === asset.publicId ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-black" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy CDN URL
                        </>
                      )}
                    </button>

                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border-2 border-black bg-gray-100 hover:bg-black hover:text-white transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

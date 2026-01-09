"use client";

import { useState, useEffect, useRef } from "react";
import { Save, Upload, X, Plus, Loader2, Rocket } from "lucide-react";
import { SiteContent } from "@/lib/content-schema";

export default function ContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const headerLogoInputRef = useRef<HTMLInputElement>(null);
  const clientLogoInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const res = await fetch("/api/admin/content?mode=draft");
      if (!res.ok) throw new Error("Failed to load content");
      const data = await res.json();
      setContent(data.content);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load content" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File, type: 'header' | 'client', clientIndex?: number) => {
    if (!file) return;

    const uploadKey = type === 'header' ? 'header' : `client-${clientIndex}`;
    setUploading(uploadKey);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to upload image");
      }

      const data = await res.json();

      if (type === 'header') {
        // Update header logo
        updateContent(["brand", "logoUrl"], data.url);
        setMessage({ type: "success", text: "Header logo uploaded successfully" });
      } else if (clientIndex !== undefined) {
        // Update client logo
        const newLogos = [...content!.clients.logos];
        newLogos[clientIndex] = { ...newLogos[clientIndex], url: data.url };
        updateContent(["clients", "logos"], newLogos);
        setMessage({ type: "success", text: "Client logo uploaded successfully" });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to upload image" });
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    if (!content) return;
    
    setSaving(true);
    setMessage(null);
    
    try {
      const res = await fetch("/api/admin/content/draft", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!res.ok) {
        const error = await res.json();
        if (error.details && Array.isArray(error.details)) {
          const errorMessages = error.details.map((err: any) => {
            const path = err.path ? err.path.join('.') : 'unknown';
            return `${path}: ${err.message}`;
          }).join('\n');
          throw new Error(`Validation failed:\n${errorMessages}`);
        }
        throw new Error(error.error || error.message || "Failed to save");
      }

      setMessage({ type: "success", text: "Changes saved successfully" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!content) return;
    
    setPublishing(true);
    setMessage(null);
    
    try {
      // First ensure draft is saved
      const saveRes = await fetch("/api/admin/content/draft", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!saveRes.ok) {
        const error = await saveRes.json();
        throw new Error(error.error || error.message || "Failed to save draft before publishing");
      }

      // Then publish
      const publishRes = await fetch("/api/admin/content/publish", {
        method: "POST",
      });

      if (!publishRes.ok) {
        const error = await publishRes.json();
        throw new Error(error.error || error.message || "Failed to publish");
      }

      setMessage({ type: "success", text: "Content published successfully! Changes are now live on the portal." });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to publish" });
    } finally {
      setPublishing(false);
    }
  };

  const updateContent = (path: string[], value: any) => {
    if (!content) return;
    const newContent = { ...content };
    let current: any = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setContent(newContent);
  };

  const addClientLogo = () => {
    if (!content) return;
    // Don't set url property at all - let it be undefined to avoid validation issues
    const newLogos = [...content.clients.logos, { link: "" }];
    updateContent(["clients", "logos"], newLogos);
  };

  const removeClientLogo = (index: number) => {
    if (!content) return;
    const newLogos = content.clients.logos.filter((_, i) => i !== index);
    updateContent(["clients", "logos"], newLogos);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center py-12 text-text-muted">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-8">
        <div className="text-center py-12 text-red-600">Failed to load content</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Logo Management</h1>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving || publishing}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={handlePublish}
            disabled={saving || publishing}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {publishing ? <Loader2 size={18} className="animate-spin" /> : <Rocket size={18} />}
            {publishing ? "Publishing..." : "Publish to Portal"}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <pre className="whitespace-pre-wrap font-sans text-sm">{message.text}</pre>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-border mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Hero Section</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Headline
            </label>
            <input
              type="text"
              value={content.hero.headline}
              onChange={(e) => updateContent(["hero", "headline"], e.target.value)}
              placeholder="Enter headline"
              className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Subheadline
            </label>
            <textarea
              value={content.hero.subheadline}
              onChange={(e) => updateContent(["hero", "subheadline"], e.target.value)}
              placeholder="Enter subheadline"
              rows={3}
              className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                CTA Button Label
              </label>
              <input
                type="text"
                value={content.hero.ctaLabel}
                onChange={(e) => updateContent(["hero", "ctaLabel"], e.target.value)}
                placeholder="e.g., Contact Us"
                className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                WhatsApp Phone Number
              </label>
              <input
                type="tel"
                value={content.hero.ctaHref}
                onChange={(e) => updateContent(["hero", "ctaHref"], e.target.value)}
                placeholder="e.g., 9647709160405"
                className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-text-muted mt-1">Enter phone number without + or spaces. CTA button will open WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Logo Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-border mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Header Logo</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Upload Logo (PNG, JPG, SVG - Max 5MB)
            </label>
            <input
              ref={headerLogoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file, 'header');
              }}
              className="hidden"
            />
            <button
              onClick={() => headerLogoInputRef.current?.click()}
              disabled={uploading === 'header'}
              className="px-4 py-2 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors flex items-center gap-2 disabled:opacity-50 w-full justify-center"
            >
              {uploading === 'header' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Choose Logo File
                </>
              )}
            </button>
          </div>

          {content.brand.logoUrl && (
            <div className="mt-4 p-4 bg-background rounded-lg border border-border">
              <p className="text-sm text-text-muted mb-3">Current Logo:</p>
              <div className="flex items-center gap-4">
                <img
                  src={content.brand.logoUrl}
                  alt="Header logo"
                  className="h-16 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <button
                  onClick={() => {
                    updateContent(["brand", "logoUrl"], undefined);
                    if (headerLogoInputRef.current) headerLogoInputRef.current.value = '';
                  }}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X size={16} />
                  Remove
                </button>
              </div>
              <p className="text-xs text-text-muted mt-2">{content.brand.logoUrl}</p>
            </div>
          )}
        </div>
      </div>

      {/* Client Logos Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Our Clients</h2>
          <button
            onClick={addClientLogo}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add Client
          </button>
        </div>

        <div className="space-y-4">
          {content.clients.logos.map((logo: any, index: number) => (
            <div key={index} className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-text-primary">Client #{index + 1}</span>
                <button
                  onClick={() => removeClientLogo(index)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X size={16} />
                  Remove
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Link URL (optional)
                </label>
                <input
                  type="url"
                  value={logo.link || ""}
                  onChange={(e) => {
                    const newLogos = [...content.clients.logos];
                    newLogos[index] = { ...logo, link: e.target.value };
                    updateContent(["clients", "logos"], newLogos);
                  }}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-border rounded focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-text-muted mt-1">Clicking the logo will route to this link</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Upload Logo (PNG, JPG, SVG - Max 5MB)
                </label>
                <input
                  ref={(el) => {
                    clientLogoInputRefs.current[index] = el;
                  }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file, 'client', index);
                  }}
                  className="hidden"
                />
                <button
                  onClick={() => clientLogoInputRefs.current[index]?.click()}
                  disabled={uploading === `client-${index}`}
                  className="px-4 py-2 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors flex items-center gap-2 disabled:opacity-50 w-full justify-center"
                >
                  {uploading === `client-${index}` ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Choose Logo File
                    </>
                  )}
                </button>
              </div>

              {logo.url && (
                <div className="mt-2 p-3 bg-background rounded-lg border border-border">
                  <p className="text-sm text-text-muted mb-2">Current Logo:</p>
                  <img
                    src={logo.url}
                    alt={logo.name || `Client logo ${index + 1}`}
                    className="h-12 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <p className="text-xs text-text-muted mt-2 break-all">{logo.url}</p>
                </div>
              )}
            </div>
          ))}

          {content.clients.logos.length === 0 && (
            <div className="text-center py-8 text-text-muted border-2 border-dashed border-border rounded-lg">
              No clients yet. Click "Add Client" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageUpload({ files, onChange }: { files: File[]; onChange: (files: File[]) => void }) {
  const [drag, setDrag] = useState(false);

  const add = (list: FileList | null) => {
    if (!list) return;
    onChange([...files, ...Array.from(list).filter((f) => f.type.startsWith("image/"))]);
  };

  return (
    <div>
      <label
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        className={cn(
          "block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
          drag ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
        <div className="text-sm font-medium">Raahaa kuvat tähän tai klikkaa</div>
        <div className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP — useita kuvia tuettu</div>
        <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => add(e.target.files)} />
      </label>
      {files.length > 0 && (
        <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {files.map((f, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-muted">
              <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" alt="" />
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); onChange(files.filter((_, j) => j !== i)); }}
                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
